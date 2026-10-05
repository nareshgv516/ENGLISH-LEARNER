import React, { useState } from 'react';
import { 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';
import { placementQuestions, calculatePlacementLevel } from '../data/placementTestData';
import { grammarLessons } from '../data/grammarLessons';
import { useLearning } from '../context/LearningContext';

export const PlacementTestPage = ({ onNavigate }) => {
  const { setLearningLevel, addXP } = useLearning();

  const [testState, setTestState] = useState('intro'); // 'intro' | 'testing' | 'result'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultAssessment, setResultAssessment] = useState(null);

  const currentQ = placementQuestions[currentIndex];

  const handleStart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setTestState('testing');
  };

  const handleSelectOption = (optIdx) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: optIdx }));
  };

  const handleNext = () => {
    if (currentIndex < placementQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    let score = 0;
    placementQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        score++;
      }
    });

    const levelData = calculatePlacementLevel(score);
    setResultAssessment({ score, total: placementQuestions.length, ...levelData });
    setLearningLevel(levelData.level);
    addXP(100, 'Placement Test Completed');
    setTestState('result');
  };

  // ==================== SCREEN 1: INTRO ====================
  if (testState === 'intro') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn pb-16">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white flex items-center justify-center mx-auto shadow-elevated mb-2">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white">
            Grammar Level Placement Test
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Take our 20-question diagnostic test to benchmark your English level and receive a customized study plan.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <span className="p-1 rounded-lg bg-brand-50 text-brand-600 font-bold shrink-0">1</span>
              <p><strong>20 Calibrated Questions:</strong> Spanning fundamental tenses to advanced inversion and punctuation.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="p-1 rounded-lg bg-brand-50 text-brand-600 font-bold shrink-0">2</span>
              <p><strong>Takes approximately 8-10 minutes:</strong> No rush; take your time to read each sentence carefully.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="p-1 rounded-lg bg-brand-50 text-brand-600 font-bold shrink-0">3</span>
              <p><strong>Personalized Roadmap:</strong> Instantly unlock lesson recommendations mapped to your performance.</p>
            </div>
          </div>

          {/* Academic Disclaimer Callout */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500">
            <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <p>
              <strong>Educational Disclaimer:</strong> This assessment provides a helpful diagnostic learning-placement estimate for your study journey on GrammarLearner AI. It is not an official IELTS, TOEFL, or Cambridge certification.
            </p>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-sky-500 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-black font-display text-base shadow-elevated transition-all btn-press"
          >
            Start Level Test (20 Questions)
          </button>
        </div>
      </div>
    );
  }

  // ==================== SCREEN 2: TESTING ====================
  if (testState === 'testing') {
    const userChoice = answers[currentIndex];
    const progressPercent = Math.round(((currentIndex + 1) / placementQuestions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16">
        {/* Progress Tracker */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500">
              Question <strong className="text-slate-900 dark:text-white">{currentIndex + 1}</strong> of {placementQuestions.length}
            </span>
            <span className="text-brand-600 dark:text-brand-400 font-mono">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
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

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400">
              {userChoice === undefined ? 'Select one choice to proceed' : 'Option selected'}
            </span>

            <button
              onClick={handleNext}
              disabled={userChoice === undefined}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 btn-press"
            >
              <span>{currentIndex < placementQuestions.length - 1 ? 'Next Question' : 'Complete Assessment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SCREEN 3: RESULTS ====================
  if (testState === 'result' && resultAssessment) {
    const recommendedLessons = grammarLessons.filter(l => resultAssessment.recommendedTopics.includes(l.id));

    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-16">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white flex items-center justify-center mx-auto shadow-elevated">
            <GraduationCap className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Placement Diagnostic Complete
            </span>
            <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white mt-1">
              Your Current Learning Level: <span className={resultAssessment.color}>{resultAssessment.level}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-2 leading-relaxed">
              {resultAssessment.description}
            </p>
          </div>

          {/* Score Badge */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 inline-flex items-center gap-4 border border-slate-200/60 dark:border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Assessment Score</span>
              <span className="text-2xl font-black font-display text-brand-600 dark:text-brand-400">
                {resultAssessment.score} / {resultAssessment.total} Correct
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Reward</span>
              <span className="text-sm font-black text-amber-500">+100 XP Earned</span>
            </div>
          </div>

          {/* Recommended Lessons */}
          <div className="text-left space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              Tailored Lessons Recommended for {resultAssessment.level} Level:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => onNavigate('lesson-detail', lesson.id)}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 hover:border-brand-500 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                      {lesson.title}
                    </span>
                    <span className="text-slate-400">{lesson.readTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {lesson.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <button
              onClick={() => onNavigate('grammar')}
              className="py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All {resultAssessment.level} Lessons</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
