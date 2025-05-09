// src/components/story-spark-app.tsx
"use client";

import type { ReactNode } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { NewStoryDialog } from '@/components/dialogs/new-story-dialog';
import { NotificationsPanel } from '@/components/dialogs/notifications-panel';
import { useApp } from '@/hooks/use-app';

interface StorySparkAppProps {
  children: ReactNode;
}

export function StorySparkApp({ children }: StorySparkAppProps) {
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
