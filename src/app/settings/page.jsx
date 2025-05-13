// src/app/settings/page.jsx
import { StorySparkApp } from "@/components/story-spark-app";
import { UnderConstructionView } from "@/components/views/under-construction-view";
import { AppLoader } from "@/components/loader";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <StorySparkApp>
      <Suspense fallback={<AppLoader />}>
        <UnderConstructionView 
          title="Settings"
          message="Personalization options are coming soon. You\'ll be able to customize your workspace preferences here."
        />
      </Suspense>
    </StorySparkApp>
  );
} 