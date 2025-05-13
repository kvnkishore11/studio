import { z } from 'genkit';

export const GenerateUserStoryInputSchema = z.object({
  title: z.string().describe('The title of the feature.'),
  description: z.string().describe('A brief description of the feature.'),
});

export const GenerateUserStoryOutputSchema = z.object({
  userStory: z.string().describe('A complete user story.'),
  acceptanceCriteria: z.array(z.string()).describe('Acceptance criteria for the user story.'),
  additionalNotes: z.string().describe('Additional notes or details about the feature.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty of implementing the feature.'),
  priority: z.enum(['High', 'Medium', 'Low']).describe('The priority of the feature.'),
  estimatedTime: z.string().describe('Estimated time to complete the feature.'),
}); 