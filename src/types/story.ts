// src/types/story.ts
import type { GenerateUserStoryOutput } from "@/ai/flows/generate-user-story";

export interface GeneratedStoryData extends GenerateUserStoryOutput {
  id: string;
  title: string;
  timestamp: string; // ISO string
}

export interface SavedStory extends GeneratedStoryData {
  date: string; // Formatted date string for display, e.g., "May 08, 2025"
}

export interface HistoryItem {
  id: string;
  title: string;
  description: string;
  userStory: string;
  date: string; // Formatted date string
  timestamp: string; // ISO string
}
