import React, { useState } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { GrammarPage } from './pages/GrammarPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { PracticePage } from './pages/PracticePage';
import { QuizPage } from './pages/QuizPage';
import { DailyChallengePage } from './pages/DailyChallengePage';
import { VocabularyPage } from './pages/VocabularyPage';
import { PronunciationPage } from './pages/PronunciationPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { WritingPage } from './pages/WritingPage';
import { ProgressPage } from './pages/ProgressPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { PlacementTestPage } from './pages/PlacementTestPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';

function MainApp() {
  const { notification, dismissNotification } = useLearning();

  const [currentTab, setCurrentTab] = useState('landing');
  const [selectedLessonId, setSelectedLessonId] = useState('present-simple');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'login' });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Navigation handler
  const handleNavigate = (tab, param = null) => {
    if (tab === 'search-open') {
      setIsSearchOpen(true);
      return;
    }
    if (tab === 'auth-open') {
      setCurrentTab('login');
      return;
    }
    if (tab === 'lesson-detail') {
      if (param) setSelectedLessonId(param);
      setCurrentTab('lesson-detail');
    } else {
      setCurrentTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLanding = currentTab === 'landing';
  const isLoginPage = currentTab === 'login';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={(mode) => {
          if (mode === 'login' || mode === 'signup') {
            setCurrentTab('login');
          } else {
            setAuthModalState({ isOpen: true, mode });
          }
        }}
        onNavigate={handleNavigate}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Container Area */}
      {isLoginPage ? (
        <main className="flex-1">
          <LoginPage onNavigate={handleNavigate} />
        </main>
      ) : isLanding ? (
        <main className="flex-1">
          <LandingPage
            onNavigate={handleNavigate}
            onOpenAuth={() => setCurrentTab('login')}
          />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Desktop & Mobile Drawer Sidebar */}
          <Sidebar
            currentTab={currentTab}
            onNavigate={handleNavigate}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* Page Content Viewport */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl w-full mx-auto pb-24 lg:pb-12">
            {currentTab === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
            {currentTab === 'grammar' && <GrammarPage onNavigate={handleNavigate} />}
            {currentTab === 'lesson-detail' && <LessonDetailPage lessonId={selectedLessonId} onNavigate={handleNavigate} />}
            {currentTab === 'practice' && <PracticePage onNavigate={handleNavigate} />}
            {currentTab === 'quiz' && <QuizPage onNavigate={handleNavigate} />}
            {currentTab === 'daily-challenge' && <DailyChallengePage onNavigate={handleNavigate} />}
            {currentTab === 'vocabulary' && <VocabularyPage onNavigate={handleNavigate} />}
            {currentTab === 'pronunciation' && <PronunciationPage onNavigate={handleNavigate} />}
            {currentTab === 'ai-assistant' && <AIAssistantPage onNavigate={handleNavigate} />}
            {currentTab === 'writing' && <WritingPage onNavigate={handleNavigate} />}
            {currentTab === 'progress' && <ProgressPage onNavigate={handleNavigate} />}
            {currentTab === 'achievements' && <AchievementsPage onNavigate={handleNavigate} />}
            {currentTab === 'leaderboard' && <LeaderboardPage onNavigate={handleNavigate} />}
            {currentTab === 'placement-test' && <PlacementTestPage onNavigate={handleNavigate} />}
            {currentTab === 'settings' && <SettingsPage onNavigate={handleNavigate} />}
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation (Visible on phone screens when not on landing) */}
      {!isLanding && (
        <BottomNav currentTab={currentTab} onNavigate={handleNavigate} />
      )}

      {/* Global Search Modal (Ctrl+K or Search click) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Auth Modal (Login / Signup) */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'login' })}
      />

      {/* Toast Notification Banner (Achievements / XP alerts) */}
      {notification && (
        <div 
          onClick={dismissNotification}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm p-4 rounded-2xl glass-card shadow-elevated border border-brand-200 dark:border-brand-800 flex items-center gap-3 cursor-pointer animate-fadeIn"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-sm">
            {notification.icon || '🎉'}
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              {notification.title}
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              {notification.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <MainApp />
    </LearningProvider>
  );
}
