'use client';

/**
 * Error types for AI operations
 * @readonly
 * @enum {string}
 */
export const ErrorType = {
  NETWORK: 'network',
  TIMEOUT: 'timeout',
  API: 'api',
  VALIDATION: 'validation',
  UNKNOWN: 'unknown',
};

/**
 * Maps error types to user-friendly messages
 * @readonly
 * @type {Object.<string, string>}
 */
export const ErrorMessages = {
  [ErrorType.NETWORK]: 'Network error. Please check your internet connection and try again.',
  [ErrorType.TIMEOUT]: 'The operation timed out. Please try again later.',
  [ErrorType.API]: 'The AI service is currently unavailable. Please try again later.',
  [ErrorType.VALIDATION]: 'Invalid input. Please check your input and try again.',
  [ErrorType.UNKNOWN]: 'An unexpected error occurred. Please try again later.',
};

/**
 * Determines the type of error based on the error object
 * @param {Error} error - The error object
 * @returns {ErrorType} The type of error
 */
export function getErrorType(error) {
  if (!error) return ErrorType.UNKNOWN;
  
  if (error.name === 'AbortError' || error.message?.includes('timeout')) {
    return ErrorType.TIMEOUT;
  }
  
  if (error.name === 'TypeError' && 
      (error.message?.includes('fetch') || error.message?.includes('network'))) {
    return ErrorType.NETWORK;
  }
  
  if (error.status >= 400 && error.status < 500) {
    return ErrorType.VALIDATION;
  }
  
  if (error.status >= 500) {
    return ErrorType.API;
  }
  
  return ErrorType.UNKNOWN;
}

/**
 * Gets a user-friendly error message based on the error object
 * @param {Error} error - The error object
 * @returns {string} A user-friendly error message
 */
export function getUserFriendlyErrorMessage(error) {
  const errorType = getErrorType(error);
  return ErrorMessages[errorType] || ErrorMessages[ErrorType.UNKNOWN];
}

/**
 * Logs an error with additional context
 * @param {string} context - The context where the error occurred
 * @param {Error} error - The error object
 */
export function logError(context, error) {
  console.error(`Error in ${context}:`, error);
  console.error('Error type:', getErrorType(error));
  console.error('Stack trace:', error.stack);
}

/**
 * Maximum number of retry attempts
 * @type {number}
 */
export const MAX_RETRY_ATTEMPTS = 3;

/**
 * Base delay for exponential backoff in milliseconds
 * @type {number}
 */
export const BASE_RETRY_DELAY = 1000;

/**
 * Executes a function with retry logic using exponential backoff
 * @template T
 * @param {function(): Promise<T>} fn - The function to execute
 * @param {Object} options - Retry options
 * @param {number} [options.maxAttempts=MAX_RETRY_ATTEMPTS] - Maximum number of retry attempts
 * @param {number} [options.baseDelay=BASE_RETRY_DELAY] - Base delay for exponential backoff in milliseconds
 * @param {function(Error): boolean} [options.shouldRetry] - Function to determine if retry should be attempted
 * @returns {Promise<T>} The result of the function
 */
export async function withRetry(fn, options = {}) {
  const maxAttempts = options.maxAttempts || MAX_RETRY_ATTEMPTS;
  const baseDelay = options.baseDelay || BASE_RETRY_DELAY;
  const shouldRetry = options.shouldRetry || 
    (error => getErrorType(error) !== ErrorType.VALIDATION);
  
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 100;
      console.warn(`Attempt ${attempt} failed, retrying in ${Math.round(delay)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}
