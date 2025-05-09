// src/components/layout/app-header.tsx
"use client";

import { usePathname } from 'next/navigation';
import { Menu, Plus, Bell, Moon, Sun, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/hooks/use-app';
import { useSidebar } from '@/components/ui/sidebar'; // Use the sidebar hook
import Link from 'next/link';

const pageTitles: { [key: string]: string } = {
  '/': 'Generate Story',
  '/saved-stories': 'Saved Stories',
  '/history': 'History',
  '/templates': 'Templates',
  '/settings': 'Settings',
};

export function AppHeader() {
  const pathname = usePathname();
  const { openNewStoryDialog, toggleNotificationsPanel, themeMode, toggleTheme } = useApp();
  const { toggleSidebar, isMobile } = useSidebar(); // Get toggleSidebar and isMobile from useSidebar

  const title = pageTitles[pathname] || 'Story Spark';

  return (
    <header className="h-20 px-4 md:px-6 flex items-center justify-between border-b sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
      
      <div className="flex items-center space-x-3 md:space-x-4">
        {pathname === '/saved-stories' && (
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search saved stories..."
              className="h-9 w-full rounded-md bg-muted pl-9 md:w-[200px] lg:w-[300px]"
              // Add value and onChange for search functionality if needed
            />
          </div>
        )}

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
        
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={toggleNotificationsPanel} aria-label="Toggle notifications">
            <Bell size={20} />
          </Button>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">2</span>
        </div>
        
        <Button 
          onClick={openNewStoryDialog}
          className="btn-hover-effect"
        >
          <Plus size={18} className="mr-2" />
          New Story
        </Button>
      </div>
    </header>
  );
}
