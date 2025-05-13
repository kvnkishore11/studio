'use server';
/**
 * @fileOverview Regenerates a user story based on the provided title and description.
 *
 * - regenerateUserStory - A function that regenerates a user story.
 * - RegenerateUserStoryInputSchema - Zod schema for the input.
 * - RegenerateUserStoryOutputSchema - Zod schema for the output.
 */

import {ai} from '@/ai/genkit.js'; // Updated import path
import {z} from 'genkit';

export const RegenerateUserStoryInputSchema = z.object({
  title: z.string().describe('The title of the user story.'),
  description: z.string().describe('A brief description of the user story.'),
});
// Removed TS type export: RegenerateUserStoryInput

export const RegenerateUserStoryOutputSchema = z.object({
  userStory: z.string().describe('The generated user story.'),
  acceptanceCriteria: z.array(z.string()).describe('Acceptance criteria for the user story.'),
  additionalNotes: z.string().describe('Additional notes or details for the user story.'),
  difficulty: z.string().describe('The difficulty level of the user story.'), // Consider z.enum like in generate-user-story
  priority: z.string().describe('The priority of the user story.'), // Consider z.enum like in generate-user-story
  estimatedTime: z.string().describe('The estimated time to complete the user story.'),
});
// Removed TS type export: RegenerateUserStoryOutput

/**
 * Regenerates a user story based on the provided input.
 * @param {z.infer<RegenerateUserStoryInputSchema>} input - The input data matching the schema.
 * @returns {Promise<z.infer<RegenerateUserStoryOutputSchema>>} The regenerated user story data.
 */
export async function regenerateUserStory(input) {
  return regenerateUserStoryFlow(input);
}

const regenerateUserStoryPrompt = ai.definePrompt({
  name: 'regenerateUserStoryPrompt',
  input: {schema: RegenerateUserStoryInputSchema},
  output: {schema: RegenerateUserStoryOutputSchema},
  prompt: `You are an AI that helps regenerate user stories based on a title and description.

  Title: {{{title}}}
  Description: {{{description}}}

  Generate a user story, acceptance criteria, additional notes, difficulty, priority, and estimated time based on the title and description.
  The user story should follow the format: As a [user type], I want [goal] so that [benefit].
  The acceptance criteria should be a list of criteria that must be met for the user story to be considered complete.
  The additional notes should provide any additional information that may be helpful for the user story.
`,
});

const regenerateUserStoryFlow = ai.defineFlow(
  {
    name: 'regenerateUserStoryFlow',
    inputSchema: RegenerateUserStoryInputSchema,
    outputSchema: RegenerateUserStoryOutputSchema,
  },
  async input => {
    const {output} = await regenerateUserStoryPrompt(input);
    // Assuming output is guaranteed by Genkit if no error is thrown
    return output;
  }
); 