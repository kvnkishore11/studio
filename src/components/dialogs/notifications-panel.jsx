// src/components/dialogs/notifications-panel.jsx
"use client";

import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useApp } from '@/hooks/use-app';
import { cn } from '@/lib/utils';

/**
 * Mock notifications data for demonstration
 * @type {Array<{id: string, title: string, message: string, time: string, isNew: boolean}>}
 */
const notificationsMock = [
  { 
    id: '1',
    title: 'Story Generated', 
    message: 'Your "User Authentication" story has been successfully generated.',
    time: '5 minutes ago',
    isNew: true
  },
  { 
    id: '2',
    title: 'Template Updated', 
    message: 'The "Basic User Story" template has been updated with new fields.',
    time: '2 hours ago',
    isNew: true
  },
  { 
    id: '3',
    title: 'Story Reminder', 
    message: 'You have 3 unfinished stories. Would you like to continue working on them?',
    time: 'Yesterday',
    isNew: false
  },
];

/**
 * Notifications panel component that displays user notifications
 */
export function NotificationsPanel() {
  const { toggleNotificationsPanel, themeMode } = useApp();

  return (
    <div className={cn(
      "fixed top-0 right-0 w-full sm:w-96 h-screen p-6 z-40 shadow-xl animate-slideInRight border-l",
      themeMode === 'light' ? "bg-background/95 backdrop-blur-md" : "bg-background/95 backdrop-blur-md"
    )}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight text-foreground">Notifications</h3>
        <Button variant="ghost" size="icon" onClick={toggleNotificationsPanel}>
          <X size={20} />
        </Button>
      </div>
      
      <div className="space-y-4">
        {notificationsMock.map((notification) => (
          <div 
            key={notification.id}
            className={cn(
              "p-4 rounded-xl transition-all duration-200 border",
              notification.isNew 
                ? "bg-primary/5 border-primary/20" 
                : "bg-muted/50 border-border"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-foreground">{notification.title}</h4>
              {notification.isNew && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <p className="text-sm mb-2 text-muted-foreground">{notification.message}</p>
            <p className="text-xs text-muted-foreground/80">{notification.time}</p>
          </div>
        ))}
      </div>
      
      <Button variant="link" className="w-full mt-6 text-sm font-medium text-primary">
        View all notifications
      </Button>
    </div>
  );
}
