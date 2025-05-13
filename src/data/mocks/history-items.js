/**
 * Mock data for initial history items
 * @type {import('@/types').HistoryItem[]}
 */
export const initialHistoryItems = [
  {
    id: "h1",
    title: 'User Authentication',
    description: 'Secure login for users',
    userStory: 'As a user, I want to securely log in to access my personal dashboard.',
    date: 'May 07, 2025',
    timestamp: new Date("2025-05-07").toISOString(),
  },
  {
    id: "h2",
    title: 'Shopping Cart Enhancement',
    description: 'Product recommendations based on cart',
    userStory: 'As a customer, I want to see product recommendations based on items in my cart so that I can discover relevant products more easily.',
    date: 'May 06, 2025',
    timestamp: new Date("2025-05-06").toISOString(),
  },
];
