
"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, Cpu, Save, CheckCircle, MousePointerClick, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

const animationStepsData = [
  {
    id: 'describe',
    title: 'Describe Your Feature',
    shortTitle: '1. Describe',
    icon: MessageSquare,
    bgColorStops: 'from-blue-500/10 via-blue-500/5 to-transparent',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-500/30',
    ringColor: 'ring-blue-500/20',
    elements: (
      <>
        <Type size={32} className="mb-2 opacity-60 text-blue-500/80" />
        <p className="text-xs text-muted-foreground">Enter title & description...</p>
        <div className="mt-3 w-28 h-10 bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center shadow-inner">
            <MousePointerClick size={18} className="text-muted-foreground/70 animate-icon-bob" style={{animationDuration: '1.5s'}}/>
            <span className="ml-2 text-xs text-muted-foreground/70">Click Generate</span>
        </div>
      </>
    ),
  },
  {
    id: 'generate',
    title: 'AI Generates Story',
    shortTitle: '2. AI Generates',
    icon: Cpu,
    bgColorStops: 'from-purple-500/10 via-purple-500/5 to-transparent',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-500/30',
    ringColor: 'ring-purple-500/20',
    elements: (
      <>
        <div className="w-full max-w-[120px] space-y-2">
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-purple-500 animate-ai-progress-bar" style={{animationDuration: '1.3s'}}></div>
            </div>
            <div className="w-3/4 h-1.5 bg-muted rounded-full overflow-hidden mx-auto">
                <div className="w-1/2 h-full bg-purple-500 animate-ai-progress-bar" style={{animationDelay: '0.2s', animationDuration: '1.5s'}}></div>
            </div>
             <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-purple-500 animate-ai-progress-bar" style={{animationDelay: '0.4s', animationDuration: '1.2s'}}></div>
            </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Crafting story details...</p>
      </>
    ),
  },
  {
    id: 'save',
    title: 'Review & Save',
    shortTitle: '3. Review & Save',
    icon: Save,
    bgColorStops: 'from-green-500/10 via-green-500/5 to-transparent',
    iconColor: 'text-green-500',
    borderColor: 'border-green-500/30',
    ringColor: 'ring-green-500/20',
    elements: (
      <>
        <CheckCircle size={36} className="mb-1 text-green-500 animate-subtle-glow" style={{animationDuration: '1.5s'}}/>
        <p className="text-xs text-muted-foreground">Your story is ready!</p>
        <p className="text-xs text-muted-foreground">Save it to your collection.</p>
      </>
    ),
  },
];

export function HowItWorksAnimation() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [exitingStepIndex, setExitingStepIndex] = useState<number | null>(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setExitingStepIndex(currentStepIndex);
      setCurrentStepIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % animationStepsData.length;
        setTimeout(() => setExitingStepIndex(null), 500); // Match animation duration
        return nextIndex;
      });
    }, 3000); // Cycle every 3 seconds
    return () => clearInterval(timer);
  }, [currentStepIndex]);

  const activeStep = animationStepsData[currentStepIndex];
  const IconComponent = activeStep.icon;

  return (
    <div className={cn(
        "relative w-full max-w-xs sm:max-w-sm mx-auto h-80 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl border overflow-hidden",
        `bg-gradient-to-br ${activeStep.bgColorStops}`,
        activeStep.borderColor
      )}
    >
      {/* Dynamic content based on currentStepIndex */}
      {animationStepsData.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            "absolute inset-0 p-6 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out",
            index === currentStepIndex ? "opacity-100 animate-fadeIn" : "opacity-0",
            index === exitingStepIndex ? "animate-fadeOut" : ""
          )}
        >
          {index === currentStepIndex && ( // Only render content for the active step to ensure animations reset
            <>
              <div className={cn(
                "mb-5 flex items-center justify-center w-20 h-20 rounded-full ring-4",
                activeStep.bgColorStops.split(' ')[0], // Use the 'from' color for the inner circle
                activeStep.ringColor,
                "shadow-lg"
              )}>
                <step.icon size={40} className={cn(activeStep.iconColor, "transition-all duration-300")} />
              </div>
              
              <h4 className={cn(
                  "text-lg sm:text-xl font-semibold mb-3",
                  activeStep.iconColor
                )}
              >
                {activeStep.title}
              </h4>
              
              <div className="h-24 flex flex-col items-center justify-center w-full"> {/* Fixed height for element stability */}
                  {activeStep.elements}
              </div>
            </>
          )}
        </div>
      ))}
      
       {/* Progress Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-10">
            {animationStepsData.map((_, index) => (
            <div
                key={`dot-${index}`}
                className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-500",
                index === currentStepIndex ? 'bg-primary scale-125 shadow-md' : 'bg-muted-foreground/30'
                )}
            />
            ))}
        </div>
    </div>
  );
}
