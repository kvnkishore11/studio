// src/components/views/saved-stories-view.tsx
"use client";

import { useState } from 'react';
import { Plus, Filter, ChevronDown, Copy, Edit3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/hooks/use-app';
import type { SavedStory } from '@/types/story';
import { SearchIcon } from '@/components/icons/search-icon'; // Assuming you create this
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

type SortOrder = 'newest' | 'oldest' | 'priority';
type PriorityFilter = 'all' | 'High' | 'Medium' | 'Low';

export function SavedStoriesView() {
  const { savedStories, openNewStoryDialog, removeSavedStory, themeMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activePriorityFilter, setActivePriorityFilter] = useState<PriorityFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

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
      const priorityOrder: Record<string, number> = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const getPriorityBadgeVariant = (priority: string): "default" | "secondary" | "destructive" | "outline" => {
    if (priority === 'High') return 'destructive';
    if (priority === 'Medium') return 'default'; // Default is primary, using for Medium
    return 'secondary'; // For Low
  };
  
  const getPriorityBadgeClass = (priority: string): string => {
    if (themeMode === 'dark') {
        if (priority === 'High') return 'bg-red-700/30 text-red-300 border-red-700/50';
        if (priority === 'Medium') return 'bg-amber-700/30 text-amber-300 border-amber-700/50';
        return 'bg-emerald-700/30 text-emerald-300 border-emerald-700/50';
    }
    if (priority === 'High') return 'bg-red-100 text-red-700 border-red-200';
    if (priority === 'Medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };


  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Stories</h1>
          <p className="mt-1 text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
           <Badge variant="secondary" className="px-3 py-1.5 text-sm">
              {savedStories.length} stories
            </Badge>
        </div>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
            <Input 
                type="search" 
                placeholder="Search by title or content..."
                className="h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <div className="flex gap-2 items-center">
            <Select value={activePriorityFilter} onValueChange={(value) => setActivePriorityFilter(value as PriorityFilter)}>
                <SelectTrigger className="w-full md:w-[180px] h-10">
                    <Filter size={16} className="mr-2 opacity-70" />
                    <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
                <SelectTrigger className="w-full md:w-[180px] h-10">
                     <ChevronDown size={16} className="mr-2 opacity-70" /> {/* Using ChevronDown as general sort icon */}
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
      
      <div className="grid grid-cols-1 gap-6">
        {sortedStories.length > 0 ? (
          sortedStories.map((story, index) => (
            <Card 
              key={story.id}
              className="p-6 card-hover animate-slideInUp"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getPriorityBadgeClass(story.priority)}>{story.priority} Priority</Badge>
                  <div className="text-sm text-muted-foreground">{story.date}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground">{story.title}</h3>
                <p className="mb-4 leading-relaxed text-muted-foreground line-clamp-2">{story.userStory}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex -space-x-2">
                    <Avatar className="w-8 h-8 border-2 border-background">
                        <AvatarImage src="https://picsum.photos/40/40?grayscale&random=1" data-ai-hint="profile person" />
                        <AvatarFallback>TU</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-background">
                        <AvatarImage src="https://picsum.photos/40/40?grayscale&random=2" data-ai-hint="profile person" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" title="Copy (Not implemented)">
                        <Copy size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit (Not implemented)">
                        <Edit3 size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete Story" onClick={() => removeSavedStory(story.id)}>
                        <Trash2 size={18} className="text-destructive/80 hover:text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 animate-fadeIn col-span-full">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-muted">
              <SearchIcon size={36} className="text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">No stories found</h3>
            <p className="text-lg mb-8 text-muted-foreground">
              {searchQuery ? `No stories matching "${searchQuery}"` : "You haven't saved any stories yet."}
            </p>
            <Button 
              className="btn-hover-effect"
              onClick={openNewStoryDialog}
            >
              <Plus size={18} className="mr-2" /> Create a new story
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
