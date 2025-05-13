"use client";

import { AppLayout } from '@/components/layout/app-layout';
import { NewStoryDialog } from '@/components/dialogs/new-story-dialog.jsx';
import { NotificationsPanel } from '@/components/dialogs/notifications-panel';
import { useApp } from '@/hooks/use-app.js';

/**
 * Main application component wrapper.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child elements to render within the layout.
 */
export function StorySparkApp({ children }) {
  const { isNewStoryDialogOpen, isNotificationsPanelOpen } = useApp();

  return (
    <>
      <AppLayout>
        {children}
      </AppLayout>
      {isNewStoryDialogOpen && <NewStoryDialog />}
      {isNotificationsPanelOpen && <NotificationsPanel />}
    </>
  );
} 