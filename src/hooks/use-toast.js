"use client"

import * as React from "react"

// Removed TS types: ToastActionElement, ToastProps from "@/components/ui/toast"
// Removed type aliases: ToasterToast, ActionType, Action, State, Toast

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} // Removed 'as const'

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

/** @type {Map<string, ReturnType<typeof setTimeout>>} */
const toastTimeouts = new Map()

/** @param {string} toastId */
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST, 
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Reducer function for managing toast state.
 * @param {{ toasts: Array<object> }} state - The current state.
 * @param {{ type: string, toast?: object, toastId?: string }} action - The dispatched action.
 * @returns {{ toasts: Array<object> }} The new state.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
       return state;
  }
}

/** @type {Array<(state: { toasts: Array<object> }) => void>} */
const listeners = []

/** @type {{ toasts: Array<object> }} */
let memoryState = { toasts: [] }

/**
 * Dispatches an action to update the toast state.
 * @param {{ type: string, toast?: object, toastId?: string }} action - The action to dispatch.
 */
function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}


/**
 * Displays a toast notification.
 * @param {object} props - Toast properties.
 * @param {React.ReactNode} [props.title] - The title of the toast.
 * @param {React.ReactNode} [props.description] - The description of the toast.
 * @param {React.ReactNode} [props.action] - An action element for the toast.
 * @param {string} [props.variant] - The variant of the toast (e.g., 'default', 'destructive').
 * @returns {{id: string, dismiss: () => void, update: (props: object) => void}}
 */
function toast({ ...props }) {
  const id = genId()

  /** @param {object} updateProps */
  const update = (updateProps) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...updateProps, id },
    })

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * Hook to use the toast functionality.
 * @returns {{toasts: Array<object>, toast: (props: object) => {id: string, dismiss: () => void, update: (props: object) => void}, dismiss: (toastId?: string) => void}}
 */
function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast } 