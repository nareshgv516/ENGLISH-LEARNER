// Daily Challenges Database - 7 distinct daily challenge sets
// Each day includes: 5 grammar questions, 5 vocabulary questions, 1 sentence correction, 1 mini writing prompt

export const dailyChallenges = [
  {
    dayNumber: 1,
    title: 'Monday Kickoff: Foundation Master',
    theme: 'Present Simple & Daily Life',
    xpReward: 50,
    grammarQuestions: [
      {
        id: 'dc1-g1',
        question: 'Ravi _____ his teeth twice every day.',
        options: ['brush', 'brushes', 'is brushing', 'brushed'],
        correct: 1,
        explanation: 'Habitual actions with 3rd-person singular take -es: "brushes".'
      },
      {
        id: 'dc1-g2',
        question: 'They _____ not enjoy waking up early on Sundays.',
        options: ['do', 'does', 'are', 'is'],
        correct: 0,
        explanation: 'Plural subject "they" requires auxiliary "do not".'
      },
      {
        id: 'dc1-g3',
        question: '_____ you play badminton after college?',
        options: ['Do', 'Does', 'Are', 'Is'],
        correct: 0,
        explanation: 'Second person "you" takes auxiliary "Do".'
      },
      {
        id: 'dc1-g4',
        question: 'The library _____ at 9:00 AM sharp every weekday.',
        options: ['opens', 'open', 'opening', 'is open'],
        correct: 0,
        explanation: 'Timetables and scheduled events use the Present Simple ("opens").'
      },
      {
        id: 'dc1-g5',
        question: 'She _____ three languages fluently.',
        options: ['speak', 'speaks', 'is speaking', 'spoken'],
        correct: 1,
        explanation: '"She" is singular, so the verb ends with -s: "speaks".'
      }
    ],
    vocabQuestions: [
      {
        id: 'dc1-v1',
        word: 'Punctual',
        question: 'What is the meaning of "Punctual"?',
        options: ['Arriving on time', 'Speaking loudly', 'Being very rich', 'Always polite'],
        correct: 0,
        explanation: 'Punctual means doing something at the agreed or proper time; not late.'
      },
      {
        id: 'dc1-v2',
        word: 'Diligent',
        question: 'What is a synonym for "Diligent"?',
        options: ['Hardworking', 'Careless', 'Slow', 'Timid'],
        correct: 0,
        explanation: 'Diligent implies conscientious, persistent hard work.'
      },
      {
        id: 'dc1-v3',
        word: 'Leisure',
        question: 'Which word is the ANTONYM of "Leisure"?',
        options: ['Labor / Work', 'Relaxation', 'Vacation', 'Hobby'],
        correct: 0,
        explanation: 'Leisure is free, relaxing time; its opposite is labor or work.'
      },
      {
        id: 'dc1-v4',
        word: 'Sincere',
        question: '"She offered a sincere apology." What does "sincere" mean here?',
        options: ['Genuine and honest', 'Fake and forced', 'Short and quick', 'Angry'],
        correct: 0,
        explanation: 'Sincere means genuine, honest, and heartfelt.'
      },
      {
        id: 'dc1-v5',
        word: 'Acquire',
        question: 'Choose the correct sentence using "Acquire":',
        options: [
          'He worked hard to acquire new technical skills.',
          'The acquire was very fast.',
          'She acquired to the cinema.',
          'They acquire of yesterday.'
        ],
        correct: 0,
        explanation: '"Acquire" is a transitive verb meaning to gain or obtain.'
      }
    ],
    sentenceCorrection: {
      id: 'dc1-sc',
      sentence: 'He don\'t know the answer to the teacher\'s question.',
      correct: 'He doesn\'t know the answer to the teacher\'s question.',
      hint: 'Subject is "he" (singular).'
    },
    miniWritingTask: {
      id: 'dc1-w',
      prompt: 'Write 2-3 sentences describing your morning routine using the Present Simple tense.',
      minWords: 20
    }
  ,
    speakingSprint: {
      phrase: "She sells specialized software by the bustling seashore.",
      focus: "Distinguishing between /s/ ('software', 'sells') and /ʃ/ ('she', 'seashore').",
      tip: "Keep your tongue tip low for /s/ and pull it slightly back for /ʃ/!"
    },
    sentenceScramble: {
      words: ["Every", "diligent", "student", "achieves", "academic", "excellence", "through", "practice."],
      correct: "Every diligent student achieves academic excellence through practice.",
      hint: "Start with the capitalized determiner 'Every' + Adjective + Subject."
    },
    mysteryIdiom: {
      idiom: "Hit the nail on the head",
      meaning: "To state or describe something with total accuracy and precision.",
      origin: "From ancient carpentry where driving a nail straight on its head produced perfect structural integrity.",
      example: "When Ananya diagnosed the grammar problem, she hit the nail on the head."
    }
  },
  {
    dayNumber: 2,
    title: 'Tuesday Sprint: Past Actions & Memory',
    theme: 'Past Simple & Irregular Verbs',
    xpReward: 50,
    grammarQuestions: [
      {
        id: 'dc2-g1',
        question: 'We _____ an intriguing documentary yesterday evening.',
        options: ['watch', 'watched', 'were watched', 'have watched'],
        correct: 1,
        explanation: '"Yesterday evening" marks a completed past event, requiring "watched".'
      },
      {
        id: 'dc2-g2',
        question: 'What is the past simple form of the irregular verb "teach"?',
        options: ['Teached', 'Taught', 'Thought', 'Taughten'],
        correct: 1,
        explanation: 'The past simple of teach is "taught".'
      },
      {
        id: 'dc2-g3',
        question: 'Did you _____ the famous museum during your visit to Delhi?',
        options: ['see', 'saw', 'seen', 'seeing'],
        correct: 0,
        explanation: 'After auxiliary "Did", the main verb reverts to base form "see".'
      },
      {
        id: 'dc2-g4',
        question: 'They _____ not attend the seminar last Friday.',
        options: ['did', 'do', 'were', 'have'],
        correct: 0,
        explanation: 'Past negative requires "did not" (didn\'t).'
      },
      {
        id: 'dc2-g5',
        question: 'Where _____ you born?',
        options: ['was', 'were', 'did', 'are'],
        correct: 1,
        explanation: 'Second-person "you" with past verb to be uses "were".'
      }
    ],
    vocabQuestions: [
      {
        id: 'dc2-v1',
        word: 'Hospitality',
        question: 'What does "Hospitality" mean?',
        options: ['Generous and friendly treatment of guests', 'Hospital work', 'Extreme fear', 'Financial accounting'],
        correct: 0,
        explanation: 'Hospitality is the warm reception and care given to visitors.'
      },
      {
        id: 'dc2-v2',
        word: 'Souvenir',
        question: 'A "souvenir" is primarily kept as a:',
        options: ['Reminder of a trip or event', 'Legal document', 'Piece of trash', 'Payment receipt'],
        correct: 0,
        explanation: 'A souvenir is a memento or keepsake from a journey.'
      },
      {
        id: 'dc2-v3',
        word: 'Picturesque',
        question: 'A picturesque village is one that is:',
        options: ['Visually attractive like a picture', 'Noisy and dirty', 'Crowded with traffic', 'Very expensive'],
        correct: 0,
        explanation: 'Picturesque means charming and scenic.'
      },
      {
        id: 'dc2-v4',
        word: 'Excursion',
        question: 'What is an "Excursion"?',
        options: ['A short leisure trip', 'A difficult exam', 'An argument', 'A long novel'],
        correct: 0,
        explanation: 'An excursion is a brief outing or short recreational journey.'
      },
      {
        id: 'dc2-v5',
        word: 'Navigate',
        question: 'Which of the following is a synonym of "Navigate"?',
        options: ['Steer / Guide', 'Sleep', 'Forget', 'Damage'],
        correct: 0,
        explanation: 'To navigate is to steer, chart, or guide a course.'
      }
    ],
    sentenceCorrection: {
      id: 'dc2-sc',
      sentence: 'I didn\'t saw Suresh at the sports ground yesterday.',
      correct: 'I didn\'t see Suresh at the sports ground yesterday.',
      hint: 'After "didn\'t", use the base form of the verb.'
    },
    miniWritingTask: {
      id: 'dc2-w',
      prompt: 'Write 2-3 sentences about one memorable event that happened to you last year.',
      minWords: 20
    }
  ,
    speakingSprint: {
      phrase: "Peter practiced past participles promptly and perfectly.",
      focus: "Crisp voiceless bilabial plosive /p/ and precise past -ed ending /t/.",
      tip: "Release a gentle puff of air for /p/ without vocal cord vibration."
    },
    sentenceScramble: {
      words: ["Yesterday,", "the", "talented", "musicians", "performed", "three", "traditional", "classical", "songs."],
      correct: "Yesterday, the talented musicians performed three traditional classical songs.",
      hint: "Place the introductory time adverbial 'Yesterday,' first."
    },
    mysteryIdiom: {
      idiom: "Once in a blue moon",
      meaning: "Occurring very rarely or almost never.",
      origin: "A rare astronomical occurrence of a second full moon in a single calendar month (every 2.7 years).",
      example: "He usually prepares home meals; he only orders restaurant takeout once in a blue moon."
    }
  },
  {
    dayNumber: 3,
    title: 'Wednesday Focus: Precision & Prepositions',
    theme: 'Prepositions & Articles',
    xpReward: 50,
    grammarQuestions: [
      {
        id: 'dc3-g1',
        question: 'The bus will arrive _____ 10:15 AM.',
        options: ['at', 'on', 'in', 'by'],
        correct: 0,
        explanation: 'Specific clock times take "at".'
      },
      {
        id: 'dc3-g2',
        question: 'We usually travel to our hometown _____ December.',
        options: ['in', 'on', 'at', 'since'],
        correct: 0,
        explanation: 'Months of the year require the preposition "in".'
      },
      {
        id: 'dc3-g3',
        question: 'He is _____ honest and reliable leader.',
        options: ['an', 'a', 'the', 'no article'],
        correct: 0,
        explanation: '"Honest" has a silent \'h\', starting with a vowel sound /ɒ/, needing "an".'
      },
      {
        id: 'dc3-g4',
        question: 'Look at _____ stars shining brightly in the clear sky.',
        options: ['the', 'a', 'an', 'no article'],
        correct: 0,
        explanation: 'Specific celestial bodies visible to both speaker and listener take "the".'
      },
      {
        id: 'dc3-g5',
        question: 'She left her phone _____ the dining table.',
        options: ['on', 'in', 'at', 'into'],
        correct: 0,
        explanation: 'Physical surfaces take the preposition "on".'
      }
    ],
    vocabQuestions: [
      {
        id: 'dc3-v1',
        word: 'Negotiation',
        question: 'In business, what is a "Negotiation"?',
        options: ['A discussion to reach an agreement', 'A social party', 'A formal firing', 'A sports match'],
        correct: 0,
        explanation: 'Negotiation is mutual bargaining aimed at establishing terms.'
      },
      {
        id: 'dc3-v2',
        word: 'Lucrative',
        question: 'A lucrative contract is one that is:',
        options: ['Highly profitable', 'Extremely dangerous', 'Very short', 'Poorly written'],
        correct: 0,
        explanation: 'Lucrative means yielding significant monetary profit.'
      },
      {
        id: 'dc3-v3',
        word: 'Collaborate',
        question: 'When two teams collaborate, they:',
        options: ['Work together toward a shared objective', 'Compete to defeat each other', 'Stop communicating', 'Argue constantly'],
        correct: 0,
        explanation: 'To collaborate is to cooperate jointly.'
      },
      {
        id: 'dc3-v4',
        word: 'Revenue',
        question: 'Revenue refers to:',
        options: ['Total income earned by an entity', 'Total taxes owed', 'The office location', 'The employee payroll'],
        correct: 0,
        explanation: 'Revenue is total business earnings or turnover.'
      },
      {
        id: 'dc3-v5',
        word: 'Strategy',
        question: 'A strategy is best described as:',
        options: ['A comprehensive plan of action', 'A random guess', 'An accidental outcome', 'A quick reflex'],
        correct: 0,
        explanation: 'A strategy is a carefully structured long-term plan.'
      }
    ],
    sentenceCorrection: {
      id: 'dc3-sc',
      sentence: 'The college celebration starts in Sunday at the morning.',
      correct: 'The college celebration starts on Sunday in the morning.',
      hint: 'Use "on" for days and "in" for morning.'
    },
    miniWritingTask: {
      id: 'dc3-w',
      prompt: 'Write 2-3 sentences about your favourite place in your city using at least two prepositions of place.',
      minWords: 20
    }
  ,
    speakingSprint: {
      phrase: "Whether the weather is warm or whether the weather is windy.",
      focus: "Mastering the voiced dental fricative /ð/ in 'the' and 'weather'.",
      tip: "Place your tongue gently between your teeth and vibrate your vocal cords!"
    },
    sentenceScramble: {
      words: ["We", "have", "already", "visited", "five", "historic", "heritage", "monuments", "today."],
      correct: "We have already visited five historic heritage monuments today.",
      hint: "Use Present Perfect: Subject (We) + auxiliary (have) + adverb (already) + V3."
    },
    mysteryIdiom: {
      idiom: "Bite the bullet",
      meaning: "To face an inevitable difficult situation with fortitude and resolve.",
      origin: "Pre-anesthesia battlefield operations where wounded soldiers bit on lead bullets.",
      example: "I was intimidated by public speaking, but I decided to bite the bullet and present the project."
    }
  },
  {
    dayNumber: 4,
    title: 'Thursday Challenge: Bridge Past & Present',
    theme: 'Present Perfect & Experience',
    xpReward: 50,
    grammarQuestions: [
      {
        id: 'dc4-g1',
        question: 'I _____ already completed all my homework.',
        options: ['have', 'has', 'had', 'am'],
        correct: 0,
        explanation: 'First-person singular "I" takes "have" in Present Perfect.'
      },
      {
        id: 'dc4-g2',
        question: 'She has lived in this neighbourhood _____ ten years.',
        options: ['for', 'since', 'from', 'in'],
        correct: 0,
        explanation: 'A duration or period of time (ten years) uses "for".'
      },
      {
        id: 'dc4-g3',
        question: 'Have you ever _____ to an international language conference?',
        options: ['been', 'be', 'went', 'go'],
        correct: 0,
        explanation: 'Life experience question: "Have you ever been...?"'
      },
      {
        id: 'dc4-g4',
        question: 'He has not called me _____ last Monday.',
        options: ['since', 'for', 'from', 'at'],
        correct: 0,
        explanation: 'A specific past starting point ("last Monday") requires "since".'
      },
      {
        id: 'dc4-g5',
        question: 'Which sentence is grammatically correct?',
        options: [
          'I saw that film yesterday.',
          'I have seen that film yesterday.',
          'I see that film yesterday.',
          'I had seen that film yesterday.'
        ],
        correct: 0,
        explanation: 'Specific completed past time ("yesterday") requires the Past Simple ("saw"), not Present Perfect.'
      }
    ],
    vocabQuestions: [
      {
        id: 'dc4-v1',
        word: 'Algorithm',
        question: 'An algorithm is:',
        options: ['A step-by-step set of rules for solving a problem', 'A computer monitor', 'An internet cable', 'A type of battery'],
        correct: 0,
        explanation: 'An algorithm is a structured computational procedure.'
      },
      {
        id: 'dc4-v2',
        word: 'Autonomous',
        question: 'An autonomous system operates:',
        options: ['Independently without human intervention', 'Only with manual control', 'Very slowly', 'Only underwater'],
        correct: 0,
        explanation: 'Autonomous means self-governing and independent.'
      },
      {
        id: 'dc4-v3',
        word: 'Encryption',
        question: 'Encryption is primarily used to:',
        options: ['Protect data from unauthorized access', 'Delete files quickly', 'Speed up printing', 'Format text font'],
        correct: 0,
        explanation: 'Encryption scrambles information for secure privacy.'
      },
      {
        id: 'dc4-v4',
        word: 'Interface',
        question: 'In technology, what is a user interface (UI)?',
        options: ['The screen and controls allowing a human to interact with software', 'The computer motherboard', 'The power supply', 'The internet speed'],
        correct: 0,
        explanation: 'A user interface is the visual system facilitating user interaction.'
      },
      {
        id: 'dc4-v5',
        word: 'Scalable',
        question: 'A scalable website is capable of:',
        options: ['Handling increasing amounts of user traffic smoothly', 'Changing its language automatically', 'Printing documents', 'Remaining permanently small'],
        correct: 0,
        explanation: 'Scalable software expands gracefully to accommodate growth.'
      }
    ],
    sentenceCorrection: {
      id: 'dc4-sc',
      sentence: 'I have visited the national museum yesterday.',
      correct: 'I visited the national museum yesterday.',
      hint: '"Yesterday" denotes a finished past time; use Past Simple.'
    },
    miniWritingTask: {
      id: 'dc4-w',
      prompt: 'Write 2-3 sentences about something remarkable you have achieved so far in your life.',
      minWords: 20
    }
  ,
    speakingSprint: {
      phrase: "Strictly speaking, sophisticated syntax strengthens student speech.",
      focus: "Consonant clusters /st/ and /sp/ articulation without inserting an extra vowel sound.",
      tip: "Do not add an 'i' or 'e' before /st/—glide directly from the 's' into the 't'!"
    },
    sentenceScramble: {
      words: ["If", "you", "practice", "consistently,", "your", "spoken", "fluency", "will", "improve", "rapidly."],
      correct: "If you practice consistently, your spoken fluency will improve rapidly.",
      hint: "First conditional: If-clause (Present Simple) + Main clause (will + verb)."
    },
    mysteryIdiom: {
      idiom: "Burn the midnight oil",
      meaning: "To work or study intensely late into the night.",
      origin: "Before electricity, scholars worked by the light of kerosene or oil desk lamps.",
      example: "Karthik burned the midnight oil revising all 32 modules for the placement test."
    }
  },
  {
    dayNumber: 5,
    title: 'Friday Flow: Agreement & Harmony',
    theme: 'Subject-Verb Agreement & Modals',
    xpReward: 50,
    grammarQuestions: [
      {
        id: 'dc5-g1',
        question: 'The committee _____ decided to approve the research grant.',
        options: ['has', 'have', 'are', 'were'],
        correct: 0,
        explanation: 'Collective nouns acting as a singular unit take singular verb "has".'
      },
      {
        id: 'dc5-g2',
        question: 'Everybody in our college _____ a student identity card.',
        options: ['has', 'have', 'having', 'are having'],
        correct: 0,
        explanation: 'Indefinite pronoun "Everybody" is grammatically singular, taking "has".'
      },
      {
        id: 'dc5-g3',
        question: 'Either the director or the actors _____ responsible for the change.',
        options: ['are', 'is', 'was', 'has been'],
        correct: 0,
        explanation: 'The verb agrees with the closer subject ("the actors", plural).'
      },
      {
        id: 'dc5-g4',
        question: 'You _____ not reveal confidential passwords to strangers.',
        options: ['must', 'might', 'could', 'shall'],
        correct: 0,
        explanation: 'Strict prohibition against actions is phrased with "must not".'
      },
      {
        id: 'dc5-g5',
        question: 'The professor, together with her research scholars, _____ presenting at the symposium.',
        options: ['is', 'are', 'were', 'have been'],
        correct: 0,
        explanation: 'Phrases like "together with" do not alter the singular subject "professor".'
      }
    ],
    vocabQuestions: [
      {
        id: 'dc5-v1',
        word: 'Meticulous',
        question: 'A meticulous person is someone who:',
        options: ['Pays immense attention to precise details', 'Acts carelessly', 'Always arrives late', 'Speaks very quietly'],
        correct: 0,
        explanation: 'Meticulous denotes thorough, precise attention to detail.'
      },
      {
        id: 'dc5-v2',
        word: 'Eloquent',
        question: 'An eloquent speaker is:',
        options: ['Expressive, articulate, and persuasive', 'Hesitant and quiet', 'Rude to listeners', 'Speaking with errors'],
        correct: 0,
        explanation: 'Eloquent refers to fluent, emotionally persuasive communication.'
      },
      {
        id: 'dc5-v3',
        word: 'Resilient',
        question: 'To be resilient means to:',
        options: ['Recover quickly from setbacks or challenges', 'Break down easily', 'Refuse to work', 'Never learn from mistakes'],
        correct: 0,
        explanation: 'Resilience is the ability to adapt and bounce back.'
      },
      {
        id: 'dc5-v4',
        word: 'Comprehensive',
        question: 'A comprehensive grammar guide is one that is:',
        options: ['Thorough and all-inclusive', 'Very brief and shallow', 'Full of blank pages', 'Complicated and wrong'],
        correct: 0,
        explanation: 'Comprehensive means all-embracing and complete.'
      },
      {
        id: 'dc5-v5',
        word: 'Concise',
        question: 'A concise paragraph is:',
        options: ['Short and clearly expressed without fluff', 'Extremely wordy', 'Filled with errors', 'Unfinished'],
        correct: 0,
        explanation: 'Concise means expressing much in few words.'
      }
    ],
    sentenceCorrection: {
      id: 'dc5-sc',
      sentence: 'One of my friends are preparing for the civil services examination.',
      correct: 'One of my friends is preparing for the civil services examination.',
      hint: 'The true subject is "One", which is singular.'
    },
    miniWritingTask: {
      id: 'dc5-w',
      prompt: 'Write 2-3 sentences describing what qualities make a great teacher or mentor.',
      minWords: 20
    }
  ,
    speakingSprint: {
      phrase: "A proper preposition provides precise position promptly.",
      focus: "Syllable rhythm, stress timing, and clear plosive release across rapid speech.",
      tip: "Stress the first syllable of 'proper', 'provides', and 'promptly'."
    },
    sentenceScramble: {
      words: ["The", "groundbreaking", "research", "paper", "was", "published", "by", "distinguished", "professors."],
      correct: "The groundbreaking research paper was published by distinguished professors.",
      hint: "Passive voice: Subject + was + past participle + by-agent."
    },
    mysteryIdiom: {
      idiom: "Piece of cake",
      meaning: "A task that is extremely simple, straightforward, and effortless.",
      origin: "19th-century cakewalk dances where the most elegant dancers won a decorated cake.",
      example: "After studying the 10 Golden Rules, the grammar quiz was a piece of cake!"
    }
  },
  {
    dayNumber: 6,
    title: 'Saturday Power: Conditions & Logic',
    theme: 'Conditionals & Hypotheticals',
    xpReward: 50,
    grammarQuestions: [
      {
        id: 'dc6-g1',
        question: 'If you heat ice cubes, they _____.',
        options: ['melt', 'will melt', 'melted', 'would melt'],
        correct: 0,
        explanation: 'Zero conditional for universal scientific certainty: If + present, present.'
      },
      {
        id: 'dc6-g2',
        question: 'If she practices daily, she _____ her pronunciation test.',
        options: ['will pass', 'passes', 'would pass', 'passed'],
        correct: 0,
        explanation: 'First conditional result clause takes "will + base verb".'
      },
      {
        id: 'dc6-g3',
        question: 'If I were the prime minister, I _____ invest heavily in free education.',
        options: ['would', 'will', 'can', 'shall'],
        correct: 0,
        explanation: 'Second conditional for hypothetical present situations uses "would + base verb".'
      },
      {
        id: 'dc6-g4',
        question: 'If they had departed earlier, they _____ have missed the train.',
        options: ['would not', 'will not', 'cannot', 'did not'],
        correct: 0,
        explanation: 'Third conditional result clause requires "would not have + V3".'
      },
      {
        id: 'dc6-g5',
        question: 'Unless you _____ your assignment today, you will not receive marks.',
        options: ['submit', 'will submit', 'submitted', 'submits'],
        correct: 0,
        explanation: '"Unless" equals "If not" and takes the Present Simple without "will".'
      }
    ],
    vocabQuestions: [
      {
        id: 'dc6-v1',
        word: 'Persevere',
        question: 'What does it mean to "Persevere"?',
        options: ['Persist despite difficulties', 'Give up easily', 'Forget everything', 'Complain loudly'],
        correct: 0,
        explanation: 'Perseverance is steadfast persistence through challenges.'
      },
      {
        id: 'dc6-v2',
        word: 'Accomplish',
        question: 'Choose the antonym of "Accomplish":',
        options: ['Fail / Abandon', 'Succeed', 'Achieve', 'Complete'],
        correct: 0,
        explanation: 'The opposite of accomplishing a goal is failing or abandoning it.'
      },
      {
        id: 'dc6-v3',
        word: 'Demonstrate',
        question: 'When a teacher demonstrates a scientific concept, they:',
        options: ['Show and prove how it works with evidence', 'Hide the apparatus', 'Leave the room', 'Refuse to explain'],
        correct: 0,
        explanation: 'To demonstrate is to visibly exhibit or illustrate.'
      },
      {
        id: 'dc6-v4',
        word: 'Articulate',
        question: 'An articulate student is able to:',
        options: ['Express thoughts clearly and effectively', 'Mumble inaudibly', 'Draw pictures only', 'Write slowly'],
        correct: 0,
        explanation: 'Articulate means expressing ideas clearly and fluently.'
      },
      {
        id: 'dc6-v5',
        word: 'Facilitate',
        question: 'To facilitate a workshop means to:',
        options: ['Make the process smoother and easier for participants', 'Cancel the event', 'Confuse attendees', 'Charge exorbitant fees'],
        correct: 0,
        explanation: 'Facilitate means to ease and assist the execution of an activity.'
      }
    ],
    sentenceCorrection: {
      id: 'dc6-sc',
      sentence: 'If you will invite me to the party, I will definitely come.',
      correct: 'If you invite me to the party, I will definitely come.',
      hint: 'Never use "will" in the conditional "if" clause.'
    },
    miniWritingTask: {
      id: 'dc6-w',
      prompt: 'Write 2-3 sentences about what you would do if you had the opportunity to travel anywhere in the world.',
      minWords: 20
    }
  ,
    speakingSprint: {
      phrase: "Rarely did the curious child question quick clever clues.",
      focus: "Inversion melody cadence and sharp velar plosives /k/ and /kw/ in 'quick' and 'question'.",
      tip: "Round your lips slightly for the /w/ sound in 'quick'."
    },
    sentenceScramble: {
      words: ["Hardly", "had", "the", "professor", "arrived", "when", "the", "interactive", "lecture", "began."],
      correct: "Hardly had the professor arrived when the interactive lecture began.",
      hint: "Negative inversion: Hardly + had + Subject + V3 + when..."
    },
    mysteryIdiom: {
      idiom: "Under the weather",
      meaning: "Feeling slightly unwell, fatigued, or under stress.",
      origin: "Old sailing phrase: seasick passengers went down into the cabin to get 'under' bad weather.",
      example: "Sneha was feeling a little under the weather, so she took a warm cup of herbal tea."
    }
  },
  {
    dayNumber: 7,
    title: 'Sunday Mastery: Advanced Transformation',
    theme: 'Voice, Reported Speech & Inversion',
    xpReward: 50,
    grammarQuestions: [
      {
        id: 'dc7-g1',
        question: 'The innovative mobile application _____ by our engineering team.',
        options: ['was developed', 'developed', 'has developing', 'was develop'],
        correct: 0,
        explanation: 'Past passive voice requires "was/were + past participle (developed)".'
      },
      {
        id: 'dc7-g2',
        question: 'He said, "I can solve this equation." -> He said that he _____ solve that equation.',
        options: ['could', 'can', 'will', 'may'],
        correct: 0,
        explanation: 'Modal "can" backshifts to "could" in indirect reported speech.'
      },
      {
        id: 'dc7-g3',
        question: 'Hardly _____ the library when the fire alarm sounded.',
        options: ['had we entered', 'we entered', 'did we entered', 'we had entered'],
        correct: 0,
        explanation: 'Restrictive adverb "Hardly" triggers inversion: auxiliary ("had") + subject ("we") + participle.'
      },
      {
        id: 'dc7-g4',
        question: 'She asked me where _____ spending the winter vacation.',
        options: ['I was', 'was I', 'did I was', 'am I'],
        correct: 0,
        explanation: 'Reported questions adopt standard affirmative statement word order ("I was").'
      },
      {
        id: 'dc7-g5',
        question: 'The research paper _____ published in the international journal next month.',
        options: ['will be', 'is', 'has', 'was'],
        correct: 0,
        explanation: 'Future passive voice requires "will be + past participle".'
      }
    ],
    vocabQuestions: [
      {
        id: 'dc7-v1',
        word: 'Profound',
        question: 'What is the meaning of "Profound"?',
        options: ['Very deep, intense, or insightful', 'Shallow and silly', 'Extremely loud', 'Occurring yesterday'],
        correct: 0,
        explanation: 'Profound describes great intellectual or emotional depth.'
      },
      {
        id: 'dc7-v2',
        word: 'Pragmatic',
        question: 'A pragmatic decision is based on:',
        options: ['Practical reality rather than mere theory', 'Pure fantasy', 'Anger and impulse', 'Random dice rolls'],
        correct: 0,
        explanation: 'Pragmatism emphasizes practical solutions and real-world results.'
      },
      {
        id: 'dc7-v3',
        word: 'Ambiguous',
        question: 'An ambiguous statement is one that:',
        options: ['Has multiple possible interpretations; unclear', 'Is totally obvious', 'Is written in stone', 'Is very short'],
        correct: 0,
        explanation: 'Ambiguous means having double or unclear meanings.'
      },
      {
        id: 'dc7-v4',
        word: 'Versatile',
        question: 'A versatile tool is one that:',
        options: ['Can adapt to do many different tasks', 'Can do only one simple thing', 'Is broken and useless', 'Is made of glass'],
        correct: 0,
        explanation: 'Versatile signifies high adaptability across many contexts.'
      },
      {
        id: 'dc7-v5',
        word: 'Pedagogy',
        question: 'Pedagogy deals primarily with:',
        options: ['The art and science of teaching methods', 'The study of feet', 'Computer hardware', 'Gardening techniques'],
        correct: 0,
        explanation: 'Pedagogy is the academic discipline studying instructional methods.'
      }
    ],
    sentenceCorrection: {
      id: 'dc7-sc',
      sentence: 'Rarely I have witnessed such magnificent eloquence in a debate.',
      correct: 'Rarely have I witnessed such magnificent eloquence in a debate.',
      hint: 'Invert the subject and auxiliary after "Rarely".'
    },
    miniWritingTask: {
      id: 'dc7-w',
      prompt: 'Write 2-3 sentences reflecting on what you learned about English grammar this week and your goal for next week.',
      minWords: 20
    },
    speakingSprint: {
      phrase: "Having had his hearty breakfast, he happily hiked the high hills.",
      focus: "The aspirated glottal fricative /h/—ensuring every 'h' is audibly breathed.",
      tip: "Keep your throat relaxed and breathe out as you form each word starting with 'h'."
    },
    sentenceScramble: {
      words: ["Having", "finished", "their", "assignments,", "the", "engineers", "celebrated", "their", "success."],
      correct: "Having finished their assignments, the engineers celebrated their success.",
      hint: "Participle clause: Having + V3 (finished) starts the sentence."
    },
    mysteryIdiom: {
      idiom: "Break the ice",
      meaning: "To make people feel more relaxed and initiate friendly conversation.",
      origin: "Specialized maritime icebreakers clearing frozen harbors so ships could trade.",
      example: "The teacher started with an amusing idiom to break the ice with the new learners."
    }
  }
];
