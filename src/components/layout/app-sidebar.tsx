// src/components/layout/app-sidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Zap, History, LayoutGrid, Settings, Cpu, Bookmark, User } from 'lucide-react';
import { 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  useSidebar
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';

const navItems = [
  { name: 'Generate Story', href: '/', icon: Zap },
  { name: 'Saved Stories', href: '/saved-stories', icon: BookOpen },
  { name: 'History', href: '/history', icon: History },
  { name: 'Templates', href: '/templates', icon: LayoutGrid },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open: sidebarOpen } = useSidebar();
  const { themeMode, openNewStoryDialog, savedStories } = useApp();

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-2 mr-3">
              <BookOpen size={20} className="text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <h1 className="text-xl font-semibold tracking-tight text-foreground">Story Spark</h1>
            )}
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="w-full justify-start"
                  tooltip={!sidebarOpen ? item.name : undefined}
                >
                  <a>
                    <item.icon className={sidebarOpen ? 'mr-3' : 'mx-auto'} size={sidebarOpen ? 18 : 20} />
                    {sidebarOpen && <span>{item.name}</span>}
                    {pathname === item.href && sidebarOpen && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {sidebarOpen && savedStories.length > 0 && (
          <>
            <SidebarSeparator className="my-4" />
            <SidebarGroup>
              <SidebarGroupLabel>Recent Stories</SidebarGroupLabel>
              <SidebarMenu className="max-h-48 overflow-y-auto">
                {savedStories.slice(0,3).map((story) => (
                  <SidebarMenuItem key={story.id}>
                     <Link href={`/saved-stories?storyId=${story.id}`} legacyBehavior passHref>
                       <SidebarMenuButton
                        asChild
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-auto py-1.5"
                        tooltip={!sidebarOpen ? story.title : undefined}
                       >
                        <a>
                          <Bookmark size={14} className="mr-2 text-muted-foreground flex-shrink-0" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-xs font-medium truncate">{story.title}</span>
                            <span className="text-xs text-muted-foreground">{story.date}</span>
                          </div>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="p-2">
        {sidebarOpen && (
          <div className={`p-4 m-2 rounded-xl bg-secondary/50 border border-secondary`}>
            <div className="flex items-start mb-3">
              <div className={`p-2 rounded-lg bg-primary/10`}>
                <Cpu size={18} className="text-primary" />
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-sm text-foreground">AI Powered</h4>
                <p className="text-xs text-muted-foreground">Generate stories with AI</p>
              </div>
            </div>
            <Button 
              className="w-full"
              size="sm"
              onClick={openNewStoryDialog}
            >
              Create New Story
            </Button>
          </div>
        )}
        
        <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} border-t`}>
          <Link href="/settings" className="flex items-center">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://picsum.photos/40/40?grayscale" alt="User Avatar" data-ai-hint="profile person" />
              <AvatarFallback>TU</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">Thomas User</p>
                <p className="text-xs text-muted-foreground">Product Manager</p>
              </div>
            )}
          </Link>
        </div>
      </SidebarFooter>
    </>
  );
}
