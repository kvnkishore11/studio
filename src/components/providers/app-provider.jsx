// src/components/providers/app-provider.jsx
"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { initialSavedStories } from '@/data/mocks/saved-stories';
import { initialHistoryItems } from '@/data/mocks/history-items';

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

// Mock data is now imported from separate files

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
