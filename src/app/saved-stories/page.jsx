import { StorySparkApp } from "@/components/story-spark-app";
import { SavedStoriesView } from "@/components/views/saved-stories-view";
import { AppLoader } from "@/components/loader";
import { Suspense } from "react";

export default function SavedStoriesPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<AppLoader />}>
        <SavedStoriesView />
      </Suspense>
    </StorySparkApp>
  );
} 