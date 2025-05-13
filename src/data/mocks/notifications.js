/**
 * Mock notifications data for demonstration
 * @type {Array<{id: string, title: string, message: string, time: string, isNew: boolean}>}
 */
export const notificationsMock = [
  { 
    id: '1',
    title: 'Story Generated', 
    message: 'Your "User Authentication" story has been successfully generated.',
    time: '5 minutes ago',
    isNew: true
  },
  { 
    id: '2',
    title: 'Template Updated', 
    message: 'The "Basic User Story" template has been updated with new fields.',
    time: '2 hours ago',
    isNew: true
  },
  { 
    id: '3',
    title: 'Story Reminder', 
    message: 'You have 3 unfinished stories. Would you like to continue working on them?',
    time: 'Yesterday',
    isNew: false
  },
];
