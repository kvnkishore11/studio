
// src/components/dialogs/new-story-dialog.tsx
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RefreshCw, Zap, Save, Edit3, ThumbsUp, ThumbsDown, Check, X, Cpu, Loader2, Wand2 } from 'lucide-react';
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
        id: crypto.randomUUID(),
        title: storyTitle,
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
    }
    setIsGenerating(false);
  };

  const handleRegenerate = async () => {
    if (!currentGeneratedStory) return;
    setIsGenerating(true);
    try {
      const input: RegenerateUserStoryInput = { title: currentGeneratedStory.title, description: storyDescription };
      const result = await regenerateUserStory(input);
      setCurrentGeneratedStory({
        ...currentGeneratedStory,
        ...result,
        timestamp: new Date().toISOString(),
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
    closeNewStoryDialog();
    setStoryTitle('');
    setStoryDescription('');
  };

  const handleEditInput = () => {
    if (currentGeneratedStory) {
      setStoryTitle(currentGeneratedStory.title);
    }
    setCurrentGeneratedStory(null);
  };

  return (
    <Dialog open={isNewStoryDialogOpen} onOpenChange={(open) => !open && handleDialogClose()}>
      <DialogContent className={cn(
        "max-w-2xl w-full rounded-2xl shadow-2xl p-0 overflow-hidden",
        themeMode === 'light' ? "bg-card" : "bg-card"
      )}>
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold tracking-tight flex items-center">
            <Wand2 size={24} className="mr-3 text-primary" /> Create User Story
          </DialogTitle>
           {/* Removed redundant DialogClose button as DialogContent provides one by default */}
        </DialogHeader>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {!currentGeneratedStory ? (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <Label htmlFor="storyTitle" className="block text-sm font-medium mb-2">Story Title</Label>
                <Input 
                  id="storyTitle"
                  type="text" 
                  placeholder="e.g., User Authentication System"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="py-3 px-4 text-base"
                />
              </div>
              
              <div className="mb-8">
                <Label htmlFor="storyDescription" className="block text-sm font-medium mb-2">Brief Description</Label>
                <Textarea 
                  id="storyDescription"
                  placeholder="Describe the feature in detail..."
                  value={storyDescription}
                  onChange={(e) => setStoryDescription(e.target.value)}
                  className="min-h-36 py-3 px-4 text-base" // Increased min-height
                  rows={5}
                />
              </div>
              
              <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-primary/5 via-accent/5 to-purple-500/5 dark:from-primary/10 dark:via-accent/10 dark:to-purple-500/10 border border-primary/20">
                <div className="flex items-start">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Cpu size={20} className="text-primary animate-icon-pulse" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-foreground">AI Powered Story Generation</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Our AI will craft a complete user story with acceptance criteria and other crucial details.
                    </p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="mt-8 gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button variant="outline" className="px-6">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleGenerate}
                  disabled={!storyTitle.trim() || !storyDescription.trim() || isGenerating}
                  className="px-8 btn-hover-effect text-base"
                  size="lg"
                >
                  {isGenerating ? (
                    <Loader2 size={20} className="mr-2 animate-spin" />
                  ) : (
                    <Zap size={20} className="mr-2" />
                  )}
                  Generate Story
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="mb-6 p-5 rounded-xl bg-green-600/5 border border-green-600/20 text-green-700 dark:text-green-300">
                <div className="flex items-start">
                  <div className="p-2.5 rounded-lg bg-green-600/10">
                    <Check size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-foreground">Story Generated Successfully!</h4>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Review your AI-generated user story below. You can regenerate or save it.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">User Story</h3>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border">
                    <p className="text-foreground leading-relaxed">{currentGeneratedStory.userStory}</p>
                  </div>
                </div>
                
                <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Acceptance Criteria</h3>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border">
                    <ul className="space-y-2.5">
                      {currentGeneratedStory.acceptanceCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={18} className="mt-0.5 mr-3 text-primary flex-shrink-0" />
                          <span className="text-foreground leading-relaxed">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Additional Details</h3>
                  <div className="p-4 rounded-xl bg-muted/40 border border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Priority</p>
                        <p className="font-semibold text-foreground text-base">{currentGeneratedStory.priority}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Difficulty</p>
                        <p className="font-semibold text-foreground text-base">{currentGeneratedStory.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Est. Time</p>
                        <p className="font-semibold text-foreground text-base">{currentGeneratedStory.estimatedTime}</p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">{currentGeneratedStory.additionalNotes}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleEditInput} size="sm" className="px-4">
                    <Edit3 size={16} className="mr-2" /> Edit Input
                  </Button>
                  <Button variant="outline" onClick={handleRegenerate} disabled={isGenerating} size="sm" className="px-4">
                    {isGenerating ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <RefreshCw size={16} className="mr-2" />
                    )}
                    Regenerate
                  </Button>
                </div>
                <Button onClick={handleSave} className="px-8 btn-hover-effect" size="lg">
                  <Save size={18} className="mr-2" /> Save Story
                </Button>
              </DialogFooter>
              
              <div className="flex justify-center space-x-3 mt-8 pb-2 text-muted-foreground items-center">
                  <p className="text-sm mr-2">Rate this generation:</p>
                  <Button variant="ghost" size="icon" className="hover:text-green-500 rounded-full hover:bg-green-500/10"><ThumbsUp size={18} /></Button>
                  <Button variant="ghost" size="icon" className="hover:text-red-500 rounded-full hover:bg-red-500/10"><ThumbsDown size={18} /></Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

