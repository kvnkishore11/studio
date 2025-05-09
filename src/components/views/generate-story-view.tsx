// src/components/views/generate-story-view.tsx
"use client";

import { MessageSquare, Cpu, Save, Download, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';

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

const howItWorksItems = [
  { 
    step: 1,
    title: 'Describe Your Feature', 
    description: 'Enter a title and brief description of the feature you want to develop.',
    icon: <MessageSquare size={30} />,
  },
  { 
    step: 2,
    title: 'AI Generates Story', 
    description: 'Our AI transforms your description into a complete user story with acceptance criteria.',
    icon: <Cpu size={30} />,
  },
  { 
    step: 3,
    title: 'Review & Save', 
    description: 'Review the generated story, make any edits if needed, and save it to your collection.',
    icon: <Save size={30} />,
  },
];

export function GenerateStoryView() {
  const { openNewStoryDialog, themeMode } = useApp();

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
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {howItWorksItems.map((item) => (
              <div 
                key={item.step}
                className="rounded-xl p-6 text-center bg-card border card-hover"
              >
                <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
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
