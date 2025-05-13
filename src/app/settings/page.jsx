"use client";

import React from 'react';
import { StorySparkApp } from "@/components/story-spark-app.jsx";
import { Suspense } from "react";
import { SettingsView } from "@/components/views/settings-view";

export default function SettingsPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsView />
      </Suspense>
    </StorySparkApp>
  );
}