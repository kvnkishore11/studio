// src/components/views/history-view.tsx
"use client";

import { History, ArrowRight, Copy, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/hooks/use-app';
import Link from 'next/link';

export function HistoryView() {
  const { historyItems, themeMode } = useApp();

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-8">
        <div className="p-2.5 rounded-xl mr-4 bg-primary/10">
          <History size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Generated Story History</h1>
          <p className="text-muted-foreground">View your recently generated user stories.</p>
        </div>
      </div>
      
      {historyItems.length === 0 ? (
        <Card className="text-center py-16">
          <CardHeader>
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <History size={32} className="text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">No History Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Once you generate stories, they will appear here.
            </p>
            <Link href="/" passHref>
              <Button>Generate Your First Story</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="relative pl-8 space-y-8 border-l-2 border-border">
          {historyItems.map((item, index) => (
            <div 
              key={item.id}
              className="opacity-0 animate-slideInUp"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="absolute -left-[10px] top-1"> {/* Adjusted for thicker border */}
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </div>
              
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-2 text-sm text-muted-foreground">{item.date}</div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="mb-4 text-muted-foreground">{item.description}</p>
                  <div className="p-4 rounded-xl mb-4 bg-muted/50 border">
                    <p className="italic text-foreground">"{item.userStory}"</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                      View Complete Story (Not Implemented)
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" title="Copy (Not Implemented)">
                        <Copy size={16} />
                      </Button>
                      <Button variant="outline" size="icon" title="Save (Not Implemented)">
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
