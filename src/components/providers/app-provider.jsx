// src/components/providers/app-provider.jsx
"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';

/**
 * @typedef {'light' | 'dark'} ThemeMode
 */

/**
 * @typedef {Object} SavedStory
 * @property {string} id - Unique identifier for the story
 * @property {string} title - Title of the story
 * @property {string} userStory - The user story content
 * @property {string[]} acceptanceCriteria - List of acceptance criteria
 * @property {string} additionalNotes - Additional notes about the story
 * @property {'Easy' | 'Medium' | 'Hard'} difficulty - Difficulty level of the story
 * @property {'High' | 'Medium' | 'Low'} priority - Priority level of the story
 * @property {string} estimatedTime - Estimated time to complete
 * @property {string} date - Formatted date string
 * @property {string} timestamp - ISO timestamp string
 */

/**
 * @typedef {Object} HistoryItem
 * @property {string} id - Unique identifier for the history item
 * @property {string} title - Title of the history item
 * @property {string} description - Description of the history item
 * @property {string} userStory - The user story content
 * @property {string} date - Formatted date string
 * @property {string} timestamp - ISO timestamp string
 */

/**
 * @typedef {Object} GeneratedStoryData
 * @property {string} id - Unique identifier for the generated story
 * @property {string} title - Title of the generated story
 * @property {string} userStory - The user story content
 * @property {string[]} acceptanceCriteria - List of acceptance criteria
 * @property {string} additionalNotes - Additional notes about the story
 * @property {'Easy' | 'Medium' | 'Hard'} difficulty - Difficulty level of the story
 * @property {'High' | 'Medium' | 'Low'} priority - Priority level of the story
 * @property {string} estimatedTime - Estimated time to complete
 * @property {string} timestamp - ISO timestamp string
 */

/**
 * @typedef {Object} AppContextType
 * @property {ThemeMode} themeMode - Current theme mode (light or dark)
 * @property {function(): void} toggleTheme - Function to toggle the theme
 * @property {boolean} isNewStoryDialogOpen - Whether the new story dialog is open
 * @property {function(): void} openNewStoryDialog - Function to open the new story dialog
 * @property {function(): void} closeNewStoryDialog - Function to close the new story dialog
 * @property {boolean} isNotificationsPanelOpen - Whether the notifications panel is open
 * @property {function(): void} toggleNotificationsPanel - Function to toggle the notifications panel
 * @property {SavedStory[]} savedStories - Array of saved stories
 * @property {function(SavedStory): void} addSavedStory - Function to add a saved story
 * @property {function(string): void} removeSavedStory - Function to remove a saved story by ID
 * @property {HistoryItem[]} historyItems - Array of history items
 * @property {function(HistoryItem): void} addHistoryItem - Function to add a history item
 * @property {GeneratedStoryData|null} currentGeneratedStory - Currently generated story or null
 * @property {function(GeneratedStoryData|null): void} setCurrentGeneratedStory - Function to set the current generated story
 */

/** @type {React.Context<AppContextType|undefined>} */
export const AppContext = createContext(undefined);

// Mock data for initial state
/** @type {SavedStory[]} */
const initialSavedStories = [
  {
    id: "1",
    title: "User Authentication System",
    userStory: "As a user, I want to securely log in to access my personal dashboard.",
    acceptanceCriteria: ["Criteria 1", "Criteria 2"],
    additionalNotes: "Consider 2FA.",
    difficulty: "Medium",
    priority: "High",
    estimatedTime: "3-5 days",
    date: "May 08, 2025",
    timestamp: new Date("2025-05-08").toISOString(),
  },
  {
    id: "2",
    title: "Product Search Functionality",
    userStory: "As a customer, I want to search for products by name or category.",
    acceptanceCriteria: ["Criteria A", "Criteria B"],
    additionalNotes: "Include filters.",
    difficulty: "Medium",
    priority: "Medium",
    estimatedTime: "5-7 days",
    date: "May 07, 2025",
    timestamp: new Date("2025-05-07").toISOString(),
  },
];

/** @type {HistoryItem[]} */
const initialHistoryItems = [
   {
    id: "h1",
    title: 'User Authentication',
    description: 'Secure login for users',
    userStory: 'As a user, I want to securely log in to access my personal dashboard.',
    date: 'May 07, 2025',
    timestamp: new Date("2025-05-07").toISOString(),
  },
  {
    id: "h2",
    title: 'Shopping Cart Enhancement',
    description: 'Product recommendations based on cart',
    userStory: 'As a customer, I want to see product recommendations based on items in my cart so that I can discover relevant products more easily.',
    date: 'May 06, 2025',
    timestamp: new Date("2025-05-06").toISOString(),
  },
];

/**
 * Application provider component that manages global state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 */
export const AppProvider = ({ children }) => {
  /** @type {[ThemeMode, React.Dispatch<React.SetStateAction<ThemeMode>>]} */
  const [themeMode, setThemeMode] = useState('light');
  const [isNewStoryDialogOpen, setIsNewStoryDialogOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  /** @type {[SavedStory[], React.Dispatch<React.SetStateAction<SavedStory[]>>]} */
  const [savedStories, setSavedStories] = useState(initialSavedStories);
  /** @type {[HistoryItem[], React.Dispatch<React.SetStateAction<HistoryItem[]>>]} */
  const [historyItems, setHistoryItems] = useState(initialHistoryItems);
  /** @type {[GeneratedStoryData|null, React.Dispatch<React.SetStateAction<GeneratedStoryData|null>>]} */
  const [currentGeneratedStory, setCurrentGeneratedStory] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('themeMode');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeMode(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      // Default to light if nothing is stored or match system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setThemeMode(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      document.documentElement.classList.toggle('dark', newMode === 'dark');
      return newMode;
    });
  }, []);

  const openNewStoryDialog = useCallback(() => setIsNewStoryDialogOpen(true), []);
  const closeNewStoryDialog = useCallback(() => {
    setIsNewStoryDialogOpen(false);
    setCurrentGeneratedStory(null); // Clear generated story when closing dialog
  }, []);
  const toggleNotificationsPanel = useCallback(() => setIsNotificationsPanelOpen(prev => !prev), []);

  /**
   * Add a story to saved stories
   * @param {SavedStory} story - The story to save
   */
  const addSavedStory = useCallback((story) => {
    setSavedStories(prev => [story, ...prev]);
  }, []);

  /**
   * Remove a story from saved stories by ID
   * @param {string} id - The ID of the story to remove
   */
  const removeSavedStory = useCallback((id) => {
    setSavedStories(prev => prev.filter(story => story.id !== id));
  }, []);

  /**
   * Add an item to history
   * @param {HistoryItem} item - The history item to add
   */
  const addHistoryItem = useCallback((item) => {
    setHistoryItems(prev => [item, ...prev.slice(0, 19)]); // Keep last 20 history items
  }, []);

  return (
    <AppContext.Provider
      value={{
        themeMode,
        toggleTheme,
        isNewStoryDialogOpen,
        openNewStoryDialog,
        closeNewStoryDialog,
        isNotificationsPanelOpen,
        toggleNotificationsPanel,
        savedStories,
        addSavedStory,
        removeSavedStory,
        historyItems,
        addHistoryItem,
        currentGeneratedStory,
        setCurrentGeneratedStory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
