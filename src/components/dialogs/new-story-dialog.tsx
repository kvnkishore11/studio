// src/components/dialogs/new-story-dialog.tsx
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RefreshCw, Zap, Save, Edit3, ThumbsUp, ThumbsDown, Check, X, Cpu, Loader2 } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { generateUserStory, GenerateUserStoryInput, GenerateUserStoryOutput } from '@/ai/flows/generate-user-story';
import { regenerateUserStory, RegenerateUserStoryInput, RegenerateUserStoryOutput } from '@/ai/flows/regenerate-user-story';
import type { SavedStory, GeneratedStoryData } from '@/types/story';
import { cn } from '@/lib/utils';

export function NewStoryDialog() {
  const { 
    isNewStoryDialogOpen, 
    closeNewStoryDialog, 
    addSavedStory, 
    addHistoryItem,
    themeMode,
    currentGeneratedStory,
    setCurrentGeneratedStory
  } = useApp();

  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDialogClose = () => {
    closeNewStoryDialog();
    // Reset local state if dialog is closed without saving
    if (!currentGeneratedStory) { 
      setStoryTitle('');
      setStoryDescription('');
    }
  };
  
  const handleGenerate = async () => {
    if (!storyTitle.trim() || !storyDescription.trim()) return;
    setIsGenerating(true);
    try {
      const input: GenerateUserStoryInput = { title: storyTitle, description: storyDescription };
      const result = await generateUserStory(input);
      setCurrentGeneratedStory({
        id: crypto.randomUUID(), // Temporary ID
        title: storyTitle, // Use input title
        ...result,
        timestamp: new Date().toISOString(),
      });
      addHistoryItem({
        id: crypto.randomUUID(),
        title: storyTitle,
        description: storyDescription,
        userStory: result.userStory,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error generating story:", error);
      // Handle error (e.g., show a toast message)
    }
    setIsGenerating(false);
  };

  const handleRegenerate = async () => {
    if (!currentGeneratedStory) return;
    setIsGenerating(true);
    try {
      const input: RegenerateUserStoryInput = { title: currentGeneratedStory.title, description: storyDescription }; // Use original description for regeneration context
      const result = await regenerateUserStory(input);
      setCurrentGeneratedStory({
        ...currentGeneratedStory, // Keep original ID and title
        ...result,
        timestamp: new Date().toISOString(), // Update timestamp
      });
    } catch (error) {
      console.error("Error regenerating story:", error);
    }
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (!currentGeneratedStory) return;
    const storyToSave: SavedStory = {
      ...currentGeneratedStory,
      date: new Date(currentGeneratedStory.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    addSavedStory(storyToSave);
    closeNewStoryDialog(); // This will also clear currentGeneratedStory
    setStoryTitle('');
    setStoryDescription('');
  };

  const handleEditInput = () => {
    if (currentGeneratedStory) {
      setStoryTitle(currentGeneratedStory.title);
      // storyDescription is already in state
    }
    setCurrentGeneratedStory(null);
  };

  return (
    <Dialog open={isNewStoryDialogOpen} onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogContent className={cn(
        "max-w-2xl w-full rounded-2xl shadow-2xl p-0 overflow-hidden",
        themeMode === 'light' ? "bg-card" : "bg-card" // Card already handles themes
      )}>
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold tracking-tight">Create User Story</DialogTitle>
           <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {!currentGeneratedStory ? (
            // Input form
            <>
              <div className="mb-6">
                <Label htmlFor="storyTitle" className="block text-sm font-medium mb-2">Story Title</Label>
                <Input 
                  id="storyTitle"
                  type="text" 
                  placeholder="e.g., User Authentication System"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="py-3 px-4"
                />
              </div>
              
              <div className="mb-8">
                <Label htmlFor="storyDescription" className="block text-sm font-medium mb-2">Brief Description</Label>
                <Textarea 
                  id="storyDescription"
                  placeholder="Describe the feature..."
                  value={storyDescription}
                  onChange={(e) => setStoryDescription(e.target.value)}
                  className="min-h-32 py-3 px-4"
                  rows={4}
                />
              </div>
              
              <div className="mb-6 p-5 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Cpu size={18} className="text-primary" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-foreground">AI Powered Story Generation</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Our AI will create a complete user story with acceptance criteria and details.
                    </p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="mt-6 gap-2 sm:gap-0">
                <Button variant="outline" onClick={handleDialogClose}>Cancel</Button>
                <Button 
                  onClick={handleGenerate}
                  disabled={!storyTitle.trim() || !storyDescription.trim() || isGenerating}
                  className="px-8 btn-hover-effect"
                >
                  {isGenerating ? (
                    <Loader2 size={18} className="mr-2 animate-spin" />
                  ) : (
                    <Zap size={18} className="mr-2" />
                  )}
                  Generate Story
                </Button>
              </DialogFooter>
            </>
          ) : (
            // Generated story display
            <div className="animate-fadeIn">
              <div className="mb-6 p-5 rounded-xl bg-green-600/10 border border-green-600/30 text-green-700 dark:text-green-300">
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-green-600/20">
                    <Check size={18} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-foreground">Story Generated Successfully</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Review your AI-generated user story below.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">User Story</h3>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <p className="text-foreground">{currentGeneratedStory.userStory}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Acceptance Criteria</h3>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <ul className="space-y-2">
                      {currentGeneratedStory.acceptanceCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={16} className="mt-1 mr-3 text-primary flex-shrink-0" />
                          <span className="text-foreground">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Additional Details</h3>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Priority</p>
                        <p className="font-medium text-foreground">{currentGeneratedStory.priority}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Difficulty</p>
                        <p className="font-medium text-foreground">{currentGeneratedStory.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Est. Time</p>
                        <p className="font-medium text-foreground">{currentGeneratedStory.estimatedTime}</p>
                      </div>
                    </div>
                    <p className="text-foreground">{currentGeneratedStory.additionalNotes}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={handleEditInput} size="sm">
                    <Edit3 size={16} className="mr-2" /> Edit Input
                  </Button>
                  <Button variant="outline" onClick={handleRegenerate} disabled={isGenerating} size="sm">
                    {isGenerating ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <RefreshCw size={16} className="mr-2" />
                    )}
                    Regenerate
                  </Button>
                </div>
                <Button onClick={handleSave} className="px-6 btn-hover-effect" size="sm">
                  <Save size={18} className="mr-2" /> Save Story
                </Button>
              </DialogFooter>
              
              <div className="flex justify-center space-x-4 mt-8 pb-2 text-muted-foreground">
                <div className="flex items-center text-sm">
                  <p className="mr-4">Was this story helpful?</p>
                  <Button variant="ghost" size="icon" className="hover:text-green-500"><ThumbsUp size={18} /></Button>
                  <Button variant="ghost" size="icon" className="hover:text-red-500"><ThumbsDown size={18} /></Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
