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
import { withRetry, logError, ErrorType, getUserFriendlyErrorMessage } from '@/lib/error-utils';

/**
 * Regenerates a user story based on the provided input.
 * @param {z.infer<typeof GenerateUserStoryInputSchema>} input - The input data matching the schema.
 * @returns {Promise<{success: boolean, data?: z.infer<typeof GenerateUserStoryOutputSchema>, error?: {type: string, message: string}}>} The result object with regenerated story data or error information.
 */
export async function regenerateUserStory(input) {
  try {
    // Validate input
    if (!input || !input.title || !input.description) {
      return {
        success: false,
        error: {
          type: ErrorType.VALIDATION,
          message: 'Title and description are required.'
        }
      };
    }

    // Use retry logic for the AI operation
    const result = await withRetry(
      async () => await regenerateUserStoryFlow(input),
      {
        maxAttempts: 3,
        shouldRetry: (error) => {
          // Don't retry validation errors
          const errorType = error.type || ErrorType.UNKNOWN;
          return errorType !== ErrorType.VALIDATION;
        }
      }
    );

    return {
      success: true,
      data: result
    };
  } catch (error) {
    logError('regenerateUserStory', error);
    return {
      success: false,
      error: {
        type: error.type || ErrorType.UNKNOWN,
        message: getUserFriendlyErrorMessage(error)
      }
    };
  }
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
    try {
      const {output} = await regenerateUserStoryPrompt(input);
      
      // Validate output
      if (!output) {
        throw new Error('AI returned empty response');
      }
      
      // Validate required fields
      if (!output.userStory || !output.acceptanceCriteria || !output.difficulty || !output.priority) {
        throw new Error('AI response missing required fields');
      }
      
      return output;
    } catch (error) {
      // Add context to the error
      error.context = 'regenerateUserStoryFlow';
      throw error;
    }
  }
); 