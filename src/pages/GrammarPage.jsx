import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Filter,
  Check,
  X,
  FileText,
  Lightbulb,
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';
import { grammarCategories, grammarLessons } from '../data/grammarLessons';
import { useLearning } from '../context/LearningContext';
import { GrammarCheatSheetModal } from '../components/GrammarCheatSheetModal';

export const GrammarPage = ({ onNavigate }) => {
  const { completedLessons } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  // Level statistics
  const beginnerCount = grammarLessons.filter(l => l.level === 'Beginner').length;
  const elementaryCount = grammarLessons.filter(l => l.level === 'Elementary').length;
  const intermediateCount = grammarLessons.filter(l => l.level === 'Intermediate').length;
  const advancedCount = grammarLessons.filter(l => l.level === 'Advanced').length;

  // Filter lessons
  const filteredLessons = grammarLessons.filter((lesson) => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || lesson.level.toLowerCase() === selectedLevel.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = q === '' || 
      lesson.title.toLowerCase().includes(q) ||
      lesson.summary.toLowerCase().includes(q) ||
      lesson.category.toLowerCase().includes(q) ||
      (lesson.explanation && lesson.explanation.toLowerCase().includes(q)) ||
      lesson.level.toLowerCase().includes(q);
    return matchesCategory && matchesLevel && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
              Grammar Master Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              32 Lessons
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Complete English syllabus from fundamental sentence mechanics to advanced subjunctive moods & inversion
          </p>
        </div>

        {/* Action Controls & Study Progress */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsCheatSheetOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all group"
          >
            <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Grammar Cheat Sheet</span>
            <span className="px-1.5 py-0.2 bg-white/20 rounded text-[9px] uppercase tracking-wide">Quick Ref</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              {completedLessons.length}/{grammarLessons.length}
            </span>
            <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-brand-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round((completedLessons.length / grammarLessons.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Pro-Tip Spotlight Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-sky-500/10 dark:from-amber-950/40 dark:via-brand-950/40 dark:to-sky-950/40 border border-amber-200/80 dark:border-amber-900/60 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                Grammar Golden Rule
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Phrasal Verb Pronoun Rule
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
              When using separable phrasal verbs with pronoun objects (<em>it, me, them, her, him</em>), the pronoun <strong>MUST</strong> sit between the verb and particle: <strong>"Turn it off"</strong> (never <em>"turn off it"</em>)!
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            onNavigate('lesson-detail', 'phrasal-verbs-mastery');
          }}
          className="self-start md:self-center shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-bold text-xs shadow-2xs transition-colors"
        >
          <span>Explore Lesson</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* QUICK KEY POINTS TO LEARN EASILY */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Key Points to Learn Easily (Fast Memorization)
              </h3>
              <p className="text-[11px] text-slate-500">
                Core memory rules of thumb you can apply to 90% of everyday English sentences
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheatSheetOpen(true)}
            className="text-xs font-black text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open All 10 Rules & Fixes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 shadow-2xs space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">Time Rule</span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Since vs For</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              <strong>Since</strong> = starting point (since 2020). <strong>For</strong> = count of duration (for 4 years).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 shadow-2xs space-y-1">
            <span className="text-[10px] font-black uppercase text-brand-600 dark:text-brand-400">Word Order</span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">OSASCOMP</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Adjective order: <em>Opinion → Size → Age → Shape → Color → Origin → Material → Purpose</em>.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 shadow-2xs space-y-1">
            <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">Agreement</span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Singular "S" Anchor</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Only <em>He/She/It</em> takes an -s in present simple. Plural nouns have "s", singular verbs take "s".
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 shadow-2xs space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Voice Shortcut</span>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Active vs Passive</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Actor upfront? <strong>Active</strong>. Receiver upfront or actor unknown? <strong>Passive</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Interactive Level Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'Beginner', count: beginnerCount, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800/60' },
          { id: 'Elementary', count: elementaryCount, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/40', border: 'border-sky-200 dark:border-sky-800/60' },
          { id: 'Intermediate', count: intermediateCount, color: 'text-brand-600 dark:text-brand-400', bg: 'bg-brand-50 dark:bg-brand-950/40', border: 'border-brand-200 dark:border-brand-800/60' },
          { id: 'Advanced', count: advancedCount, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/40', border: 'border-purple-200 dark:border-purple-800/60' }
        ].map((lvl) => {
          const isSelected = selectedLevel.toLowerCase() === lvl.id.toLowerCase();
          return (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(isSelected ? 'all' : lvl.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'ring-2 ring-brand-500 shadow-md bg-white dark:bg-slate-900 border-brand-500'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${lvl.bg} ${lvl.color}`}>
                  {lvl.id}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{lvl.count} topics</span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                {lvl.id === 'Beginner' ? 'Core Foundation' : lvl.id === 'Elementary' ? 'Sentence Mechanics' : lvl.id === 'Intermediate' ? 'Fluent Fluency' : 'Scholar Mastery'}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search grammar lessons, tenses, rules, subjunctive, phrasal verbs..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {['all', 'Beginner', 'Elementary', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedLevel === lvl
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {lvl === 'all' ? `All (${grammarLessons.length})` : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Topics ({grammarLessons.length})
          </button>
          {grammarCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            No matching grammar lessons found
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search keywords or switching filters to view all lessons.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => onNavigate('lesson-detail', lesson.id)}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 shadow-2xs hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {lesson.level}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-900/40">
                        <Check className="w-3 h-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {lesson.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {lesson.summary}
                  </p>

                  {/* Formula Preview Box */}
                  {lesson.rule?.formula && (
                    <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/80 font-mono text-[11px] text-brand-700 dark:text-brand-300 line-clamp-1">
                      {lesson.rule.formula}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 capitalize">
                    {lesson.category.replace('-', ' ')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                    <span>Study Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Grammar Reference & Cheat Sheet Modal */}
      <GrammarCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onSelectLesson={(lessonId) => onNavigate('lesson-detail', lessonId)}
      />
    </div>
  );
};
