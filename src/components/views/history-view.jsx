"use client";

import React, { useState } from 'react';
import { Search, Calendar, RefreshCw, ChevronLeft, ChevronRight, FileText, Copy, Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/hooks/use-app';
import Link from 'next/link';

// Mock data for story history
const mockHistoryItems = [
  {
    id: '1',
    title: 'User Authentication System',
    description: 'As a user, I want to securely log in to access my personal dashboard.',
    date: 'May 08, 2025',
    time: '10:32 AM',
    status: 'Generated',
    saved: true
  },
  {
    id: '2',
    title: 'Product Search Functionality',
    description: 'As a customer, I want to search for products by name or category.',
    date: 'May 07, 2025',
    time: '3:45 PM',
    status: 'Generated',
    saved: true
  },
  {
    id: '3',
    title: 'Password Reset Feature',
    description: 'As a forgetful user, I want to reset my password easily through email.',
    date: 'May 06, 2025',
    time: '11:20 AM',
    status: 'Generated',
    saved: true
  },
  {
    id: '4',
    title: 'User Profile Management',
    description: 'As a user, I want to update my profile information and preferences.',
    date: 'May 05, 2025',
    time: '9:15 AM',
    status: 'Generated',
    saved: false
  },
  {
    id: '5',
    title: 'Notification System',
    description: 'As a user, I want to receive notifications about important events.',
    date: 'May 04, 2025',
    time: '2:50 PM',
    status: 'Draft',
    saved: false
  },
  {
    id: '6',
    title: 'Payment Processing',
    description: 'As a customer, I want to securely pay for my order using multiple payment methods.',
    date: 'May 03, 2025',
    time: '4:27 PM',
    status: 'Generated',
    saved: false
  }
];

export function HistoryView() {
  // Safely try to use the useApp hook, but provide fallback values if it fails
  let appContext = { 
    historyItems: [],
    themeMode: 'light'
  };
  
  try {
    appContext = useApp();
  } catch (error) {
    console.warn('HistoryView: AppProvider not found in context, using default values');
  }
  
  // Use mock data for now
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter items based on search query
  const filteredItems = mockHistoryItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  
  // Handle page change
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-6">Story Generation History</h1>
      
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 mb-6 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-end">
          <Button variant="outline" size="sm" className="text-sm">
            <Filter size={16} className="mr-2" />
            <span>Date</span>
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            <RefreshCw size={16} className="mr-2" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <Card className="text-center py-20 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <FileText size={24} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Stories Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {searchQuery ? 'No stories match your search criteria.' : 'You haven\'t generated any stories yet.'}
          </p>
          <Link href="/" passHref>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Generate Your First Story
            </Button>
          </Link>
        </Card>
      ) : (
        <>
          {/* Timeline View */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-900"></div>
            
            {paginatedItems.map((item, index) => (
              <div key={item.id} className="mb-8 relative pl-16 pb-2">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-0 transform -translate-x-1/2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.status === 'Draft' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-purple-100 dark:bg-purple-900/50'}`}>
                    <Check size={14} className={item.status === 'Draft' ? 'text-slate-500 dark:text-slate-400' : 'text-purple-600 dark:text-purple-400'} />
                  </div>
                </div>
                
                {/* Date & Time */}
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <Calendar size={12} className="mr-1.5" />
                  <span>{item.date} • {item.time}</span>
                  <div className="ml-auto flex gap-1">
                    <Badge variant={item.status === 'Generated' ? 'default' : 'outline'} className={item.status === 'Generated' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100' : 'border-amber-300 text-amber-600 dark:border-amber-700 dark:text-amber-400'}>
                      {item.status}
                    </Badge>
                    {item.saved && (
                      <Badge variant="outline" className="border-purple-300 text-purple-600 dark:border-purple-700 dark:text-purple-400">
                        Saved
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Story Card */}
                <Card className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="flex-grow">
                      <div className="flex items-center mb-1">
                        <FileText size={16} className="text-purple-500 dark:text-purple-400 mr-2" />
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">{item.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Copy to clipboard">
                        <Copy size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Expand">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pb-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePreviousPage} 
                disabled={currentPage === 1}
                className="text-sm"
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </Button>
              
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Page {currentPage} of {totalPages}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className="text-sm"
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 