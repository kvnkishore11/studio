
"use client";

import React from 'react';
import { MessageSquare, Cpu, Save, MousePointerClick, Type, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const animationStepsData = [
  {
    id: 'describe',
    title: '1. Describe Your Feature',
    icon: MessageSquare,
    bgColorStops: 'from-blue-500/10 via-blue-500/5 to-transparent',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-500/30',
    ringColor: 'ring-blue-500/20',
    elements: (
      <>
        <Type size={32} className="mb-2 opacity-60 text-blue-500/80 animate-icon-pulse" />
        <p
            className="text-xs text-muted-foreground"
            style={{
              fontFamily: 'monospace',
            }}
        >
            Enter title &amp; description...
        </p>
        <div className="mt-3 w-32 h-12 bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center shadow-inner">
            <MousePointerClick size={18} className="text-muted-foreground/70 animate-icon-bob" style={{animationDuration: '1.5s'}}/>
            <span className="ml-2 text-xs text-muted-foreground/70">Click Generate</span>
        </div>
      </>
    ),
  },
  {
    id: 'generate',
    title: '2. AI Generates Story',
    icon: Cpu,
    bgColorStops: 'from-purple-500/10 via-purple-500/5 to-transparent',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-500/30',
    ringColor: 'ring-purple-500/20',
    elements: (
      <>
        <div className="w-full max-w-[120px] space-y-2.5">
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
        <p className="text-xs text-muted-foreground mt-3.5">Crafting story details...</p>
      </>
    ),
  },
  {
    id: 'save',
    title: '3. Review &amp; Save',
    icon: Save,
    bgColorStops: 'from-green-500/10 via-green-500/5 to-transparent',
    iconColor: 'text-green-500',
    borderColor: 'border-green-500/30',
    ringColor: 'ring-green-500/20',
    elements: (
      <>
        <CheckCircle size={36} className="mb-1.5 text-green-500 animate-subtle-glow animate-icon-confirm-pop" style={{animationDelay: '0.1s'}}/>
        <p className="text-xs text-muted-foreground animate-text-focus-in" style={{animationDelay: '0.3s'}}>Your story is ready!</p>
        <p className="text-xs text-muted-foreground animate-text-focus-in" style={{animationDelay: '0.5s'}}>Save it to your collection.</p>
      </>
    ),
  },
];

export function HowItWorksAnimation() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center w-full px-4 md:px-0">
      {animationStepsData.map((step, index) => {
        const IconComponent = step.icon;
        return (
          <div
            key={step.id}
            className={cn(
              "w-full md:w-1/3 rounded-2xl p-6 flex flex-col items-center justify-start text-center shadow-xl border animate-slideInUp card-hover",
              `bg-gradient-to-br ${step.bgColorStops}`,
              step.borderColor
            )}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
          >
            <div className={cn(
              "mb-5 flex items-center justify-center w-20 h-20 rounded-full ring-4",
              step.bgColorStops.split(' ')[0], // Use the 'from' color for the inner circle
              step.ringColor,
              "shadow-lg"
            )}>
              <IconComponent size={40} className={cn(step.iconColor, "transition-all duration-300")} />
            </div>
            
            <h4 className={cn(
                "text-lg sm:text-xl font-semibold mb-4", // Increased bottom margin
                step.iconColor
              )}
            >
              {step.title}
            </h4>
            
            <div className="min-h-[7rem] flex flex-col items-center justify-center w-full"> {/* Use min-height and flex for centering */}
                {step.elements}
            </div>
          </div>
        );
      })}
    </div>
  );
}

