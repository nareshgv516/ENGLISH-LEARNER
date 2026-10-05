import React, { useState } from 'react';
import { 
  PenTool, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Flame, 
  RotateCcw, 
  ArrowRight,
  Filter,
  Check,
  Send,
  Lightbulb
} from 'lucide-react';
import { practiceQuestions } from '../data/practiceQuestions';
import { useLearning } from '../context/LearningContext';

export const PracticePage = ({ onNavigate }) => {
  const { recordQuestionAnswer } = useLearning();

  // Filters
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  // Interactive Question State
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [fillBlankInput, setFillBlankInput] = useState('');
  const [sentenceCorrectionInput, setSentenceCorrectionInput] = useState('');
  const [rearrangedWords, setRearrangedWords] = useState([]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // Filter questions list
  const filteredQuestions = practiceQuestions.filter((q) => {
    const matchesType = selectedType === 'all' || q.type === selectedType;
    const matchesLevel = selectedLevel === 'all' || q.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesType && matchesLevel;
  });

  const currentQ = filteredQuestions[activeQuestionIndex] || filteredQuestions[0];

  // Initialize or reset question interaction
  const resetQuestionState = () => {
    setUserSelectedOption(null);
    setFillBlankInput('');
    setSentenceCorrectionInput('');
    setRearrangedWords([]);
    setTrueFalseAnswer(null);
    setShowHint(false);
    setHasEvaluated(false);
    setIsAnswerCorrect(false);
  };

  const handleNextQuestion = () => {
    resetQuestionState();
    if (activeQuestionIndex < filteredQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      setActiveQuestionIndex(0);
    }
  };

  // Evaluation: Multiple Choice
  const handleSelectMC = (idx) => {
    if (hasEvaluated) return;
    setUserSelectedOption(idx);
    const correct = idx === currentQ.correct;
    setIsAnswerCorrect(correct);
    setHasEvaluated(true);
    recordQuestionAnswer({
      isCorrect: correct,
      topic: currentQ.topic,
      category: currentQ.category
    });
  };

  // Evaluation: Fill in Blank
  const handleEvaluateFillBlank = (e) => {
    e.preventDefault();
    if (hasEvaluated || !fillBlankInput.trim()) return;
    const cleanUser = fillBlankInput.trim().toLowerCase();
    const correct = currentQ.acceptedAnswers.some(ans => ans.toLowerCase() === cleanUser);
    setIsAnswerCorrect(correct);
    setHasEvaluated(true);
    recordQuestionAnswer({
      isCorrect: correct,
      topic: currentQ.topic,
      category: currentQ.category
    });
  };

  // Evaluation: Sentence Correction
  const handleEvaluateSentenceCorrection = (e) => {
    e.preventDefault();
    if (hasEvaluated || !sentenceCorrectionInput.trim()) return;
    const cleanUser = sentenceCorrectionInput.trim().replace(/[.,!?;:]+$/, '').toLowerCase();
    const cleanCorrect = currentQ.correctSentence.replace(/[.,!?;:]+$/, '').toLowerCase();
    
    // Check accepted answers
    const matchesAny = (currentQ.acceptedAnswers || []).some(
      ans => ans.replace(/[.,!?;:]+$/, '').toLowerCase() === cleanUser
    ) || cleanUser === cleanCorrect;

    setIsAnswerCorrect(matchesAny);
    setHasEvaluated(true);
    recordQuestionAnswer({
      isCorrect: matchesAny,
      topic: currentQ.topic,
      category: currentQ.category
    });
  };

  // Evaluation: Rearrange Sentence
  const handleWordClick = (word, index) => {
    if (hasEvaluated) return;
    setRearrangedWords(prev => [...prev, { word, originalIdx: index }]);
  };

  const handleRemoveRearrangedWord = (rearrangedIdx) => {
    if (hasEvaluated) return;
    setRearrangedWords(prev => prev.filter((_, i) => i !== rearrangedIdx));
  };

  const handleEvaluateRearrange = () => {
    if (hasEvaluated || rearrangedWords.length === 0) return;
    const constructed = rearrangedWords.map(w => w.word).join(' ').toLowerCase();
    const target = currentQ.correctSentence.toLowerCase();
    const correct = constructed === target;

    setIsAnswerCorrect(correct);
    setHasEvaluated(true);
    recordQuestionAnswer({
      isCorrect: correct,
      topic: currentQ.topic,
      category: currentQ.category
    });
  };

  // Evaluation: True / False
  const handleSelectTrueFalse = (boolVal) => {
    if (hasEvaluated) return;
    setTrueFalseAnswer(boolVal);
    const correct = boolVal === currentQ.isTrue;
    setIsAnswerCorrect(correct);
    setHasEvaluated(true);
    recordQuestionAnswer({
      isCorrect: correct,
      topic: currentQ.topic,
      category: currentQ.category
    });
  };

  if (!currentQ) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200">
        <PenTool className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          No questions match your current filter.
        </h3>
        <button
          onClick={() => { setSelectedType('all'); setSelectedLevel('all'); }}
          className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
            Interactive Practice Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Solve questions with instant grammar explanations, feedback, and XP rewards
          </p>
        </div>

        <button
          onClick={() => onNavigate('quiz')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
        >
          <span>Switch to Timed Quiz Mode</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Question Types' },
            { id: 'multiple-choice', label: 'Multiple Choice' },
            { id: 'fill-blank', label: 'Fill in Blank' },
            { id: 'sentence-correction', label: 'Sentence Correction' },
            { id: 'rearrange', label: 'Rearrange Words' },
            { id: 'true-false', label: 'True / False' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.id);
                setActiveQuestionIndex(0);
                resetQuestionState();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedType === type.id
                  ? 'bg-brand-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
          <span>Question {activeQuestionIndex + 1} of {filteredQuestions.length}</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Level:</span>
            {['all', 'Beginner', 'Elementary', 'Intermediate', 'Advanced'].map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  setActiveQuestionIndex(0);
                  resetQuestionState();
                }}
                className={`px-2 py-0.5 rounded font-bold ${
                  selectedLevel === lvl ? 'text-brand-600 dark:text-brand-400 underline' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {lvl === 'all' ? 'All' : lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* QUESTION INTERACTIVE CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
        {/* Meta Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900">
              {currentQ.topic}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
              {currentQ.level}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentQ.hint && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Show Hint</span>
              </button>
            )}
            <span className="text-xs font-bold text-slate-400">
              +5 XP for correct answer
            </span>
          </div>
        </div>

        {/* Hint banner if enabled */}
        {showHint && currentQ.hint && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
            <span><strong>Hint:</strong> {currentQ.hint}</span>
          </div>
        )}

        {/* The Prompt / Question */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </h2>
          {currentQ.incorrectSentence && (
            <div className="mt-3 p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/30 font-mono text-sm text-rose-800 dark:text-rose-300">
              ❌ {currentQ.incorrectSentence}
            </div>
          )}
        </div>

        {/* TYPE 1: MULTIPLE CHOICE */}
        {currentQ.type === 'multiple-choice' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => {
              let btnClass = 'p-4 rounded-2xl border text-sm font-semibold transition-all text-left flex items-center justify-between ';
              
              if (!hasEvaluated) {
                btnClass += userSelectedOption === idx
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-700'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/60';
              } else {
                if (idx === currentQ.correct) {
                  btnClass += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (userSelectedOption === idx && !isAnswerCorrect) {
                  btnClass += 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200';
                } else {
                  btnClass += 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectMC(idx)}
                  disabled={hasEvaluated}
                  className={btnClass}
                >
                  <span>{String.fromCharCode(65 + idx)}) {option}</span>
                  {hasEvaluated && idx === currentQ.correct && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                  {hasEvaluated && userSelectedOption === idx && !isAnswerCorrect && (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* TYPE 2: FILL IN THE BLANK */}
        {currentQ.type === 'fill-blank' && (
          <form onSubmit={handleEvaluateFillBlank} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                disabled={hasEvaluated}
                value={fillBlankInput}
                onChange={(e) => setFillBlankInput(e.target.value)}
                placeholder={currentQ.placeholder || 'Type missing word or phrase...'}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {!hasEvaluated && (
                <button
                  type="submit"
                  disabled={!fillBlankInput.trim()}
                  className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Submit</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>
        )}

        {/* TYPE 3: SENTENCE CORRECTION */}
        {currentQ.type === 'sentence-correction' && (
          <form onSubmit={handleEvaluateSentenceCorrection} className="space-y-3">
            <input
              type="text"
              disabled={hasEvaluated}
              value={sentenceCorrectionInput}
              onChange={(e) => setSentenceCorrectionInput(e.target.value)}
              placeholder="Type the corrected sentence here..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {!hasEvaluated && (
              <button
                type="submit"
                disabled={!sentenceCorrectionInput.trim()}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all"
              >
                Submit Sentence Correction
              </button>
            )}
          </form>
        )}

        {/* TYPE 4: REARRANGE SENTENCE */}
        {currentQ.type === 'rearrange' && (
          <div className="space-y-4">
            {/* Word construction area */}
            <div className="min-h-[56px] p-3 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-wrap gap-2 items-center">
              {rearrangedWords.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  Click the words below in the correct order to construct the sentence...
                </span>
              ) : (
                rearrangedWords.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleRemoveRearrangedWord(idx)}
                    disabled={hasEvaluated}
                    className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-xs hover:bg-rose-600 transition-colors"
                  >
                    {item.word} ✕
                  </button>
                ))
              )}
            </div>

            {/* Word pool */}
            <div className="flex flex-wrap gap-2 pt-1">
              {currentQ.scrambledWords.map((w, idx) => {
                const isUsed = rearrangedWords.some(item => item.originalIdx === idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={hasEvaluated || isUsed}
                    onClick={() => handleWordClick(w, idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isUsed 
                        ? 'opacity-30 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-brand-500 shadow-2xs hover:scale-105'
                    }`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>

            {!hasEvaluated && rearrangedWords.length > 0 && (
              <button
                type="button"
                onClick={handleEvaluateRearrange}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Verify Sentence Order
              </button>
            )}
          </div>
        )}

        {/* TYPE 5: TRUE / FALSE */}
        {currentQ.type === 'true-false' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSelectTrueFalse(true)}
              disabled={hasEvaluated}
              className={`py-4 px-6 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                !hasEvaluated
                  ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50'
                  : currentQ.isTrue
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700'
                    : trueFalseAnswer === true
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'opacity-40 border-slate-200'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>True</span>
            </button>

            <button
              onClick={() => handleSelectTrueFalse(false)}
              disabled={hasEvaluated}
              className={`py-4 px-6 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                !hasEvaluated
                  ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-rose-500 hover:bg-rose-50/50'
                  : !currentQ.isTrue
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700'
                    : trueFalseAnswer === false
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'opacity-40 border-slate-200'
              }`}
            >
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>False</span>
            </button>
          </div>
        )}

        {/* EVALUATION FEEDBACK BANNER */}
        {hasEvaluated && (
          <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
            isAnswerCorrect 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isAnswerCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Correct! +5 XP Awarded</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <span>Incorrect. Review the rule below:</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              {currentQ.explanation}
            </p>

            {currentQ.correctSentence && !isAnswerCorrect && (
              <div className="pt-2 text-xs font-semibold">
                Correct version: <strong className="text-emerald-700 dark:text-emerald-400">{currentQ.correctSentence}</strong>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM NAVIGATION CONTROLS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={resetQuestionState}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Question</span>
          </button>

          <button
            onClick={handleNextQuestion}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-brand-600 dark:hover:bg-brand-400 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
