// src/components/layout/app-header.jsx
"use client";

import { usePathname } from 'next/navigation';
import { Menu, Plus, Bell, Moon, Sun, Search as SearchIconLucide } from 'lucide-react'; // Renamed Search to avoid conflict
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/hooks/use-app';
import { useSidebar } from '@/components/ui/sidebar'; 
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { pageTitles } from '@/data/mocks/page-titles';

// Page titles are now imported from separate file

/**
 * Application header component
 */
export function AppHeader() {
  const pathname = usePathname();
  
  // Safely try to use the useApp hook, but provide fallback values if it fails
  let appContext = { 
    openNewStoryDialog: () => console.warn('AppProvider not found'),
    toggleNotificationsPanel: () => console.warn('AppProvider not found'),
    themeMode: 'light',
    toggleTheme: () => console.warn('AppProvider not found')
  };
  
  try {
    appContext = useApp();
  } catch (error) {
    console.warn('AppHeader: AppProvider not found in context, using default values');
  }
  
  const { openNewStoryDialog, toggleNotificationsPanel, themeMode, toggleTheme } = appContext;
  const { toggleSidebar, isMobile } = useSidebar(); 

  const title = pageTitles[pathname] || 'Story Spark';

  return (
    <header className="h-20 px-4 md:px-6 flex items-center justify-between border-b sticky top-0 z-30 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center">
        {isMobile && (
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
            <Menu size={24} />
          </Button>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-3">
        {pathname === '/saved-stories' && (
          <div className="relative hidden md:block">
            <SearchIconLucide className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search saved stories..."
              className="h-9 w-full rounded-md bg-muted pl-9 md:w-[200px] lg:w-[300px]"
            />
          </div>
        )}

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
          className="group"
        >
          {themeMode === 'light' ? 
            <Moon size={20} className="transition-transform duration-200 ease-out group-hover:animate-icon-hover-gentle-spin" /> : 
            <Sun size={20} className="transition-transform duration-200 ease-out group-hover:animate-icon-hover-gentle-spin" />}
        </Button>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleNotificationsPanel} 
            aria-label="Toggle notifications"
            className="group"
          >
            <Bell size={20} className="transition-transform duration-200 ease-out group-hover:animate-icon-bob" />
          </Button>
          {/* Notification badge with a subtle pulse */}
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground animate-pulse">2</span>
        </div>
        
        <Button 
          onClick={openNewStoryDialog}
          className="btn-hover-effect hidden sm:inline-flex" // Hide on very small screens if needed
        >
          <Plus size={18} className="mr-2" />
          New Story
        </Button>
         <Button 
          onClick={openNewStoryDialog}
          size="icon"
          className="btn-hover-effect sm:hidden inline-flex" // Show only icon on very small screens
          aria-label="New Story"
        >
          <Plus size={18} />
        </Button>
      </div>
    </header>
  );
}
