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
// Import schemas from the central schemas.js file
import { GenerateUserStoryInputSchema, GenerateUserStoryOutputSchema } from '../schemas.js';

/**
 * Regenerates a user story based on the provided input.
 * @param {z.infer<typeof GenerateUserStoryInputSchema>} input - The input data matching the schema.
 * @returns {Promise<z.infer<typeof GenerateUserStoryOutputSchema>>} The regenerated user story data.
 */
export async function regenerateUserStory(input) {
  return regenerateUserStoryFlow(input);
}

const regenerateUserStoryPrompt = ai.definePrompt({
  name: 'regenerateUserStoryPrompt',
  input: {schema: GenerateUserStoryInputSchema}, // Use imported schema
  output: {schema: GenerateUserStoryOutputSchema}, // Use imported schema
  prompt: `You are an AI that helps regenerate user stories based on a title and description.

  Title: {{{title}}}
  Description: {{{description}}}

  Generate a user story, acceptance criteria, additional notes, difficulty, priority, and estimated time based on the title and description.
  The user story should follow the format: As a [user type], I want [goal] so that [benefit].
  The acceptance criteria should be a list of criteria that must be met for the user story to be considered complete.
  The additional notes should provide any additional information that may be helpful for the user story.
  Ensure difficulty is one of 'Easy', 'Medium', 'Hard'.
  Ensure priority is one of 'High', 'Medium', 'Low'.
`,
});

const regenerateUserStoryFlow = ai.defineFlow(
  {
    name: 'regenerateUserStoryFlow',
    inputSchema: GenerateUserStoryInputSchema, // Use imported schema
    outputSchema: GenerateUserStoryOutputSchema, // Use imported schema
  },
  async input => {
    const {output} = await regenerateUserStoryPrompt(input);
    // Assuming output is guaranteed by Genkit if no error is thrown
    return output;
  }
); 