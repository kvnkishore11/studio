// src/components/views/under-construction-view.tsx
"use client";

import { Settings } from 'lucide-react'; // Using Settings as a generic icon
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/hooks/use-app';
import Link from 'next/link';

interface UnderConstructionViewProps {
  title: string;
  message: string;
}

export function UnderConstructionView({ title, message }: UnderConstructionViewProps) {
  const { themeMode } = useApp();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4 md:p-8 animate-fadeIn">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8 mx-auto">
            <div className="absolute inset-0 rounded-full opacity-20 animate-pulse-strong bg-gradient-to-r from-primary to-accent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Settings size={themeMode === 'light' ? 64 : 56} className="animate-rotate text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg md:text-xl max-w-lg mb-8 text-muted-foreground">{message}</p>
          <Link href="/" passHref>
            <Button 
              size="lg"
              className="px-6 py-3 btn-hover-effect"
            >
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
