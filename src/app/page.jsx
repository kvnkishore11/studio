"use client";

import React from 'react';
import { StorySparkApp } from "@/components/story-spark-app.jsx";
import { GenerateStoryView } from "@/components/views/generate-story-view.jsx";
import { Suspense } from "react";

export default function HomePage() {
  console.log('Rendering HomePage component');
  return (
    <StorySparkApp>
      <Suspense fallback={<div>Loading...</div>}>
        <GenerateStoryView />
      </Suspense>
    </StorySparkApp>
  );
} 