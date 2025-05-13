// src/app/templates/page.jsx
import { StorySparkApp } from "@/components/story-spark-app";
import { UnderConstructionView } from "@/components/views/under-construction-view";
import { AppLoader } from "@/components/loader";
import { Suspense } from "react";

export default function TemplatesPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<AppLoader />}>
        <UnderConstructionView 
          title="Templates"
          message="Custom templates are coming soon. You\'ll be able to create and use your own story templates here."
        />
      </Suspense>
    </StorySparkApp>
  );
} 