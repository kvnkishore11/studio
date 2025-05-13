"use client";

import { History, ArrowRight, Copy, Save, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/hooks/use-app';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function HistoryView() {
  const { historyItems, themeMode } = useApp();

  return (
    <div className="animate-fadeIn">
      <header className="flex items-center mb-10 md:mb-12">
        <div className="p-3 rounded-xl mr-4 bg-primary/10 shadow-md">
          <History size={28} className="text-primary" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Generation History</h1>
          <p className="text-muted-foreground mt-1">Review your recently generated user stories and their inputs.</p>
        </div>
      </header>
      
      {historyItems.length === 0 ? (
        <Card className="text-center py-20 md:py-24 shadow-lg card-hover">
          <CardHeader>
            <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6 border-4 border-border">
              <FileText size={40} className="text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">No History Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
              It looks like you haven&apos;t generated any stories yet. Start creating and they&apos;ll appear here!
            </p>
            <Link href="/" passHref>
              <Button size="lg" className="px-8 py-3 text-base btn-hover-effect">Generate Your First Story</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="relative pl-10 space-y-10 border-l-4 border-primary/20 dark:border-primary/30">
          {historyItems.map((item, index) => (
            <div 
              key={item.id}
              className="opacity-0 animate-slideInUp"
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: 'forwards' }}
            >
              <div className="absolute -left-[11px] top-1.5"> {/* Adjusted for thicker border & centering */}
                <div className="w-5 h-5 rounded-full bg-primary border-[5px] border-background shadow-md" />
              </div>
              
              <Card className="hover:shadow-xl transition-all duration-300 ease-out border-border hover:border-primary/30 ml-4 card-hover"> {/* Added ml-4 for spacing from line */}
                <CardContent className="p-6">
                  <div className="mb-3 text-sm text-muted-foreground font-medium">{item.date}</div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="mb-4 text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    <span className="font-medium text-foreground/80">Input:</span> {item.description}
                  </p>
                  <div className="p-4 rounded-lg mb-5 bg-muted/40 border border-border">
                    <p className="italic text-foreground text-sm leading-relaxed line-clamp-3">
                      <span className="font-medium text-foreground/80 not-italic">Generated Story:</span> &ldquo;{item.userStory}&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <Button variant="link" size="sm" className="text-primary p-0 h-auto hover:underline group">
                      View Details <ArrowRight size={14} className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" title="Copy Story (Not Implemented)" className="rounded-full hover:bg-accent/50">
                        <Copy size={16} />
                      </Button>
                      <Button variant="outline" size="icon" title="Save to Collection (Not Implemented)" className="rounded-full hover:bg-accent/50">
                        <Save size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 