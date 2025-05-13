"use client";

import React from 'react';
import { Zap, BookOpen, History, LayoutGrid, Settings, Menu, Bell, Sun, Moon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewStoryDialog } from '@/components/dialogs/new-story-dialog.jsx';
import { NotificationsPanel } from '@/components/dialogs/notifications-panel.jsx';
import { useApp } from '@/hooks/use-app.js';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * Main application component wrapper.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child elements to render within the layout.
 */
export function StorySparkApp({ children }) {
  // Safely try to use the useApp hook, but provide fallback values if it fails
  let appContext = { 
    isNewStoryDialogOpen: false, 
    isNotificationsPanelOpen: false,
    openNewStoryDialog: () => console.warn('openNewStoryDialog not available'),
    toggleNotificationsPanel: () => console.warn('toggleNotificationsPanel not available'),
    themeMode: 'light',
    toggleTheme: () => console.warn('toggleTheme not available')
  };
  
  try {
    appContext = useApp();
  } catch (error) {
    console.warn('StorySparkApp: AppProvider not found in context, using default values');
  }
  
  const { 
    isNewStoryDialogOpen, 
    isNotificationsPanelOpen, 
    openNewStoryDialog,
    toggleNotificationsPanel,
    themeMode,
    toggleTheme 
  } = appContext;
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Sidebar */}
        <div className="w-64 border-r bg-background hidden md:block">
          <div className="h-16 px-4 flex items-center border-b">
            <Link href="/" className="flex items-center group">
              <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-2 mr-3 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg">
                <BookOpen size={20} className="text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">Story Spark</h1>
            </Link>
          </div>
          <div className="p-4">
            <nav className="space-y-2">
              {/* Navigation Links */}
              <Link href="/" legacyBehavior passHref>
                <a className={`flex items-center px-3 py-2 text-sm rounded-md ${pathname === '/' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                  <Zap className={`mr-2 h-4 w-4 ${pathname === '/' ? 'text-primary' : ''}`} />
                  Generate Story
                  {pathname === '/' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </a>
              </Link>
              <Link href="/saved-stories" legacyBehavior passHref>
                <a className={`flex items-center px-3 py-2 text-sm rounded-md ${pathname === '/saved-stories' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                  <BookOpen className={`mr-2 h-4 w-4 ${pathname === '/saved-stories' ? 'text-primary' : ''}`} />
                  Saved Stories
                  {pathname === '/saved-stories' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </a>
              </Link>
              <Link href="/history" legacyBehavior passHref>
                <a className={`flex items-center px-3 py-2 text-sm rounded-md ${pathname === '/history' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                  <History className={`mr-2 h-4 w-4 ${pathname === '/history' ? 'text-primary' : ''}`} />
                  History
                  {pathname === '/history' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </a>
              </Link>
              <Link href="/templates" legacyBehavior passHref>
                <a className={`flex items-center px-3 py-2 text-sm rounded-md ${pathname === '/templates' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                  <LayoutGrid className={`mr-2 h-4 w-4 ${pathname === '/templates' ? 'text-primary' : ''}`} />
                  Templates
                  {pathname === '/templates' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </a>
              </Link>
              <Link href="/settings" legacyBehavior passHref>
                <a className={`flex items-center px-3 py-2 text-sm rounded-md ${pathname === '/settings' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                  <Settings className={`mr-2 h-4 w-4 ${pathname === '/settings' ? 'text-primary' : ''}`} />
                  Settings
                  {pathname === '/settings' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </a>
              </Link>
            </nav>
          </div>
          {/* Sidebar Footer */}
          <div className="p-4 mt-auto border-t">
            <div className="p-4 rounded-xl bg-secondary/50 border border-secondary transition-all duration-300 hover:shadow-lg mb-4">
              <div className="flex items-start mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap size={18} className="text-primary animate-pulse" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-sm text-foreground">AI Powered</h4>
                  <p className="text-xs text-muted-foreground">Generate stories with AI</p>
                </div>
              </div>
              <Button 
                className="w-full btn-hover-effect"
                size="sm"
                onClick={openNewStoryDialog}
              >
                Create New Story
              </Button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b bg-background/80 backdrop-blur-md">
            <div className="md:hidden">
              <Menu className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground hidden md:block">
              {pathname === '/' ? 'Generate Story' : 
               pathname === '/saved-stories' ? 'Saved Stories' : 
               pathname === '/history' ? 'History' : 
               pathname === '/templates' ? 'Templates' : 
               pathname === '/settings' ? 'Settings' : 'Story Spark'}
            </h2>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleNotificationsPanel}
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
              >
                {themeMode === 'dark' ? 
                  <Sun className="h-5 w-5" /> : 
                  <Moon className="h-5 w-5" />}
              </Button>
              <Button
                onClick={openNewStoryDialog}
                className="hidden md:flex"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Story
              </Button>
              <Button
                onClick={openNewStoryDialog}
                size="icon"
                className="md:hidden"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
      {isNewStoryDialogOpen && <NewStoryDialog />}
      {isNotificationsPanelOpen && <NotificationsPanel />}
    </>
  );
} 