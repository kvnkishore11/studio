// src/components/views/generate-story-view.tsx
"use client";

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { MessageSquare, Cpu, Save, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HowItWorksItem {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
  animationClass: string;
}

const exampleStories = [
  { 
    title: 'User Authentication System',
    story: 'As a user, I want to securely log in to access my personal dashboard.',
    date: 'May 08, 2025',
  },
  { 
    title: 'Product Search Functionality',
    story: 'As a customer, I want to search for products by name or category.',
    date: 'May 07, 2025',
  },
  { 
    title: 'Password Reset Feature',
    story: 'As a forgetful user, I want to reset my password easily through email.',
    date: 'May 06, 2025',
  },
];

const howItWorksItems: HowItWorksItem[] = [
  { 
    step: 1,
    title: 'Describe Your Feature', 
    description: 'Enter a title and brief description of the feature you want to develop.',
    icon: <MessageSquare size={30} />,
    animationClass: 'animate-icon-sway',
  },
  { 
    step: 2,
    title: 'AI Generates Story', 
    description: 'Our AI transforms your description into a complete user story with acceptance criteria.',
    icon: <Cpu size={30} />,
    animationClass: 'animate-icon-pulse',
  },
  { 
    step: 3,
    title: 'Review & Save', 
    description: 'Review the generated story, make any edits if needed, and save it to your collection.',
    icon: <Save size={30} />,
    animationClass: 'animate-icon-bob',
  },
];

export function GenerateStoryView() {
  const { openNewStoryDialog } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % howItWorksItems.length);
    }, 5000); // Change step every 5 seconds
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const currentItem = howItWorksItems[currentStepIndex];

  return (
    <div className="h-full flex flex-col space-y-8 md:space-y-12 animate-fadeIn">
      <div className="text-center max-w-4xl mx-auto pt-8 md:pt-12 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-foreground">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            AI-Powered User Story Generator
          </span>
        </h1>
        <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto text-muted-foreground">
          Turn your ideas into complete user stories with acceptance criteria in seconds. Just describe what you need, and our AI will do the rest.
        </p>
        
        <div className="flex justify-center my-8 md:my-10">
          <Button 
            size="lg"
            className="px-8 py-7 text-lg font-medium btn-hover-effect shadow-lg hover:shadow-primary/30"
            onClick={openNewStoryDialog}
          >
            <Zap size={20} className="mr-3" />
            Generate a User Story
          </Button>
        </div>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden"> {/* Added overflow-hidden for cleaner animation boundaries */}
          <div 
            className="flex flex-col items-center justify-center p-6 text-center min-h-[200px] md:min-h-[220px] animate-fadeIn" 
            key={currentStepIndex} // Re-trigger animation on step change
          >
            <div className={cn(
              "mx-auto flex items-center justify-center w-16 h-16 rounded-full mb-5 bg-primary/10 text-primary transform transition-all duration-500 ease-in-out hover:scale-110",
              currentItem.animationClass // Apply the animation class of the current item
            )}>
              {currentItem.icon}
            </div>
            <h4 className="text-xl font-bold mb-2 text-foreground">{currentItem.title}</h4>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">{currentItem.description}</p>
          </div>
          <div className="flex justify-center space-x-3 mt-4 pb-4">
            {howItWorksItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStepIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  currentStepIndex === index ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
         <CardHeader>
          <CardTitle className="text-2xl">Story Examples</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>User Story</TableHead>
                  <TableHead>Generated On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exampleStories.map((example, index) => (
                  <TableRow key={index} className="hover:bg-muted/50 transition-colors duration-150">
                    <TableCell className="font-medium text-foreground">{example.title}</TableCell>
                    <TableCell className="text-muted-foreground">{example.story}</TableCell>
                    <TableCell className="text-muted-foreground">{example.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="rounded-2xl p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
              <Image src="https://picsum.photos/64/64?random=1" alt="AI illustration" width={64} height={64} className="rounded-2xl" data-ai-hint="technology abstract" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 text-foreground">Ready to try it yourself?</h3>
            <p className="mb-6 md:mb-0 text-muted-foreground">
              Generate your own user stories with AI and manage them all in one place.
            </p>
          </div>
          
          <div className="flex-shrink-0 mt-4 md:mt-0">
            <Button 
              size="lg"
              className="px-6 py-3 font-medium shadow-lg hover:shadow-primary/30"
              onClick={openNewStoryDialog}
            >
              Start Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
