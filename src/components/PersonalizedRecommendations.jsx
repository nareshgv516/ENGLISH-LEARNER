import React from 'react';
import { Sparkles, ArrowRight, AlertTriangle, Target, BookOpen, CheckCircle } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { grammarLessons } from '../data/grammarLessons';

export const PersonalizedRecommendations = ({ onNavigate }) => {
  const { mistakeHistory, completedLessons, user } = useLearning();

  // Aggregate mistakes by topic
  const topicMistakeCounts = {};
  mistakeHistory.forEach(item => {
    if (item.topic) {
      topicMistakeCounts[item.topic] = (topicMistakeCounts[item.topic] || 0) + 1;
    }
  });

  // Find most frequent mistake topic
  const sortedMistakes = Object.entries(topicMistakeCounts).sort((a, b) => b[1] - a[1]);
  const primaryWeakTopic = sortedMistakes.length > 0 ? sortedMistakes[0][0] : null;

  // Find a matching lesson for the weak topic, or the next uncompleted lesson
  const weakLesson = primaryWeakTopic 
    ? grammarLessons.find(l => l.title.toLowerCase().includes(primaryWeakTopic.toLowerCase()) || primaryWeakTopic.toLowerCase().includes(l.title.toLowerCase()))
    : null;

  const nextUncompletedLesson = grammarLessons.find(l => !completedLessons.includes(l.id)) || grammarLessons[0];

  return (
    <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 dark:from-slate-900/90 dark:via-slate-900 dark:to-indigo-950/40 border border-indigo-100/80 dark:border-indigo-900/40 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recommended For You
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI-driven insights tailored to your learning analytics
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
          Smart AI Plan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommendation Card 1: Mistake targeted or Next milestone */}
        {primaryWeakTopic ? (
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-amber-200/60 dark:border-amber-900/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold mb-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Identified Improvement Area</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                You made mistakes with {primaryWeakTopic}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Our analysis shows recent practice errors in {primaryWeakTopic}. Strengthening this will boost your accuracy.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                Practice {primaryWeakTopic} – 10 Questions
              </span>
              <button
                onClick={() => onNavigate('practice')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <span>Practice Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-emerald-200/60 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Accuracy Peak</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Outstanding Accuracy!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                You're answering questions with high precision. Ready to take on a challenge?
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                Take a 20-Question Timed Quiz
              </span>
              <button
                onClick={() => onNavigate('quiz')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <span>Start Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Recommendation Card 2: Next Logical Lesson */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-bold mb-1.5">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Next Core Lesson</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {nextUncompletedLesson.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {nextUncompletedLesson.summary}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Level: {nextUncompletedLesson.level} • {nextUncompletedLesson.readTime}
            </span>
            <button
              onClick={() => onNavigate('lesson-detail', nextUncompletedLesson.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <span>Learn Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
