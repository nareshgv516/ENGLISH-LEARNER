import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  PenTool, 
  Brain, 
  Bot, 
  Target, 
  BarChart2, 
  CheckCircle2, 
  Flame, 
  Award, 
  GraduationCap, 
  Volume2, 
  Zap,
  HelpCircle,
  Clock,
  Layers,
  ChevronRight,
  LogIn
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { sampleLeaderboardUsers } from '../data/leaderboardData';
import { StudentAnalysisModal } from '../components/StudentAnalysisModal';
import { Footer } from '../components/Footer';

export const LandingPage = ({ onNavigate, onOpenAuth }) => {
  const { user, completedLessons, streak } = useLearning();
  const [selectedStudentForAnalysis, setSelectedStudentForAnalysis] = useState(null);

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Grammar Lessons',
      description: 'Clear rules, formula boxes, authentic real-life examples, and common mistake breakdowns with instant mini-checks.',
      color: 'from-blue-500 to-sky-400',
      tab: 'grammar'
    },
    {
      icon: PenTool,
      title: 'Practice Exercises',
      description: 'Engage with Multiple Choice, Fill-in-the-blanks, Sentence Correction, Rearrange Words, and True/False questions.',
      color: 'from-emerald-500 to-teal-400',
      tab: 'practice'
    },
    {
      icon: Bot,
      title: 'AI Grammar Assistant',
      description: 'Instant feedback engine that explains errors, refines sentence structures, and converts thoughts into formal or simple English.',
      color: 'from-purple-500 to-indigo-500',
      tab: 'ai-assistant'
    },
    {
      icon: Target,
      title: 'Daily Quiz & Challenges',
      description: 'Calibrated timed quizzes with Easy, Medium, and Hard tiers, plus daily 5-question streak challenges.',
      color: 'from-amber-500 to-orange-400',
      tab: 'daily-challenge'
    },
    {
      icon: BarChart2,
      title: 'Progress Tracking',
      description: 'Detailed circular progress gauges, accuracy analytics, weekly activity trends, and tailored topic recommendations.',
      color: 'from-brand-600 to-sky-500',
      tab: 'progress'
    },
    {
      icon: Brain,
      title: 'Vocabulary Builder',
      description: '50+ curated essential words with meanings, IPA phonetic pronunciation, audio playback, synonyms, and antonyms.',
      color: 'from-rose-500 to-pink-500',
      tab: 'vocabulary'
    }
  ];

  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      subtitle: 'Foundation & Core Sentence Basics',
      difficulty: 'Easy',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
      borderColor: 'border-emerald-200 dark:border-emerald-900/60',
      lessonsCount: 6,
      progress: Math.min(100, Math.round((completedLessons.filter(id => ['present-simple', 'present-continuous', 'past-simple', 'nouns-types', 'articles-rules', 'prepositions-time-place'].includes(id)).length / 6) * 100)),
      topics: [
        'Alphabet & basic words',
        'Nouns & Pronouns',
        'Present Simple Tense',
        'Articles (A, An, The)',
        'Basic Prepositions (In, On, At)',
        'Simple sentence structures'
      ]
    },
    {
      id: 'elementary',
      title: 'Elementary',
      subtitle: 'Expanding Tenses & Descriptions',
      difficulty: 'Moderate',
      badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
      borderColor: 'border-sky-200 dark:border-sky-900/60',
      lessonsCount: 6,
      progress: Math.min(100, Math.round((completedLessons.filter(id => ['present-perfect', 'future-forms', 'subject-verb-agreement', 'adjectives-comparatives', 'adverbs-placement', 'conjunctions-linking'].includes(id)).length / 6) * 100)),
      topics: [
        'Present Continuous & Past Simple',
        'Future Tense (Will & Going to)',
        'Adjectives & Comparatives',
        'Adverbs & placement',
        'Conjunctions & linking words',
        'Question formation rules'
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      subtitle: 'Complex Structures & Fluency',
      difficulty: 'Challenging',
      badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
      borderColor: 'border-indigo-200 dark:border-indigo-900/60',
      lessonsCount: 6,
      progress: Math.min(100, Math.round((completedLessons.filter(id => ['past-perfect', 'modal-verbs', 'conditionals-zero-first', 'conditionals-second-third', 'active-passive-voice', 'reported-speech', 'relative-clauses', 'gerunds-infinitives'].includes(id)).length / 8) * 100)),
      topics: [
        'Present & Past Perfect',
        'Modal verbs of certainty & obligation',
        'Zero, First & Second Conditionals',
        'Active & Passive Voice',
        'Reported Speech & backshifting',
        'Gerunds & Infinitives'
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced',
      subtitle: 'Rhetoric, Inversion & Academic Style',
      difficulty: 'Expert',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
      borderColor: 'border-purple-200 dark:border-purple-900/60',
      lessonsCount: 6,
      progress: Math.min(100, Math.round((completedLessons.filter(id => ['complex-sentences', 'inversion-emphasis', 'advanced-punctuation'].includes(id)).length / 3) * 100)),
      topics: [
        'Advanced conditionals & unreal past',
        'Complex & compound sentences',
        'Subject-auxiliary Inversion',
        'Advanced punctuation (Colons, Semicolons)',
        'Rhetorical emphasis & formal English',
        'Subjunctive clauses'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/60 dark:border-slate-800/60">
        {/* Ambient Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-500/10 via-accent-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy (7 cols) */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-brand-500 animate-spin-slow" />
                <span>Next-Generation English Grammar Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Master English Grammar <span className="gradient-text">Easily</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Learn grammar, practice every day, and improve your English step by step with interactive lessons and smart practice.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-sky-500 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold text-base shadow-elevated hover:shadow-brand-500/30 flex items-center justify-center gap-2.5 transition-all btn-press group"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('login')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-slate-800 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 font-bold text-base shadow-sm hover:shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <LogIn className="w-5 h-5 text-brand-500" />
                  <span>Student Login</span>
                </button>

                <button
                  onClick={() => onNavigate('placement-test')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <span>Level Test</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No login required to preview</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  <span>32 Structured Lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  <span>Speech & AI Assistant</span>
                </div>
              </div>
            </div>

            {/* Hero Interactive Illustration & Studio Card (5 cols) */}
            <div className="lg:col-span-5 relative space-y-4">
              {/* Illustration of Students Learning English */}
              <div className="rounded-3xl overflow-hidden shadow-elevated border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 group">
                <img
                  src="/hero-students.jpg"
                  alt="Students happily learning English grammar and vocabulary together"
                  className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Studio Interactive Card */}
              <div className="relative mx-auto w-full p-5 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-card">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        Grammar Learner Studio
                      </h2>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Interactive Exercise
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200/60 dark:border-amber-900/40">
                    🔥 7 Day Streak
                  </span>
                </div>

                {/* Mock Interactive Question */}
                <div className="py-4 space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      Tense Agreement Check
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                      "She _____ to college every single day."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                      A) go
                    </div>
                    <div className="p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                      <span>B) goes</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                      C) going
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                      D) gone
                    </div>
                  </div>

                  {/* AI Feedback Pill */}
                  <div className="p-3 rounded-xl bg-brand-50/80 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/50 text-xs text-brand-800 dark:text-brand-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <p>
                      <strong>Correct!</strong> 3rd-person singular "she" takes the verb ending "-es" in Present Simple. (+5 XP)
                    </p>
                  </div>
                </div>

                {/* Floating XP Counter */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-500">Student Progress: 68%</span>
                  <span className="font-bold text-brand-600 dark:text-brand-400">+20 XP Earned Today</span>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-2xl glass-card shadow-card flex items-center gap-2.5 animate-float hidden sm:flex">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Level Master</p>
                  <p className="text-[10px] text-slate-400">Grammar Explorer Tier</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 p-3 rounded-2xl glass-card shadow-card flex items-center gap-2.5 hidden sm:flex">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">AI Assistant</p>
                  <p className="text-[10px] text-emerald-500 font-semibold">Live Heuristic Ready</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== STATISTICS SECTION ==================== */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="block text-3xl sm:text-4xl font-black font-display text-brand-600 dark:text-brand-400">
                10+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                Grammar Topics
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Tenses to Inversion
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="block text-3xl sm:text-4xl font-black font-display text-emerald-600 dark:text-emerald-400">
                500+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                Practice Questions
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Instant Explanations
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="block text-3xl sm:text-4xl font-black font-display text-purple-600 dark:text-purple-400">
                100+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                Learning Exercises
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Writing, Speech & Quizzes
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="block text-3xl sm:text-4xl font-black font-display text-amber-600 dark:text-amber-400">
                4
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-1 block">
                Learning Levels
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Beginner to Advanced
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== FEATURE CARDS SECTION ==================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Engineered For Student Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white">
            Everything You Need To Master English
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            More than static notes—interact, correct, test, speak, and write with personalized intelligent guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(feat.tab)}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/60 shadow-sm hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white mb-5 shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== 4 USER LEVELS SECTION ==================== */}
      <section className="py-20 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Clear Structured Progression
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white">
              Choose Your Learning Level
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Whether you are taking your first steps or refining academic and corporate rhetoric, we have a tailor-made level for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((lvl) => (
              <div
                key={lvl.id}
                className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border ${lvl.borderColor} shadow-card flex flex-col justify-between hover:shadow-elevated transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${lvl.badgeColor}`}>
                      {lvl.difficulty}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {lvl.lessonsCount} Lessons
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    {lvl.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                    {lvl.subtitle}
                  </p>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-brand-600 dark:text-brand-400">{lvl.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full transition-all duration-700"
                        style={{ width: `${lvl.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Topic List */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {lvl.topics.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('grammar')}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Level Test CTA Callout */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Not sure which level is right for you?{' '}
              <button
                onClick={() => onNavigate('placement-test')}
                className="text-brand-600 dark:text-brand-400 font-bold underline hover:text-brand-700"
              >
                Take the 20-Question Level Placement Test
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* ==================== TOP 5 STUDENTS OF THE WEEK ==================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-black uppercase tracking-wider shadow-2xs">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Top 5 Students of the Week</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white">
            Honoring This Week's Top 5 English Achievers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Selected based on comprehensive evaluations in grammar accuracy, quiz speed, vocabulary recall, and aggregate marks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {sampleLeaderboardUsers.slice(0, 5).map((student, idx) => {
            const rankBadges = ['🥇 Gold', '🥈 Silver', '🥉 Bronze', '⭐ Rank 4', '⭐ Rank 5'];
            const rankGlows = [
              'border-amber-400/90 shadow-amber-500/20 bg-gradient-to-b from-amber-50/40 via-white to-white dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900',
              'border-slate-300 shadow-slate-500/15 bg-white dark:bg-slate-900',
              'border-amber-600/70 shadow-amber-700/15 bg-white dark:bg-slate-900',
              'border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900',
              'border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900'
            ];

            const marks = student.marks || { percentage: 92, grade: 'A', total: 460, max: 500 };
            const skills = student.skills || { topSkill: 'Grammar Accuracy', accuracyRate: '92%' };

            return (
              <div
                key={student.id}
                className={`p-5 rounded-3xl border-2 ${rankGlows[idx]} transition-all hover:-translate-y-1.5 hover:shadow-card text-center flex flex-col justify-between relative overflow-hidden group`}
              >
                {/* Top Rank Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {rankBadges[idx]}
                  </span>
                  <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                    <Flame className="w-3 h-3 fill-amber-500" />
                    {student.streak}d
                  </span>
                </div>

                {/* Student Photo */}
                <div className="pt-2">
                  <div className="relative inline-block mb-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-20 h-20 rounded-2xl object-cover ring-4 ring-brand-500/30 mx-auto shadow-md group-hover:ring-brand-500 transition-all duration-300"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-slate-900 text-white text-[9px] font-black shadow-sm">
                      #{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                    {student.name}
                  </h3>
                  <p className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold mt-0.5">
                    {student.levelTier}
                  </p>
                </div>

                {/* MARKS & SKILLS ANALYSIS SUMMARY */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-left">
                  {/* Marks Analysis */}
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-500 dark:text-slate-400">Marks Analysis</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-black">
                        {marks.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${marks.percentage}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-400 block mt-0.5 text-right font-medium">
                      Score: {marks.total}/{marks.max} • {marks.grade}
                    </span>
                  </div>

                  {/* Top Skill Tag */}
                  <div className="text-[10px]">
                    <span className="text-slate-400 font-semibold block mb-0.5">Top Core Skill:</span>
                    <span className="inline-block px-2 py-0.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-bold border border-brand-200/60 dark:border-brand-900/60 truncate max-w-full">
                      🎯 {skills.topSkill}
                    </span>
                  </div>

                  {/* XP */}
                  <div className="flex items-center justify-between text-[11px] font-bold pt-1">
                    <span className="text-slate-400">Accuracy</span>
                    <span className="text-brand-600 dark:text-brand-400">{skills.accuracyRate}</span>
                  </div>
                </div>

                {/* View Full Analysis Button */}
                <button
                  onClick={() => setSelectedStudentForAnalysis(student)}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950/50 text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-300 text-xs font-bold transition-colors flex items-center justify-center gap-1 group/btn"
                >
                  <span>View Full Analysis</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('leaderboard')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-slate-800 dark:text-slate-100 font-bold text-xs shadow-sm hover:shadow-md transition-all"
          >
            <span>View Full Global Leaderboard</span>
            <ArrowRight className="w-4 h-4 text-brand-500" />
          </button>
        </div>
      </section>

      {/* Student Skills & Marks Analysis Modal */}
      <StudentAnalysisModal
        student={selectedStudentForAnalysis}
        isOpen={!!selectedStudentForAnalysis}
        onClose={() => setSelectedStudentForAnalysis(null)}
      />

      {/* ==================== FOOTER ==================== */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
