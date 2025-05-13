import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Hook to determine if the current screen width is below the mobile breakpoint.
 * @returns {boolean} True if the screen width is considered mobile, false otherwise.
 */
export function useIsMobile() {
  // Initialize state to undefined to handle server-side rendering
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    // Ensure listener is added only client-side
    mql.addEventListener("change", onChange)
    // Set initial state client-side
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    // Cleanup listener
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return !!isMobile to ensure boolean, handling the initial undefined state
  return !!isMobile
} 