import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, PenTool, Sparkles, ArrowRight } from 'lucide-react';
import { grammarLessons } from '../data/grammarLessons';
import { vocabularyWords } from '../data/vocabularyData';
import { practiceQuestions } from '../data/practiceQuestions';

export const SearchModal = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate('search-open');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search matches
  const lessonMatches = trimmed
    ? grammarLessons.filter(l =>
        l.title.toLowerCase().includes(trimmed) ||
        l.category.toLowerCase().includes(trimmed) ||
        l.summary.toLowerCase().includes(trimmed) ||
        (l.explanation && l.explanation.toLowerCase().includes(trimmed)) ||
        l.level.toLowerCase().includes(trimmed)
      ).slice(0, 6)
    : [];

  const vocabMatches = trimmed
    ? vocabularyWords.filter(v =>
        v.word.toLowerCase().includes(trimmed) ||
        v.meaning.toLowerCase().includes(trimmed) ||
        v.category.toLowerCase().includes(trimmed) ||
        (v.example && v.example.toLowerCase().includes(trimmed))
      ).slice(0, 6)
    : [];

  const practiceMatches = trimmed
    ? practiceQuestions.filter(p =>
        p.topic.toLowerCase().includes(trimmed) ||
        p.question.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const totalResults = lessonMatches.length + vocabMatches.length + practiceMatches.length;

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (lessonMatches.length > 0) {
        onNavigate('lesson-detail', lessonMatches[0].id);
        onClose();
      } else if (vocabMatches.length > 0) {
        onNavigate('vocabulary');
        onClose();
      } else if (practiceMatches.length > 0) {
        onNavigate('practice');
        onClose();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search grammar lessons, words, rules, questions (e.g. 'Present Perfect')..."
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-1.5"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 mr-2">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Close Search"
            aria-label="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="py-8 text-center">
              <Sparkles className="w-8 h-8 text-brand-500 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Type a topic, tense, vocabulary word, or rule
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                {['Present Simple', 'Conditionals', 'Articles', 'Beautiful', 'Passive Voice'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/60 dark:hover:text-brand-400 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No results found for "{query}".</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "tenses", "prepositions", "diligent", or "practice".</p>
            </div>
          )}

          {/* Lessons Section */}
          {lessonMatches.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-brand-500" />
                Grammar Lessons ({lessonMatches.length})
              </div>
              <div className="space-y-1.5">
                {lessonMatches.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      onNavigate('lesson-detail', lesson.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {lesson.title}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                          {lesson.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {lesson.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vocabulary Section */}
          {vocabMatches.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-accent-500" />
                Vocabulary Words ({vocabMatches.length})
              </div>
              <div className="space-y-1.5">
                {vocabMatches.map((vocab) => (
                  <button
                    key={vocab.id}
                    onClick={() => {
                      onNavigate('vocabulary');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-950/40 text-left transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-accent-600 dark:group-hover:text-accent-400">
                          {vocab.word}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {vocab.ipa}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent-100/60 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300 font-medium">
                          {vocab.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {vocab.meaning}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Practice Section */}
          {practiceMatches.length > 0 && (
            <div>
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                <PenTool className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                Practice Questions ({practiceMatches.length})
              </div>
              <div className="space-y-1.5">
                {practiceMatches.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onNavigate('practice');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mr-2 uppercase">
                        {q.topic}
                      </span>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1 mt-0.5">
                        {q.question}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC or click outside to dismiss</span>
          <span>Tip: Use ↑ ↓ to navigate</span>
        </div>
      </div>
    </div>
  );
};
