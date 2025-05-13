// src/app/history/page.jsx
import { StorySparkApp } from "@/components/story-spark-app";
import { HistoryView } from "@/components/views/history-view";
import { AppLoader } from "@/components/loader";
import { Suspense } from "react";

export default function HistoryPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<AppLoader />}>
        <HistoryView />
      </Suspense>
    </StorySparkApp>
  );
} 