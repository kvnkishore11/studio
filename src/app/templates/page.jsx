"use client";

import React from 'react';
import { StorySparkApp } from "@/components/story-spark-app.jsx";
import { Suspense } from "react";

export default function TemplatesPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-full p-8 flex flex-col items-center justify-center animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-purple-600 dark:to-purple-400">
              Story Templates
            </span>
          </h1>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full mb-8 animate-slideUp delay-100">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-blue-800 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h2 className="text-xl font-semibold mb-3">Feature Templates</h2>
              <p className="text-muted-foreground mb-4">Standardized templates for common feature requests and user stories.</p>
              <div className="p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg text-center">
                <p className="text-blue-700 dark:text-blue-300 text-sm">Coming Soon</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-purple-800 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <h2 className="text-xl font-semibold mb-3">Custom Templates</h2>
              <p className="text-muted-foreground mb-4">Create and save your own templates for recurring story types.</p>
              <div className="p-3 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg text-center">
                <p className="text-purple-700 dark:text-purple-300 text-sm">Coming Soon</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg p-8 max-w-3xl w-full text-center border border-border animate-slideUp delay-200">
            <h2 className="text-2xl font-semibold mb-4">Template Library Under Construction</h2>
            <p className="text-lg mb-6 text-muted-foreground">Our template system is being developed to help you create consistent, high-quality user stories faster.</p>
            
            <div className="flex flex-col space-y-4 max-w-md mx-auto mb-6">
              <div className="flex items-center p-3 bg-secondary/30 rounded-lg text-left">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">1</span>
                </div>
                <p className="text-sm">Choose from pre-built templates for common story patterns</p>
              </div>
              
              <div className="flex items-center p-3 bg-secondary/30 rounded-lg text-left">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">2</span>
                </div>
                <p className="text-sm">Customize templates to match your team's requirements</p>
              </div>
              
              <div className="flex items-center p-3 bg-secondary/30 rounded-lg text-left">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">3</span>
                </div>
                <p className="text-sm">Save your own templates for future use</p>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <p className="text-primary dark:text-primary/90 font-medium">Check back soon for our template library launch!</p>
            </div>
          </div>
        </div>
      </Suspense>
    </StorySparkApp>
  );
} 