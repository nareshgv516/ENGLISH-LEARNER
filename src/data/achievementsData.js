// Achievements Database - 12 Gamification badges and milestones

export const achievementsData = [
  {
    id: 'first-lesson',
    title: 'First Step',
    icon: '🏆',
    description: 'Complete your very first English grammar lesson.',
    xpReward: 50,
    check: (userData) => (userData.completedLessons || []).length >= 1,
    tier: 'Bronze'
  },
  {
    id: 'five-lessons',
    title: 'Grammar Enthusiast',
    icon: '📚',
    description: 'Complete 5 different grammar lessons.',
    xpReward: 100,
    check: (userData) => (userData.completedLessons || []).length >= 5,
    tier: 'Bronze'
  },
  {
    id: 'ten-lessons',
    title: 'Grammar Scholar',
    icon: '🎓',
    description: 'Complete 10 comprehensive grammar lessons.',
    xpReward: 200,
    check: (userData) => (userData.completedLessons || []).length >= 10,
    tier: 'Silver'
  },
  {
    id: 'twenty-questions',
    title: 'Quiz Novice',
    icon: '✏️',
    description: 'Answer 20 practice questions correctly.',
    xpReward: 75,
    check: (userData) => (userData.correctAnswersCount || 0) >= 20,
    tier: 'Bronze'
  },
  {
    id: 'hundred-questions',
    title: 'Century Master',
    icon: '⭐',
    description: 'Answer 100 practice questions across all categories.',
    xpReward: 300,
    check: (userData) => (userData.correctAnswersCount || 0) >= 100,
    tier: 'Gold'
  },
  {
    id: 'streak-3',
    title: 'Consistency Starter',
    icon: '🔥',
    description: 'Maintain a 3-day active learning streak.',
    xpReward: 80,
    check: (userData) => (userData.streak || 0) >= 3,
    tier: 'Bronze'
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    icon: '⚡',
    description: 'Maintain an unbroken 7-day learning streak.',
    xpReward: 200,
    check: (userData) => (userData.streak || 0) >= 7,
    tier: 'Silver'
  },
  {
    id: 'streak-30',
    title: 'Dedication Legend',
    icon: '🚀',
    description: 'Achieve an astounding 30-day learning streak.',
    xpReward: 500,
    check: (userData) => (userData.streak || 0) >= 30,
    tier: 'Platinum'
  },
  {
    id: 'quiz-score-90',
    title: 'High Achiever',
    icon: '🎯',
    description: 'Score 90% or higher on any completed quiz.',
    xpReward: 150,
    check: (userData) => (userData.highestQuizScore || 0) >= 90,
    tier: 'Silver'
  },
  {
    id: 'perfect-quiz',
    title: 'Perfectionist',
    icon: '💯',
    description: 'Score a flawless 100% on a full quiz.',
    xpReward: 250,
    check: (userData) => (userData.hasPerfectQuiz || false),
    tier: 'Gold'
  },
  {
    id: 'vocab-master',
    title: 'Word Wizard',
    icon: '🧠',
    description: 'Listen to and master 25 vocabulary words.',
    xpReward: 120,
    check: (userData) => (userData.masteredVocab || []).length >= 25,
    tier: 'Silver'
  },
  {
    id: 'writer-apprentice',
    title: 'Prolific Writer',
    icon: '✍️',
    description: 'Submit 3 writing exercises analyzed by AI feedback.',
    xpReward: 150,
    check: (userData) => (userData.submittedEssaysCount || 0) >= 3,
    tier: 'Silver'
  }
];
