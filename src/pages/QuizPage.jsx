import React, { useState, useEffect, useRef } from 'react';
import { 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Sparkles,
  ChevronRight,
  Eye,
  Home
} from 'lucide-react';
import { practiceQuestions } from '../data/practiceQuestions';
import { useLearning } from '../context/LearningContext';

export const QuizPage = ({ onNavigate }) => {
  const { recordQuizResult } = useLearning();

  // Setup state
  const [quizState, setQuizState] = useState('setup'); // 'setup' | 'active' | 'results' | 'review'
  const [difficulty, setDifficulty] = useState('Medium'); // 'Easy' | 'Medium' | 'Hard'
  const [questionCount, setQuestionCount] = useState(10); // 10 | 20 | 30
  
  // Active quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);

  // Results calculation
  const [quizMetrics, setQuizMetrics] = useState({
    total: 10,
    correct: 0,
    wrong: 0,
    percentage: 0,
    xpEarned: 0,
    timeTakenFormatted: '0m 0s'
  });

  // Start timer when quiz active
  useEffect(() => {
    if (quizState === 'active') {
      setTimerSeconds(0);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState]);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}m ${rem < 10 ? '0' : ''}${rem}s`;
  };

  // Start the Quiz
  const handleStartQuiz = () => {
    // Filter questions by level if possible, else take a randomized slice
    let pool = practiceQuestions.filter(q => q.type === 'multiple-choice');
    if (difficulty === 'Easy') {
      pool = pool.filter(q => q.level === 'Beginner' || q.level === 'Elementary');
    } else if (difficulty === 'Hard') {
      pool = pool.filter(q => q.level === 'Intermediate' || q.level === 'Advanced');
    }

    if (pool.length < questionCount) {
      pool = practiceQuestions.filter(q => q.type === 'multiple-choice');
    }

    // Shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, questionCount);
    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setQuizState('active');
  };

  // Select answer for active question
  const handleSelectOption = (idx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: idx
    }));
  };

  // Next Question or Finish
  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  // Finish and compute metrics
  const finishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const total = quizQuestions.length;
    const wrong = total - correctCount;
    const percentage = Math.round((correctCount / total) * 100);
    const timeFormatted = formatTime(timerSeconds);
    const xp = percentage === 100 ? 100 : Math.round((percentage / 100) * 80);

    setQuizMetrics({
      total,
      correct: correctCount,
      wrong,
      percentage,
      xpEarned: xp,
      timeTakenFormatted: timeFormatted
    });

    recordQuizResult({
      score: correctCount,
      total,
      difficulty,
      timeTaken: timeFormatted
    });

    setQuizState('results');
  };

  // ==================== SCREEN 1: SETUP SCREEN ====================
  if (quizState === 'setup') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn pb-16">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white mx-auto shadow-card mb-3">
            <Target className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white">
            Timed Grammar Quiz Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Test your grammatical mastery under realistic timed conditions and earn substantial XP bonuses!
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          {/* Difficulty Tier */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Select Difficulty Tier
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Easy', desc: 'Beginner & Elementary fundamentals' },
                { id: 'Medium', desc: 'Balanced mixed grammar syllabus' },
                { id: 'Hard', desc: 'Advanced inversion & complex clauses' }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    difficulty === d.id
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span className={`block font-bold text-sm ${difficulty === d.id ? 'text-brand-600 dark:text-brand-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {d.id}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {d.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count Option */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Quiz Length
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[10, 20, 30].map((num) => (
                <button
                  key={num}
                  onClick={() => setQuestionCount(num)}
                  className={`py-3 px-4 rounded-2xl border text-center font-bold text-sm transition-all ${
                    questionCount === num
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {num} Questions
                </button>
              ))}
            </div>
          </div>

          {/* Rules Preview Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
            <p>⏱️ <strong>Timer:</strong> Runs live to calculate speed and precision.</p>
            <p>🏆 <strong>Scoring:</strong> Earn up to 100 XP + Perfect Quiz milestone badges.</p>
            <p>🔍 <strong>Review:</strong> Instant in-depth answer explanations available upon completion.</p>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-700 hover:to-sky-600 text-white font-black font-display text-base shadow-elevated hover:shadow-brand-500/30 transition-all btn-press"
          >
            Start Timed Quiz Now
          </button>
        </div>
      </div>
    );
  }

  // ==================== SCREEN 2: ACTIVE QUIZ ====================
  if (quizState === 'active') {
    const q = quizQuestions[currentIndex];
    const progressPercent = Math.round(((currentIndex + 1) / quizQuestions.length) * 100);
    const userChoice = selectedAnswers[currentIndex];

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16">
        {/* Quiz Top Bar with Timer and Progress */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-400">
              Question <strong className="text-slate-900 dark:text-white">{currentIndex + 1}</strong> of {quizQuestions.length}
            </span>
            <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-mono">{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* The Question Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60">
              {q.topic}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {difficulty} Level
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${
                  userChoice === idx
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 shadow-2xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-brand-400'
                }`}
              >
                <span>{String.fromCharCode(65 + idx)}) {opt}</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  userChoice === idx ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300'
                }`}>
                  {userChoice === idx && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </button>
            ))}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400">
              {userChoice === undefined ? 'Select an answer to continue' : 'Answer recorded'}
            </span>

            <button
              onClick={handleNext}
              disabled={userChoice === undefined}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 btn-press"
            >
              <span>{currentIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCREEN 3: QUIZ RESULT SCREEN ====================
  if (quizState === 'results') {
    const isPassing = quizMetrics.percentage >= 70;

    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn pb-16">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card text-center space-y-6">
          {/* Trophy Header */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Quiz Evaluation Complete
            </span>
            <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white mt-1">
              {isPassing ? 'Outstanding Performance! 🎉' : 'Good Effort! Keep Practicing 💪'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              You finished the {difficulty} quiz in {quizMetrics.timeTakenFormatted}.
            </p>
          </div>

          {/* Score Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Score
              </span>
              <span className="text-2xl font-black font-display text-brand-600 dark:text-brand-400">
                {quizMetrics.percentage}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                Correct
              </span>
              <span className="text-2xl font-black font-display text-emerald-700 dark:text-emerald-300">
                {quizMetrics.correct}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40">
              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                Wrong
              </span>
              <span className="text-2xl font-black font-display text-rose-700 dark:text-rose-300">
                {quizMetrics.wrong}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                XP Earned
              </span>
              <span className="text-2xl font-black font-display text-amber-700 dark:text-amber-300">
                +{quizMetrics.xpEarned} XP
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => setQuizState('review')}
              className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Review All Answers & Explanations</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setQuizState('setup')}
                className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Home className="w-4 h-4" />
                <span>Continue Learning</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCREEN 4: ANSWER REVIEW SCREEN ====================
  if (quizState === 'review') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Quiz Answer Review
            </h1>
            <p className="text-xs text-slate-500">
              {quizMetrics.correct} of {quizMetrics.total} answered correctly ({quizMetrics.percentage}%)
            </p>
          </div>
          <button
            onClick={() => setQuizState('results')}
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            Back to Summary
          </button>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q, idx) => {
            const userChoice = selectedAnswers[idx];
            const isCorrect = userChoice === q.correct;

            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Question {idx + 1}</span>
                  <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    isCorrect ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700' : 'bg-rose-100 dark:bg-rose-950 text-rose-700'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {q.question}
                </p>

                <div className="space-y-1.5 text-xs">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        optIdx === q.correct
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                          : userChoice === optIdx && !isCorrect
                            ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                            : 'border-slate-100 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      <span>{String.fromCharCode(65 + optIdx)}) {opt}</span>
                      {optIdx === q.correct && <span className="text-[10px] font-bold uppercase text-emerald-600">Correct Answer</span>}
                      {userChoice === optIdx && !isCorrect && <span className="text-[10px] font-bold uppercase text-rose-600">Your Answer</span>}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Explanation:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return null;
};
