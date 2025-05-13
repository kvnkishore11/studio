"use client";

import React from 'react';
import { StorySparkApp } from "@/components/story-spark-app.jsx";
import { Suspense } from "react";
import { HistoryView } from "@/components/views/history-view";

export default function HistoryPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-full p-8">
          <HistoryView />
        </div>
      </Suspense>
    </StorySparkApp>
  );
}