import React from 'react';
import { 
  Trophy, 
  Lock, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Zap,
  Star
} from 'lucide-react';
import { achievementsData } from '../data/achievementsData';
import { useLearning } from '../context/LearningContext';

export const AchievementsPage = () => {
  const { unlockedAchievements, xp, currentTier } = useLearning();

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievementsData.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-200" />
            <span>Milestone Honors</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Achievements & Badges
          </h1>

          <p className="text-xs sm:text-sm text-amber-100 max-w-lg">
            Complete milestones, maintain consistency streaks, master lessons, and unlock exclusive EdTech achievements!
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center self-stretch sm:self-auto min-w-[160px]">
          <span className="text-[11px] font-bold text-amber-100 uppercase tracking-wider block">
            Badges Unlocked
          </span>
          <span className="text-3xl font-black font-display text-white mt-0.5 block">
            {unlockedCount} / {totalCount}
          </span>
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievementsData.map((item) => {
          const isUnlocked = unlockedAchievements.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                isUnlocked
                  ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-900/60 shadow-card hover:shadow-elevated'
                  : 'bg-slate-50/80 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              {/* Unlocked ambient corner glow */}
              {isUnlocked && (
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              )}

              <div>
                {/* Header: Icon, Status & Tier */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-500 text-white shadow-amber-500/20'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {item.icon}
                  </div>

                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    isUnlocked
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {isUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>

                <h3 className={`text-base font-bold ${
                  isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Footer with XP reward and lock status */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  +{item.xpReward} XP Points
                </span>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>{item.tier} Tier</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
