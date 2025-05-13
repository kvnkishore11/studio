// src/components/dialogs/notifications-panel.jsx
"use client";

import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useApp } from '@/hooks/use-app';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';

/**
 * Mock notifications data for demonstration
 * @type {Array<{id: string, title: string, message: string, time: string, isNew: boolean}>}
 */
const notificationsMock = [
  { 
    id: '1',
    title: 'Story Generated', 
    message: 'Your "User Authentication" story has been successfully generated.',
    time: '5 minutes ago',
    isNew: true
  },
  { 
    id: '2',
    title: 'Template Updated', 
    message: 'The "Basic User Story" template has been updated with new fields.',
    time: '2 hours ago',
    isNew: true
  },
  { 
    id: '3',
    title: 'Story Reminder', 
    message: 'You have 3 unfinished stories. Would you like to continue working on them?',
    time: 'Yesterday',
    isNew: false
  },
];

/**
 * Notifications panel component that displays user notifications
 */
export function NotificationsPanel() {
  const { toggleNotificationsPanel, themeMode } = useApp();
  const prefersReducedMotion = useReducedMotion();

  // Define animation variants
  const panelVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 300,
        damping: 30,
        duration: prefersReducedMotion ? 0.2 : 0.4,
        when: "beforeChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      className={cn(
        "fixed top-0 right-0 w-full sm:w-96 h-screen p-6 z-40 shadow-xl border-l",
        themeMode === 'light' ? "bg-background/95 backdrop-blur-md" : "bg-background/95 backdrop-blur-md"
      )}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={panelVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight text-foreground">Notifications</h3>
        <Button variant="ghost" size="icon" onClick={toggleNotificationsPanel}>
          <X size={20} />
        </Button>
      </div>
      
      <motion.div 
        className="space-y-4"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
      >
        {notificationsMock.map((notification) => (
          <motion.div 
            key={notification.id}
            variants={itemVariants}
            className={cn(
              "p-4 rounded-xl transition-all duration-200 border",
              notification.isNew 
                ? "bg-primary/5 border-primary/20" 
                : "bg-muted/50 border-border"
            )}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-foreground">{notification.title}</h4>
              {notification.isNew && (
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary" 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                />
              )}
            </div>
            <p className="text-sm mb-2 text-muted-foreground">{notification.message}</p>
            <p className="text-xs text-muted-foreground/80">{notification.time}</p>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="link" 
            className="w-full mt-6 text-sm font-medium text-primary"
          >
            View all notifications
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
