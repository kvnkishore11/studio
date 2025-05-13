"use client";

import React from 'react'; 
import { Zap, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';

// Mock data for example stories
const exampleStories = [
  {
    title: 'User Authentication',
    story: 'As a user, I want to securely log in to access my personal dashboard.',
    date: 'May 08, 2025'
  },
  {
    title: 'Product Search',
    story: 'As a customer, I want to search for products by name or category.',
    date: 'May 07, 2025'
  },
  {
    title: 'Shopping Cart',
    story: 'As a shopper, I want to add items to my cart so I can purchase them later.',
    date: 'May 06, 2025'
  }
];

export function GenerateStoryView() {
  // Safely try to use the useApp hook, but provide fallback values if it fails
  let appContext = { 
    openNewStoryDialog: () => console.warn('AppProvider not found')
  };
  
  try {
    appContext = useApp();
  } catch (error) {
    console.warn('GenerateStoryView: AppProvider not found in context, using default values');
  }
  
  const { openNewStoryDialog } = appContext;

  return (
    <div className="h-full flex flex-col space-y-8 animate-fadeIn">
      <div className="text-center max-w-4xl mx-auto pt-0 pb-2">
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
            className="px-10 py-8 text-lg font-semibold btn-hover-effect shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
            onClick={openNewStoryDialog}
          >
            <Zap size={22} className="mr-3" />
            Generate Your First Story
          </Button>
        </div>
      </div>
      
      <section className="py-0 mt-0 animate-slideUp delay-100">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">How It Works</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          Creating user stories is a simple, intuitive process with Story Spark. See our AI in action through these steps:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg shadow-lg border border-blue-100 dark:border-blue-800 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
            <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-800/30">
              <Zap className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">1. Describe Your Feature</h3>
            <p className="text-center">Enter a brief description of the feature you want to implement.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg shadow-lg border border-purple-100 dark:border-purple-800 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
            <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-800/30">
              <ArrowRight className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">2. Generate Story</h3>
            <p className="text-center">Our AI analyzes your description and generates a comprehensive user story.</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 p-6 rounded-lg shadow-lg border border-pink-100 dark:border-pink-800 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
            <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 dark:bg-pink-800/30">
              <BookOpen className="h-8 w-8 text-pink-500 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">3. Refine & Save</h3>
            <p className="text-center">Review the generated story, make any necessary adjustments, and save it.</p>
          </div>
        </div>
      </section>
      
      <div className="animate-slideUp delay-200">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300">
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
      </div>
      
      <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-tr from-primary/10 via-accent/5 to-purple-500/5 dark:from-primary/20 dark:via-accent/10 dark:to-purple-500/10 border border-primary/20 hover:shadow-xl transition-all duration-300 animate-slideUp delay-300">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0 md:mr-8">
            <div className="mr-5 flex-shrink-0">
                <Image src="https://picsum.photos/80/80?random=1" alt="AI illustration" width={80} height={80} className="rounded-2xl shadow-lg" />
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
              className="px-8 py-4 text-base font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
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