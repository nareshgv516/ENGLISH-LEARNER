import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  BookOpen, 
  PenTool, 
  Target, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Brain, 
  BarChart2, 
  Zap,
  Bot,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { CircularProgress } from '../components/CircularProgress';
import { PersonalizedRecommendations } from '../components/PersonalizedRecommendations';
import { grammarLessons } from '../data/grammarLessons';
import { sampleLeaderboardUsers } from '../data/leaderboardData';
import { StudentAnalysisModal } from '../components/StudentAnalysisModal';

export const DashboardPage = ({ onNavigate }) => {
  const [selectedStudentForAnalysis, setSelectedStudentForAnalysis] = useState(null);
  const { 
    user, 
    streak, 
    xp, 
    currentTier, 
    completedLessons, 
    dailyGoal, 
    studyTimeMinutes, 
    grammarAccuracy, 
    highestQuizScore,
    currentLessonId
  } = useLearning();

  // Calculate overall grammar progress percentage
  const totalLessons = grammarLessons.length;
  const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100);

  // Current Lesson to Continue
  const activeLesson = grammarLessons.find(l => l.id === currentLessonId) || grammarLessons[0];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Welcome & Level Header with Student Photo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-700 text-white shadow-card relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10 text-center sm:text-left">
          {/* Display Student's Photo on the Web */}
          <div className="relative shrink-0 group">
            <img
              src={user.avatar || '/students/ananya.jpg'}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-lg group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-brand-900 flex items-center justify-center text-[10px] text-brand-950 font-black shadow-xs" title="Student Active">
              ✓
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                {user.level} Level
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-300">
                <Flame className="w-4 h-4 fill-amber-300" />
                {streak} Day Streak
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[11px] font-bold border border-emerald-400/30">
                ● Student Profile Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              Welcome back, {user.name}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-brand-100 max-w-xl">
              Your student profile and weekly performance are synced. Complete today's targets to earn XP and level up!
            </p>
          </div>
        </div>

        {/* Tier / XP Pill on the right */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 self-stretch sm:self-auto justify-between sm:justify-start shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-amber-300 font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-brand-100 uppercase tracking-wider block">
              Current Rank & Tier
            </span>
            <span className="text-base font-black text-white">
              {currentTier.title} (Lv {currentTier.levelNum})
            </span>
            <span className="text-xs text-brand-200 block font-semibold">
              {xp} Total XP Points
            </span>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Lessons Done</span>
            <BookOpen className="w-4 h-4 text-brand-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-display text-slate-900 dark:text-white">
              {completedLessons.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {totalLessons} topics</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Grammar Accuracy</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
              {grammarAccuracy}%
            </span>
            <span className="text-xs text-slate-400 font-medium">practice precision</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Best Quiz Score</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-display text-amber-600 dark:text-amber-400">
              {highestQuizScore}%
            </span>
            <span className="text-xs text-slate-400 font-medium">high score</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Learning Time</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-display text-slate-900 dark:text-white">
              {studyTimeMinutes}
            </span>
            <span className="text-xs text-slate-400 font-medium">total minutes</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Circular Progress & Continue Learning + Daily Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Circular Progress & Continue Learning (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="shrink-0">
              <CircularProgress 
                percentage={progressPercentage}
                size={160}
                label="Grammar Progress"
                sublabel={`${completedLessons.length} of ${totalLessons} finished`}
              />
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                Continue Learning
              </span>
              <h2 className="text-xl font-black font-display text-slate-900 dark:text-white">
                {activeLesson.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {activeLesson.summary}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                <button
                  onClick={() => onNavigate('lesson-detail', activeLesson.id)}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-2 btn-press"
                >
                  <span>Resume Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('practice')}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
                >
                  Quick Practice
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Lesson Summary Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Category: <strong className="text-slate-700 dark:text-slate-300 capitalize">{activeLesson.category}</strong></span>
            <span>Difficulty: <strong className="text-slate-700 dark:text-slate-300">{activeLesson.level}</strong></span>
          </div>
        </div>

        {/* Daily Goal Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Today's Goal
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {dailyGoal.questionsCompleted} / {dailyGoal.questionsTarget} questions
              </span>
            </div>

            {/* Questions Progress */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-brand-500" />
                    20 Questions
                  </span>
                  <span className="text-brand-600 dark:text-brand-400 font-bold">
                    {dailyGoal.questionsCompleted} / {dailyGoal.questionsTarget} completed
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (dailyGoal.questionsCompleted / dailyGoal.questionsTarget) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Grammar Lesson Goal */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    1 Grammar Lesson
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {dailyGoal.lessonsCompleted >= 1 ? '1 / 1 Completed' : '0 / 1 In Progress'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (dailyGoal.lessonsCompleted / dailyGoal.lessonsTarget) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Vocabulary Goal */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-purple-500" />
                    10 Vocabulary Words
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    {dailyGoal.vocabCompleted} / {dailyGoal.vocabTarget} reviewed
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (dailyGoal.vocabCompleted / dailyGoal.vocabTarget) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('daily-challenge')}
            className="mt-6 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 fill-white" />
            <span>Open Today's Daily Challenge</span>
          </button>
        </div>
      </div>

      {/* Smart AI Personalized Learning Recommendations */}
      <PersonalizedRecommendations onNavigate={onNavigate} />

      {/* TOP 5 STUDENTS SECTION ON DASHBOARD */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Top 5 Students This Week
              </h2>
              <p className="text-xs text-slate-400">
                Highest achieving learners on GrammarLearner AI
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Leaderboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5 pt-1">
          {sampleLeaderboardUsers.slice(0, 5).map((student, idx) => {
            const rankBadges = ['🥇 1st', '🥈 2nd', '🥉 3rd', '⭐ 4th', '⭐ 5th'];
            const rankBorder = [
              'border-amber-400 dark:border-amber-500/60 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/30 dark:to-slate-900',
              'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900',
              'border-amber-600/50 dark:border-amber-800/50 bg-white dark:bg-slate-900',
              'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900',
              'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            ];

            const marks = student.marks || { percentage: 92, grade: 'A', total: 460, max: 500 };
            const skills = student.skills || { topSkill: 'Grammar Accuracy' };

            return (
              <div
                key={student.id}
                className={`p-3.5 rounded-2xl border-2 ${rankBorder[idx]} flex flex-col justify-between text-left sm:text-center gap-2.5 transition-all hover:-translate-y-1 hover:shadow-card group`}
              >
                {/* Badge & Streak */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {rankBadges[idx]}
                  </span>
                  <span className="text-amber-500 flex items-center gap-0.5 text-[10px] font-bold">
                    <Flame className="w-3 h-3 fill-amber-500" />
                    {student.streak}d
                  </span>
                </div>

                {/* Student Photo */}
                <div className="flex sm:flex-col items-center gap-2.5 sm:gap-2">
                  <div className="relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-[125px]">
                      {student.name}
                    </h3>
                    <span className="text-[10px] text-brand-600 dark:text-brand-400 block font-semibold">
                      {student.levelTier}
                    </span>
                  </div>
                </div>

                {/* Marks & Skill Box */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[10px] space-y-1 text-left">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-400">Marks:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                      {marks.percentage}%
                    </span>
                  </div>
                  <div className="truncate text-slate-500 dark:text-slate-400 text-[9px] font-medium">
                    🎯 {skills.topSkill}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setSelectedStudentForAnalysis(student)}
                  className="w-full py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-[10px] font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Analysis</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Hub */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Quick Practice Hub
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('quiz')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 text-left transition-all group shadow-2xs hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Timed Quiz
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              10, 20 or 30 Qs
            </p>
          </button>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500 text-left transition-all group shadow-2xs hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              AI Checker
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instant explanations
            </p>
          </button>

          <button
            onClick={() => onNavigate('writing')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 text-left transition-all group shadow-2xs hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Essay Writing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instant rubric grading
            </p>
          </button>

          <button
            onClick={() => onNavigate('pronunciation')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-rose-500 text-left transition-all group shadow-2xs hover:shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Speech Practice
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Voice recognition
            </p>
          </button>
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
