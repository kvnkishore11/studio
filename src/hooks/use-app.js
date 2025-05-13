"use client";

import { useContext } from 'react';
import { AppContext } from '@/components/providers/app-provider.jsx';

/**
 * Custom hook to access the app context.
 * @returns {object} The app context.
 * @throws {Error} If used outside of an AppProvider.
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 