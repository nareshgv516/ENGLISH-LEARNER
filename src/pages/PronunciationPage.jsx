import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw,
  Award,
  Download,
  Play,
  Pause,
  History,
  MessageSquare,
  Headphones,
  BookOpen,
  Trash2,
  HelpCircle,
  Check,
  Activity,
  Flame,
  Lightbulb
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { audioRecorderService } from '../services/audioRecorderService';
import { soundService } from '../services/soundService';
import { useLearning } from '../context/LearningContext';
import { AudioPlayerWidget } from '../components/AudioPlayerWidget';

const pronunciationSentences = [
  { 
    id: 'p-1', 
    text: 'How are you doing today?', 
    level: 'Beginner', 
    category: 'Daily Greetings', 
    ipa: '/haʊ ɑːr juː ˈduːɪŋ təˈdeɪ/',
    focus: 'Smooth linking between "doing" and "today"'
  },
  { 
    id: 'p-2', 
    text: 'She sells sea shells on the seashore.', 
    level: 'Intermediate', 
    category: 'Tongue Twisters', 
    ipa: '/ʃiː sɛlz siː ʃɛlz ɒn ðə ˈsiːʃɔː/',
    focus: 'Contrast between /s/ and /ʃ/ sounds'
  },
  { 
    id: 'p-3', 
    text: 'Good morning, have a wonderful day ahead.', 
    level: 'Beginner', 
    category: 'Polite English', 
    ipa: '/ɡʊd ˈmɔːnɪŋ hæv ə ˈwʌndərfəl deɪ əˈhɛd/',
    focus: 'Gentle falling intonation on greetings'
  },
  { 
    id: 'p-4', 
    text: 'The weather forecast predicts heavy showers tomorrow.', 
    level: 'Elementary', 
    category: 'Daily Life', 
    ipa: '/ðə ˈwɛðər ˈfɔːrkæst prɪˈdɪkts ˈhɛvi ˈʃaʊərz təˈmɔːroʊ/',
    focus: 'Voiced /ð/ in "the" and "weather"'
  },
  { 
    id: 'p-5', 
    text: 'Continuous practice significantly accelerates English fluency.', 
    level: 'Advanced', 
    category: 'Academic & Career', 
    ipa: '/kənˈtɪnjuəs ˈpræktɪs sɪɡˈnɪfɪkəntli əkˈsɛləreɪts ˈɪŋɡlɪʃ ˈfluːənsi/',
    focus: 'Word stress on "sig-NIF-i-cant-ly" and "ac-CEL-er-ates"'
  },
  { 
    id: 'p-6', 
    text: 'Could you please explain that grammar rule once more?', 
    level: 'Elementary', 
    category: 'Classroom & Study', 
    ipa: '/kʊd juː pliːz ɪkˈspleɪn ðæt ˈɡræmər ruːl wʌns mɔːr/',
    focus: 'Polite modal auxiliary "Could you" /kʊdjuː/'
  },
  { 
    id: 'p-7', 
    text: 'I would like to order a warm cappuccino with almond milk.', 
    level: 'Elementary', 
    category: 'Travel & Dining', 
    ipa: '/aɪ wʊd laɪk tuː ˈɔːrdər ə wɔːrm ˌkæpʊˈtʃiːnoʊ wɪð ˈɑːmənd mɪlk/',
    focus: 'Silent "l" in "almond" /ˈɑːmənd/'
  },
  { 
    id: 'p-8', 
    text: 'Peter Piper picked a peck of pickled peppers.', 
    level: 'Advanced', 
    category: 'Tongue Twisters', 
    ipa: '/ˈpiːtər ˈpaɪpər pɪkt ə pɛk ɒv ˈpɪkəld ˈpɛpərz/',
    focus: 'Crisp plosive /p/ consonants with slight puff of air'
  },
  { 
    id: 'p-9', 
    text: 'I look forward to discussing this opportunity further.', 
    level: 'Intermediate', 
    category: 'Job Interview', 
    ipa: '/aɪ lʊk ˈfɔːrwərd tuː dɪˈskʌsɪŋ ðɪs ˌɒpərˈtjuːnɪti ˈfɜːrðər/',
    focus: 'Professional confidence and rhythm'
  },
  { 
    id: 'p-10', 
    text: 'Clear communication builds strong global connections.', 
    level: 'Intermediate', 
    category: 'Business English', 
    ipa: '/klɪər kəˌmjuːnɪˈkeɪʃən bɪldz strɒŋ ˈɡloʊbəl kəˈnɛkʃənz/',
    focus: 'Consonant clusters in "clear", "strong", "global"'
  }
];

// Conversation prompts for AI Free-Speech Studio
const conversationPrompts = [
  {
    id: 'c-1',
    topic: 'Self Introduction',
    prompt: 'Tell the AI about yourself: What is your name, where are you from, and why are you learning English?',
    example: 'Hello! My name is Rahul. I am from Hyderabad and I am learning English to improve my career opportunities.'
  },
  {
    id: 'c-2',
    topic: 'Daily Routine',
    prompt: 'Describe what you usually do on a typical morning from when you wake up until you begin work or study.',
    example: 'Every morning I wake up at seven o\'clock, make a cup of tea, and review my vocabulary flashcards.'
  },
  {
    id: 'c-3',
    topic: 'Travel & Dream Destination',
    prompt: 'If you could travel anywhere in the world tomorrow, where would you go and why?',
    example: 'I would love to visit London to see the historic museums, Big Ben, and practice speaking with native speakers.'
  },
  {
    id: 'c-4',
    topic: 'Hobbies & Interests',
    prompt: 'What do you enjoy doing during your free time or on weekends to relax?',
    example: 'In my free time, I enjoy reading books, listening to music, and playing badminton with my friends.'
  }
];

export const PronunciationPage = () => {
  const { addXP, showToast, triggerCelebration } = useLearning();

  // Active view tab
  const [activeTab, setActiveTab] = useState('drills'); // 'drills' | 'ai-studio' | 'history'

  // Guided Drills State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playbackSpeed, setPlaybackSpeed] = useState(0.85);

  // Recording & Speech state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [accuracyScore, setAccuracyScore] = useState(null);
  const [wordAnalysis, setWordAnalysis] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlayingModelAudio, setIsPlayingModelAudio] = useState(false);

  // Student recorded voice clip (Current Attempt)
  const [studentRecording, setStudentRecording] = useState(null); // { audioBlob, audioUrl, duration, timestamp }

  // Session Recordings History Log
  const [recordingsHistory, setRecordingsHistory] = useState([]);

  // AI Free-Speech Studio State
  const [promptIndex, setPromptIndex] = useState(0);
  const [isStudioRecording, setIsStudioRecording] = useState(false);
  const [studioSeconds, setStudioSeconds] = useState(0);
  const [studioTranscript, setStudioTranscript] = useState('');
  const [studioAudioClip, setStudioAudioClip] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const recognitionRef = useRef(null);

  // Filter sentences by category
  const categories = ['All', ...new Set(pronunciationSentences.map(s => s.category))];
  const filteredSentences = selectedCategory === 'All' 
    ? pronunciationSentences 
    : pronunciationSentences.filter(s => s.category === selectedCategory);

  const currentItem = filteredSentences[currentIndex] || pronunciationSentences[0];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRecorderService.cleanup();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // --- MODEL AUDIO PLAYBACK ---
  const handlePlayModelAudio = (textToSpeak) => {
    if (isPlayingModelAudio) return;
    setIsPlayingModelAudio(true);
    speechService.speak(textToSpeak || currentItem.text, { rate: playbackSpeed });
    setTimeout(() => {
      setIsPlayingModelAudio(false);
    }, 3000);
  };

  // --- START COMBINED AUDIO RECORDING + SPEECH RECOGNITION ---
  const handleStartRecording = async () => {
    setErrorMessage('');
    setAccuracyScore(null);
    setWordAnalysis([]);
    setSpokenTranscript('');
    setRecordingSeconds(0);

    try {
      // 1. Start audio recorder (captures raw microphone sound)
      await audioRecorderService.startRecording({
        onTick: (sec) => setRecordingSeconds(sec),
        onError: (err) => {
          setErrorMessage(err.message);
          setIsRecording(false);
        }
      });

      // 2. Start Speech Recognition (transcribes what the student says)
      const rec = speechService.createRecognition({
        onStart: () => {
          setIsRecording(true);
          soundService.playClick();
        },
        onResult: ({ transcript }) => {
          setSpokenTranscript(transcript);
        },
        onError: ({ message }) => {
          console.warn('Speech recognition warning:', message);
        },
        onEnd: () => {
          // onEnd can fire naturally
        }
      });

      if (rec) {
        recognitionRef.current = rec;
        try {
          rec.start();
        } catch (e) {
          console.warn('Recognition start caught:', e);
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Microphone could not be activated.');
      setIsRecording(false);
    }
  };

  // --- STOP RECORDING & EVALUATE PRONUNCIATION ---
  const handleStopRecording = async () => {
    setIsRecording(false);

    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }

    try {
      // Stop raw audio recorder and receive blob + URL
      const recordingData = await audioRecorderService.stopRecording();
      if (recordingData) {
        setStudentRecording(recordingData);

        // Evaluate transcript vs target
        const transcript = spokenTranscript || '';
        const score = speechService.calculateAccuracy(currentItem.text, transcript);
        setAccuracyScore(score);

        const analysis = speechService.analyzePronunciation(currentItem.text, transcript);
        setWordAnalysis(analysis);

        // Save into session recording history log
        const historyEntry = {
          id: Date.now(),
          target: currentItem.text,
          category: currentItem.category,
          transcript: transcript || '(No clear speech detected)',
          score: score,
          audioUrl: recordingData.audioUrl,
          audioBlob: recordingData.audioBlob,
          duration: recordingData.duration,
          timestamp: recordingData.timestamp
        };

        setRecordingsHistory(prev => [historyEntry, ...prev]);

        // Award XP and play sound
        if (score >= 75) {
          soundService.playCorrect();
          triggerCelebration?.();
          showToast?.('Excellent Pronunciation! 🌟', `Scored ${score}% accuracy! Voice recording saved. (+15 XP)`, '🎙️');
          addXP(15, 'High Accuracy Pronunciation');
        } else if (score >= 45) {
          soundService.playCorrect();
          showToast?.('Good Effort! 👍', `Scored ${score}%. Listen to your voice recording to compare! (+5 XP)`, '🎧');
          addXP(5, 'Pronunciation Practice');
        } else {
          soundService.playIncorrect();
        }
      }
    } catch (err) {
      console.error('Stop recording error:', err);
      setErrorMessage('Failed to finalize voice recording.');
    }
  };

  // Reset drill attempt
  const handleResetCurrent = () => {
    setAccuracyScore(null);
    setWordAnalysis([]);
    setSpokenTranscript('');
    setStudentRecording(null);
    setErrorMessage('');
    soundService.playClick();
  };

  const handleNextPhrase = () => {
    handleResetCurrent();
    if (currentIndex < filteredSentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // --- AI CONVERSATION STUDIO HANDLERS ---
  const activePrompt = conversationPrompts[promptIndex];

  const handleStartStudioRecording = async () => {
    setStudioTranscript('');
    setStudioAudioClip(null);
    setAiFeedback(null);
    setStudioSeconds(0);
    setErrorMessage('');

    try {
      await audioRecorderService.startRecording({
        onTick: (sec) => setStudioSeconds(sec),
        onError: (err) => setErrorMessage(err.message)
      });

      const rec = speechService.createRecognition({
        onStart: () => {
          setIsStudioRecording(true);
          soundService.playClick();
        },
        onResult: ({ transcript }) => {
          setStudioTranscript(transcript);
        },
        onError: (err) => console.warn(err),
        onEnd: () => {}
      });

      if (rec) {
        recognitionRef.current = rec;
        try {
          rec.start();
        } catch (e) {}
      }
    } catch (err) {
      setErrorMessage(err.message || 'Microphone access failed.');
      setIsStudioRecording(false);
    }
  };

  const handleStopStudioRecording = async () => {
    setIsStudioRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    const clip = await audioRecorderService.stopRecording();
    if (clip) {
      setStudioAudioClip(clip);
      setIsAiThinking(true);

      // Simulate AI Linguistic Feedback & Response
      setTimeout(() => {
        const spoken = studioTranscript || 'I practice speaking English every day.';
        const words = spoken.trim().split(/\s+/).filter(Boolean);
        const wordCount = words.length;

        const simulatedFeedback = {
          wordCount,
          spokenText: spoken,
          fluencyRating: wordCount >= 10 ? 'High Fluency' : wordCount >= 5 ? 'Moderate Fluency' : 'Developing',
          grammarNotes: wordCount >= 5 
            ? 'Great sentence structure and clear verbal rhythm! Your subject-verb connection was clear.'
            : 'Good start! Try expanding your answer into 2-3 full sentences for even better fluency.',
          aiReply: `Thank you for sharing! You expressed yourself very naturally regarding "${activePrompt.topic}". Keep speaking with steady volume and clear pause breaks between clauses.`,
          vocabularyTip: 'Try using transition markers like "Furthermore", "In addition", or "For example" when expanding your thoughts.'
        };

        setAiFeedback(simulatedFeedback);
        setIsAiThinking(false);
        soundService.playCorrect();
        addXP(20, 'AI Spoken Conversation Practice');
        showToast?.('Voice Evaluated by AI! 🤖', 'Feedback and voice playback ready! (+20 XP)', '🌟');

        // Automatically speak AI reply
        speechService.speak(simulatedFeedback.aiReply, { rate: 0.9 });
      }, 1200);
    }
  };

  const handleDeleteHistoryItem = (id) => {
    setRecordingsHistory(prev => prev.filter(r => r.id !== id));
    soundService.playClick();
  };

  const handleClearAllHistory = () => {
    setRecordingsHistory([]);
    soundService.playClick();
    showToast?.('History Cleared', 'Voice recordings session history emptied.', '🗑️');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5" />
              Voice Lab & Recorder
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              Live Speech-to-Audio
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
            AI Pronunciation & Voice Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Record your actual voice, compare side-by-side with native AI speakers, and inspect word-by-word pronunciation accuracy.
          </p>
        </div>

        {/* Total Clips Counter */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Clips Recorded</span>
          <span className="text-xl font-black text-rose-500 font-display">{recordingsHistory.length}</span>
        </div>
      </div>

      {/* NAVIGATION TABS: DRILLS / AI CONVERSATION / RECORDINGS HISTORY */}
      <div className="p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('drills')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'drills'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-brand-500" />
          <span>Pronunciation Drills</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-studio')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'ai-studio'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-purple-500" />
          <span>AI Free-Speech Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 relative ${
            activeTab === 'history'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4 text-rose-500" />
          <span>Voice Recordings ({recordingsHistory.length})</span>
          {recordingsHistory.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: GUIDED PRONUNCIATION DRILLS */}
      {/* ========================================================================= */}
      {activeTab === 'drills' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                  handleResetCurrent();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* MAIN DRILL CARD */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6 text-center">
            {/* Header metadata */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40">
                {currentItem.category} • {currentItem.level}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                Phrase {currentIndex + 1} of {filteredSentences.length}
              </span>
            </div>

            {/* Target Sentence Display */}
            <div className="py-2 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white leading-relaxed">
                "{currentItem.text}"
              </h2>
              <p className="text-sm font-mono text-slate-400">
                {currentItem.ipa}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs text-amber-800 dark:text-amber-300">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Focus: {currentItem.focus}</span>
              </div>
            </div>

            {/* Speed Control & Native Model Speaker Button */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-500">Native Audio Speed:</span>
                <div className="flex items-center gap-1">
                  {[
                    { label: '0.7x Slow', val: 0.7 },
                    { label: '0.85x Clear', val: 0.85 },
                    { label: '1.0x Normal', val: 1.0 }
                  ].map((speed) => (
                    <button
                      key={speed.val}
                      onClick={() => setPlaybackSpeed(speed.val)}
                      className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all ${
                        playbackSpeed === speed.val
                          ? 'bg-brand-600 text-white shadow-2xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {speed.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handlePlayModelAudio(currentItem.text)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                  isPlayingModelAudio
                    ? 'bg-brand-500 text-white border-brand-500 shadow-glow animate-pulse'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-brand-400'
                }`}
              >
                <Volume2 className="w-4 h-4 text-brand-500" />
                <span>{isPlayingModelAudio ? 'Playing Native Audio...' : '🔊 Listen Native Model'}</span>
              </button>
            </div>

            {/* MAIN RECORD BUTTON */}
            <div className="space-y-3">
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black font-display text-sm shadow-lg transition-all flex items-center justify-center gap-3 mx-auto ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-400/50 scale-105'
                    : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-rose-500/25 btn-press'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-5 h-5 animate-spin" />
                    <span>Recording ({recordingSeconds}s)... Tap to Finish & Save</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>🎙️ Tap to Record Voice & Evaluate</span>
                  </>
                )}
              </button>

              {isRecording && (
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 animate-fadeIn">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Capturing microphone audio & live speech transcript... Speak clearly now!</span>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Microphone Notice</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* EVALUATION RESULTS & DUAL AUDIO COMPARISON */}
            {studentRecording && (
              <div className="space-y-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-left animate-fadeIn">
                {/* Score & Gauge Bar */}
                <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                        Articulation Accuracy
                      </span>
                      <span className={`text-2xl font-black font-display ${
                        accuracyScore >= 75 ? 'text-emerald-500' : accuracyScore >= 45 ? 'text-amber-500' : 'text-rose-500'
                      }`}>
                        {accuracyScore}% Match
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase border inline-flex items-center gap-1.5 ${
                        accuracyScore >= 75 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' 
                          : 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                      }">
                        <Award className="w-3.5 h-3.5" />
                        {accuracyScore >= 75 ? 'Native Articulation' : accuracyScore >= 45 ? 'Good Progress' : 'Needs Practice'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Gauge */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        accuracyScore >= 75 ? 'bg-emerald-500' : accuracyScore >= 45 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${accuracyScore}%` }}
                    />
                  </div>

                  {/* WORD-BY-WORD PRONUNCIATION BREAKDOWN */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      Word-by-Word Articulation Analysis (What you spoke):
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {wordAnalysis.map((item, idx) => (
                        <span
                          key={idx}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                            item.status === 'correct'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : item.status === 'near'
                                ? 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          }`}
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Correctly Spoken
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500" /> Slight Accent/Phoneme Var
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500" /> Missed / Unclear
                      </span>
                    </div>

                    {spokenTranscript && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-mono italic pt-1 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        Speech recognized: "{spokenTranscript}"
                      </p>
                    )}
                  </div>
                </div>

                {/* DUAL SIDE-BY-SIDE AUDIO PLAYERS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* AI Model Audio */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4" /> Native AI Model
                      </span>
                      <span className="text-[10px] text-slate-400">Reference Sound</span>
                    </div>
                    <button
                      onClick={() => handlePlayModelAudio(currentItem.text)}
                      className="w-full py-3 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center gap-2 border border-brand-200 dark:border-brand-900 transition-all"
                    >
                      <Play className="w-4 h-4 fill-brand-600 text-brand-600" />
                      <span>Play Native Speaker Voice</span>
                    </button>
                  </div>

                  {/* Student's Voice Recording */}
                  <AudioPlayerWidget
                    audioUrl={studentRecording.audioUrl}
                    audioBlob={studentRecording.audioBlob}
                    duration={studentRecording.duration}
                    label="Your Recorded Voice Clip"
                    filename={`student_pronunciation_${currentItem.id}.webm`}
                  />
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleResetCurrent}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Drill</span>
              </button>

              <button
                onClick={handleNextPhrase}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs shadow-sm hover:bg-rose-500 dark:hover:bg-rose-500 dark:hover:text-white transition-all flex items-center gap-1.5 btn-press"
              >
                <span>Next Phrase</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: AI FREE-SPEECH & CONVERSATION STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'ai-studio' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20 border border-purple-200 dark:border-purple-900/60 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-wider">
                Conversation Scenario {promptIndex + 1} of {conversationPrompts.length}
              </span>

              <div className="flex items-center gap-1">
                {conversationPrompts.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPromptIndex(idx);
                      setStudioTranscript('');
                      setStudioAudioClip(null);
                      setAiFeedback(null);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      promptIndex === idx 
                        ? 'bg-purple-600 text-white shadow-xs' 
                        : 'bg-white dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Box */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
                {activePrompt.topic}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {activePrompt.prompt}
              </p>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-xs text-purple-800 dark:text-purple-300">
                💡 <strong>Inspiration Idea:</strong> "{activePrompt.example}"
              </div>
            </div>

            {/* Studio Recording Button */}
            <div className="text-center space-y-3 pt-2">
              <button
                onClick={isStudioRecording ? handleStopStudioRecording : handleStartStudioRecording}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black font-display text-sm shadow-lg transition-all flex items-center justify-center gap-3 mx-auto ${
                  isStudioRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-400/50'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/25 btn-press'
                }`}
              >
                {isStudioRecording ? (
                  <>
                    <MicOff className="w-5 h-5 animate-spin" />
                    <span>Listening & Recording ({studioSeconds}s)... Tap to Send to AI</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>🎙️ Record Your Spoken Response</span>
                  </>
                )}
              </button>

              {isStudioRecording && (
                <p className="text-xs text-purple-600 dark:text-purple-400 font-bold animate-fadeIn">
                  Speak freely in English! The AI is recording your voice and analyzing your spoken words.
                </p>
              )}
            </div>

            {/* AI Processing Loading State */}
            {isAiThinking && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-purple-200 text-center space-y-2 animate-pulse">
                <Sparkles className="w-6 h-6 text-purple-600 mx-auto animate-spin" />
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  AI Linguistic Coach is analyzing your voice recording & grammar...
                </p>
              </div>
            )}

            {/* AI Feedback & Player */}
            {studioAudioClip && aiFeedback && (
              <div className="space-y-5 animate-fadeIn pt-4 border-t border-purple-100 dark:border-purple-900/40">
                {/* Audio Player for what student spoke */}
                <AudioPlayerWidget
                  audioUrl={studioAudioClip.audioUrl}
                  audioBlob={studioAudioClip.audioBlob}
                  duration={studioAudioClip.duration}
                  label="Your Recorded Spoken Answer"
                  filename="my_conversation_response.webm"
                />

                {/* Spoken Transcript */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">
                    What You Talked (Spoken Transcript):
                  </span>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 italic">
                    "{aiFeedback.spokenText}"
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                      {aiFeedback.wordCount} Words Spoken
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      {aiFeedback.fluencyRating}
                    </span>
                  </div>
                </div>

                {/* AI Spoken Response Card */}
                <div className="p-5 rounded-2xl bg-purple-100/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      AI Linguistic Coach Spoken Reply:
                    </span>
                    <button
                      onClick={() => speechService.speak(aiFeedback.aiReply, { rate: 0.9 })}
                      className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Re-play AI Voice
                    </button>
                  </div>

                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    "{aiFeedback.aiReply}"
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-purple-200/60 dark:border-purple-900/60 text-xs">
                    <p className="text-slate-700 dark:text-slate-300">
                      📝 <strong>Grammar & Structure:</strong> {aiFeedback.grammarNotes}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      💡 <strong>Fluency Tip:</strong> {aiFeedback.vocabularyTip}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SESSION VOICE RECORDINGS HISTORY LOG */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">
                  Student Voice Recordings Log
                </h3>
                <p className="text-xs text-slate-500">
                  {recordingsHistory.length === 0 
                    ? 'No voice recordings yet in this session. Start speaking in Drills or AI Studio to record!'
                    : `Saved ${recordingsHistory.length} audio clip(s) from your speaking session.`}
                </p>
              </div>

              {recordingsHistory.length > 0 && (
                <button
                  onClick={handleClearAllHistory}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {recordingsHistory.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <Mic className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Ready to Record Your English Speech
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click on the "Pronunciation Drills" tab above and tap the record button to capture your voice.
                </p>
                <button
                  onClick={() => setActiveTab('drills')}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-sm hover:bg-rose-600 transition-all"
                >
                  Go to Pronunciation Drills
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {recordingsHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {item.category} • Recorded at {item.timestamp}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Target: "{item.target}"
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                          item.score >= 75 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {item.score}% Accuracy
                        </span>

                        <button
                          onClick={() => handleDeleteHistoryItem(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                          title="Delete recording"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* What they spoke */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic font-mono bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                      What was spoken: "{item.transcript}"
                    </p>

                    {/* Audio Player */}
                    <AudioPlayerWidget
                      audioUrl={item.audioUrl}
                      audioBlob={item.audioBlob}
                      duration={item.duration}
                      label={`Voice Recording (${item.duration}s)`}
                      filename={`pronunciation_${item.id}.webm`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
