"use client";

import { useState } from 'react';
import { Plus, Filter, ChevronDown, Copy, Edit3, Trash2, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/hooks/use-app';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function SavedStoriesView() {
  // Safely try to use the useApp hook, but provide fallback values if it fails
  let appContext = { 
    savedStories: [],
    openNewStoryDialog: () => console.warn('AppProvider not found'),
    removeSavedStory: () => console.warn('AppProvider not found'),
    themeMode: 'light'
  };
  
  try {
    appContext = useApp();
  } catch (error) {
    console.warn('SavedStoriesView: AppProvider not found in context, using default values');
  }
  
  const { savedStories, openNewStoryDialog, removeSavedStory, themeMode } = appContext;
  const [searchQuery, setSearchQuery] = useState('');
  const [activePriorityFilter, setActivePriorityFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredBySearch = savedStories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.userStory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredByPriority = activePriorityFilter === 'all'
    ? filteredBySearch
    : filteredBySearch.filter(story => story.priority === activePriorityFilter);

  const sortedStories = [...filteredByPriority].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    if (sortOrder === 'oldest') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    if (sortOrder === 'priority') {
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const getPriorityBadgeClass = (priority) => {
    let baseClass = "px-2.5 py-0.5 text-xs font-semibold rounded-full border ";
    if (themeMode === 'dark') {
        if (priority === 'High') return baseClass + 'bg-red-500/20 text-red-300 border-red-500/40';
        if (priority === 'Medium') return baseClass + 'bg-amber-500/20 text-amber-300 border-amber-500/40';
        return baseClass + 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
    if (priority === 'High') return baseClass + 'bg-red-100 text-red-700 border-red-300';
    if (priority === 'Medium') return baseClass + 'bg-amber-100 text-amber-700 border-amber-300';
    return baseClass + 'bg-emerald-100 text-emerald-700 border-emerald-300';
  };


  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-10 gap-4">
        <div className="flex items-center">
            <div className="p-3 rounded-xl mr-4 bg-primary/10 shadow-md">
                 <BookOpen size={28} className="text-primary" />
            </div>
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Saved Stories</h1>
                <p className="mt-1 text-muted-foreground">
                    Manage and review your collection of generated user stories.
                </p>
            </div>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto self-start md:self-center">
           <Badge variant="outline" className="px-3 py-1.5 text-sm border-primary/50 text-primary bg-primary/5">
              {sortedStories.length} storie{sortedStories.length === 1 ? '' : 's'}
            </Badge>
        </div>
      </div>
      
      <Card className="mb-8 md:mb-10 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-grow relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                    type="search" 
                    placeholder="Search by title, content, or notes..."
                    className="h-10 pl-10 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex gap-2 sm:gap-3 items-center w-full md:w-auto">
                <Select value={activePriorityFilter} onValueChange={(value) => setActivePriorityFilter(value)}>
                    <SelectTrigger className="w-full md:w-[170px] h-10 text-sm">
                        <Filter size={15} className="mr-2 opacity-70" />
                        <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="High">High Priority</SelectItem>
                        <SelectItem value="Medium">Medium Priority</SelectItem>
                        <SelectItem value="Low">Low Priority</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)}>
                    <SelectTrigger className="w-full md:w-[160px] h-10 text-sm">
                        <ChevronDown size={15} className="mr-2 opacity-70" />
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="priority">By Priority</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </Card>
      
      {sortedStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStories.map((story, index) => (
            <Card 
              key={story.id}
              className="p-0 card-hover animate-slideInUp overflow-hidden shadow-lg flex flex-col"
              style={{ animationDelay: `${index * 70}ms`, animationFillMode: 'forwards' }}
            >
              <CardContent className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={cn(getPriorityBadgeClass(story.priority), "capitalize")}>{story.priority}</Badge>
                    <div className="text-xs text-muted-foreground">{story.date}</div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2">{story.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">{story.userStory}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <Avatar className="w-7 h-7 border-2 border-background">
                          <AvatarImage src={`https://picsum.photos/40/40?grayscale&random=${index + 1}`} data-ai-hint="profile person" />
                          <AvatarFallback>{story.title.substring(0,1)}U</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-7 h-7 border-2 border-background">
                          <AvatarImage src={`https://picsum.photos/40/40?grayscale&random=${index + 2}`} data-ai-hint="profile person" />
                          <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" title="Copy Story" className="rounded-full w-8 h-8 hover:bg-accent/50">
                          <Copy size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit Story" className="rounded-full w-8 h-8 hover:bg-accent/50">
                          <Edit3 size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete Story" onClick={() => removeSavedStory(story.id)} className="rounded-full w-8 h-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10">
                          <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 md:py-24 animate-fadeIn col-span-full">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 bg-muted border-4 border-border">
              <Search size={48} className="text-muted-foreground opacity-70" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">No Stories Found</h3>
            <p className="text-lg mb-10 text-muted-foreground max-w-md mx-auto">
              {searchQuery || activePriorityFilter !== 'all' 
                ? `No stories match your current filters. Try adjusting your search or filter settings.` 
                : "You haven\'t saved any stories yet, or they don\'t match the current filter."}
            </p>
            <Button 
              size="lg"
              className="btn-hover-effect px-8 py-3 text-base"
              onClick={openNewStoryDialog}
            >
              <Plus size={20} className="mr-2" /> Create a New Story
            </Button>
          </div>
      )}
    </div>
  );
} 