import React from 'react';
import { Home, BookOpen, PenTool, Award, User } from 'lucide-react';

export const BottomNav = ({ currentTab, onNavigate, isMobileFrame = false }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'grammar', label: 'Lessons', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: PenTool },
    { id: 'leaderboard', label: 'Top 5', icon: Award },
    { id: 'settings', label: 'Profile', icon: User }
  ];

  return (
    <nav className={`${
      isMobileFrame 
        ? 'sticky bottom-0 left-0 right-0 z-30 w-full' 
        : 'fixed bottom-0 left-0 right-0 z-30 lg:hidden'
    } bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 px-2 pt-2 pb-1 shadow-lg`}>
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-extrabold scale-105'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-brand-50 dark:bg-brand-950/60' : ''}`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-28 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2 mb-0.5" />
    </nav>
  );
};
