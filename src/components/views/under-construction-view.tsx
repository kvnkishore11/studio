
// src/components/views/under-construction-view.tsx
"use client";

import { HardHat } from 'lucide-react'; // Changed icon to HardHat for better relevance
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/hooks/use-app';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface UnderConstructionViewProps {
  title: string;
  message: string;
}

export function UnderConstructionView({ title, message }: UnderConstructionViewProps) {
  const { themeMode } = useApp();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4 md:p-8 animate-fadeIn">
      <Card className="w-full max-w-lg shadow-xl"> {/* Increased max-width and added shadow */}
        <CardHeader className="pt-8 md:pt-10">
          <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 md:mb-8 mx-auto">
            {/* Gradient animated ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-accent to-purple-500 opacity-30 animate-pulse blur-lg"></div>
            <div className="absolute inset-1 rounded-full bg-background"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <HardHat size={themeMode === 'light' ? 60 : 56} className="animate-icon-bob text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-8 md:pb-10">
          <p className="text-lg md:text-xl max-w-md mx-auto mb-10 text-muted-foreground">{message}</p>
          <Link href="/" passHref>
            <Button 
              size="lg"
              className="px-8 py-4 text-base btn-hover-effect"
            >
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
       <p className="mt-12 text-sm text-muted-foreground">
        Story Spark &copy; {new Date().getFullYear()} - We&apos;re building something great!
      </p>
    </div>
  );
}
