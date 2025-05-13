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
// Import schemas from the new file
import { GenerateUserStoryInputSchema, GenerateUserStoryOutputSchema } from '../schemas.js';
import { withRetry, logError, ErrorType, getUserFriendlyErrorMessage } from '@/lib/error-utils';

/**
 * Generates a user story based on the provided input.
 * @param {z.infer<typeof GenerateUserStoryInputSchema>} input - The input data matching the schema.
 * @returns {Promise<{success: boolean, data?: z.infer<typeof GenerateUserStoryOutputSchema>, error?: {type: string, message: string}}>} The result object with generated story data or error information.
 */
export async function generateUserStory(input) {
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
      async () => await generateUserStoryFlow(input),
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
    logError('generateUserStory', error);
    return {
      success: false,
      error: {
        type: error.type || ErrorType.UNKNOWN,
        message: getUserFriendlyErrorMessage(error)
      }
    };
  }
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
    try {
      const {output} = await prompt(input);
      
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
      error.context = 'generateUserStoryFlow';
      throw error;
    }
  }
); 