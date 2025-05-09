
// src/components/views/generate-story-view.tsx
"use client";

import type { ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import { MessageSquare, Cpu, Save, Zap, ArrowRight } from 'lucide-react';
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
  animationClass?: string; // Made optional, will apply animation based on active state
  baseBg: string;
  activeBg: string;
  iconBaseBg: string;
  iconActiveBg: string;
  iconColor: string;
  activeIconColor: string;
  activeBorderColor: string;
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
    icon: <MessageSquare size={36} />,
    animationClass: 'animate-icon-sway',
    baseBg: 'bg-card',
    activeBg: 'bg-primary/5',
    iconBaseBg: 'bg-muted',
    iconActiveBg: 'bg-primary',
    iconColor: 'text-muted-foreground',
    activeIconColor: 'text-primary-foreground',
    activeBorderColor: 'border-primary/40',
  },
  { 
    step: 2,
    title: 'AI Generates Story', 
    description: 'Our AI transforms your input into a complete user story with acceptance criteria and details.',
    icon: <Cpu size={36} />,
    animationClass: 'animate-icon-pulse',
    baseBg: 'bg-card',
    activeBg: 'bg-primary/5',
    iconBaseBg: 'bg-muted',
    iconActiveBg: 'bg-primary',
    iconColor: 'text-muted-foreground',
    activeIconColor: 'text-primary-foreground',
    activeBorderColor: 'border-primary/40',
  },
  { 
    step: 3,
    title: 'Review & Save', 
    description: 'Review the generated story, make any edits if needed, and save it to your collection.',
    icon: <Save size={36} />,
    animationClass: 'animate-icon-bob',
    baseBg: 'bg-card',
    activeBg: 'bg-primary/5',
    iconBaseBg: 'bg-muted',
    iconActiveBg: 'bg-primary',
    iconColor: 'text-muted-foreground',
    activeIconColor: 'text-primary-foreground',
    activeBorderColor: 'border-primary/40',
  },
];

export function GenerateStoryView() {
  const { openNewStoryDialog, themeMode } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false); // To pause auto-cycle on hover/click

  useEffect(() => {
    if (isInteracting) return; // Don't auto-cycle if user is interacting

    const timer = setInterval(() => {
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % howItWorksItems.length);
    }, 4000); // Change step every 4 seconds
    return () => clearInterval(timer);
  }, [isInteracting]);

  return (
    <div className="h-full flex flex-col space-y-10 md:space-y-16 animate-fadeIn">
      <div className="text-center max-w-4xl mx-auto pt-10 md:pt-16 pb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter text-foreground">
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-purple-600 dark:to-purple-400">
            AI-Powered User Stories
          </span>
        </h1>
        <p className="text-lg md:text-xl font-normal mb-10 max-w-2xl mx-auto text-muted-foreground">
          Effortlessly transform your feature ideas into comprehensive user stories, complete with acceptance criteria, in mere seconds. Just describe your vision, and let our intelligent AI craft the narrative.
        </p>
        
        <div className="flex justify-center my-8 md:my-12">
          <Button 
            size="lg"
            className="px-10 py-8 text-lg font-semibold btn-hover-effect shadow-2xl shadow-primary/20 hover:shadow-primary/40"
            onClick={openNewStoryDialog}
          >
            <Zap size={22} className="mr-3" />
            Generate Your First Story
          </Button>
        </div>
      </div>
      
      <section 
        className="animate-slideInUp" 
        style={{animationDelay: '0.2s'}}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">How It Works</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          Creating user stories is a simple, three-step process with Story Spark.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {howItWorksItems.map((item, index) => (
            <div
              key={item.step}
              className={cn(
                "flex flex-col items-center p-6 md:p-8 text-center rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-350 ease-in-out transform hover:-translate-y-1.5 border-2",
                index === currentStepIndex
                  ? `${item.activeBg} ${item.activeBorderColor} scale-105`
                  : `${item.baseBg} border-transparent opacity-80 hover:opacity-100`
              )}
              onClick={() => setCurrentStepIndex(index)}
            >
              <div className={cn(
                "mb-6 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-350",
                index === currentStepIndex ? `${item.iconActiveBg} ${item.activeIconColor} shadow-lg ${item.animationClass}` : `${item.iconBaseBg} ${item.iconColor}`
              )}>
                {item.icon}
              </div>
              <h4 className={cn(
                "text-xl md:text-2xl font-semibold mb-3",
                index === currentStepIndex ? (themeMode === 'dark' ? 'text-primary' : 'text-primary') : "text-foreground"
              )}>{item.title}</h4>
              <p className={cn(
                "text-sm md:text-base max-w-xs mx-auto leading-relaxed",
                index === currentStepIndex ? "text-foreground/80" : "text-muted-foreground"
              )}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      <Card className="shadow-xl card-hover animate-slideInUp" style={{animationDelay: '0.4s'}}>
         <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Example Stories</CardTitle>
          <p className="text-muted-foreground">See what Story Spark can generate for you.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Title</TableHead>
                  <TableHead>User Story Snippet</TableHead>
                  <TableHead className="pr-6 text-right">Generated On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exampleStories.map((example, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/30 transition-colors duration-150 text-sm">
                    <TableCell className="font-medium text-foreground pl-6 py-4">{example.title}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{example.story}</TableCell>
                    <TableCell className="text-muted-foreground pr-6 py-4 text-right">{example.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-tr from-primary/10 via-accent/5 to-purple-500/5 dark:from-primary/20 dark:via-accent/10 dark:to-purple-500/10 border border-primary/20 card-hover animate-slideInUp" style={{animationDelay: '0.6s'}}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0 md:mr-8">
            <div className="mr-5 flex-shrink-0">
                <Image src="https://picsum.photos/80/80?random=1" alt="AI illustration" width={80} height={80} className="rounded-2xl shadow-lg" data-ai-hint="technology abstract" />
            </div>
            <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 text-foreground">Ready to Spark Some Stories?</h3>
                <p className="text-muted-foreground max-w-lg">
                Unlock the power of AI to streamline your user story creation process. Get started now and experience the magic.
                </p>
            </div>
          </div>
          
          <div className="flex-shrink-0 mt-6 md:mt-0">
            <Button 
              size="lg"
              className="px-8 py-4 text-base font-semibold shadow-lg hover:shadow-primary/30 btn-hover-effect"
              onClick={openNewStoryDialog}
            >
              Start Generating <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
