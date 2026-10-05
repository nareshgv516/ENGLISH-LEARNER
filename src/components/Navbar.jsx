import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Flame, 
  Award, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LogIn, 
  Settings, 
  ChevronDown,
  BookOpen,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { grammarLessons } from '../data/grammarLessons';
import { vocabularyWords } from '../data/vocabularyData';

export const Navbar = ({ onOpenSearch, onOpenAuth, onNavigate, onToggleMobileSidebar, isMobileSidebarOpen }) => {
  const { 
    user, 
    isAuthenticated, 
    xp, 
    streak, 
    currentTier, 
    darkMode, 
    toggleDarkMode, 
    soundEnabled, 
    toggleSound, 
    logout 
  } = useLearning();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setIsMobileSearchOpen(true);
          setTimeout(() => mobileSearchInputRef.current?.focus(), 50);
        } else {
          searchInputRef.current?.focus();
          setIsSearchFocused(true);
        }
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setIsMobileSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search filtering
  const trimmedQuery = navSearchQuery.trim().toLowerCase();

  const lessonMatches = trimmedQuery
    ? grammarLessons.filter(l =>
        l.title.toLowerCase().includes(trimmedQuery) ||
        l.category.toLowerCase().includes(trimmedQuery) ||
        l.summary.toLowerCase().includes(trimmedQuery) ||
        (l.explanation && l.explanation.toLowerCase().includes(trimmedQuery))
      ).slice(0, 4)
    : [];

  const vocabMatches = trimmedQuery
    ? vocabularyWords.filter(v =>
        v.word.toLowerCase().includes(trimmedQuery) ||
        v.meaning.toLowerCase().includes(trimmedQuery) ||
        v.category.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const quickPages = [
    { title: 'Grammar Lessons', tab: 'grammar', icon: BookOpen, desc: 'All 32 grammar modules' },
    { title: 'Practice Hub', tab: 'practice', icon: Sparkles, desc: 'Interactive exercises & tests' },
    { title: 'Top 5 Students', tab: 'leaderboard', icon: Award, desc: 'Leaderboard & student marks' },
    { title: 'Vocabulary Builder', tab: 'vocabulary', icon: Sparkles, desc: '50+ curated vocabulary words' },
    { title: 'Student Login', tab: 'login', icon: LogIn, desc: 'Student profile & photo portal' }
  ].filter(p => trimmedQuery && p.title.toLowerCase().includes(trimmedQuery)).slice(0, 2);

  const totalResults = lessonMatches.length + vocabMatches.length + quickPages.length;

  const handleSelectLesson = (lessonId) => {
    onNavigate('lesson-detail', lessonId);
    setNavSearchQuery('');
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
  };

  const handleSelectVocab = () => {
    onNavigate('vocabulary');
    setNavSearchQuery('');
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
  };

  const handleSelectPage = (tab) => {
    onNavigate(tab);
    setNavSearchQuery('');
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (lessonMatches.length > 0) {
        handleSelectLesson(lessonMatches[0].id);
      } else if (vocabMatches.length > 0) {
        handleSelectVocab();
      } else if (quickPages.length > 0) {
        handleSelectPage(quickPages[0].tab);
      } else if (trimmedQuery) {
        onNavigate('grammar');
        setIsSearchFocused(false);
        setIsMobileSearchOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Mobile Full-Width Search Overlay */}
        {isMobileSearchOpen ? (
          <div className="flex-1 flex items-center gap-2 animate-fadeIn">
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                setNavSearchQuery('');
              }}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search lessons, tenses, rules..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                autoFocus
              />
              {navSearchQuery && (
                <button
                  onClick={() => setNavSearchQuery('')}
                  className="absolute right-2.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Mobile Live Dropdown */}
              {(trimmedQuery || isMobileSearchOpen) && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 p-3 max-h-[70vh] overflow-y-auto z-50 animate-fadeIn">
                  {!trimmedQuery ? (
                    <div className="py-2">
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                        Suggested Searches
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Present Simple', 'Past Continuous', 'Conditionals', 'Passive Voice', 'Articles', 'Vocabulary'].map((term) => (
                          <button
                            key={term}
                            onClick={() => setNavSearchQuery(term)}
                            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : totalResults === 0 ? (
                    <div className="py-4 text-center text-slate-400 text-xs">
                      No results for "{navSearchQuery}". Try "Tenses", "Conditionals", or "Articles".
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {lessonMatches.length > 0 && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Lessons ({lessonMatches.length})
                          </p>
                          {lessonMatches.map(l => (
                            <button
                              key={l.id}
                              onClick={() => handleSelectLesson(l.id)}
                              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left text-xs"
                            >
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{l.title}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{l.level}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      {vocabMatches.length > 0 && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Vocabulary ({vocabMatches.length})
                          </p>
                          {vocabMatches.map(v => (
                            <button
                              key={v.id}
                              onClick={handleSelectVocab}
                              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-950/40 text-left text-xs"
                            >
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{v.word}</span>
                              <span className="text-[10px] text-slate-400">{v.meaning}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Left: Mobile Toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleMobileSidebar}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2.5 text-left group shrink-0"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-sky-500 to-accent-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold font-display text-lg tracking-tight text-slate-900 dark:text-white">
                      GrammarLearner
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                      AI
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Center: Live Interactive Desktop Search Bar */}
            <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-md mx-4 relative">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none group-focus-within:text-brand-500 transition-colors" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={navSearchQuery}
                  onChange={(e) => {
                    setNavSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search lessons, tenses, vocabulary..."
                  className="w-full pl-10 pr-20 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/70 text-slate-800 dark:text-slate-100 placeholder-slate-400 hover:border-brand-400/80 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand-500/20 transition-all text-xs sm:text-sm shadow-2xs"
                />
                <div className="absolute right-2.5 top-2 flex items-center gap-1.5">
                  {navSearchQuery ? (
                    <button
                      onClick={() => setNavSearchQuery('')}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 shadow-2xs select-none">
                      Ctrl+K
                    </kbd>
                  )}
                </div>
              </div>

              {/* Instant Dropdown Results Panel */}
              {isSearchFocused && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 p-3 max-h-[75vh] overflow-y-auto z-50 animate-fadeIn">
                  {!trimmedQuery ? (
                    <div className="py-2 space-y-3">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                          Popular Searches
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Present Simple', 'Past Continuous', 'Conditionals', 'Passive Voice', 'Articles', 'Prepositions', 'Vocabulary'].map((term) => (
                            <button
                              key={term}
                              onClick={() => {
                                setNavSearchQuery(term);
                                searchInputRef.current?.focus();
                              }}
                              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/60 dark:hover:text-brand-400 transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                          Quick Shortcuts
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            onClick={() => handleSelectPage('grammar')}
                            className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left text-xs font-semibold text-slate-700 dark:text-slate-300"
                          >
                            <BookOpen className="w-4 h-4 text-brand-500" />
                            <span>Grammar Modules</span>
                          </button>
                          <button
                            onClick={() => handleSelectPage('practice')}
                            className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left text-xs font-semibold text-slate-700 dark:text-slate-300"
                          >
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            <span>Practice Hub</span>
                          </button>
                          <button
                            onClick={() => handleSelectPage('vocabulary')}
                            className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left text-xs font-semibold text-slate-700 dark:text-slate-300"
                          >
                            <Sparkles className="w-4 h-4 text-accent-500" />
                            <span>Vocabulary (50+)</span>
                          </button>
                          <button
                            onClick={() => handleSelectPage('leaderboard')}
                            className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left text-xs font-semibold text-slate-700 dark:text-slate-300"
                          >
                            <Award className="w-4 h-4 text-amber-500" />
                            <span>Top 5 Students</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : totalResults === 0 ? (
                    <div className="py-6 text-center text-slate-400">
                      <p className="text-sm font-semibold">No direct results found for "{navSearchQuery}"</p>
                      <p className="text-xs text-slate-500 mt-1">Try searching for "Present Simple", "Conditionals", or "Articles".</p>
                      <button
                        onClick={() => {
                          onNavigate('grammar');
                          setIsSearchFocused(false);
                        }}
                        className="mt-3 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-bold hover:bg-brand-100 transition-colors"
                      >
                        Browse all 32 Grammar Lessons →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Grammar Lesson Results */}
                      {lessonMatches.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                              Grammar Lessons ({lessonMatches.length})
                            </span>
                            <span className="text-[10px] font-medium text-slate-400">Press Enter for 1st</span>
                          </div>
                          <div className="space-y-1">
                            {lessonMatches.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => handleSelectLesson(lesson.id)}
                                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left transition-colors group"
                              >
                                <div className="pr-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                                      {lesson.title}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                                      {lesson.level}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                    {lesson.summary}
                                  </p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Vocabulary Results */}
                      {vocabMatches.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-accent-500 mr-1.5" />
                            Vocabulary Words ({vocabMatches.length})
                          </div>
                          <div className="space-y-1">
                            {vocabMatches.map((vocab) => (
                              <button
                                key={vocab.id}
                                onClick={handleSelectVocab}
                                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-950/40 text-left transition-colors group"
                              >
                                <div className="pr-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-accent-600 dark:group-hover:text-accent-400">
                                      {vocab.word}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {vocab.ipa}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                    {vocab.meaning}
                                  </p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Pages */}
                      {quickPages.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div className="space-y-1">
                            {quickPages.map((qp) => {
                              const Icon = qp.icon;
                              return (
                                <button
                                  key={qp.tab}
                                  onClick={() => handleSelectPage(qp.tab)}
                                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs font-semibold text-slate-700 dark:text-slate-300"
                                >
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-brand-500" />
                                    <span>{qp.title}</span>
                                    <span className="text-[10px] text-slate-400 font-normal">({qp.desc})</span>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Gamification Badges & User Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile search trigger icon */}
              <button
                onClick={() => {
                  setIsMobileSearchOpen(true);
                  setTimeout(() => mobileSearchInputRef.current?.focus(), 50);
                }}
                className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

          {/* Streak Counter */}
          <div 
            title={`${streak}-day active learning streak`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-2xs"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streak}d</span>
          </div>

          {/* XP & Level Badge */}
          <button
            onClick={() => onNavigate('dashboard')}
            title={`${xp} Total XP • Level ${currentTier.levelNum}: ${currentTier.title}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200/60 dark:border-brand-900/50 text-brand-700 dark:text-brand-300 text-xs font-bold shadow-2xs hover:bg-brand-100/60 transition-colors"
          >
            <Award className="w-4 h-4 text-brand-500" />
            <span>{xp} XP</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-brand-200/60 dark:bg-brand-900/80 font-black">
              Lv {currentTier.levelNum}
            </span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Auth or Profile Dropdown */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={`${user.name} • Active Student Profile`}
              >
                <div className="relative">
                  <img
                    src={user.avatar || '/students/ananya.jpg'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/50 shadow-2xs"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>
                <span className="hidden xl:inline-block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 p-2 z-50 animate-fadeIn"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="flex items-center gap-2.5 px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <img
                      src={user.avatar || '/students/ananya.jpg'}
                      alt={user.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-brand-500/40 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300">
                        {user.level}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <Sparkles className="w-4 h-4 text-brand-500" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => onNavigate('settings')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Settings & Profile
                    </button>
                    <button
                      onClick={() => onNavigate('login')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-xl"
                    >
                      <LogIn className="w-4 h-4" />
                      Switch Student / Login
                    </button>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}

          {/* Quick Login Page Access Button */}
          {isAuthenticated && (
            <button
              onClick={() => onNavigate('login')}
              title="Go to Student Login & Account Switcher Page"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950/40 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-brand-600 text-xs font-bold transition-all shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5 text-brand-500" />
              <span>Login Page</span>
            </button>
          )}
        </div>
      </>
    )}
  </div>
</header>
);
};
