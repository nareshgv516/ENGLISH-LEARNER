import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  Check, 
  HelpCircle,
  Clock,
  ArrowRight,
  Share2,
  Volume2,
  Copy,
  Lightbulb
} from 'lucide-react';
import { grammarLessons } from '../data/grammarLessons';
import { useLearning } from '../context/LearningContext';
import { speechService } from '../services/speechService';
import { GrammarCheatSheetModal } from '../components/GrammarCheatSheetModal';

export const LessonDetailPage = ({ lessonId, onNavigate }) => {
  const { completedLessons, completeLesson, addXP } = useLearning();
  
  // Find current lesson or fallback to first
  const lesson = grammarLessons.find(l => l.id === lessonId) || grammarLessons[0];
  const isCompleted = completedLessons.includes(lesson.id);

  // Audio speech, formula copy & cheat sheet modal state
  const [activeSpeechText, setActiveSpeechText] = useState(null);
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  // Mini-practice state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedPractice, setSubmittedPractice] = useState(false);

  const handleSpeak = (text) => {
    setActiveSpeechText(text);
    speechService.speak(text, { rate: 0.88 });
    setTimeout(() => setActiveSpeechText(null), 1500);
  };

  const handleCopyFormula = () => {
    if (lesson.rule?.formula) {
      navigator.clipboard.writeText(lesson.rule.formula);
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2000);
    }
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (submittedPractice) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitPractice = () => {
    setSubmittedPractice(true);
    // Award +5 XP for each correct mini practice answer
    let correctCount = 0;
    lesson.practice?.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });
    if (correctCount > 0) {
      addXP(correctCount * 5, 'Lesson Practice Check');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Top Navigation & Status Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('grammar')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Grammar Lessons</span>
        </button>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800">
              <Check className="w-4 h-4" />
              Lesson Mastered
            </span>
          ) : (
            <button
              onClick={() => completeLesson(lesson.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all btn-press"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Complete (+20 XP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-700 text-white shadow-card relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
            {lesson.level} Level
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-brand-100 text-xs font-semibold capitalize">
            {lesson.category.replace('-', ' ')}
          </span>
          <span className="flex items-center gap-1 text-xs text-brand-200 ml-auto font-medium">
            <Clock className="w-3.5 h-3.5" />
            {lesson.readTime} study time
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white mb-3">
          {lesson.title}
        </h1>

        <p className="text-sm sm:text-base text-brand-100 max-w-2xl leading-relaxed">
          {lesson.explanation}
        </p>
      </div>

      {/* THE GRAMMATICAL RULE & FORMULA BOX */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Grammar Rule & Core Formula
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Standard Structure
            </span>
            <button
              onClick={handleCopyFormula}
              className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 p-1 rounded-lg hover:bg-brand-100/60 transition-colors"
              title="Copy formula"
            >
              {copiedFormula ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFormula ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <div className="text-base sm:text-lg font-mono font-bold text-brand-900 dark:text-brand-200">
            {lesson.rule.formula}
          </div>
          {lesson.rule.heSheItRule && (
            <div className="mt-3 pt-3 border-t border-brand-200/60 dark:border-brand-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-brand-700 dark:text-brand-400">Special Inflection Rule:</strong>{' '}
              {lesson.rule.heSheItRule}
            </div>
          )}
        </div>

        {/* Negative and Question Formulas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {lesson.rule.negativeFormula && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Negative Formula
              </span>
              <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                {lesson.rule.negativeFormula}
              </span>
            </div>
          )}
          {lesson.rule.questionFormula && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Question Formula
              </span>
              <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                {lesson.rule.questionFormula}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* AUTHENTIC EXAMPLES */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Contextual Real-Life Examples
            </h2>
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-brand-500" />
            Tap speaker to listen
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.examples.map((ex, idx) => {
            const isSpeaking = activeSpeechText === ex.sentence;
            return (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-md bg-brand-100/80 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                      {ex.type}
                    </span>
                    <button
                      onClick={() => handleSpeak(ex.sentence)}
                      className={`p-1.5 rounded-lg transition-all ${
                        isSpeaking
                          ? 'bg-brand-600 text-white scale-110 shadow-xs'
                          : 'text-slate-400 hover:text-brand-600 hover:bg-white dark:hover:bg-slate-800'
                      }`}
                      title="Listen to native pronunciation"
                      aria-label="Listen to example sentence"
                    >
                      <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mt-2">
                    "{ex.sentence}"
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                  Note: {ex.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SENTENCE FORMS (POSITIVE, NEGATIVE, QUESTIONS) */}
      {lesson.sentenceForms && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Sentence Form Variations
            </h2>
            <span className="text-xs text-slate-400">Audio available on tap</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Positive */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2.5 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Positive (+)
              </span>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {lesson.sentenceForms.positive.map((sent, i) => (
                  <li key={i} className="flex items-start justify-between gap-1.5 group">
                    <div className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{sent}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(sent)}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:text-brand-600 transition-opacity shrink-0"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Negative */}
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5 mb-2.5 uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                Negative (-)
              </span>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {lesson.sentenceForms.negative.map((sent, i) => (
                  <li key={i} className="flex items-start justify-between gap-1.5 group">
                    <div className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{sent}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(sent)}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:text-brand-600 transition-opacity shrink-0"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions */}
            <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/30">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1.5 mb-2.5 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                Questions (?)
              </span>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {lesson.sentenceForms.questions.map((sent, i) => (
                  <li key={i} className="flex items-start justify-between gap-1.5 group">
                    <div className="flex items-start gap-1.5">
                      <span className="text-sky-500 font-bold">•</span>
                      <span>{sent}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(sent)}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:text-brand-600 transition-opacity shrink-0"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* COMMON MISTAKES TO AVOID */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Common Mistakes & How to Fix Them
            </h2>
          </div>

          <div className="space-y-3">
            {lesson.commonMistakes.map((m, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm">
                  <span className="text-rose-600 dark:text-rose-400 font-semibold line-through flex items-center gap-1">
                    ❌ {m.wrong}
                  </span>
                  <span className="hidden sm:inline text-slate-400">➔</span>
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                    ✅ {m.correct}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-300">Why?</strong> {m.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KEY POINTS TO LEARN EASILY & MEMORY SHORTCUTS */}
      {lesson.keyTips && (
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-50/70 via-indigo-50/40 to-sky-50/50 dark:from-slate-900 dark:via-slate-850 dark:to-indigo-950/30 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-200/50 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Key Points to Learn Easily
                </h3>
                <p className="text-[11px] text-slate-500">
                  Quick memory triggers and high-yield rules of thumb
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCheatSheetOpen(true)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400 hover:border-brand-400 shadow-2xs transition-all self-start sm:self-auto flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Open Master Cheat Sheet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {lesson.keyTips.map((tip, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700 shadow-2xs flex flex-col justify-between space-y-2 group hover:border-brand-400 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      #{idx + 1}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                      {tip}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSpeak(tip)}
                    className="p-1 rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-700 shrink-0 transition-colors"
                    title="Listen to tip"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase pt-1 border-t border-slate-100 dark:border-slate-700/60">
                  <span className="text-amber-600 dark:text-amber-400 font-black">Rule of Thumb</span>
                  <span className="text-slate-400">Easy Retention</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHECK YOUR UNDERSTANDING (MINI-PRACTICE) */}
      {lesson.practice && lesson.practice.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Check Your Understanding
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Answer these mini practice questions to solidify your mastery
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600">
              {lesson.practice.length} Questions
            </span>
          </div>

          <div className="space-y-6">
            {lesson.practice.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correct;

              return (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {qIndex + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIndex) => {
                      let optionClasses = 'p-3 rounded-xl border transition-all text-left font-semibold cursor-pointer ';
                      
                      if (!submittedPractice) {
                        optionClasses += selected === optIndex
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300';
                      } else {
                        if (optIndex === q.correct) {
                          optionClasses += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold';
                        } else if (selected === optIndex && !isCorrect) {
                          optionClasses += 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300';
                        } else {
                          optionClasses += 'border-slate-200 dark:border-slate-800 opacity-60 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          disabled={submittedPractice}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          className={optionClasses}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {submittedPractice && (
                    <div className={`p-3 rounded-xl text-xs ${
                      isCorrect 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200' 
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200'
                    }`}>
                      <p className="font-bold mb-0.5">
                        {isCorrect ? '✅ Well done!' : '❌ Needs Review:'}
                      </p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submittedPractice ? (
            <button
              onClick={handleSubmitPractice}
              disabled={Object.keys(selectedAnswers).length < lesson.practice.length}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-sm shadow-sm transition-all btn-press"
            >
              Check Answers & Claim XP
            </button>
          ) : (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                You earned XP for your answers!
              </span>
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmittedPractice(false);
                }}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Completion Action Footer */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Finished reading this lesson?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Marking it complete saves your progress and updates your learning statistics.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!isCompleted ? (
            <button
              onClick={() => completeLesson(lesson.id)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Complete Lesson (+20 XP)</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('practice')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Practice More Questions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Cheat Sheet & Key Points Modal */}
      <GrammarCheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onSelectLesson={(targetId) => {
          setIsCheatSheetOpen(false);
          onNavigate('lesson-detail', targetId);
        }}
      />
    </div>
  );
};
