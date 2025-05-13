'use server';
/**
 * @fileOverview AI agent that generates a user story, acceptance criteria, and additional details from a title and description.
 *
 * - generateUserStory - A function that handles the user story generation process.
 * - GenerateUserStoryInputSchema - Zod schema for the input.
 * - GenerateUserStoryOutputSchema - Zod schema for the output.
 */

import {ai} from '@/ai/genkit.js'; // Updated import path
import {z} from 'genkit';

export const GenerateUserStoryInputSchema = z.object({
  title: z.string().describe('The title of the feature.'),
  description: z.string().describe('A brief description of the feature.'),
});
// Removed TS type export: GenerateUserStoryInput

export const GenerateUserStoryOutputSchema = z.object({
  userStory: z.string().describe('A complete user story.'),
  acceptanceCriteria: z.array(z.string()).describe('Acceptance criteria for the user story.'),
  additionalNotes: z.string().describe('Additional notes or details about the feature.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty of implementing the feature.'),
  priority: z.enum(['High', 'Medium', 'Low']).describe('The priority of the feature.'),
  estimatedTime: z.string().describe('Estimated time to complete the feature.'),
});
// Removed TS type export: GenerateUserStoryOutput

/**
 * Generates a user story based on the provided input.
 * @param {z.infer<GenerateUserStoryInputSchema>} input - The input data matching the schema.
 * @returns {Promise<z.infer<GenerateUserStoryOutputSchema>>} The generated user story data.
 */
export async function generateUserStory(input) {
  return generateUserStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUserStoryPrompt',
  input: {schema: GenerateUserStoryInputSchema},
  output: {schema: GenerateUserStoryOutputSchema},
  prompt: `You are a product manager expert in writing user stories.

  Based on the title and description provided, generate a complete user story, acceptance criteria, additional notes, difficulty, priority and estimated time.

  Title: {{{title}}}
  Description: {{{description}}}

  The output should be a JSON object with the following keys:
  - userStory: A complete user story.
  - acceptanceCriteria: An array of acceptance criteria for the user story.
  - additionalNotes: Additional notes or details about the feature.
  - difficulty: The difficulty of implementing the feature (Easy, Medium, Hard).
  - priority: The priority of the feature (High, Medium, Low).
  - estimatedTime: Estimated time to complete the feature.
  `,
});

const generateUserStoryFlow = ai.defineFlow(
  {
    name: 'generateUserStoryFlow',
    inputSchema: GenerateUserStoryInputSchema,
    outputSchema: GenerateUserStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Assuming output is guaranteed by Genkit if no error is thrown
    // If output could be null/undefined, add appropriate checks.
    return output;
  }
); 