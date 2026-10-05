// Leaderboard Sample Data with Skills and Marks Analysis

export const availableStudentProfiles = [
  {
    id: 'student-ananya',
    name: 'Ananya Sharma',
    avatar: '/students/ananya.jpg',
    level: 'Advanced',
    country: 'India',
    quote: 'Daily revision and active grammar application!'
  },
  {
    id: 'student-karthik',
    name: 'Karthik Rao',
    avatar: '/students/karthik.jpg',
    level: 'Advanced',
    country: 'India',
    quote: 'Focused practice on sentence structures and idioms.'
  },
  {
    id: 'student-priya',
    name: 'Priya Venkatesh',
    avatar: '/students/priya.jpg',
    level: 'Intermediate',
    country: 'India',
    quote: 'Consistent 20-minute daily vocabulary drills.'
  },
  {
    id: 'student-david',
    name: 'David Chen',
    avatar: '/students/david.jpg',
    level: 'Intermediate',
    country: 'Singapore',
    quote: 'Writing essays and analyzing sentence corrections.'
  },
  {
    id: 'student-sneha',
    name: 'Sneha Patil',
    avatar: '/students/sneha.jpg',
    level: 'Intermediate',
    country: 'India',
    quote: 'Active listening and pronunciation flashcards.'
  }
];

export const sampleLeaderboardUsers = [
  {
    rank: 1,
    id: 'user-top-1',
    name: 'Ananya Sharma',
    avatar: '/students/ananya.jpg',
    xp: 4850,
    completedLessons: 24,
    streak: 38,
    levelTier: 'English Pro',
    badge: '🏆 Grandmaster',
    country: 'India',
    marks: {
      total: 494,
      max: 500,
      percentage: 98.8,
      grade: 'A+ (Distinction)',
      grammar: 99.4,
      vocabulary: 98.5,
      quizAccuracy: 99.1,
      writing: 98.0,
      pronunciation: 97.6
    },
    skills: {
      topSkill: 'Complex Tenses & Inversion',
      strengths: ['Advanced Subjunctive', 'Inversion Structures', 'Idiomatic Fluency', 'Error Spotting'],
      accuracyRate: '99.1%',
      weeklyGrowth: '+18.4%',
      avgSpeed: '1.6s / question',
      studyTime: '15.4 hrs',
      quizzesMastered: 52
    },
    quote: 'Practicing daily quizzes and mastering grammar mechanics is the secret!'
  },
  {
    rank: 2,
    id: 'user-top-2',
    name: 'Karthik Rao',
    avatar: '/students/karthik.jpg',
    xp: 4320,
    completedLessons: 22,
    streak: 29,
    levelTier: 'Grammar Master',
    badge: '🥈 Top Scholar',
    country: 'India',
    marks: {
      total: 482,
      max: 500,
      percentage: 96.4,
      grade: 'A+ (High Honors)',
      grammar: 97.2,
      vocabulary: 96.0,
      quizAccuracy: 96.8,
      writing: 95.5,
      pronunciation: 95.8
    },
    skills: {
      topSkill: 'Active & Passive Voice Mastery',
      strengths: ['Reported Speech', 'Modal Auxiliaries', 'Speed Quizzing', 'Clause Linking'],
      accuracyRate: '96.8%',
      weeklyGrowth: '+14.2%',
      avgSpeed: '1.9s / question',
      studyTime: '13.8 hrs',
      quizzesMastered: 46
    },
    quote: 'Understanding sentence clauses and practicing active-to-passive rewrites made the difference.'
  },
  {
    rank: 3,
    id: 'user-top-3',
    name: 'Priya Venkatesh',
    avatar: '/students/priya.jpg',
    xp: 3980,
    completedLessons: 20,
    streak: 25,
    levelTier: 'Grammar Master',
    badge: '🥉 Elite Learner',
    country: 'India',
    marks: {
      total: 474,
      max: 500,
      percentage: 94.8,
      grade: 'A (Honors)',
      grammar: 95.6,
      vocabulary: 97.8,
      quizAccuracy: 94.5,
      writing: 94.0,
      pronunciation: 96.2
    },
    skills: {
      topSkill: 'Lexical Precision & Vocab Recall',
      strengths: ['Academic Vocabulary', 'Prepositional Nuances', 'Audio Pronunciation', 'Spelling'],
      accuracyRate: '94.5%',
      weeklyGrowth: '+12.6%',
      avgSpeed: '2.1s / question',
      studyTime: '12.2 hrs',
      quizzesMastered: 41
    },
    quote: 'I dedicate 25 minutes every morning to flashcards and speech pronunciation!'
  },
  {
    rank: 4,
    id: 'user-top-4',
    name: 'David Chen',
    avatar: '/students/david.jpg',
    xp: 3640,
    completedLessons: 19,
    streak: 21,
    levelTier: 'Grammar Explorer',
    badge: '⭐ Consistent',
    country: 'Singapore',
    marks: {
      total: 463,
      max: 500,
      percentage: 92.6,
      grade: 'A (Merit)',
      grammar: 93.0,
      vocabulary: 92.5,
      quizAccuracy: 93.4,
      writing: 94.8,
      pronunciation: 91.2
    },
    skills: {
      topSkill: 'Essay Writing & Cohesion',
      strengths: ['Transition Words', 'Sentence Variety', 'Formal Tone', 'Grammar Correction'],
      accuracyRate: '93.4%',
      weeklyGrowth: '+10.8%',
      avgSpeed: '2.4s / question',
      studyTime: '11.5 hrs',
      quizzesMastered: 37
    },
    quote: 'The AI essay feedback helped me spot subtle grammatical ambiguities instantly.'
  },
  {
    rank: 5,
    id: 'user-top-5',
    name: 'Sneha Patil',
    avatar: '/students/sneha.jpg',
    xp: 3410,
    completedLessons: 18,
    streak: 19,
    levelTier: 'Grammar Explorer',
    badge: '⭐ Consistent',
    country: 'India',
    marks: {
      total: 455,
      max: 500,
      percentage: 91.0,
      grade: 'A (Merit)',
      grammar: 91.8,
      vocabulary: 93.2,
      quizAccuracy: 91.5,
      writing: 90.4,
      pronunciation: 93.0
    },
    skills: {
      topSkill: 'Listening & Pronunciation Clarity',
      strengths: ['Phonetics & IPA', 'Word Stress', 'Conjunctions', 'Daily Consistency'],
      accuracyRate: '91.5%',
      weeklyGrowth: '+9.4%',
      avgSpeed: '2.2s / question',
      studyTime: '10.8 hrs',
      quizzesMastered: 34
    },
    quote: 'Consistency is everything. Even a 10-question daily challenge keeps the streak alive!'
  },
  {
    rank: 6,
    id: 'user-top-6',
    name: 'Mohammad Farooq',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    xp: 3120,
    completedLessons: 16,
    streak: 17,
    levelTier: 'Grammar Explorer',
    badge: '⚡ Rising Star',
    country: 'UAE',
    marks: {
      total: 442,
      max: 500,
      percentage: 88.4,
      grade: 'B+',
      grammar: 89.0,
      vocabulary: 88.5,
      quizAccuracy: 88.0,
      writing: 87.0,
      pronunciation: 89.5
    },
    skills: {
      topSkill: 'Conditionals & Modals',
      strengths: ['Past Participles', 'Daily Quizzes'],
      accuracyRate: '88.0%',
      weeklyGrowth: '+8.1%',
      avgSpeed: '2.6s / question',
      studyTime: '9.4 hrs',
      quizzesMastered: 30
    }
  },
  {
    rank: 7,
    id: 'user-top-7',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    xp: 2890,
    completedLessons: 15,
    streak: 14,
    levelTier: 'Learner',
    badge: '⚡ Rising Star',
    country: 'Germany',
    marks: {
      total: 430,
      max: 500,
      percentage: 86.0,
      grade: 'B+',
      grammar: 87.0,
      vocabulary: 85.5,
      quizAccuracy: 86.2,
      writing: 86.0,
      pronunciation: 85.0
    },
    skills: {
      topSkill: 'Articles & Determiners',
      strengths: ['Countable vs Uncountable', 'Streak Persistence'],
      accuracyRate: '86.2%',
      weeklyGrowth: '+7.5%',
      avgSpeed: '2.7s / question',
      studyTime: '8.6 hrs',
      quizzesMastered: 27
    }
  },
  {
    rank: 8,
    id: 'user-top-8',
    name: 'Rahul Hegde',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    xp: 2650,
    completedLessons: 14,
    streak: 12,
    levelTier: 'Learner',
    badge: '🌱 Focused',
    country: 'India',
    marks: {
      total: 418,
      max: 500,
      percentage: 83.6,
      grade: 'B',
      grammar: 84.0,
      vocabulary: 83.0,
      quizAccuracy: 84.5,
      writing: 82.5,
      pronunciation: 83.0
    },
    skills: {
      topSkill: 'Subject-Verb Agreement',
      strengths: ['Tense Forms', 'Vocabulary Expansion'],
      accuracyRate: '84.5%',
      weeklyGrowth: '+6.2%',
      avgSpeed: '2.9s / question',
      studyTime: '7.8 hrs',
      quizzesMastered: 24
    }
  },
  {
    rank: 9,
    id: 'user-top-9',
    name: 'Mei Ling',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    xp: 2420,
    completedLessons: 13,
    streak: 11,
    levelTier: 'Learner',
    badge: '🌱 Focused',
    country: 'Malaysia',
    marks: {
      total: 405,
      max: 500,
      percentage: 81.0,
      grade: 'B',
      grammar: 81.5,
      vocabulary: 82.0,
      quizAccuracy: 81.0,
      writing: 80.0,
      pronunciation: 82.0
    },
    skills: {
      topSkill: 'Prepositions of Place & Time',
      strengths: ['Daily Vocab', 'Basic Clauses'],
      accuracyRate: '81.0%',
      weeklyGrowth: '+5.8%',
      avgSpeed: '3.0s / question',
      studyTime: '7.2 hrs',
      quizzesMastered: 22
    }
  },
  {
    rank: 10,
    id: 'user-top-10',
    name: 'Arjun Das',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    xp: 2210,
    completedLessons: 12,
    streak: 9,
    levelTier: 'Learner',
    badge: '🌱 Focused',
    country: 'India',
    marks: {
      total: 395,
      max: 500,
      percentage: 79.0,
      grade: 'B-',
      grammar: 79.5,
      vocabulary: 80.0,
      quizAccuracy: 78.5,
      writing: 77.0,
      pronunciation: 80.0
    },
    skills: {
      topSkill: 'Pronouns & Possessives',
      strengths: ['Word Definitions', 'Beginner Quizzes'],
      accuracyRate: '78.5%',
      weeklyGrowth: '+5.0%',
      avgSpeed: '3.2s / question',
      studyTime: '6.5 hrs',
      quizzesMastered: 19
    }
  }
];
