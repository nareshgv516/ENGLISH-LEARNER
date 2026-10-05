import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Brain, 
  PenTool, 
  FileEdit, 
  ArrowRight,
  RotateCcw,
  Check,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Puzzle,
  KeyRound,
  ShieldCheck,
  HelpCircle,
  Trophy,
  Lightbulb,
  Award,
  Calendar,
  X,
  Sparkle,
  Lock,
  Unlock,
  Scroll,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dailyChallenges } from '../data/dailyChallenges';
import { useLearning } from '../context/LearningContext';
import { speechService } from '../services/speechService';
import { soundService } from '../services/soundService';
import { audioRecorderService } from '../services/audioRecorderService';
import { AudioPlayerWidget } from '../components/AudioPlayerWidget';

export const DailyChallengePage = ({ onNavigate }) => {
  const { streak, addXP, completeDailyChallenge, showToast, triggerCelebration } = useLearning();

  // Day selector (0 = Monday .. 6 = Sunday)
  const todayIndex = ((new Date().getDay() + 6) % 7);
  const [selectedDayIdx, setSelectedDayIdx] = useState(todayIndex);
  const activeChallenge = dailyChallenges[selectedDayIdx] || dailyChallenges[0];

  // Core task states
  const [grammarAnswers, setGrammarAnswers] = useState({});
  const [vocabAnswers, setVocabAnswers] = useState({});
  const [sentenceInput, setSentenceInput] = useState('');
  const [sentenceEvaluated, setSentenceEvaluated] = useState(false);
  const [writingInput, setWritingInput] = useState('');
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

  // 1. UNIQUE: AI Voice Pronunciation Sprint states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [recordedSprintAudio, setRecordedSprintAudio] = useState(null);
  const [speechScore, setSpeechScore] = useState(null);
  const [speechDone, setSpeechDone] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const recognitionRef = useRef(null);

  // 2. UNIQUE: Daily Syntax Scramble Puzzle states
  const [availableTiles, setAvailableTiles] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [scrambleSolved, setScrambleSolved] = useState(false);
  const [scrambleError, setScrambleError] = useState(false);
  const [showScrambleHint, setShowScrambleHint] = useState(false);

  // 3. UNIQUE: Mystery Idiom Decryption states
  const [isIdiomRevealed, setIsIdiomRevealed] = useState(false);
  const [idiomClaimed, setIdiomClaimed] = useState(false);
  const [isPlayingIdiomAudio, setIsPlayingIdiomAudio] = useState(false);

  // Celebration Modal
  const [showRewardModal, setShowRewardModal] = useState(false);

  // Reset/Initialize states when switching days
  useEffect(() => {
    setGrammarAnswers({});
    setVocabAnswers({});
    setSentenceInput('');
    setSentenceEvaluated(false);
    setWritingInput('');
    setIsChallengeCompleted(false);

    // Reset Speech
    setIsRecording(false);
    setRecordingSeconds(0);
    setSpokenTranscript('');
    setRecordedSprintAudio(null);
    setSpeechScore(null);
    setSpeechDone(false);
    setSpeechError(null);
    setIsPlayingAudio(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }

    // Initialize & shuffle Scramble words
    if (activeChallenge.sentenceScramble?.words) {
      const shuffled = [...activeChallenge.sentenceScramble.words]
        .map((w, idx) => ({ id: `${idx}-${w}`, text: w }))
        .sort(() => Math.random() - 0.5);
      setAvailableTiles(shuffled);
      setSelectedTiles([]);
      setScrambleSolved(false);
      setScrambleError(false);
      setShowScrambleHint(false);
    }

    // Reset Mystery Idiom
    setIsIdiomRevealed(false);
    setIdiomClaimed(false);
  }, [selectedDayIdx]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // --- Handlers: Core Tasks ---
  const handleSelectGrammar = (qId, optionIdx) => {
    setGrammarAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    soundService.playClick();
  };

  const handleSelectVocab = (qId, optionIdx) => {
    setVocabAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    soundService.playClick();
  };

  const handleVerifySentence = () => {
    setSentenceEvaluated(true);
    soundService.playCorrect();
  };

  // --- Handlers: AI Voice Sprint ---
  const handlePlayModelAudio = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    speechService.speak(activeChallenge.speakingSprint.phrase, { rate: 0.85 });
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4000);
  };

  const handleToggleRecord = async () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsRecording(false);
      try {
        const clip = await audioRecorderService.stopRecording();
        if (clip) {
          setRecordedSprintAudio(clip);
        }
      } catch (e) {
        console.warn('Audio recorder stop error:', e);
      }
      return;
    }

    setSpeechError(null);
    setSpokenTranscript('');
    setRecordedSprintAudio(null);
    setRecordingSeconds(0);

    try {
      await audioRecorderService.startRecording({
        onTick: (sec) => setRecordingSeconds(sec),
        onError: (err) => setSpeechError(err.message)
      });
    } catch (e) {
      setSpeechError(e.message || 'Microphone access failed.');
      return;
    }

    const rec = speechService.createRecognition({
      onStart: () => {
        setIsRecording(true);
      },
      onResult: async ({ transcript }) => {
        setSpokenTranscript(transcript);
        const score = speechService.calculateAccuracy(activeChallenge.speakingSprint.phrase, transcript);
        setSpeechScore(score);

        try {
          const clip = await audioRecorderService.stopRecording();
          if (clip) {
            setRecordedSprintAudio(clip);
          }
        } catch (e) {}

        if (score >= 60) {
          setSpeechDone(true);
          soundService.playCorrect();
          triggerCelebration?.();
          showToast?.('Pronunciation Passed! 🎙️', `Accuracy: ${score}%. Great articulation! (+15 Bonus XP)`, '🌟');
          addXP(15, 'Voice Sprint Cleared');
        } else {
          soundService.playIncorrect();
          showToast?.('Good Effort! 🎯', `Accuracy: ${score}%. Listen to the model and try again!`, '🎙️');
        }
      },
      onError: (err) => {
        setIsRecording(false);
        setSpeechError(err.message || 'Microphone error. Check permissions.');
        audioRecorderService.cleanup();
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });

    if (rec) {
      recognitionRef.current = rec;
      try {
        rec.start();
      } catch (err) {
        console.error(err);
        setIsRecording(false);
        setSpeechError('Could not start microphone. Check browser permissions.');
        audioRecorderService.cleanup();
      }
    } else {
      setSpeechError('Speech recognition is not supported in this browser. You can click "Mark Practiced Out Loud" below.');
    }
  };

  const handleFallbackSpeech = () => {
    setSpeechDone(true);
    soundService.playCorrect();
    showToast?.('Pronunciation Practiced! 🎙️', 'Spoken out loud with phoneme focus. (+10 Bonus XP)', '🗣️');
    addXP(10, 'Voice Sprint Practiced');
  };

  // --- Handlers: Syntax Scramble Puzzle ---
  const handleSelectWordTile = (tile) => {
    setAvailableTiles(prev => prev.filter(t => t.id !== tile.id));
    setSelectedTiles(prev => [...prev, tile]);
    setScrambleError(false);
    soundService.playClick();
  };

  const handleDeselectWordTile = (tile) => {
    setSelectedTiles(prev => prev.filter(t => t.id !== tile.id));
    setAvailableTiles(prev => [...prev, tile]);
    setScrambleError(false);
    soundService.playClick();
  };

  const handleResetScramble = () => {
    const all = [...availableTiles, ...selectedTiles].sort(() => Math.random() - 0.5);
    setAvailableTiles(all);
    setSelectedTiles([]);
    setScrambleSolved(false);
    setScrambleError(false);
    soundService.playClick();
  };

  const handleVerifyScramble = () => {
    const clean = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const userBuilt = selectedTiles.map(t => t.text).join(' ');
    const isCorrect = clean(userBuilt) === clean(activeChallenge.sentenceScramble.correct);

    if (isCorrect) {
      setScrambleSolved(true);
      setScrambleError(false);
      soundService.playLevelUp();
      triggerCelebration?.();
      showToast?.('Syntax Scramble Solved! 🧩', 'Grammatically flawless sentence construction! (+15 Bonus XP)', '🎉');
      addXP(15, 'Syntax Scramble Solved');
    } else {
      setScrambleError(true);
      soundService.playIncorrect();
      showToast?.('Not Quite Right 🧩', 'Check the word order or open the Hint!', '⚠️');
    }
  };

  // --- Handlers: Mystery Idiom ---
  const handleRevealIdiom = () => {
    setIsIdiomRevealed(true);
    soundService.playCorrect();
    triggerCelebration?.();
  };

  const handlePlayIdiomExample = () => {
    if (isPlayingIdiomAudio) return;
    setIsPlayingIdiomAudio(true);
    speechService.speak(activeChallenge.mysteryIdiom.example, { rate: 0.9 });
    setTimeout(() => {
      setIsPlayingIdiomAudio(false);
    }, 4500);
  };

  const handleClaimIdiom = () => {
    setIdiomClaimed(true);
    soundService.playLevelUp();
    showToast?.('Mystery Idiom Decrypted! 🗝️', 'Added to your daily lexicon! (+15 Bonus XP)', '✨');
    addXP(15, 'Mystery Idiom Mastered');
  };

  // --- Overall Progress Calculation ---
  const grammarCount = Object.keys(grammarAnswers).length;
  const vocabCount = Object.keys(vocabAnswers).length;
  const grammarDone = grammarCount === activeChallenge.grammarQuestions.length;
  const vocabDone = vocabCount === activeChallenge.vocabQuestions.length;
  const sentenceDone = sentenceEvaluated && sentenceInput.trim().length > 0;
  const writingWordCount = writingInput.trim().split(/\s+/).filter(Boolean).length;
  const writingDone = writingWordCount >= activeChallenge.miniWritingTask.minWords;

  // 7 Total Challenge Steps
  const totalSteps = 7;
  let stepsCompleted = 0;
  if (grammarDone) stepsCompleted++;
  if (vocabDone) stepsCompleted++;
  if (sentenceDone) stepsCompleted++;
  if (writingDone) stepsCompleted++;
  if (speechDone) stepsCompleted++;
  if (scrambleSolved) stepsCompleted++;
  if (idiomClaimed || isIdiomRevealed) stepsCompleted++;

  const allTasksDone = stepsCompleted === totalSteps;

  const handleClaimAllRewards = () => {
    if (!isChallengeCompleted) {
      setIsChallengeCompleted(true);
      completeDailyChallenge();
      setShowRewardModal(true);
    }
  };

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 7-DAY NAVIGATION TABS */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {dailyChallenges.map((day, idx) => {
            const isToday = idx === todayIndex;
            const isSelected = idx === selectedDayIdx;
            return (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDayIdx(idx)}
                className={`flex-1 min-w-[90px] py-2 px-3 rounded-xl text-center font-display transition-all text-xs flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-sm font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span>Day {day.dayNumber}</span>
                  {isToday && (
                    <Flame className={`w-3.5 h-3.5 ${isSelected ? 'fill-white text-white' : 'fill-amber-500 text-amber-500'}`} />
                  )}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                  {dayNames[idx].slice(0, 3)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOP HERO HEADER CARD */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-card">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider">
                Day {activeChallenge.dayNumber} • {dayNames[selectedDayIdx]}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-black/20 text-amber-200">
                <Flame className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse" />
                {streak} Day Learning Streak
              </span>
              <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950/40 text-emerald-200 border border-emerald-400/30">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Streak Shield 24h Guard
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight drop-shadow-sm">
              {activeChallenge.title}
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
              Theme: <span className="font-bold text-white">{activeChallenge.theme}</span> • Complete all 7 quests: 4 Core + AI Pronunciation + Syntax Scramble + Mystery Idiom!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center self-stretch sm:self-auto shrink-0 shadow-lg">
            <span className="text-[10px] uppercase font-black text-amber-200 tracking-wider block">Total Reward</span>
            <span className="text-2xl font-black text-white font-display">+{activeChallenge.xpReward + 45} XP</span>
            <span className="text-[10px] text-amber-100 block mt-0.5">+ Streak Shield</span>
          </div>
        </div>
      </div>

      {/* OVERALL PROGRESS TRACKER */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            <span className="text-slate-800 dark:text-slate-200 text-sm">Today's Daily Challenge Progress</span>
          </div>
          <span className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">
            {stepsCompleted} of {totalSteps} Quests Completed ({Math.round((stepsCompleted / totalSteps) * 100)}%)
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-full transition-all duration-700 shadow-xs"
            style={{ width: `${(stepsCompleted / totalSteps) * 100}%` }}
          />
        </div>

        {/* Milestone Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 text-[11px] font-bold">
          <div className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all ${grammarDone ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">1. Grammar</span>
          </div>
          <div className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all ${vocabDone ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
            <Brain className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">2. Vocab</span>
          </div>
          <div className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all ${sentenceDone ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
            <PenTool className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">3. Correction</span>
          </div>
          <div className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all ${writingDone ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
            <FileEdit className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">4. Reflection</span>
          </div>
          <div className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all ${speechDone ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300' : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400'}`}>
            <Mic className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">5. Voice Sprint</span>
          </div>
          <div className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all ${scrambleSolved ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300' : 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-400'}`}>
            <Puzzle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">6. Scramble</span>
          </div>
          <div className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all ${idiomClaimed ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40 text-amber-600 dark:text-amber-400'}`}>
            <KeyRound className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">7. Mystery Idiom</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* UNIQUE FEATURE 1: AI VOICE PRONUNCIATION SPRINT */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-rose-50/20 to-orange-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/20 border-2 border-rose-300/80 dark:border-rose-900/60 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 dark:border-rose-900/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-sm">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider">
                  Unique AI Quest 🎙️
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">+15 XP Bonus</span>
              </div>
              <h2 className="text-lg font-black font-display text-slate-900 dark:text-white">
                5. AI Voice Pronunciation Sprint
              </h2>
            </div>
          </div>
          {speechDone ? (
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4" /> Cleared
            </span>
          ) : (
            <span className="self-start sm:self-auto text-xs font-semibold text-rose-600 dark:text-rose-400">
              Fluency & Phoneme Challenge
            </span>
          )}
        </div>

        {/* Phonetic Focus Pill */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-rose-100/50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs">
          <span className="font-bold text-rose-800 dark:text-rose-200">🎯 Phonetic Target:</span>
          <span className="text-rose-700 dark:text-rose-300">{activeChallenge.speakingSprint.focus}</span>
        </div>

        {/* Target Phrase Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3">
          <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
            Read and Speak This Sentence Clearly:
          </p>
          <p className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white leading-relaxed">
            "{activeChallenge.speakingSprint.phrase}"
          </p>

          {/* Coach Tip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Coach Tip: {activeChallenge.speakingSprint.tip}</span>
          </div>
        </div>

        {/* Audio & Speech Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Model Audio Listen Button */}
          <button
            onClick={handlePlayModelAudio}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Volume2 className={`w-4 h-4 text-brand-600 ${isPlayingAudio ? 'animate-bounce text-amber-500' : ''}`} />
            <span>{isPlayingAudio ? 'Speaking...' : 'Listen to Native Model'}</span>
          </button>

          {/* Record Microphone Button */}
          <button
            onClick={handleToggleRecord}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black font-display text-xs flex items-center justify-center gap-2.5 transition-all shadow-md ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-400/40'
                : 'bg-rose-500 hover:bg-rose-600 text-white btn-press'
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>Listening... Speak Now (Tap to Stop)</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Tap to Record Your Pronunciation</span>
              </>
            )}
          </button>

          {/* Fallback Practiced Button */}
          {!speechDone && (
            <button
              onClick={handleFallbackSpeech}
              title="Practice out loud if microphone is restricted"
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs font-bold transition-all"
            >
              Mark Practiced Out Loud
            </button>
          )}
        </div>

        {/* Speech Evaluation Results */}
        {spokenTranscript && (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Heard by AI:</span>
              {speechScore !== null && (
                <span className={`px-2.5 py-0.5 rounded-full font-black text-xs ${
                  speechScore >= 60 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {speechScore}% Articulation Accuracy
                </span>
              )}
            </div>
            <p className="text-sm font-mono text-slate-800 dark:text-slate-200 italic bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              "{spokenTranscript}"
            </p>
            {speechScore !== null && speechScore >= 60 && (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Outstanding pronunciation! Phonemes matched native cadence. (+15 XP awarded)</span>
              </div>
            )}

            {/* Audio Recording Playback Widget */}
            {recordedSprintAudio && (
              <div className="pt-2">
                <AudioPlayerWidget
                  audioUrl={recordedSprintAudio.audioUrl}
                  audioBlob={recordedSprintAudio.audioBlob}
                  duration={recordedSprintAudio.duration}
                  label="Your Recorded Daily Voice Sprint"
                  filename={`daily_sprint_day_${activeChallenge.dayNumber}.webm`}
                />
              </div>
            )}
          </div>
        )}

        {/* Speech Error Banner if any */}
        {speechError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-700 dark:text-rose-300 flex items-center justify-between">
            <span>{speechError}</span>
            <button
              onClick={handleFallbackSpeech}
              className="underline font-bold ml-2 shrink-0"
            >
              Verify Manually
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* UNIQUE FEATURE 2: DAILY SYNTAX SCRAMBLE PUZZLE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/20 border-2 border-indigo-300/80 dark:border-indigo-900/60 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-indigo-900/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Puzzle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider">
                  Unique Interactive Puzzle 🧩
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">+15 XP Bonus</span>
              </div>
              <h2 className="text-lg font-black font-display text-slate-900 dark:text-white">
                6. Daily Syntax Scramble Puzzle
              </h2>
            </div>
          </div>
          {scrambleSolved ? (
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4" /> Solved
            </span>
          ) : (
            <span className="self-start sm:self-auto text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Word Order & Clause Structure
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Tap the scrambled grammatical tiles in proper sequence to construct a syntactically flawless English sentence.
        </p>

        {/* CONSTRUCTION DROP ZONE */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-slate-950 border-2 border-dashed border-indigo-300 dark:border-indigo-800/80 min-h-[90px] flex flex-wrap items-center gap-2">
          {selectedTiles.length === 0 ? (
            <div className="w-full text-center text-xs font-medium text-slate-400 py-3">
              Tap words from the bank below to construct your sentence here...
            </div>
          ) : (
            selectedTiles.map((tile, idx) => (
              <button
                key={tile.id}
                onClick={() => handleDeselectWordTile(tile)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 group"
                title="Tap to remove"
              >
                <span>{tile.text}</span>
                <X className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </button>
            ))
          )}
        </div>

        {/* AVAILABLE TILES BANK */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
            Available Word Tiles ({availableTiles.length} remaining):
          </span>
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {availableTiles.length === 0 ? (
              <span className="text-xs text-slate-400 italic">All words placed! Click "Check Syntax" below.</span>
            ) : (
              availableTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleSelectWordTile(tile)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-indigo-950 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-all transform active:scale-95 shadow-2xs hover:border-indigo-400"
                >
                  {tile.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* HINT ACCORDION */}
        {showScrambleHint && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Syntax Hint: </span>
              {activeChallenge.sentenceScramble.hint}
            </div>
          </div>
        )}

        {/* ERROR FEEDBACK */}
        {scrambleError && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
            <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Sentence sequence incorrect. </span>
              Pay attention to Subject-Verb-Object word order or tap "Show Hint"!
            </div>
          </div>
        )}

        {/* SUCCESS CELEBRATION */}
        {scrambleSolved && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Perfect Syntax Construction! (+15 XP)</span>
            </div>
            <p className="font-mono text-slate-700 dark:text-slate-300">
              "{activeChallenge.sentenceScramble.correct}"
            </p>
          </div>
        )}

        {/* SCRAMBLE ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetScramble}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tiles</span>
            </button>
            <button
              onClick={() => setShowScrambleHint(prev => !prev)}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showScrambleHint ? 'Hide Hint' : 'Need Hint?'}</span>
            </button>
          </div>

          <button
            onClick={handleVerifyScramble}
            disabled={selectedTiles.length === 0 || scrambleSolved}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 btn-press"
          >
            <Check className="w-4 h-4" />
            <span>Verify Syntax</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* UNIQUE FEATURE 3: MYSTERY IDIOM DECRYPTION (INTERACTIVE REVEAL CARD) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-100/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-950/20 border-2 border-amber-300/80 dark:border-amber-900/60 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 dark:border-amber-900/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-sm">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                  Daily Cultural Treasure 🗝️
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">+15 XP Bonus</span>
              </div>
              <h2 className="text-lg font-black font-display text-slate-900 dark:text-white">
                7. Daily Mystery Idiom Decryption
              </h2>
            </div>
          </div>
          {idiomClaimed ? (
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4" /> Mastered
            </span>
          ) : (
            <span className="self-start sm:self-auto text-xs font-semibold text-amber-600 dark:text-amber-400">
              Etymology & Native Metaphors
            </span>
          )}
        </div>

        {!isIdiomRevealed ? (
          /* LOCKED / MYSTERY CARD STATE */
          <div 
            onClick={handleRevealIdiom}
            className="group cursor-pointer p-8 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="relative z-10 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black font-display tracking-tight">
                Tap to Decrypt Today's Secret Idiom 🗝️✨
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 max-w-md mx-auto">
                Unveil today's hidden English idiom, its secret cultural origins, and native everyday usage!
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-amber-700 font-extrabold text-xs shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reveal Secret Idiom (+15 XP)</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* REVEALED / DECRYPTED IDIOM STATE */
          <div className="space-y-4 animate-scaleUp">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-amber-200 dark:border-amber-900/60 shadow-sm space-y-4">
              {/* Idiom Title & Pronunciation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider block">
                    Decrypted Secret Idiom
                  </span>
                  <h3 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                    "{activeChallenge.mysteryIdiom.idiom}"
                  </h3>
                </div>

                <button
                  onClick={() => speechService.speak(activeChallenge.mysteryIdiom.idiom, { rate: 0.9 })}
                  className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 font-bold text-xs flex items-center gap-2 border border-amber-200 transition-all"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>Listen Idiom</span>
                </button>
              </div>

              {/* Meaning */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 space-y-1">
                <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" /> Plain English Meaning:
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {activeChallenge.mysteryIdiom.meaning}
                </p>
              </div>

              {/* Cultural Origin Box */}
              <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-900/40 space-y-1.5">
                <span className="text-xs font-black uppercase text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                  <Scroll className="w-4 h-4 text-orange-500" />
                  Historical & Cultural Origin:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{activeChallenge.mysteryIdiom.origin}"
                </p>
              </div>

              {/* Real World Example */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500">Real-World Conversation Example:</span>
                  <button
                    onClick={handlePlayIdiomExample}
                    className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingIdiomAudio ? 'animate-bounce' : ''}`} />
                    <span>{isPlayingIdiomAudio ? 'Playing...' : 'Play Example'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  💬 {activeChallenge.mysteryIdiom.example}
                </div>
              </div>

              {/* Claim Button */}
              {!idiomClaimed && (
                <div className="pt-2 text-right">
                  <button
                    onClick={handleClaimIdiom}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 ml-auto btn-press"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Mark Idiom Mastered (+15 XP)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SEGMENT 1: 5 GRAMMAR QUESTIONS */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              1. Five Grammar Questions ({grammarCount}/5)
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">Multiple Choice</span>
        </div>

        <div className="space-y-4">
          {activeChallenge.grammarQuestions.map((q, idx) => {
            const userChoice = grammarAnswers[q.id];
            return (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 space-y-2.5">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {idx + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectGrammar(q.id, oIdx)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                        userChoice === oIdx
                          ? oIdx === q.correct
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : 'border-rose-500 bg-rose-50 text-rose-800'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {userChoice !== undefined && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SEGMENT 2: 5 VOCABULARY QUESTIONS */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              2. Five Vocabulary Questions ({vocabCount}/5)
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">Meanings & Synonyms</span>
        </div>

        <div className="space-y-4">
          {activeChallenge.vocabQuestions.map((q, idx) => {
            const userChoice = vocabAnswers[q.id];
            return (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    Word: {q.word}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {q.question}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectVocab(q.id, oIdx)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                        userChoice === oIdx
                          ? oIdx === q.correct
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : 'border-rose-500 bg-rose-50 text-rose-800'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {userChoice !== undefined && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SEGMENT 3: 1 SENTENCE CORRECTION */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Daily Sentence Correction Doctor
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs sm:text-sm font-mono text-rose-800 dark:text-rose-300">
          ❌ {activeChallenge.sentenceCorrection.sentence}
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={sentenceInput}
            onChange={(e) => setSentenceInput(e.target.value)}
            placeholder="Type your corrected version here..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleVerifySentence}
            disabled={!sentenceInput.trim()}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all"
          >
            Verify Correction
          </button>
        </div>

        {sentenceEvaluated && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300">
            <strong>Target Answer:</strong> {activeChallenge.sentenceCorrection.correct}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SEGMENT 4: 1 MINI WRITING TASK */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              4. Mini Writing Reflection
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Min {activeChallenge.miniWritingTask.minWords} words
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {activeChallenge.miniWritingTask.prompt}
        </p>

        <textarea
          rows={3}
          value={writingInput}
          onChange={(e) => setWritingInput(e.target.value)}
          placeholder="Compose your 2-3 sentences here..."
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Words typed: {writingWordCount}</span>
          <span>{writingDone ? '✅ Word target reached' : `Need ${Math.max(0, activeChallenge.miniWritingTask.minWords - writingWordCount)} more`}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CLAIM REWARD BOTTOM BAR */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">
              Ready to complete today's challenge?
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            {allTasksDone
              ? 'All 7 quests cleared! Claim your +50 XP and 24h Streak Shield.'
              : `${stepsCompleted}/7 Quests completed. Finish the remaining quests to activate Streak Shield.`}
          </p>
        </div>

        <button
          onClick={handleClaimAllRewards}
          disabled={!allTasksDone || isChallengeCompleted}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black font-display text-sm transition-all flex items-center justify-center gap-2 ${
            isChallengeCompleted
              ? 'bg-emerald-600 text-white cursor-default'
              : allTasksDone
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-elevated animate-pulse btn-press'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isChallengeCompleted ? (
            <>
              <Check className="w-4 h-4" />
              <span>Challenge Completed (+50 XP Claimed)</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 fill-white" />
              <span>Claim Rewards & Activate Shield</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CELEBRATION REWARD MODAL */}
      {/* ========================================================================= */}
      {showRewardModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setShowRewardModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Shield Visual */}
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg transform rotate-3">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
                Daily Master Achieved 🏆
              </span>
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                Daily Streak Shield Active!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You conquered all 7 quests today! Your {streak}-day learning streak is shielded for the next 24 hours.
              </p>
            </div>

            {/* Reward Summary Pill */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-center">
              <span className="text-[11px] uppercase font-bold text-amber-600 block">Total Daily XP Claimed</span>
              <span className="text-3xl font-black text-amber-500 font-display">+{activeChallenge.xpReward + 45} XP</span>
            </div>

            {/* Done Button */}
            <button
              onClick={() => setShowRewardModal(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black font-display text-sm shadow-md transition-all btn-press"
            >
              Continue Learning Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
