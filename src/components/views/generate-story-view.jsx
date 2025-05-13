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
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-16">
          {/* Left side - Title and description */}
          <div className="w-full lg:w-1/2 text-left lg:pr-8">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter text-foreground leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600 dark:from-blue-400 dark:via-teal-400 dark:to-purple-500">
                AI-Powered User Stories
              </span>
            </h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-blue-800 transition-all duration-500 hover:shadow-xl hover:translate-y-[-5px]">
            <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-800/30">
              <Zap className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">1. Describe Your Feature</h3>
            <p className="text-center">Enter a brief description of the feature you want to implement.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl shadow-lg border border-purple-100 dark:border-purple-800 transition-all duration-500 hover:shadow-xl hover:translate-y-[-5px]">
            <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-800/30">
              <ArrowRight className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">2. Generate Story</h3>
            <p className="text-center">Our AI analyzes your description and generates a comprehensive user story.</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 p-6 rounded-xl shadow-lg border border-pink-100 dark:border-pink-800 transition-all duration-500 hover:shadow-xl hover:translate-y-[-5px]">
            <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 dark:bg-pink-800/30">
              <BookOpen className="h-8 w-8 text-pink-500 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">3. Refine & Save</h3>
            <p className="text-center">Review the generated story, make any necessary adjustments, and save it.</p>
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
