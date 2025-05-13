/**
 * Mock data for initial saved stories
 * @type {import('@/types').SavedStory[]}
 */
export const initialSavedStories = [
  {
    id: "1",
    title: "User Authentication System",
    userStory: "As a user, I want to securely log in to access my personal dashboard.",
    acceptanceCriteria: ["Criteria 1", "Criteria 2"],
    additionalNotes: "Consider 2FA.",
    difficulty: "Medium",
    priority: "High",
    estimatedTime: "3-5 days",
    date: "May 08, 2025",
    timestamp: new Date("2025-05-08").toISOString(),
  },
  {
    id: "2",
    title: "Product Search Functionality",
    userStory: "As a customer, I want to search for products by name or category.",
    acceptanceCriteria: ["Criteria A", "Criteria B"],
    additionalNotes: "Include filters.",
    difficulty: "Medium",
    priority: "Medium",
    estimatedTime: "5-7 days",
    date: "May 07, 2025",
    timestamp: new Date("2025-05-07").toISOString(),
  },
];
