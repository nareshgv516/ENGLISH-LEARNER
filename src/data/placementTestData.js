// Placement Test Database - 20 calibrated diagnostic questions

export const placementQuestions = [
  // Beginner level questions (Q1 - Q5)
  {
    id: 'pt-1',
    question: 'She _____ to work by train every weekday.',
    options: ['go', 'goes', 'going', 'gone'],
    correct: 1,
    levelTier: 'Beginner',
    explanation: 'Third-person singular present simple requires "-es": "goes".'
  },
  {
    id: 'pt-2',
    question: 'Ravi has lived in Tumakuru _____ three years.',
    options: ['for', 'since', 'from', 'in'],
    correct: 0,
    levelTier: 'Beginner',
    explanation: 'Use "for" with a duration or period of time.'
  },
  {
    id: 'pt-3',
    question: 'She is _____ honest and reliable friend.',
    options: ['a', 'an', 'the', 'no article'],
    correct: 1,
    levelTier: 'Beginner',
    explanation: '"Honest" begins with a vowel phonetic sound /ɒ/, requiring "an".'
  },
  {
    id: 'pt-4',
    question: 'Where _____ you last evening?',
    options: ['was', 'were', 'did', 'are'],
    correct: 1,
    levelTier: 'Beginner',
    explanation: 'Second-person "you" in past state of being takes "were".'
  },
  {
    id: 'pt-5',
    question: 'This book belongs to Priya; it is _____.',
    options: ['her', 'hers', 'she', 'herself'],
    correct: 1,
    levelTier: 'Beginner',
    explanation: 'The independent possessive pronoun is "hers".'
  },

  // Elementary level questions (Q6 - Q10)
  {
    id: 'pt-6',
    question: 'Look at the clear sky! It _____ a sunny day.',
    options: ['will be', 'is going to be', 'was', 'being'],
    correct: 1,
    levelTier: 'Elementary',
    explanation: 'Present visual evidence calls for "is going to be".'
  },
  {
    id: 'pt-7',
    question: 'Neither the teacher nor the students _____ in the laboratory.',
    options: ['was', 'were', 'is', 'has been'],
    correct: 1,
    levelTier: 'Elementary',
    explanation: 'In "neither...nor", the verb agrees with the closer subject ("students", plural).'
  },
  {
    id: 'pt-8',
    question: 'He spoke so _____ that everyone in the back row heard him clearly.',
    options: ['loud', 'loudly', 'more loud', 'loudness'],
    correct: 1,
    levelTier: 'Elementary',
    explanation: 'Verbs of action (spoke) are modified by adverbs of manner (loudly).'
  },
  {
    id: 'pt-9',
    question: 'Could you give me _____ information regarding the train schedule?',
    options: ['an', 'some', 'many', 'a few'],
    correct: 1,
    levelTier: 'Elementary',
    explanation: '"Information" is uncountable and pairs with "some".'
  },
  {
    id: 'pt-10',
    question: 'Although she was fatigued, _____ she completed her project on time.',
    options: ['but', 'yet', 'so', '(no word needed)'],
    correct: 3,
    levelTier: 'Elementary',
    explanation: 'Do not use "but" or "yet" when a clause begins with "Although".'
  },

  // Intermediate level questions (Q11 - Q15)
  {
    id: 'pt-11',
    question: 'By the time the ambulance arrived, the patient _____ stabilized by the paramedic.',
    options: ['had been', 'was', 'has been', 'is'],
    correct: 0,
    levelTier: 'Intermediate',
    explanation: 'The earlier past action prior to arrival requires Past Perfect Passive ("had been").'
  },
  {
    id: 'pt-12',
    question: 'If I _____ more free time, I would learn a musical instrument.',
    options: ['have', 'had', 'would have', 'have had'],
    correct: 1,
    levelTier: 'Intermediate',
    explanation: 'Second conditional uses "If + Past Simple, would + base verb".'
  },
  {
    id: 'pt-13',
    question: 'She is looking forward to _____ her grandparents during the festival.',
    options: ['visit', 'visiting', 'visited', 'have visited'],
    correct: 1,
    levelTier: 'Intermediate',
    explanation: 'Phrasal verb ending with preposition "to" requires the gerund "visiting".'
  },
  {
    id: 'pt-14',
    question: 'The landmark _____ was constructed in the 17th century draws thousands of tourists.',
    options: ['which', 'whom', 'who', 'what'],
    correct: 0,
    levelTier: 'Intermediate',
    explanation: 'Relative pronoun "which" refers to things/inanimate landmarks.'
  },
  {
    id: 'pt-15',
    question: 'He said, "I have solved the riddle." -> He said that he _____ the riddle.',
    options: ['has solved', 'had solved', 'solves', 'would solve'],
    correct: 1,
    levelTier: 'Intermediate',
    explanation: 'Present perfect ("have solved") backshifts to Past Perfect ("had solved") in indirect speech.'
  },

  // Advanced level questions (Q16 - Q20)
  {
    id: 'pt-16',
    question: 'If the team had scored that last-minute penalty, they _____ the championship.',
    options: ['would win', 'would have won', 'will win', 'had won'],
    correct: 1,
    levelTier: 'Advanced',
    explanation: 'Third conditional result clause requires "would have + past participle".'
  },
  {
    id: 'pt-17',
    question: 'Seldom _____ such an articulate and persuasive keynote presentation.',
    options: ['we have heard', 'have we heard', 'we heard', 'did we heard'],
    correct: 1,
    levelTier: 'Advanced',
    explanation: 'Negative fronted adverbial "Seldom" triggers subject-auxiliary inversion: "have we heard".'
  },
  {
    id: 'pt-18',
    question: 'The researcher analyzed the data rigorously; _____, she uncovered an unprecedented pattern.',
    options: ['consequently', 'because', 'although', 'despite'],
    correct: 0,
    levelTier: 'Advanced',
    explanation: 'A semicolon followed by a transitional adverb ("consequently") and comma links independent clauses.'
  },
  {
    id: 'pt-19',
    question: 'Scarcely _____ the stage when the enthusiastic crowd began cheering.',
    options: ['had he stepped onto', 'he stepped onto', 'did he stepped onto', 'was he stepped onto'],
    correct: 0,
    levelTier: 'Advanced',
    explanation: '"Scarcely...when" triggers past perfect inversion: "had he stepped onto".'
  },
  {
    id: 'pt-20',
    question: 'Under no circumstances _____ this confidential security credential to unauthorized personnel.',
    options: ['you should disclose', 'should you disclose', 'you must disclose', 'did you disclose'],
    correct: 1,
    levelTier: 'Advanced',
    explanation: 'Negative prepositional phrase "Under no circumstances" requires inversion: "should you disclose".'
  }
];

export const calculatePlacementLevel = (score) => {
  if (score >= 17) {
    return {
      level: 'Advanced',
      badge: 'Master Scholar',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-950/60',
      description: 'You possess advanced grammatical proficiency and an impressive grasp of complex clauses, inversion, and nuanced structures.',
      recommendedTopics: ['inversion-emphasis', 'advanced-punctuation', 'complex-sentences', 'conditionals-second-third']
    };
  } else if (score >= 12) {
    return {
      level: 'Intermediate',
      badge: 'Grammar Explorer',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-950/60',
      description: 'You have a solid command of core grammar and are ready to tackle complex conditionals, passive voice, and reported speech.',
      recommendedTopics: ['past-perfect', 'conditionals-zero-first', 'active-passive-voice', 'reported-speech', 'gerunds-infinitives']
    };
  } else if (score >= 6) {
    return {
      level: 'Elementary',
      badge: 'Stepping Up',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-950/60',
      description: 'You understand basic structures well and will now master perfect tenses, subject-verb agreement, and prepositions.',
      recommendedTopics: ['present-perfect', 'future-forms', 'subject-verb-agreement', 'adjectives-comparatives', 'conjunctions-linking']
    };
  } else {
    return {
      level: 'Beginner',
      badge: 'Language Starter',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-950/60',
      description: 'Welcome to your English journey! We will guide you step by step through fundamentals: nouns, simple tenses, articles, and pronouns.',
      recommendedTopics: ['present-simple', 'present-continuous', 'past-simple', 'nouns-types', 'articles-rules', 'prepositions-time-place']
    };
  }
};
