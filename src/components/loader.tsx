// src/components/loader.tsx
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  themeMode?: 'light' | 'dark';
}

export function AppLoader({ themeMode = 'light' }: LoaderProps) {
  return (
    <div className={cn(
      "flex items-center justify-center h-screen w-full",
      themeMode === 'light' 
        ? 'bg-gradient-to-br from-white via-purple-50 to-indigo-100' 
        : 'bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950'
    )}>
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={48} className="text-primary animate-pulse-strong" />
          </div>
          <div className="absolute inset-0 border-t-4 border-primary/50 rounded-full animate-rotate"></div>
        </div>
        <div className={cn(
          "text-3xl font-bold mb-4 tracking-tight",
          themeMode === 'light' ? 'text-gray-900' : 'text-white'
        )}>
          Story Spark
        </div>
        <div className={cn(
          "text-lg",
          themeMode === 'light' ? 'text-primary' : 'text-primary/70'
        )}>
          Your AI story assistant
        </div>
        <div className="loader-dots flex mt-6">
          <div className="w-3 h-3 bg-primary rounded-full mr-1.5"></div>
          <div className="w-3 h-3 bg-primary rounded-full mr-1.5"></div>
          <div className="w-3 h-3 bg-primary rounded-full mr-1.5"></div>
          <div className="w-3 h-3 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
