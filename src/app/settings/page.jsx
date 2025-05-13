"use client";

import React from 'react';
import { StorySparkApp } from "@/components/story-spark-app.jsx";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-full p-8 flex flex-col items-center justify-center animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-purple-600 dark:to-purple-400">
              Settings & Preferences
            </span>
          </h1>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full mb-8 animate-slideUp delay-100 stagger-children">
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                App Settings
              </h2>
              <p className="text-muted-foreground mb-4 pl-11">Customize the application behavior and appearance.</p>
              <div className="p-3 bg-secondary/30 rounded-lg text-center">
                <p className="text-primary/80 dark:text-primary/90 text-sm">Coming Soon</p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                User Profile
              </h2>
              <p className="text-muted-foreground mb-4 pl-11">Manage your account information and preferences.</p>
              <div className="p-3 bg-secondary/30 rounded-lg text-center">
                <p className="text-primary/80 dark:text-primary/90 text-sm">Coming Soon</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg p-8 max-w-3xl w-full border border-border animate-slideUp delay-200">
            <h2 className="text-2xl font-semibold mb-4 text-center">Settings Panel Under Construction</h2>
            <p className="text-lg mb-6 text-muted-foreground text-center">We're building a comprehensive settings panel to give you full control over your Story Spark experience.</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center p-3 bg-secondary/20 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary text-xs font-medium">✓</span>
                  </div>
                  <p className="text-sm">Theme customization</p>
                </div>
                
                <div className="flex items-center p-3 bg-secondary/20 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary text-xs font-medium">✓</span>
                  </div>
                  <p className="text-sm">Notification preferences</p>
                </div>
                
                <div className="flex items-center p-3 bg-secondary/20 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary text-xs font-medium">✓</span>
                  </div>
                  <p className="text-sm">AI behavior settings</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center p-3 bg-secondary/20 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary text-xs font-medium">✓</span>
                  </div>
                  <p className="text-sm">Export format options</p>
                </div>
                
                <div className="flex items-center p-3 bg-secondary/20 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary text-xs font-medium">✓</span>
                  </div>
                  <p className="text-sm">Integration preferences</p>
                </div>
                
                <div className="flex items-center p-3 bg-secondary/20 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary text-xs font-medium">✓</span>
                  </div>
                  <p className="text-sm">Keyboard shortcuts</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 text-center">
              <p className="text-primary dark:text-primary/90 font-medium">Check back soon for the complete settings experience!</p>
            </div>
          </div>
        </div>
      </Suspense>
    </StorySparkApp>
  );
} 