import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundService } from '../services/soundService';
import { achievementsData } from '../data/achievementsData';

const LearningContext = createContext(null);

const STORAGE_KEY = 'grammar_learner_ai_state_v1';

const defaultState = {
  user: {
    name: 'Ananya Sharma',
    email: 'ananya@grammarlearner.ai',
    level: 'Advanced',
    avatar: '/students/ananya.jpg',
    joinedDate: '2026-09-15'
  },
  isAuthenticated: true,
  xp: 320,
  streak: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  studyTimeMinutes: 52,
  dailyGoal: {
    questionsTarget: 20,
    questionsCompleted: 15,
    lessonsTarget: 1,
    lessonsCompleted: 1,
    vocabTarget: 10,
    vocabCompleted: 8
  },
  completedLessons: ['present-simple', 'present-continuous'],
  currentLessonId: 'past-simple',
  masteredVocab: ['v-1', 'v-2', 'v-5', 'v-7'],
  correctAnswersCount: 38,
  incorrectAnswersCount: 6,
  highestQuizScore: 92,
  hasPerfectQuiz: false,
  submittedEssaysCount: 1,
  unlockedAchievements: ['first-lesson', 'streak-3', 'streak-7', 'quiz-score-90'],
  // Mistakes history helps drive smart personalized recommendations
  mistakeHistory: [
    { topic: 'Past Simple', category: 'tenses', date: '2026-09-29' },
    { topic: 'Subject-Verb Agreement', category: 'parts-of-speech', date: '2026-09-28' },
    { topic: 'Past Simple', category: 'tenses', date: '2026-09-30' }
  ],
  quizHistory: [
    { id: 'q-1', date: '2026-09-28', score: 8, total: 10, percentage: 80, difficulty: 'Easy', timeTaken: '2m 14s', xpEarned: 60 },
    { id: 'q-2', date: '2026-09-29', score: 9, total: 10, percentage: 90, difficulty: 'Medium', timeTaken: '2m 45s', xpEarned: 85 },
    { id: 'q-3', date: '2026-09-30', score: 9, total: 10, percentage: 92, difficulty: 'Medium', timeTaken: '2m 30s', xpEarned: 90 }
  ],
  soundEnabled: true,
  darkMode: false
};

// Calculate Tier & Gamification Level based on XP
export const calculateUserTier = (xp) => {
  if (xp >= 3000) {
    return { levelNum: 5, title: 'English Pro', nextLevelXP: 5000, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/40' };
  } else if (xp >= 1800) {
    return { levelNum: 4, title: 'Grammar Master', nextLevelXP: 3000, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/40' };
  } else if (xp >= 800) {
    return { levelNum: 3, title: 'Grammar Explorer', nextLevelXP: 1800, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-900/40' };
  } else if (xp >= 250) {
    return { levelNum: 2, title: 'Learner', nextLevelXP: 800, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/40' };
  } else {
    return { levelNum: 1, title: 'Beginner', nextLevelXP: 250, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/40' };
  }
};

export const LearningProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return defaultState;
  });

  const [notification, setNotification] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [state]);

  // Dark mode class sync on document.documentElement
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Sound service sync
  useEffect(() => {
    soundService.setEnabled(state.soundEnabled);
  }, [state.soundEnabled]);

  const showToast = (title, message, icon = '🎉') => {
    setNotification({ title, message, icon, id: Date.now() });
    setTimeout(() => {
      setNotification(prev => (prev?.title === title ? null : prev));
    }, 4500);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#0c87eb', '#8b5cf6', '#10b981', '#f59e0b']
      });
    } catch {
      // Confetti fallback
    }
  };

  // Add XP with level-up check
  const addXP = (points, reason = 'Activity') => {
    const oldTier = calculateUserTier(state.xp);
    const newXP = state.xp + points;
    const newTier = calculateUserTier(newXP);

    setState(prev => ({ ...prev, xp: newXP }));

    if (newTier.levelNum > oldTier.levelNum) {
      soundService.playLevelUp();
      triggerCelebration();
      showToast('Level Up! 🌟', `Congratulations! You reached Level ${newTier.levelNum}: ${newTier.title}!`, '🚀');
    } else {
      soundService.playCorrect();
    }
  };

  // Check achievements against current state
  const checkAchievements = (customState = null) => {
    const currentState = customState || state;
    const newlyUnlocked = [];

    achievementsData.forEach(ach => {
      if (!currentState.unlockedAchievements.includes(ach.id)) {
        if (ach.check(currentState)) {
          newlyUnlocked.push(ach);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(ach => {
        triggerCelebration();
        soundService.playLevelUp();
        showToast(`Achievement Unlocked! ${ach.icon}`, `${ach.title}: ${ach.description} (+${ach.xpReward} XP)`, ach.icon);
      });

      const totalBonusXP = newlyUnlocked.reduce((acc, curr) => acc + curr.xpReward, 0);
      setState(prev => ({
        ...prev,
        xp: prev.xp + totalBonusXP,
        unlockedAchievements: [...prev.unlockedAchievements, ...newlyUnlocked.map(a => a.id)]
      }));
    }
  };

  // Complete a grammar lesson
  const completeLesson = (lessonId) => {
    if (!state.completedLessons.includes(lessonId)) {
      const updatedLessons = [...state.completedLessons, lessonId];
      const updatedDailyLessons = state.dailyGoal.lessonsCompleted + 1;

      setState(prev => {
        const nextState = {
          ...prev,
          completedLessons: updatedLessons,
          currentLessonId: lessonId,
          dailyGoal: {
            ...prev.dailyGoal,
            lessonsCompleted: updatedDailyLessons
          },
          studyTimeMinutes: prev.studyTimeMinutes + 8
        };
        setTimeout(() => checkAchievements(nextState), 400);
        return nextState;
      });

      addXP(20, 'Lesson Completed');
      triggerCelebration();
      showToast('Lesson Completed! 📚', 'You earned +20 XP and improved your grammar knowledge.', '✅');
    }
  };

  // Record an answered question in Practice or Quiz
  const recordQuestionAnswer = ({ isCorrect, topic, category }) => {
    if (isCorrect) {
      soundService.playCorrect();
      addXP(5, 'Correct Answer');
      setState(prev => {
        const nextState = {
          ...prev,
          correctAnswersCount: prev.correctAnswersCount + 1,
          dailyGoal: {
            ...prev.dailyGoal,
            questionsCompleted: prev.dailyGoal.questionsCompleted + 1
          }
        };
        setTimeout(() => checkAchievements(nextState), 400);
        return nextState;
      });
    } else {
      soundService.playIncorrect();
      setState(prev => ({
        ...prev,
        incorrectAnswersCount: prev.incorrectAnswersCount + 1,
        mistakeHistory: [
          { topic, category, date: new Date().toISOString().split('T')[0] },
          ...prev.mistakeHistory.slice(0, 19)
        ]
      }));
    }
  };

  // Record Quiz Completion
  const recordQuizResult = ({ score, total, difficulty, timeTaken }) => {
    const percentage = Math.round((score / total) * 100);
    const xpEarned = percentage === 100 ? 100 : Math.round((percentage / 100) * 80);
    const isPerfect = percentage === 100;

    const newQuizEntry = {
      id: `q-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      score,
      total,
      percentage,
      difficulty,
      timeTaken,
      xpEarned
    };

    setState(prev => {
      const nextState = {
        ...prev,
        highestQuizScore: Math.max(prev.highestQuizScore, percentage),
        hasPerfectQuiz: prev.hasPerfectQuiz || isPerfect,
        quizHistory: [newQuizEntry, ...prev.quizHistory.slice(0, 9)],
        studyTimeMinutes: prev.studyTimeMinutes + 5
      };
      setTimeout(() => checkAchievements(nextState), 500);
      return nextState;
    });

    addXP(xpEarned, 'Quiz Completed');
    if (isPerfect) {
      triggerCelebration();
      showToast('Flawless Performance! 💯', `You achieved 100% on the quiz! (+${xpEarned} XP)`, '🌟');
    }
  };

  // Record Mastered Vocabulary Word
  const recordVocabMastered = (vocabId) => {
    if (!state.masteredVocab.includes(vocabId)) {
      const updatedVocab = [...state.masteredVocab, vocabId];
      setState(prev => {
        const nextState = {
          ...prev,
          masteredVocab: updatedVocab,
          dailyGoal: {
            ...prev.dailyGoal,
            vocabCompleted: prev.dailyGoal.vocabCompleted + 1
          }
        };
        setTimeout(() => checkAchievements(nextState), 400);
        return nextState;
      });
      addXP(5, 'Vocab Word Mastered');
      soundService.playCorrect();
    }
  };

  // Record Writing Submission
  const recordWritingSubmission = (score) => {
    const earnedXP = Math.round((score / 100) * 50);
    setState(prev => {
      const nextState = {
        ...prev,
        submittedEssaysCount: prev.submittedEssaysCount + 1,
        studyTimeMinutes: prev.studyTimeMinutes + 12
      };
      setTimeout(() => checkAchievements(nextState), 400);
      return nextState;
    });
    addXP(earnedXP, 'Writing Analysis');
    triggerCelebration();
    showToast('Writing Analyzed! ✍️', `Your submission scored ${score}/100. (+${earnedXP} XP)`, '📝');
  };

  // Daily Challenge completion
  const completeDailyChallenge = () => {
    addXP(50, 'Daily Challenge Completed');
    triggerCelebration();
    showToast('Daily Challenge Completed! 🎯', 'Awesome consistency! You earned +50 XP and kept your streak alive!', '🔥');
  };

  // Set Learning Level from Placement Test or Settings
  const setLearningLevel = (level) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, level }
    }));
    showToast('Level Updated', `Your learning level has been set to ${level}.`, '🎯');
  };

  // Update profile
  const updateProfile = (profileData) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, ...profileData }
    }));
    showToast('Profile Saved', 'Your user preferences have been updated.', '👤');
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  // Toggle Sound
  const toggleSound = () => {
    setState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  // Auth: Login
  const login = (email, password, remember = true, avatar = null, customName = null) => {
    const rawName = email.split('@')[0];
    const formattedName = customName || (rawName.charAt(0).toUpperCase() + rawName.slice(1));
    setState(prev => ({
      ...prev,
      isAuthenticated: true,
      user: {
        ...prev.user,
        email,
        name: formattedName,
        avatar: avatar || prev.user?.avatar || '/students/ananya.jpg'
      }
    }));
    soundService.playCorrect();
    showToast('Welcome Back!', `Signed in as ${formattedName}`, '👋');
    return true;
  };

  // Auth: Signup
  const signup = ({ name, email, level, avatar }) => {
    setState(prev => ({
      ...prev,
      isAuthenticated: true,
      user: {
        ...prev.user,
        name,
        email,
        level: level || 'Beginner',
        avatar: avatar || '/students/ananya.jpg'
      }
    }));
    triggerCelebration();
    soundService.playLevelUp();
    showToast('Account Created!', `Welcome to GrammarLearner AI, ${name}!`, '🎉');
    return true;
  };

  // Auth: Logout
  const logout = () => {
    setState(prev => ({ ...prev, isAuthenticated: false }));
    showToast('Logged Out', 'You have been safely signed out.', '🔒');
  };

  // Reset Progress
  const resetProgress = () => {
    setState({
      ...defaultState,
      user: state.user,
      darkMode: state.darkMode,
      soundEnabled: state.soundEnabled
    });
    showToast('Progress Reset', 'All lesson progress, XP, and stats have been reset.', '🔄');
  };

  // Calculated Stats
  const totalQuestionsAnswered = state.correctAnswersCount + state.incorrectAnswersCount;
  const grammarAccuracy = totalQuestionsAnswered > 0
    ? Math.round((state.correctAnswersCount / totalQuestionsAnswered) * 100)
    : 86;

  const currentTier = calculateUserTier(state.xp);

  return (
    <LearningContext.Provider
      value={{
        ...state,
        currentTier,
        grammarAccuracy,
        totalQuestionsAnswered,
        notification,
        dismissNotification: () => setNotification(null),
        showToast,
        addXP,
        completeLesson,
        recordQuestionAnswer,
        recordQuizResult,
        recordVocabMastered,
        recordWritingSubmission,
        completeDailyChallenge,
        setLearningLevel,
        updateProfile,
        toggleDarkMode,
        toggleSound,
        login,
        signup,
        logout,
        resetProgress,
        triggerCelebration
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
