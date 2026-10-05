import React from 'react';
import { 
  Home, 
  BookOpen, 
  PenTool, 
  Brain, 
  Target, 
  Bot, 
  FileEdit, 
  Mic, 
  BarChart2, 
  Trophy, 
  Award, 
  Settings,
  HelpCircle,
  LogIn,
  X
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
  { id: 'grammar', label: 'Grammar Lessons', icon: BookOpen, badge: '32' },
  { id: 'practice', label: 'Practice Hub', icon: PenTool, badge: '100+' },
  { id: 'vocabulary', label: 'Vocabulary', icon: Brain, badge: '50+' },
  { id: 'daily-challenge', label: 'Daily Challenge', icon: Target, badge: '🔥' },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, badge: 'Smart' },
  { id: 'writing', label: 'Writing Practice', icon: FileEdit, badge: null },
  { id: 'pronunciation', label: 'Pronunciation', icon: Mic, badge: 'Voice' },
  { id: 'placement-test', label: 'Level Test', icon: HelpCircle, badge: 'Test' },
  { id: 'progress', label: 'Analytics', icon: BarChart2, badge: null },
  { id: 'achievements', label: 'Achievements', icon: Trophy, badge: null },
  { id: 'leaderboard', label: 'Leaderboard', icon: Award, badge: null },
  { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  { id: 'login', label: 'Student Login', icon: LogIn, badge: 'Portal' }
];

export const Sidebar = ({ currentTab, onNavigate, isMobileOpen, onCloseMobile }) => {
  const { currentTier, xp, streak } = useLearning();

  const handleItemClick = (id) => {
    onNavigate(id);
    if (isMobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-fadeIn"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:h-[calc(100vh-4rem)]`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 lg:hidden">
          <span className="font-extrabold font-display text-base text-slate-900 dark:text-white">
            Navigation Menu
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Learning Pathways
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-sky-600 text-white shadow-sm shadow-brand-500/25'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-500'
                  }`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tier Card in Footer of Sidebar */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50/60 dark:from-slate-800 dark:to-brand-950/40 border border-brand-100/60 dark:border-brand-900/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                {currentTier.title}
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-brand-600 text-white">
                Lv {currentTier.levelNum}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mb-1">
              <div
                className="bg-brand-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((xp / currentTier.nextLevelXP) * 100))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              <span>{xp} XP</span>
              <span>{currentTier.nextLevelXP} XP target</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
