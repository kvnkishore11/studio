// src/components/providers/app-provider.jsx
"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
// Removed type imports

// Removed interface definition

export const AppContext = createContext(undefined);

// Mock data for initial state
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


export const AppProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [isNewStoryDialogOpen, setIsNewStoryDialogOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [savedStories, setSavedStories] = useState(initialSavedStories);
  const [historyItems, setHistoryItems] = useState(initialHistoryItems);
  const [currentGeneratedStory, setCurrentGeneratedStory] = useState(null);


  useEffect(() => {
    const storedTheme = localStorage.getItem('themeMode');
    if (storedTheme) {
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

  const addSavedStory = useCallback((story) => {
    setSavedStories(prev => [story, ...prev]);
  }, []);

  const removeSavedStory = useCallback((id) => {
    setSavedStories(prev => prev.filter(story => story.id !== id));
  }, []);

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
