import { BookOpen, RocketIcon } from 'lucide-react';
import { cn } from '@/lib/utils.js';

/**
 * Application loader component.
 * @param {object} props - Component props.
 * @param {'light' | 'dark'} [props.themeMode='light'] - The theme mode to apply specific styles.
 */
export function AppLoader({ themeMode = 'light' }) {
  return (
    <div className={cn(
      "flex items-center justify-center h-screen w-full",
      themeMode === 'light' 
        ? 'bg-gradient-to-br from-white via-purple-50 to-indigo-100' 
        : 'bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950'
    )}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-bounce mb-4">
          <RocketIcon className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Story Genius</h1>
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
} 