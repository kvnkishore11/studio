import { StorySparkApp } from "@/components/story-spark-app";
import { GenerateStoryView } from "@/components/views/generate-story-view";
import { AppLoader } from "@/components/loader";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<AppLoader />}>
        <GenerateStoryView />
      </Suspense>
    </StorySparkApp>
  );
} 