import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Cpu, Save, MousePointerClick, Type, CheckCircle } from 'lucide-react';

/**
 * Animation steps data for the "How it Works" animation
 */
export const animationStepsData = [
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
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <Type size={32} className="mb-2 opacity-60 text-blue-500/80" />
        </motion.div>
        <motion.p
            className="text-xs text-muted-foreground"
            style={{
              fontFamily: 'monospace',
            }}
            animate={{
              width: [0, '100%', '100%', 0],
              borderRight: ['1px solid transparent', '1px solid currentColor', '1px solid currentColor', '1px solid transparent'],
            }}
            transition={{
              duration: 4,
              times: [0, 0.4, 0.8, 1],
              repeat: Infinity,
              ease: "steps(28)"
            }}
        >
            Enter title &amp; description...
        </motion.p>
        <div className="mt-3 w-32 h-12 bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center shadow-inner">
            <motion.div
              animate={{ y: ["-5px", "5px", "-5px"] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <MousePointerClick size={18} className="text-muted-foreground/70" />
            </motion.div>
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
                <motion.div 
                  className="w-1/3 h-full bg-purple-500" 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ 
                    duration: 1.3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                ></motion.div>
            </div>
            <div className="w-3/4 h-1.5 bg-muted rounded-full overflow-hidden mx-auto">
                <motion.div 
                  className="w-1/2 h-full bg-purple-500" 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                ></motion.div>
            </div>
             <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="w-1/4 h-full bg-purple-500" 
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                ></motion.div>
            </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3.5">Crafting story details...</p>
      </>
    ),
  },
  {
    id: 'save',
    title: '3. Review & Save',
    icon: Save,
    bgColorStops: 'from-green-500/10 via-green-500/5 to-transparent',
    iconColor: 'text-green-500',
    borderColor: 'border-green-500/30',
    ringColor: 'ring-green-500/20',
    elements: (
      <>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 1],
            opacity: [0, 1, 1]
          }}
          transition={{ 
            duration: 0.5, 
            delay: 0.1,
            ease: "easeOut" 
          }}
        >
          <CheckCircle size={36} className="mb-1.5 text-green-500" />
        </motion.div>
        <motion.p 
          className="text-xs text-muted-foreground" 
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Your story is ready!
        </motion.p>
        <motion.p 
          className="text-xs text-muted-foreground" 
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Save it to your collection.
        </motion.p>
      </>
    ),
  },
];
