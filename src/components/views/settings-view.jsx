"use client";

import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Cpu, 
  Users, 
  HelpCircle,
  Settings as SettingsIcon,
  Save,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/hooks/use-app';

// Mock user data
const mockUser = {
  firstName: 'Thomas',
  lastName: 'User',
  email: 'thomas@example.com',
  jobTitle: 'Product Manager',
  bio: 'Product manager with 5+ years of experience in SaaS products.',
  avatar: 'T'
};

const settingsNavItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'ai-settings', label: 'AI Settings', icon: Cpu },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export function SettingsView() {
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState(mockUser);
  
  // Safely try to use the useApp hook, but provide fallback values if it fails
  let appContext = { 
    themeMode: 'light'
  };
  
  try {
    appContext = useApp();
  } catch (error) {
    console.warn('SettingsView: AppProvider not found in context, using default values');
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveChanges = () => {
    // In a real app, this would save to backend
    console.log('Saving user data:', userData);
    // Show success message, etc.
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-3xl font-semibold">
                    {userData.avatar}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-700">
                    <Camera size={14} className="text-slate-600 dark:text-slate-300" />
                  </button>
                </div>
                <button className="mt-4 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  Change Avatar
                </button>
              </div>
              
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      First Name
                    </label>
                    <Input 
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Last Name
                    </label>
                    <Input 
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <Input 
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full"
                      type="email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Job Title
                    </label>
                    <Input 
                      name="jobTitle"
                      value={userData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Bio
                  </label>
                  <Textarea 
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    className="w-full h-24"
                    placeholder="Tell us about yourself"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveChanges}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        );
      
      case 'notifications':
      case 'appearance':
      case 'security':
      case 'ai-settings':
      case 'team':
      case 'help':
        return (
          <div className="animate-fadeIn text-center py-12">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
              {React.createElement(settingsNavItems.find(item => item.id === activeSection).icon, {
                size: 24,
                className: "text-purple-600 dark:text-purple-400"
              })}
            </div>
            <h2 className="text-2xl font-semibold mb-2">{settingsNavItems.find(item => item.id === activeSection).label}</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              This section is coming soon. We're working hard to bring you the best settings experience.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row animate-fadeIn max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <div className="w-full md:w-72 md:min-h-[calc(100vh-6rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6">
        {/* User Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-semibold mb-3">
            {userData.avatar}
          </div>
          <h3 className="font-medium text-slate-900 dark:text-white">{userData.firstName} {userData.lastName}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{userData.jobTitle}</p>
        </div>
        
        <Separator className="my-4" />
        
        {/* Navigation */}
        <nav className="space-y-1">
          {settingsNavItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors ${
                activeSection === item.id 
                  ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 font-medium' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon size={18} className={`mr-3 ${activeSection === item.id ? 'text-purple-500' : 'text-slate-400 dark:text-slate-500'}`} />
              {item.label}
            </button>
          ))}
        </nav>
        
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-purple-600 dark:to-purple-400">
              Settings
            </span>
          </h1>
        
        {/* Content based on active section */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
