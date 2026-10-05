import React, { useState } from 'react';
import { 
  Award, 
  Flame, 
  BookOpen, 
  Crown, 
  Sparkles, 
  Trophy, 
  ArrowUp,
  Globe,
  Users,
  Target,
  ChevronRight
} from 'lucide-react';
import { sampleLeaderboardUsers } from '../data/leaderboardData';
import { useLearning } from '../context/LearningContext';
import { StudentAnalysisModal } from '../components/StudentAnalysisModal';

export const LeaderboardPage = () => {
  const { user, xp, streak, completedLessons, currentTier } = useLearning();
  const [timeframe, setTimeframe] = useState('weekly'); // 'weekly' | 'all-time'
  const [selectedStudentForAnalysis, setSelectedStudentForAnalysis] = useState(null);

  // Insert current user into leaderboard dynamically with their chosen photo
  const currentUserEntry = {
    rank: 4,
    id: 'current-user-me',
    name: `${user.name} (You)`,
    avatar: user.avatar || '/students/ananya.jpg',
    xp: xp,
    completedLessons: completedLessons.length,
    streak: streak,
    levelTier: currentTier.title,
    badge: '🌟 Active Learner',
    marks: {
      percentage: 95.2,
      grade: 'A (Honors)',
      total: 476,
      max: 500,
      grammar: 96.0,
      vocabulary: 94.5,
      quizAccuracy: 95.2,
      writing: 93.0,
      pronunciation: 94.0
    },
    skills: {
      topSkill: 'Active Practice & Daily Streak',
      accuracyRate: '95.2%',
      weeklyGrowth: '+12.4%',
      avgSpeed: '2.0s / question',
      studyTime: '8.5 hrs',
      quizzesMastered: 28,
      strengths: ['Grammar Fundamentals', 'Daily Quizzes', 'Streak Consistency']
    },
    quote: 'Learning English step-by-step every single day!',
    isMe: true
  };

  const allUsers = [...sampleLeaderboardUsers];
  // Re-sort with current user
  const combinedList = [
    allUsers[0],
    allUsers[1],
    allUsers[2],
    currentUserEntry,
    ...allUsers.slice(3)
  ].map((u, idx) => ({ ...u, rank: idx + 1 }));

  const top3 = combinedList.slice(0, 3);
  const remaining = combinedList.slice(3);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
              Student Rankings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
            Global English Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Learn consistently, answer quizzes, complete daily challenges, and rise through the rankings!
          </p>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeframe === 'weekly'
                ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe('all-time')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeframe === 'all-time'
                ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            All-Time
          </button>
        </div>
      </div>

      {/* TOP 3 PODIUM DISPLAY WITH MARKS & SKILLS ANALYSIS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        {/* Rank 2 (Silver) */}
        <div className="order-2 sm:order-1 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 relative flex flex-col justify-between">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black text-xs flex items-center justify-center mx-auto border-2 border-slate-300">
            🥈 2
          </div>
          <div className="relative inline-block">
            <img
              src={top3[1]?.avatar}
              alt={top3[1]?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-300 mx-auto shadow-md"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
              {top3[1]?.name}
            </h3>
            <span className="text-[11px] text-slate-400 font-semibold block">
              {top3[1]?.levelTier}
            </span>
          </div>

          {/* Marks badge */}
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400 text-[10px] block">Weekly Marks</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400">
              {top3[1]?.marks?.percentage || 96.4}% Marks
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-brand-600">
            {top3[1]?.xp} XP Points
          </div>

          <button
            onClick={() => setSelectedStudentForAnalysis(top3[1])}
            className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950/40 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 transition-colors"
          >
            📊 View Analysis
          </button>
        </div>

        {/* Rank 1 (Gold) */}
        <div className="order-1 sm:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-500/10 via-white to-amber-500/5 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 border-2 border-amber-400/80 shadow-card text-center space-y-3 relative -translate-y-2 sm:-translate-y-4 flex flex-col justify-between">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center mx-auto shadow-md">
            <Crown className="w-5 h-5 fill-amber-950" />
          </div>
          <div className="relative inline-block">
            <img
              src={top3[0]?.avatar}
              alt={top3[0]?.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-400 mx-auto shadow-lg"
            />
            <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black left-1/2 -translate-x-1/2 shadow-xs">
              #1 Top Student
            </span>
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white truncate">
              {top3[0]?.name}
            </h3>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold block">
              {top3[0]?.badge}
            </span>
          </div>

          {/* Marks badge */}
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 text-xs">
            <span className="text-amber-700 dark:text-amber-300 text-[10px] font-bold block uppercase tracking-wider">
              Examination Marks
            </span>
            <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
              {top3[0]?.marks?.percentage || 98.8}% (Distinction)
            </span>
          </div>

          <div className="pt-2 border-t border-amber-100 dark:border-slate-800 text-sm font-black text-amber-600 dark:text-amber-400">
            {top3[0]?.xp} XP Points
          </div>

          <button
            onClick={() => setSelectedStudentForAnalysis(top3[0])}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 text-xs font-black shadow-xs hover:shadow-md transition-all"
          >
            📊 View Full Analysis
          </button>
        </div>

        {/* Rank 3 (Bronze) */}
        <div className="order-3 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 relative flex flex-col justify-between">
          <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-800 font-black text-xs flex items-center justify-center mx-auto border-2 border-amber-700/40">
            🥉 3
          </div>
          <div className="relative inline-block">
            <img
              src={top3[2]?.avatar}
              alt={top3[2]?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-700/40 mx-auto shadow-md"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
              {top3[2]?.name}
            </h3>
            <span className="text-[11px] text-slate-400 font-semibold block">
              {top3[2]?.levelTier}
            </span>
          </div>

          {/* Marks badge */}
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400 text-[10px] block">Weekly Marks</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400">
              {top3[2]?.marks?.percentage || 94.8}% Marks
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-brand-600">
            {top3[2]?.xp} XP Points
          </div>

          <button
            onClick={() => setSelectedStudentForAnalysis(top3[2])}
            className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-brand-950/40 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 transition-colors"
          >
            📊 View Analysis
          </button>
        </div>
      </div>

      {/* RANKINGS TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>Student Rank</span>
          <div className="flex items-center gap-6 sm:gap-10">
            <span className="hidden sm:inline">Marks %</span>
            <span className="hidden sm:inline">Streak</span>
            <span>Total XP</span>
            <span>Analysis</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {remaining.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                item.isMe 
                  ? 'bg-brand-50/80 dark:bg-brand-950/40 border-l-4 border-brand-500' 
                  : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="w-6 text-center font-bold text-sm text-slate-400">
                  #{item.rank}
                </span>
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-2xl object-cover ring-2 ring-brand-500/30"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{item.name}</span>
                    {item.isMe && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-600 text-white font-black">
                        YOU
                      </span>
                    )}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {item.levelTier} • {item.skills?.topSkill || 'Grammar Practice'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 sm:gap-10 text-xs font-bold">
                <span className="hidden sm:flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-extrabold">
                  {item.marks?.percentage || 90}%
                </span>

                <span className="hidden sm:flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {item.streak}d
                </span>

                <span className="text-sm font-black text-brand-600 dark:text-brand-400 min-w-[70px] text-right">
                  {item.xp} XP
                </span>

                <button
                  onClick={() => setSelectedStudentForAnalysis(item)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-brand-600 font-bold hover:underline"
                  title="View Skill & Marks Analysis"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Skills & Marks Analysis Modal */}
      <StudentAnalysisModal
        student={selectedStudentForAnalysis}
        isOpen={!!selectedStudentForAnalysis}
        onClose={() => setSelectedStudentForAnalysis(null)}
      />
    </div>
  );
};
