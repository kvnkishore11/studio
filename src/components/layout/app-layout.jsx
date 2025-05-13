// src/components/layout/app-layout.jsx
"use client";

import React from 'react';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar'; // Using existing sidebar

export function AppLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
            <div className="flex flex-1 flex-col overflow-hidden">
              <AppHeader />
              <main className="flex-1 overflow-auto p-6 md:p-8">
                {children}
              </main>
            </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
