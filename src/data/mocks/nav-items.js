import { Zap, BookOpen, History, LayoutGrid, Settings } from 'lucide-react';

/**
 * Navigation items for the sidebar
 * @type {Array<{name: string, href: string, icon: React.ComponentType}>}
 */
export const navItems = [
  { name: 'Generate Story', href: '/', icon: Zap },
  { name: 'Saved Stories', href: '/saved-stories', icon: BookOpen },
  { name: 'History', href: '/history', icon: History },
  { name: 'Templates', href: '/templates', icon: LayoutGrid },
  { name: 'Settings', href: '/settings', icon: Settings },
];
