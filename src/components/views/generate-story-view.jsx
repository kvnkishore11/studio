"use client";

import React from 'react'; 
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { HowItWorksAnimation } from '@/components/how-it-works-animation'; 

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


export function GenerateStoryView() {
  const { openNewStoryDialog } = useApp();

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
        className="animate-slideInUp py-8 md:py-12" // Added padding for more space
        style={{animationDelay: '0.2s'}}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">How It Works</h2>
        <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-xl mx-auto"> {/* Increased bottom margin */}
          Creating user stories is a simple, intuitive process with Story Genius. See our AI in action through these steps:
        </p>
        <HowItWorksAnimation />
      </section>
      
      <Card className="shadow-xl card-hover animate-slideInUp" style={{animationDelay: '0.4s'}}>
         <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Example Stories</CardTitle>
          <p className="text-muted-foreground">See what Story Genius can generate for you.</p>
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