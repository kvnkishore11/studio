"use client";

import React, { useState, useEffect } from 'react'; 
import { Zap, ArrowRight, BookOpen, Check, Users, ShoppingCart, Search, Bell, Shield, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for example stories
const exampleStories = [
  {
    title: 'User Authentication',
    story: 'As a user, I want to securely log in to access my personal dashboard.',
    date: 'May 08, 2025',
    icon: Shield,
    color: 'blue',
    criteria: [
      'Support email/password login',
      'Implement OAuth providers',
      'Add two-factor authentication'
    ]
  },
  {
    title: 'Product Search',
    story: 'As a customer, I want to search for products by name or category.',
    date: 'May 07, 2025',
    icon: Search,
    color: 'purple',
    criteria: [
      'Enable keyword search',
      'Support category filtering',
      'Include autocomplete suggestions'
    ]
  },
  {
    title: 'Shopping Cart',
    story: 'As a shopper, I want to add items to my cart so I can purchase them later.',
    date: 'May 06, 2025',
    icon: ShoppingCart,
    color: 'green',
    criteria: [
      'Allow adding multiple items',
      'Save cart between sessions',
      'Show running total cost'
    ]
  },
  {
    title: 'User Dashboard',
    story: 'As a registered user, I want to view my account activity and preferences.',
    date: 'May 05, 2025',
    icon: Users,
    color: 'orange',
    criteria: [
      'Display user profile information',
      'Show recent activity history',
      'Allow preference customization'
    ]
  },
  {
    title: 'Analytics Dashboard',
    story: 'As a manager, I want to view key performance metrics for my team.',
    date: 'May 04, 2025',
    icon: BarChart,
    color: 'pink',
    criteria: [
      'Display daily/weekly/monthly trends',
      'Include exportable reports',
      'Visualize team performance metrics'
    ]
  },
  {
    title: 'Notification System',
    story: 'As a user, I want to receive timely alerts about important events.',
    date: 'May 03, 2025',
    icon: Bell,
    color: 'amber',
    criteria: [
      'Support in-app notifications',
      'Allow email notification preferences',
      'Group notifications by category'
    ]
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
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  // Rotate through the stories every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStoryIndex((prevIndex) => (prevIndex + 1) % exampleStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get color class based on the story color
  const getColorClass = (color) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
      purple: 'from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700',
      green: 'from-green-500 to-green-600 dark:from-green-600 dark:to-green-700',
      orange: 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700',
      pink: 'from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700',
      amber: 'from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700',
    };
    return colorMap[color] || 'from-primary to-primary-foreground';
  };

  return (
    <div className="h-full flex flex-col space-y-8 animate-fadeIn">
      <div className="relative max-w-7xl mx-auto pt-0 pb-2 px-4">
        {/* Title spanning the full width */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-10 tracking-tighter text-foreground leading-tight text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-400 dark:via-teal-400 dark:to-purple-500">
            AI-Powered User Stories
          </span>
        </h1>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-16">
          {/* Left side - Description */}
          <div className="w-full lg:w-1/2 text-left lg:pr-8">
            <p className="text-lg md:text-xl font-normal mb-8 text-muted-foreground leading-relaxed">
              Effortlessly transform your feature ideas into comprehensive user stories, complete with acceptance criteria, in mere seconds. Just describe your vision, and let our intelligent AI craft the narrative.
            </p>
            
            <div className="flex mt-4 mb-8">
              <Button 
                size="lg"
                className="px-10 py-6 text-lg font-semibold btn-hover-effect shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 relative z-20 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={openNewStoryDialog}
              >
                <Zap size={22} className="mr-3" />
                Generate Your First Story
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-4">
              <Check className="h-4 w-4 text-green-500" />
              <span>Generate stories in seconds</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Includes acceptance criteria</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Save and organize your stories</span>
            </div>
          </div>
          
          {/* Right side - Animated Story Cards */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[450px] overflow-visible flex justify-center items-center">
              {exampleStories.map((story, index) => {
                // Calculate position based on index relative to active index
                const position = (index - activeStoryIndex + exampleStories.length) % exampleStories.length;
                const isActive = position === 0;
                const zIndex = exampleStories.length - position;
                
                // Different styles based on position
                let cardStyles = {};
                let opacity = 1;
                
                if (position === 0) { // Active card (front)
                  cardStyles = { transform: 'translateY(0) scale(1)', zIndex: 10 };
                } else if (position === 1) { // First card behind
                  cardStyles = { transform: 'translateY(20px) translateX(40px) scale(0.95) rotate(2deg)', zIndex: 9 };
                  opacity = 0.9;
                } else if (position === 2) { // Second card behind
                  cardStyles = { transform: 'translateY(40px) translateX(80px) scale(0.9) rotate(4deg)', zIndex: 8 };
                  opacity = 0.8;
                } else if (position === exampleStories.length - 1) { // Last card (will animate to front)
                  cardStyles = { transform: 'translateY(60px) translateX(-80px) scale(0.85) rotate(-4deg)', zIndex: 7 };
                  opacity = 0.7;
                } else if (position === exampleStories.length - 2) { // Second to last card
                  cardStyles = { transform: 'translateY(40px) translateX(-40px) scale(0.9) rotate(-2deg)', zIndex: 6 };
                  opacity = 0.6;
                } else {
                  // Hide other cards
                  cardStyles = { transform: 'translateY(80px) scale(0.8)', zIndex: 1 };
                  opacity = 0;
                }
                
                const IconComponent = story.icon;
                
                return (
                  <div 
                    key={index}
                    className={`absolute w-[360px] transition-all duration-700 ease-in-out ${isActive ? 'shadow-2xl' : 'shadow-xl'}`}
                    style={{ ...cardStyles, opacity }}
                  >
                    <div className={`bg-card rounded-2xl overflow-hidden border border-border ${isActive ? 'animate-pulse-subtle' : ''}`}>
                      <div className={`h-2 w-full bg-gradient-to-r ${getColorClass(story.color)}`}></div>
                      <div className="p-5">
                        <div className="flex items-start mb-4">
                          <div className={`p-2 rounded-full mr-3 ${
                            story.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                            story.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' : 
                            story.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' : 
                            story.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' : 
                            story.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/30' : 
                            story.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' : 
                            'bg-primary-100 dark:bg-primary-900/30'
                          }`}>
                            <IconComponent className={`h-5 w-5 ${
                              story.color === 'blue' ? 'text-blue-500 dark:text-blue-400' : 
                              story.color === 'purple' ? 'text-purple-500 dark:text-purple-400' : 
                              story.color === 'green' ? 'text-green-500 dark:text-green-400' : 
                              story.color === 'orange' ? 'text-orange-500 dark:text-orange-400' : 
                              story.color === 'pink' ? 'text-pink-500 dark:text-pink-400' : 
                              story.color === 'amber' ? 'text-amber-500 dark:text-amber-400' : 
                              'text-primary dark:text-primary-400'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{story.title}</h3>
                            <p className="text-sm text-muted-foreground">{story.story}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          {story.criteria.map((criterion, i) => (
                            <div key={i} className="flex items-center">
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-sm">{criterion}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-3 border-t flex justify-between items-center">
                          <Badge variant="outline" className="text-xs">{story.date}</Badge>
                          <span className="text-xs text-muted-foreground">Generated in 2.3 seconds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-0 mt-16 pt-8 animate-slideUp delay-100">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">How It Works</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          Creating user stories is a simple, intuitive process with Story Spark. See our AI in action through these steps:
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto px-4">
          {/* Card 1 - Describe */}
          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-6 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 w-full md:w-1/3 aspect-[4/5] md:aspect-[3/4] flex flex-col items-center transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-center items-center w-16 h-16 mb-4 rounded-full bg-white dark:bg-blue-900/20 shadow-sm border border-blue-100 dark:border-blue-800/30">
              <div className="text-blue-500 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-6 text-center text-blue-600 dark:text-blue-400">1. Describe Your Feature</h3>
            
            <div className="w-full max-w-[200px] h-32 bg-white dark:bg-blue-900/10 rounded-md border border-blue-100 dark:border-blue-800/30 p-3 flex flex-col items-center justify-center">
              <div className="w-8 h-8 mb-2 text-blue-300 dark:text-blue-500 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>
              </div>
              <div className="w-full">
                <div className="h-2 w-3/4 bg-blue-200 dark:bg-blue-700/50 rounded mb-2 mx-auto animate-pulse"></div>
                <div className="h-2 w-1/2 bg-blue-200 dark:bg-blue-700/50 rounded mx-auto animate-pulse delay-75"></div>
              </div>
            </div>
            
            <div className="mt-4 bg-white dark:bg-blue-900/20 rounded-md py-2 px-4 border border-blue-100 dark:border-blue-800/30 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span className="text-sm text-blue-600 dark:text-blue-400">Click Generate</span>
            </div>
          </div>
          
          {/* Card 2 - Generate */}
          <div className="bg-purple-50/50 dark:bg-purple-950/20 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/30 w-full md:w-1/3 aspect-[4/5] md:aspect-[3/4] flex flex-col items-center transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-center items-center w-16 h-16 mb-4 rounded-full bg-white dark:bg-purple-900/20 shadow-sm border border-purple-100 dark:border-purple-800/30">
              <div className="text-purple-500 dark:text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-6 text-center text-purple-600 dark:text-purple-400">2. AI Generates Story</h3>
            
            <div className="w-full max-w-[200px] h-32 bg-white dark:bg-purple-900/10 rounded-md border border-purple-100 dark:border-purple-800/30 p-3 flex flex-col items-center justify-center">
              <div className="w-full space-y-2">
                <div className="h-2 w-full bg-purple-300 dark:bg-purple-700/50 rounded animate-typing"></div>
                <div className="h-2 w-5/6 bg-purple-200 dark:bg-purple-700/40 rounded animate-typing animation-delay-300"></div>
                <div className="h-2 w-4/6 bg-purple-100 dark:bg-purple-700/30 rounded animate-typing animation-delay-600"></div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-purple-600 dark:text-purple-400 text-center">
              <div className="animate-pulse">Crafting story details...</div>
            </div>
          </div>
          
          {/* Card 3 - Save */}
          <div className="bg-green-50/50 dark:bg-green-950/20 p-6 rounded-xl shadow-md border border-green-100 dark:border-green-900/30 w-full md:w-1/3 aspect-[4/5] md:aspect-[3/4] flex flex-col items-center transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-center items-center w-16 h-16 mb-4 rounded-full bg-white dark:bg-green-900/20 shadow-sm border border-green-100 dark:border-green-800/30">
              <div className="text-green-500 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-6 text-center text-green-600 dark:text-green-400">3. Review &amp; Save</h3>
            
            <div className="w-full max-w-[200px] h-32 bg-white dark:bg-green-900/10 rounded-md border border-green-100 dark:border-green-800/30 p-3 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center mb-2 animate-check-appear">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 dark:text-green-400 animate-check-mark"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-green-600 dark:text-green-400">Your story is ready!</div>
                <div className="text-xs text-green-500/70 dark:text-green-500/50 mt-1">Save it to your collection.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="animate-slideUp delay-200 mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-600">Features & Benefits</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Story Spark helps you create consistent, high-quality user stories with powerful AI assistance.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border-t-4 border-t-blue-500">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <CardTitle className="text-xl">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Generate complete user stories in seconds, not minutes or hours.</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border-t-4 border-t-purple-500">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                <Check className="h-5 w-5 text-purple-500" />
              </div>
              <CardTitle className="text-xl">Acceptance Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Automatically generates relevant acceptance criteria for each story.</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border-t-4 border-t-green-500">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                <BookOpen className="h-5 w-5 text-green-500" />
              </div>
              <CardTitle className="text-xl">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Save and reuse templates for consistent story creation across projects.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-tr from-primary/10 via-accent/5 to-purple-500/5 dark:from-primary/20 dark:via-accent/10 dark:to-purple-500/10 border border-primary/20 hover:shadow-xl transition-all duration-300 animate-slideUp delay-300 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0 md:mr-8">
            <div className="mr-5 flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Zap size={32} className="text-white" />
                </div>
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
              className="px-8 py-4 text-base font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
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
