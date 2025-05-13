"use client";

import React from 'react';
import { StorySparkApp } from "@/components/story-spark-app.jsx";
import { Suspense } from "react";

export default function SavedStoriesPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-full p-8">
          <h1 className="text-4xl font-bold mb-6">Saved Stories</h1>
          <p className="text-lg mb-8">Your saved stories will appear here.</p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">You don't have any saved stories yet.</p>
          </div>
        </div>
      </Suspense>
    </StorySparkApp>
  );
}