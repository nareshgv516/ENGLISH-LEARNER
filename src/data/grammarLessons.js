// Grammar Lessons Data - 32 Comprehensive Lessons across 4 Levels and 17 Categories

export const grammarCategories = [
  { id: 'tenses', name: 'Tenses', icon: 'Clock', description: 'Past, Present, Future and their continuous/perfect forms', count: 7 },
  { id: 'parts-of-speech', name: 'Parts of Speech', icon: 'Sparkles', description: 'Nouns, Verbs, Adjectives, Adverbs, and Pronouns', count: 4 },
  { id: 'articles', name: 'Articles', icon: 'FileText', description: 'Definite (The), Indefinite (A/An), and Zero Article rules', count: 1 },
  { id: 'prepositions', name: 'Prepositions', icon: 'Compass', description: 'Prepositions of time, place, direction, and dependent prepositions', count: 1 },
  { id: 'conjunctions', name: 'Conjunctions', icon: 'Link', description: 'Coordinating, subordinating, and correlative connectors', count: 1 },
  { id: 'modals', name: 'Modals', icon: 'Key', description: 'Can, could, must, should, would, might, and necessity', count: 1 },
  { id: 'conditionals', name: 'Conditionals', icon: 'GitFork', description: 'Zero, First, Second, Third, and Mixed conditional sentences', count: 3 },
  { id: 'voice', name: 'Active & Passive Voice', icon: 'Repeat', description: 'Transforming agent-focused and object-focused sentences', count: 1 },
  { id: 'reported-speech', name: 'Reported Speech', icon: 'MessageSquare', description: 'Direct into indirect quotations with tense and pronoun shifts', count: 1 },
  { id: 'sentence-structure', name: 'Sentence Structure', icon: 'Layers', description: 'Simple, compound, complex sentences, clauses, and inversion', count: 4 },
  { id: 'punctuation', name: 'Punctuation', icon: 'HelpCircle', description: 'Commas, semicolons, colons, apostrophes, and quotation marks', count: 2 },
  { id: 'phrasal-verbs', name: 'Phrasal Verbs', icon: 'Sparkles', description: 'Separable vs inseparable verbs, transitive rules, and everyday idioms', count: 1 },
  { id: 'question-tags', name: 'Question Tags', icon: 'HelpCircle', description: 'Affirmative/negative tag rules, auxiliary matching, and intonation', count: 1 },
  { id: 'causatives', name: 'Causative Verbs', icon: 'Repeat', description: 'Have, Get, Make, Let, and Help in active and passive constructions', count: 1 },
  { id: 'subjunctive', name: 'Subjunctive Mood', icon: 'BookOpen', description: 'Mandative requests, hypothetical states, and formal English structures', count: 1 },
  { id: 'determiners', name: 'Determiners & Quantifiers', icon: 'FileText', description: 'Few vs A Few, Little vs A Little, Each vs Every, and Quantifiers', count: 1 },
  { id: 'clauses', name: 'Participle Clauses', icon: 'Layers', description: 'Present, past, and perfect participle clauses for concise writing', count: 1 },
];

export const grammarLessons = [
  {
    id: 'present-simple',
    title: 'Present Simple Tense',
    level: 'Beginner',
    category: 'tenses',
    readTime: '6 min',
    summary: 'Master habits, general truths, daily routines, and permanent situations.',
    explanation: 'We use the Present Simple tense to talk about daily habits, routines, scientific facts, universal truths, and situations that stay the same for a long time.',
    rule: {
      formula: 'Subject + Base Verb (V1) [+ s/es for he/she/it] + Object',
      heSheItRule: 'Add -s, -es, or -ies to the base verb when the subject is 3rd person singular (he, she, it, or singular noun). Example: he works, she watches, it flies.',
      negativeFormula: 'Subject + do not (don\'t) / does not (doesn\'t) + Base Verb + Object',
      questionFormula: 'Do / Does + Subject + Base Verb + Object?'
    },
    examples: [
      { type: 'Habit / Routine', sentence: 'I go to college every day at 8:00 AM.', note: 'Repeated regular action' },
      { type: 'General Truth', sentence: 'The sun rises in the east and sets in the west.', note: 'Universal scientific fact' },
      { type: 'Permanent State', sentence: 'She lives in Tumakuru with her family.', note: 'Long-term situation' },
      { type: 'Preference', sentence: 'They love learning English grammar.', note: 'Current state of feeling' },
      { type: 'Timetable / Schedule', sentence: 'The library opens at 9:00 AM and closes at 8:00 PM.', note: 'Official fixed schedule' },
      { type: 'Stative Verb / Knowledge', sentence: 'She understands three Indian languages fluently.', note: 'Stative verb expressing ability and knowledge' },
      { type: 'Scientific Fact', sentence: 'Water boils at 100 degrees Celsius under standard atmospheric pressure.', note: 'Immutable scientific truth' }
    ],
    sentenceForms: {
      positive: [
        'I play tennis on weekends.',
        'He plays tennis on weekends.',
        'We study English together.',
        'She studies hard for her exams.'
      ],
      negative: [
        'I do not (don\'t) play golf.',
        'He does not (doesn\'t) drink coffee in the evening.',
        'They don\'t wake up late on weekdays.',
        'She doesn\'t watch television at night.'
      ],
      questions: [
        'Do you like spicy food?',
        'Does he play the guitar?',
        'Where do they live?',
        'What time does the train leave?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'She play tennis every Sunday.',
        correct: 'She plays tennis every Sunday.',
        reason: 'Third-person singular subjects (she/he/it) require the verb to end with -s or -es.'
      },
      {
        wrong: 'He doesn\'t likes tea.',
        correct: 'He doesn\'t like tea.',
        reason: 'After auxiliary "does" or "doesn\'t", the main verb always reverts to its base form (like, not likes).'
      },
      {
        wrong: 'I am live in India.',
        correct: 'I live in India.',
        reason: 'Do not mix the auxiliary verb "am" with base verbs in the Present Simple.'
      }
    ],
    keyTips: [
      'Keywords often used: always, usually, often, sometimes, rarely, never, every day, on Mondays.',
      'Use "do" with: I, you, we, they.',
      'Use "does" with: he, she, it, singular nouns.'
    ],
    practice: [
      {
        id: 'ps-1',
        question: 'She _____ to college by bus every morning.',
        options: ['go', 'goes', 'going', 'is go'],
        correct: 1,
        explanation: 'The subject "she" is third-person singular, so the verb takes the -es ending: "goes".'
      },
      {
        id: 'ps-2',
        question: 'Ravi and Sam _____ not drink coffee.',
        options: ['does', 'do', 'are', 'is'],
        correct: 1,
        explanation: '"Ravi and Sam" is a plural subject (they), so the negative auxiliary is "do not".'
      },
      {
        id: 'ps-3',
        question: 'Where _____ your brother work?',
        options: ['do', 'does', 'is', 'has'],
        correct: 1,
        explanation: '"Your brother" is singular (he), requiring auxiliary "does" for question formation.'
      }
    ]
  },
  {
    id: 'present-continuous',
    title: 'Present Continuous Tense',
    level: 'Beginner',
    category: 'tenses',
    readTime: '5 min',
    summary: 'Express actions happening right now, temporary states, and definite future plans.',
    explanation: 'The Present Continuous (also called Present Progressive) describes activities occurring at the exact moment of speaking, temporary trends, or fixed future arrangements.',
    rule: {
      formula: 'Subject + am/is/are + Verb-ing (Present Participle) + Object',
      heSheItRule: 'Use "am" with I; "is" with he, she, it; "are" with you, we, they.',
      negativeFormula: 'Subject + am/is/are + not + Verb-ing + Object',
      questionFormula: 'Am/Is/Are + Subject + Verb-ing + Object?'
    },
    examples: [
      { type: 'Action now', sentence: 'Look! The children are playing in the garden.', note: 'Happening as we speak' },
      { type: 'Temporary action', sentence: 'I am reading an inspiring book this month.', note: 'In progress over this period' },
      { type: 'Definite future plan', sentence: 'We are meeting the professor tomorrow morning.', note: 'Pre-arranged event' },
      { type: 'Gradual Change / Trend', sentence: 'Global renewable energy adoption is growing rapidly each year.', note: 'Developing trend in progress' },
      { type: 'Work Project in Progress', sentence: 'Our engineering team is developing a new mobile learning application.', note: 'Ongoing medium-term endeavor' },
    ],
    sentenceForms: {
      positive: [
        'I am studying for my grammar exam.',
        'He is cooking dinner for his friends.',
        'They are watching a documentary.'
      ],
      negative: [
        'I am not listening to music right now.',
        'She is not working today because she is ill.',
        'We aren\'t planning to travel this week.'
      ],
      questions: [
        'Are you listening to me?',
        'Why is he running so fast?',
        'What are they doing in the library?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'I am understand this lesson now.',
        correct: 'I understand this lesson now.',
        reason: 'Stative verbs (understand, know, love, believe) describe mental states and are usually NOT used in continuous forms.'
      },
      {
        wrong: 'She is go to the market.',
        correct: 'She is going to the market.',
        reason: 'After "am/is/are" in continuous tense, the main verb must take the "-ing" suffix.'
      }
    ],
    keyTips: [
      'Look for time markers: now, right now, at the moment, currently, this week, Look!, Listen!',
      'Watch out for stative verbs: like, hate, want, need, know, own, believe, understand.'
    ],
    practice: [
      {
        id: 'pc-1',
        question: 'Please be quiet! The baby _____ right now.',
        options: ['sleeps', 'is sleeping', 'sleep', 'was sleeping'],
        correct: 1,
        explanation: '"Right now" signals an ongoing event happening in the immediate present, requiring "is sleeping".'
      },
      {
        id: 'pc-2',
        question: 'Which sentence correctly uses the continuous form?',
        options: ['I am knowing the answer.', 'She is liking ice cream.', 'They are practicing pronunciation.', 'He is wanting a sandwich.'],
        correct: 2,
        explanation: '"Practice" is an action verb that can take "-ing". "Know", "like", and "want" are stative verbs.'
      }
    ]
  },
  {
    id: 'past-simple',
    title: 'Past Simple Tense',
    level: 'Beginner',
    category: 'tenses',
    readTime: '6 min',
    summary: 'Describe finished actions, events, and historical facts at a specific time in the past.',
    explanation: 'We use the Past Simple to talk about completed actions or events that happened at a specific past time. It uses regular verbs ending in "-ed" or irregular verbs with unique forms (go -> went, see -> saw).',
    rule: {
      formula: 'Subject + Past Verb Form (V2) + Object',
      heSheItRule: 'The past simple form is the same for all persons (I, you, he, she, we, they), except for the verb "be" (was/were).',
      negativeFormula: 'Subject + did not (didn\'t) + Base Verb (V1) + Object',
      questionFormula: 'Did + Subject + Base Verb (V1) + Object?'
    },
    examples: [
      { type: 'Completed action', sentence: 'He graduated from university last year.', note: 'Finished in the past' },
      { type: 'Past series', sentence: 'She woke up, brushed her teeth, and made tea.', note: 'Sequential actions' },
      { type: 'Past state', sentence: 'They lived in London for five years during childhood.', note: 'Past situation no longer active' },
      { type: 'Historical Milestone', sentence: 'India achieved independence on August 15, 1947.', note: 'Historical fact at fixed past time' },
      { type: 'Past Habitual Action', sentence: 'When I lived in Bengaluru, I walked to work every single day.', note: 'Regular habit in the past' },
    ],
    sentenceForms: {
      positive: [
        'I visited the museum yesterday afternoon.',
        'She bought a new laptop last Friday.',
        'They traveled to Mysuru by train.'
      ],
      negative: [
        'I did not receive your email yesterday.',
        'He didn\'t understand the instructions.',
        'We didn\'t go to the cinema last night.'
      ],
      questions: [
        'Did you finish the homework on time?',
        'Where did she find her keys?',
        'What did you learn in yesterday\'s class?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'Did you went to school yesterday?',
        correct: 'Did you go to school yesterday?',
        reason: 'After the auxiliary "did", the verb must return to its base infinitive form (go, not went).'
      },
      {
        wrong: 'She didn\'t saw the movie.',
        correct: 'She didn\'t see the movie.',
        reason: 'Negative past with "didn\'t" requires the base verb (see, not saw).'
      }
    ],
    keyTips: [
      'Common past time markers: yesterday, last week, 2 years ago, in 2018, when I was young.',
      'Regular verbs add -ed (watch -> watched). Irregular verbs change form (eat -> ate, write -> wrote).'
    ],
    practice: [
      {
        id: 'pst-1',
        question: 'Ravi _____ his wallet on the bus yesterday.',
        options: ['lose', 'lost', 'losing', 'has lost'],
        correct: 1,
        explanation: 'Past simple of the irregular verb "lose" is "lost", matching the past marker "yesterday".'
      },
      {
        id: 'pst-2',
        question: 'Why _____ you call me last night?',
        options: ['didn\'t', 'weren\'t', 'haven\'t', 'don\'t'],
        correct: 0,
        explanation: 'To form a negative past question with an action verb (call), use "didn\'t".'
      }
    ]
  },
  {
    id: 'present-perfect',
    title: 'Present Perfect Tense',
    level: 'Elementary',
    category: 'tenses',
    readTime: '7 min',
    summary: 'Connect past actions with the present moment: life experiences, recent events, and ongoing states.',
    explanation: 'The Present Perfect connects the past with the present. It is used when the exact time of the action is not specified or important, or when a past action has a direct visible result right now.',
    rule: {
      formula: 'Subject + have / has + Past Participle (V3) + Object',
      heSheItRule: 'Use "has" with he, she, it. Use "have" with I, you, we, they.',
      negativeFormula: 'Subject + have/has not (haven\'t/hasn\'t) + Past Participle (V3) + Object',
      questionFormula: 'Have / Has + Subject + Past Participle (V3) + Object?'
    },
    examples: [
      { type: 'Life experience', sentence: 'I have visited five different countries.', note: 'Anytime in life up to now' },
      { type: 'Past with present result', sentence: 'He has lost his keys, so he cannot open the door.', note: 'Direct result now' },
      { type: 'Action starting in past continuing now', sentence: 'She has worked here for three years.', note: 'Still working here' },
      { type: 'Recent Completed Action (Just)', sentence: 'She has just submitted her master\'s research paper.', note: 'Action completed moments ago' },
      { type: 'Unfinished Time Window', sentence: 'I have read three full chapters this morning.', note: 'The morning is still ongoing' },
    ],
    sentenceForms: {
      positive: [
        'I have already submitted my assignment.',
        'She has just arrived at the airport.',
        'They have lived in this city since 2015.'
      ],
      negative: [
        'I haven\'t seen that movie yet.',
        'He hasn\'t replied to my message so far.',
        'We have not visited that museum.'
      ],
      questions: [
        'Have you ever tasted traditional masala dosa?',
        'How long has she known your family?',
        'Have they finished dinner yet?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'I have seen him yesterday.',
        correct: 'I saw him yesterday.',
        reason: 'Do NOT use Present Perfect with specific finished past time indicators like "yesterday", "in 2020", or "two days ago". Use Past Simple instead.'
      },
      {
        wrong: 'She has live here since five years.',
        correct: 'She has lived here for five years.',
        reason: 'Use "for" with periods of time (five years, two hours). Use "since" with specific starting points (2015, Monday, 9 AM).'
      }
    ],
    keyTips: [
      'For vs Since: "For" + duration (for 2 days, for 5 months). "Since" + starting point (since Monday, since 2010).',
      'Ever / Never: "Have you ever...?" asks about life experience. "I have never..." means zero times.'
    ],
    practice: [
      {
        id: 'pp-1',
        question: 'I have known Dr. Sharma _____ more than a decade.',
        options: ['since', 'for', 'from', 'in'],
        correct: 1,
        explanation: '"More than a decade" is a duration/span of time, which requires the preposition "for".'
      },
      {
        id: 'pp-2',
        question: 'She _____ her passport, so she cannot board the flight today.',
        options: ['lost', 'has lost', 'is losing', 'had lost'],
        correct: 1,
        explanation: 'The past action has a direct, critical consequence in the present ("cannot board"), requiring Present Perfect.'
      }
    ]
  },
  {
    id: 'past-perfect',
    title: 'Past Perfect Tense',
    level: 'Intermediate',
    category: 'tenses',
    readTime: '6 min',
    summary: 'Clarify the sequence of two past events: the earlier past before another past action.',
    explanation: 'The Past Perfect (had + V3) is used when referring to an action that took place before another action or point in the past. It establishes clear chronological priority.',
    rule: {
      formula: 'Subject + had + Past Participle (V3) + Object',
      heSheItRule: '"Had" is used for all subjects (I, you, he, she, it, we, they).',
      negativeFormula: 'Subject + had not (hadn\'t) + Past Participle (V3) + Object',
      questionFormula: 'Had + Subject + Past Participle (V3) + Object?'
    },
    examples: [
      { type: 'Chronological priority', sentence: 'When we arrived at the cinema, the film had already started.', note: 'Film started first' },
      { type: 'Reason in past', sentence: 'He was exhausted because he had worked all night.', note: 'Work happened prior to exhaustion' },
      { type: 'Prior Preparation / Reason', sentence: 'She passed the test easily because she had revised every chapter.', note: 'Prior action explaining past success' },
      { type: 'Unfulfilled Past Expectation', sentence: 'I had hoped to visit my grandparents before leaving the city.', note: 'Past intention that did not happen' },
      { type: 'Third Conditional Foundation', sentence: 'If he had known about the traffic jam, he would have taken the metro.', note: 'Hypothetical earlier past condition' }
    ],
    sentenceForms: {
      positive: [
        'By the time the police arrived, the burglar had fled.',
        'She realized she had left her wallet at home.',
        'By 2020, they had established three regional offices in Karnataka.'
      ],
      negative: [
        'They hadn\'t studied English before moving to London.',
        'I hadn\'t heard the news until you told me.',
        'He had not anticipated such an enthusiastic audience reaction.'
      ],
      questions: [
        'Had you ever eaten sushi before that trip?',
        'Had she prepared the presentation before the meeting?',
        'Had you ever worked with artificial intelligence tools before this project?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'When I reached, he left.',
        correct: 'When I reached, he had already left.',
        reason: 'To clarify that he departed before my arrival, use the Past Perfect for the earlier event.'
      }
    ],
    keyTips: [
      'Formula: Earlier past = Past Perfect (had + V3); Later past = Past Simple (V2).',
      'Signal words: by the time, before, after, already, until then.'
    ],
    practice: [
      {
        id: 'pap-1',
        question: 'The train _____ the station before we arrived.',
        options: ['left', 'had left', 'has left', 'was leaving'],
        correct: 1,
        explanation: 'The departure of the train happened prior to our arrival, so Past Perfect ("had left") is needed.'
      }
    ]
  },
  {
    id: 'future-forms',
    title: 'Future Forms: Will vs Going To',
    level: 'Elementary',
    category: 'tenses',
    readTime: '6 min',
    summary: 'Distinguish between spontaneous decisions, predictions, and pre-existing intentions.',
    explanation: 'English has several ways to talk about the future. "Will" is used for spontaneous decisions made at the moment of speaking and general predictions. "Going to" is used for pre-planned intentions and predictions backed by physical evidence.',
    rule: {
      formula: 'Will: Subject + will + Base Verb | Going to: Subject + am/is/are going to + Base Verb',
      heSheItRule: 'Will does not change with subjects. "Going to" requires matching the verb "to be" (am/is/are).',
      negativeFormula: 'will not (won\'t) / am not, isn\'t, aren\'t going to',
      questionFormula: 'Will + Subject + Base Verb? / Am/Is/Are + Subject + going to + Base Verb?'
    },
    examples: [
      { type: 'Spontaneous decision', sentence: 'The phone is ringing. I will answer it!', note: 'Decided right now' },
      { type: 'Pre-planned intention', sentence: 'I am going to study computer science next semester.', note: 'Decided beforehand' },
      { type: 'Evidence-based prediction', sentence: 'Look at those dark clouds! It is going to rain.', note: 'Visible physical proof' },
      { type: 'Spontaneous Decision (Will)', sentence: 'The doorbell is ringing; I will go answer it immediately.', note: 'Decision made at the moment of speaking' },
      { type: 'Evidence-Based Prediction (Going To)', sentence: 'Look at those dark storm clouds; it is going to pour rain.', note: 'Prediction backed by present visible evidence' },
    ],
    sentenceForms: {
      positive: [
        'I think technology will transform healthcare.',
        'We are going to visit our grandparents this weekend.',
        'The university will inaugurate the new library wing next month.',
        'She is going to pursue an advanced degree in computational linguistics.'
      ],
      negative: [
        'I won\'t disclose your secret to anyone.',
        'He is not going to accept that low offer.',
        'We won\'t postpone the seminar unless weather conditions worsen.'
      ],
      questions: [
        'Will you attend the workshop tomorrow?',
        'Are they going to launch the product next month?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'I will to call you later.',
        correct: 'I will call you later.',
        reason: 'Modal "will" is followed directly by the bare infinitive (call), never with "to".'
      },
      {
        wrong: 'Look at that speeding car, it will crash!',
        correct: 'Look at that speeding car, it is going to crash!',
        reason: 'When there is immediate physical evidence in the present, use "be going to".'
      }
    ],
    keyTips: [
      'Will: Promises, offers, spontaneous decisions, personal opinions (I think, I hope).',
      'Be Going To: Existing plans, visible clues, intentions.'
    ],
    practice: [
      {
        id: 'ff-1',
        question: 'Wait, don\'t carry that heavy box alone! I _____ help you.',
        options: ['am going to', 'will', 'going to', 'am helping'],
        correct: 1,
        explanation: 'This is a spontaneous offer decided on the spot, so "will" is the natural choice.'
      }
    ]
  },
  {
    id: 'nouns-types',
    title: 'Nouns & Countable vs Uncountable',
    level: 'Beginner',
    category: 'parts-of-speech',
    readTime: '5 min',
    summary: 'Understand singular, plural, collective, countable, and uncountable noun behavior.',
    explanation: 'A noun names a person, place, thing, or concept. Crucially in English, nouns are divided into Countable (things you can count: apples, chairs, ideas) and Uncountable (substances, concepts, or masses: water, information, advice, furniture).',
    rule: {
      formula: 'Countable: singular takes a/an, has plural (-s/-es). Uncountable: no a/an, no plural -s, takes singular verb.',
      heSheItRule: 'Uncountable nouns always take singular verb agreement (e.g., "The news is good", "Information is reliable").',
      negativeFormula: 'Many / Few for countable; Much / Little for uncountable.',
      questionFormula: 'How many [Countable plural]? / How much [Uncountable]?'
    },
    examples: [
      { type: 'Countable', sentence: 'She bought three books and two pens.', note: 'Can be enumerated' },
      { type: 'Uncountable', sentence: 'He gave me useful advice on career development.', note: 'Cannot say "an advice" or "advices"' },
      { type: 'Quantity modifier', sentence: 'We need a piece of furniture and a bottle of water.', note: 'Using partitives to measure' },
      { type: 'Mass / Abstract Uncountable', sentence: 'Patience and wisdom are qualities that flourish with life experience.', note: 'Abstract nouns cannot be counted' },
      { type: 'Plural-Only Noun', sentence: 'My reading glasses are sitting on the wooden study desk.', note: 'Always plural form taking a plural verb' },
    ],
    sentenceForms: {
      positive: [
        'Knowledge is power.',
        'There are several students waiting outside.',
        'A flock of birds flew across the evening sky over the lake.'
      ],
      negative: [
        'There isn\'t much milk left in the refrigerator.',
        'We don\'t have many options available.',
        'She doesn\'t drink much milk or sugary juice.'
      ],
      questions: [
        'How many languages do you speak?',
        'How much water should I drink daily?',
        'How many luggage bags did you check in at the airport?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'He gave me some good advices.',
        correct: 'He gave me some good advice.',
        reason: '"Advice" is uncountable in English and never takes a plural -s.'
      },
      {
        wrong: 'I have many works to do today.',
        correct: 'I have a lot of work to do today.',
        reason: '"Work" as job tasks is uncountable. Use "a lot of work" or "tasks".'
      }
    ],
    keyTips: [
      'Top tricky uncountable nouns: advice, furniture, luggage, information, news, homework, money, bread.',
      'Use "How many" with countable plurals; "How much" with uncountable nouns.'
    ],
    practice: [
      {
        id: 'n-1',
        question: 'Could you give me _____ information about the course?',
        options: ['an', 'some', 'many', 'a piece of few'],
        correct: 1,
        explanation: '"Information" is uncountable, so you cannot use "an". "Some" correctly quantifies uncountable nouns.'
      }
    ]
  },
  {
    id: 'pronouns-cases',
    title: 'Pronouns & Subject vs Object Cases',
    level: 'Beginner',
    category: 'parts-of-speech',
    readTime: '5 min',
    summary: 'Master subject, object, possessive adjectives, and reflexive pronouns without confusion.',
    explanation: 'Pronouns replace nouns to avoid repetition. The form of a personal pronoun depends strictly on whether it acts as the grammatical subject (doing the action) or the object (receiving the action).',
    rule: {
      formula: 'Subject (I, you, he, she, it, we, they) + Verb + Object (me, you, him, her, it, us, them)',
      heSheItRule: 'Possessive adjectives (my, your, his, her, its, our, their) modify nouns; possessive pronouns (mine, yours, his, hers, ours, theirs) stand alone.',
      negativeFormula: 'Reflexive: myself, yourself, himself, herself, itself, ourselves, themselves.',
      questionFormula: 'Who (subject) vs Whom (object).'
    },
    examples: [
      { type: 'Subject & Object', sentence: 'She invited him to the seminar.', note: 'She = subject; him = object' },
      { type: 'Compound subject', sentence: 'Ravi and I completed the project.', note: 'Never "Ravi and me" as subject' },
      { type: 'Compound object', sentence: 'The director spoke to Ravi and me.', note: 'Object position requires "me"' },
      { type: 'Reflexive for Emphasis', sentence: 'The department head herself answered our academic inquiry.', note: 'Emphatic pronoun reinforcing the subject' },
      { type: 'Possessive Pronoun', sentence: 'That blue umbrella resting near the door is mine, not yours.', note: 'Replaces possessive adjective + noun' },
    ],
    sentenceForms: {
      positive: [
        'He taught himself how to write computer code.',
        'This backpack is hers; that one is mine.',
        'We solved the engineering challenge ourselves without external help.'
      ],
      negative: [
        'They didn\'t inform us about the reschedule.',
        'Neither she nor he was present.',
        'He didn\'t introduce himself to the newly joined colleagues.'
      ],
      questions: [
        'Whom did the committee select for the award?',
        'Is this notebook yours or his?',
        'Whose laptop was left in the lecture hall after class?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'Me and Suresh went to Bangalore.',
        correct: 'Suresh and I went to Bangalore.',
        reason: 'In the subject position, use the subject pronoun "I", and politely put the other person first.'
      },
      {
        wrong: 'Between you and I, this secret is safe.',
        correct: 'Between you and me, this secret is safe.',
        reason: '"Between" is a preposition, and prepositions always govern object pronouns (me, not I).'
      }
    ],
    keyTips: [
      'Quick test: Remove the other person! "I went to Bangalore" sounds right; "Me went to Bangalore" is obviously wrong.',
      'Its vs It\'s: "It\'s" = contraction of "it is" or "it has". "Its" = possessive pronoun (The cat licked its paws).'
    ],
    practice: [
      {
        id: 'pro-1',
        question: 'The professor asked Priya and _____ to prepare the laboratory report.',
        options: ['I', 'me', 'myself', 'mine'],
        correct: 1,
        explanation: 'The pronoun is in the direct object position after "asked", so the object pronoun "me" is required.'
      }
    ]
  },
  {
    id: 'subject-verb-agreement',
    title: 'Subject-Verb Agreement',
    level: 'Elementary',
    category: 'parts-of-speech',
    readTime: '7 min',
    summary: 'The golden rule: singular subjects take singular verbs; plural subjects take plural verbs.',
    explanation: 'Subject-Verb Agreement requires that a subject and its verb agree in number. A singular subject takes a singular verb (with -s in the present simple), while a plural subject takes a plural verb.',
    rule: {
      formula: 'Singular Subject + Verb+s/es | Plural Subject + Base Verb',
      heSheItRule: 'Words like "everyone", "everybody", "each", "nobody", "someone" are grammatically singular and require singular verbs.',
      negativeFormula: 'Phrases between subject and verb (like "together with", "along with", "as well as") do not change the subject number.',
      questionFormula: 'Neither...nor / Either...or agree with the subject closest to the verb.'
    },
    examples: [
      { type: 'Intervening phrase', sentence: 'The teacher, along with all her students, is attending the summit.', note: 'Subject is "teacher" (singular)' },
      { type: 'Indefinite pronoun', sentence: 'Everyone in the lecture hall has a notebook.', note: '"Everyone" is singular' },
      { type: 'Either/Neither', sentence: 'Neither the manager nor the employees were informed.', note: 'Verb agrees with "employees" (plural)' },
      { type: 'Neither...nor Nearest Subject Rule', sentence: 'Neither the professor nor the students were aware of the schedule update.', note: 'Verb agrees with the closer plural subject "students"' },
      { type: 'Intervening Prepositional Phrase', sentence: 'The aroma of freshly baked cardamom buns fills the entire room.', note: 'Verb "fills" agrees with singular "aroma", not "buns"' },
    ],
    sentenceForms: {
      positive: [
        'The list of approved candidates is pinned on the noticeboard.',
        'Ten kilometers is a challenging distance to run.',
        'Every student and teacher receives an access card at the gate.'
      ],
      negative: [
        'None of the food was wasted during the festival.',
        'Neither Rahul nor his brothers want to relocate.',
        'The team of doctors doesn\'t recommend skipping breakfast.'
      ],
      questions: [
        'Does everyone understand the instructions?',
        'Are either of the proposals acceptable?',
        'Does each of these books contain grammar exercises?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'One of my friends live in London.',
        correct: 'One of my friends lives in London.',
        reason: 'The true subject is "One", which is singular. Do not be confused by the plural noun "friends" inside the prepositional phrase.'
      },
      {
        wrong: 'Every student have submitted the project.',
        correct: 'Every student has submitted the project.',
        reason: '"Every student" is singular and requires "has".'
      }
    ],
    keyTips: [
      'Ignore words that come between the subject and verb: "The box [of chocolates] is empty."',
      'Amounts of money, time, and distances usually take singular verbs: "Five thousand rupees is enough."'
    ],
    practice: [
      {
        id: 'sva-1',
        question: 'A bouquet of yellow roses _____ delivered to her office today.',
        options: ['were', 'was', 'are', 'have been'],
        correct: 1,
        explanation: 'The head noun is "bouquet" (singular), so the verb must be singular "was".'
      },
      {
        id: 'sva-2',
        question: 'Neither the teacher nor the students _____ ready for the surprise test.',
        options: ['was', 'were', 'is', 'has been'],
        correct: 1,
        explanation: 'In "neither...nor", the verb agrees with the closest subject ("the students", plural).'
      }
    ]
  },
  {
    id: 'articles-rules',
    title: 'Articles: A, An, The & Zero Article',
    level: 'Beginner',
    category: 'articles',
    readTime: '6 min',
    summary: 'When to use indefinite (a/an), definite (the), or no article at all.',
    explanation: 'Articles define whether a noun is specific or general. "A" and "An" are indefinite articles used before singular countable nouns mentioned for the first time. "The" is the definite article used when both speaker and listener know the specific referent.',
    rule: {
      formula: 'A + consonant sound | An + vowel sound | The + specific/unique noun | Zero article + plurals/uncountables in general',
      heSheItRule: 'Sound matters, not the letter! Use "a university" (starts with /j/ sound) and "an hour" (silent h, starts with vowel sound).',
      negativeFormula: 'Do not use articles with names of countries (except those with Republic, Kingdom, States, or plural like the Netherlands).',
      questionFormula: 'Use "the" for oceans, rivers, mountain ranges, superlatives, and unique objects (the sun, the moon).'
    },
    examples: [
      { type: 'Indefinite first mention', sentence: 'I adopted a rescue puppy yesterday.', note: 'First time mentioned' },
      { type: 'Definite second mention', sentence: 'The puppy has brown ears and loves to play.', note: 'Now we know which puppy' },
      { type: 'Unique object', sentence: 'The sun rises in the east.', note: 'Only one exists' },
      { type: 'General plural (zero article)', sentence: 'Lions live in prides across Africa.', note: 'Lions in general' },
      { type: 'Zero Article with Academic Fields', sentence: 'She excels in mathematics, physics, and computer science.', note: 'Academic subjects take zero article' },
      { type: 'Unique Global Nouns (The)', sentence: 'The ozone layer shields the planet from ultraviolet radiation.', note: 'One-of-a-kind global natural entities' },
    ],
    sentenceForms: {
      positive: [
        'He is an honest police officer.',
        'Mount Everest is the highest mountain peak on Earth.',
        'Music brings joy to people of all cultures.',
        'An owl perched silently on an ancient oak tree in the forest.'
      ],
      negative: [
        'I do not drink the coffee served here; I prefer tea.',
        'She hasn\'t decided on a university yet.',
        'He doesn\'t have an umbrella or a raincoat today.'
      ],
      questions: [
        'Can you play the violin?',
        'Did you see the full moon last night?',
        'Is Mount Everest the tallest mountain above sea level?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'He is a honest man.',
        correct: 'He is an honest man.',
        reason: 'The "h" in "honest" is silent, so the word begins with an "o" vowel sound (/ˈɒnɪst/), demanding "an".'
      },
      {
        wrong: 'I love the animals.',
        correct: 'I love animals.',
        reason: 'When talking about animals in general, use the zero article (no article) with plural nouns.'
      }
    ],
    keyTips: [
      'Vowel sound test: an European (NO! a European - sounds like "you"), an MBA (YES! sounds like "em"), a uniform, an hour.',
      'Superlatives always take "the": the best, the tallest, the most interesting.'
    ],
    practice: [
      {
        id: 'art-1',
        question: 'Ravi graduated from _____ prestigious university in Delhi.',
        options: ['a', 'an', 'the', 'no article'],
        correct: 0,
        explanation: '"Prestigious" starts with a consonant sound /p/, so indefinite article "a" is used.'
      },
      {
        id: 'art-2',
        question: 'He has been waiting for more than _____ hour.',
        options: ['a', 'an', 'the', 'some'],
        correct: 1,
        explanation: '"Hour" starts with a silent "h", so the initial phonetic sound is a vowel, requiring "an".'
      }
    ]
  },
  {
    id: 'adjectives-comparatives',
    title: 'Adjectives, Comparatives & Superlatives',
    level: 'Elementary',
    category: 'parts-of-speech',
    readTime: '6 min',
    summary: 'Compare two or more things using -er/-est and more/most, plus irregular forms.',
    explanation: 'Adjectives describe qualities of nouns. We use the comparative form to compare two things (faster than, more beautiful than), and the superlative form to identify the extreme member of a group of three or more (the fastest, the most beautiful).',
    rule: {
      formula: '1 syllable: adj + -er / -est | 2+ syllables: more / most + adj | Ends in -y: drop y, add -ier / -iest',
      heSheItRule: 'Irregular forms: good -> better -> best; bad -> worse -> worst; far -> farther/further -> farthest/furthest.',
      negativeFormula: 'As...as indicates equality: "She is as tall as her brother." Not as...as indicates inequality.',
      questionFormula: 'Which is bigger? / Who is the tallest in the class?'
    },
    examples: [
      { type: 'One syllable', sentence: 'Light travels faster than sound.', note: 'fast -> faster' },
      { type: 'Multi-syllable', sentence: 'This explanation is more comprehensive than that one.', note: 'more + adjective' },
      { type: 'Superlative', sentence: 'Jupiter is the largest planet in our solar system.', note: 'the + adjective-est' },
      { type: 'Double Comparative Growth', sentence: 'The harder you practice speaking, the more confident you become.', note: 'Proportional relationship structure' },
      { type: 'Equality Comparison (As...as)', sentence: 'Her written English is as precise as that of a native editor.', note: 'Equivalence comparison' },
    ],
    sentenceForms: {
      positive: [
        'Bengaluru has better weather than Chennai.',
        'This is the most challenging puzzle I have encountered.',
        'Solar power is becoming increasingly affordable across India.'
      ],
      negative: [
        'This smartphone is not as expensive as that model.',
        'Yesterday wasn\'t any colder than today.',
        'This revised draft is not as difficult to read as the previous one.'
      ],
      questions: [
        'Is Python easier to learn than C++?',
        'Who is the youngest member of your team?',
        'Which of these two smartphones has a longer battery life?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'He is more taller than his elder brother.',
        correct: 'He is taller than his elder brother.',
        reason: 'Do not use double comparatives (more + -er). Use either -er or more, never both.'
      },
      {
        wrong: 'His handwriting is more bad than mine.',
        correct: 'His handwriting is worse than mine.',
        reason: '"Bad" is an irregular adjective; its comparative form is "worse".'
      }
    ],
    keyTips: [
      'Comparative is always accompanied by "than": faster than, more interesting than.',
      'Superlative is always preceded by "the": the fastest, the most interesting.'
    ],
    practice: [
      {
        id: 'adj-1',
        question: 'Of the three candidates, Priya gave _____ presentation.',
        options: ['the most convincing', 'more convincing', 'most convincing', 'the more convincing'],
        correct: 0,
        explanation: 'When comparing among three or more items, the superlative form with "the" is required.'
      }
    ]
  },
  {
    id: 'adverbs-placement',
    title: 'Adverbs & Their Correct Placement',
    level: 'Elementary',
    category: 'parts-of-speech',
    readTime: '6 min',
    summary: 'How adverbs modify verbs, adjectives, and other adverbs, and where they belong in a sentence.',
    explanation: 'Adverbs give more information about how (manner), when (time), where (place), how often (frequency), or to what degree (intensity) something happens. Misplacing adverbs can change the meaning of your sentence.',
    rule: {
      formula: 'Adverbs of manner: usually verb + adverb or object + adverb ("He spoke softly").',
      heSheItRule: 'Adverbs of frequency (always, often, never) go BEFORE main verbs, but AFTER the verb "to be" ("She is always punctual; she always arrives on time").',
      negativeFormula: 'Degree adverbs (very, extremely, quite) immediately precede the adjective/adverb they intensify.',
      questionFormula: 'How often do you exercise? / How well does he sing?'
    },
    examples: [
      { type: 'Manner', sentence: 'The surgeon operated carefully.', note: 'Explains how action happened' },
      { type: 'Frequency with Be', sentence: 'She is always polite to customers.', note: 'After auxiliary / to be' },
      { type: 'Frequency with Main Verb', sentence: 'They rarely eat fast food.', note: 'Before main verb' },
      { type: 'Degree Modifying Adjective', sentence: 'This advanced grammar curriculum is remarkably comprehensive.', note: '"remarkably" modifies the adjective "comprehensive"' },
      { type: 'Sentence Adverb at Beginning', sentence: 'Fortunately, the train arrived five minutes before departure.', note: 'Modifies the entire following clause' },
    ],
    sentenceForms: {
      positive: [
        'He spoke extremely eloquently at the conference.',
        'We will certainly support your initiative.',
        'She spoke eloquently and persuasively at the national debate.'
      ],
      negative: [
        'He doesn\'t usually drink tea in the morning.',
        'She can hardly hear the speaker from the back row.',
        'He rarely loses his patience during team discussions.'
      ],
      questions: [
        'Do you often visit the central library?',
        'Did she finish the assignment quickly?',
        'How frequently do you revise your grammar flashcards?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'She plays very well the piano.',
        correct: 'She plays the piano very well.',
        reason: 'Do not put an adverb between a transitive verb and its direct object. The adverb goes after the object.'
      },
      {
        wrong: 'He drives fastly.',
        correct: 'He drives fast.',
        reason: '"Fast" is both an adjective and an adverb. "Fastly" is not an English word.'
      }
    ],
    keyTips: [
      'Irregular adverbs: good (adj) -> well (adv); fast -> fast; hard -> hard; late -> late.',
      '"Hardly" does not mean "with hard work"! It means "almost not at all".'
    ],
    practice: [
      {
        id: 'adv-1',
        question: 'Which sentence has the correct adverb placement?',
        options: [
          'He speaks fluently English.',
          'He speaks English fluently.',
          'Fluently he English speaks.',
          'He English fluently speaks.'
        ],
        correct: 1,
        explanation: 'Adverbs of manner usually follow the verb and its direct object ("speaks English fluently").'
      }
    ]
  },
  {
    id: 'prepositions-time-place',
    title: 'Prepositions: At, On, In & Direction',
    level: 'Beginner',
    category: 'prepositions',
    readTime: '7 min',
    summary: 'The pyramid of time and place: from broad (in) to specific (on) to exact (at).',
    explanation: 'Prepositions show relationships between nouns and other words. The prepositions "in", "on", and "at" form a pyramid moving from general/large (in) to narrower (on) to exact/precise (at).',
    rule: {
      formula: 'IN: centuries, years, months, seasons, enclosed spaces, cities, countries | ON: days, dates, surfaces, streets | AT: exact times, specific addresses, points',
      heSheItRule: 'Time: In 2026, In summer, On Monday, On July 15th, At 5:30 PM, At midnight.',
      negativeFormula: 'Place: In India, In the kitchen, On MG Road, On the table, At the bus stop, At the door.',
      questionFormula: 'Where is it? / When does the class start?'
    },
    examples: [
      { type: 'Time - Exact', sentence: 'The meeting starts at 9:15 sharp.', note: 'Exact clock time' },
      { type: 'Time - Day/Date', sentence: 'We have an English quiz on Friday.', note: 'Specific day of the week' },
      { type: 'Time - Period', sentence: 'India won independence in 1947.', note: 'Year / historical era' },
      { type: 'Place - Surface', sentence: 'Your textbook is on the study desk.', note: 'Resting on a surface' },
      { type: 'Dependent Preposition', sentence: 'She is genuinely interested in historical comparative linguistics.', note: '"interested" pairs obligatorily with "in"' },
      { type: 'Directional Movement (Into)', sentence: 'The kitten jumped into the cardboard box and fell asleep.', note: 'Movement from outside to inside' },
    ],
    sentenceForms: {
      positive: [
        'She was born in October.',
        'The concert takes place on Saturday evening.',
        'I will meet you at the library entrance.',
        'The conference will take place at the Grand Auditorium on Friday morning.'
      ],
      negative: [
        'He is not at home right now; he is at work.',
        'They didn\'t travel in the monsoon season.',
        'She doesn\'t like studying in noisy coffee shops.'
      ],
      questions: [
        'Are you available at noon?',
        'Does he live on Brigade Road?',
        'Are you free to meet for lunch at noon on Wednesday?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'I will see you in Monday.',
        correct: 'I will see you on Monday.',
        reason: 'Days of the week always take the preposition "on".'
      },
      {
        wrong: 'She arrives at the morning.',
        correct: 'She arrives in the morning.',
        reason: 'Use "in the morning / in the afternoon / in the evening", but "at night".'
      }
    ],
    keyTips: [
      'Special exceptions: "in the morning" vs "at night"; "at the weekend" (British) vs "on the weekend" (American).',
      'No preposition with "next", "last", "this", "every": "See you next Monday" (not "on next Monday").'
    ],
    practice: [
      {
        id: 'prep-1',
        question: 'The final examination will be held _____ 18th November _____ 10:00 AM.',
        options: ['at / in', 'on / at', 'in / on', 'on / in'],
        correct: 1,
        explanation: 'Specific calendar dates take "on" and exact clock times take "at".'
      }
    ]
  },
  {
    id: 'conjunctions-linking',
    title: 'Conjunctions & Transitions',
    level: 'Elementary',
    category: 'conjunctions',
    readTime: '6 min',
    summary: 'Connect clauses with FANBOYS, subordinators (because, although), and correlatives.',
    explanation: 'Conjunctions link words, phrases, or clauses. Coordinating conjunctions join elements of equal grammatical rank (FANBOYS: For, And, Nor, But, Or, Yet, So). Subordinating conjunctions connect a dependent clause to an independent clause (because, although, since, while).',
    rule: {
      formula: 'Coordinating: Clause 1 + , + [FANBOYS] + Clause 2 | Subordinating: Although / Because + Clause 1, Clause 2',
      heSheItRule: 'Correlative conjunctions work in pairs: either...or, neither...nor, not only...but also, both...and.',
      negativeFormula: 'Do not use both "although" and "but" in the same sentence.',
      questionFormula: 'Would you prefer tea or coffee?'
    },
    examples: [
      { type: 'Coordinating (Contrast)', sentence: 'She studied diligently, but the exam was extraordinarily tough.', note: 'Comma before coordinating conjunction' },
      { type: 'Subordinating (Concession)', sentence: 'Although it was raining heavily, they played the football match.', note: 'Dependent clause first requires comma' },
      { type: 'Correlative (Addition)', sentence: 'He is not only an outstanding engineer but also a talented musician.', note: 'Parallel structure' },
      { type: 'Correlative (Not only... but also)', sentence: 'She is not only a gifted writer but also an inspiring teacher.', note: 'Parallel balanced structure' },
      { type: 'Concession / Contrast (Although)', sentence: 'Although the storm was intense, the electricity grid remained operational.', note: 'Introducing a surprising contrast' },
    ],
    sentenceForms: {
      positive: [
        'You can either submit the assignment online or hand it in in person.',
        'Because he practiced every day, his pronunciation improved remarkably.',
        'Neither the storm nor the thunder deterred the rescue workers.',
        'You can study online, or you can attend in-person lectures.'
      ],
      negative: [
        'Neither Rahul nor his sister was interested in finance.',
        'She did not complain, nor did she quit.',
        'She didn\'t call, nor did she send an explanatory text.'
      ],
      questions: [
        'Would you like to study grammar or practice writing first?',
        'Would you prefer to start with vocabulary or grammar exercises?',
        'Do you want to leave now, or should we wait for the rain to stop?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'Although he worked hard, but he failed the exam.',
        correct: 'Although he worked hard, he failed the exam. (OR: He worked hard, but he failed the exam.)',
        reason: 'Never use both "although" and "but" to connect two clauses. Choose one connector.'
      },
      {
        wrong: 'Because it was hot, so we turned on the air conditioner.',
        correct: 'Because it was hot, we turned on the air conditioner.',
        reason: 'Never combine "because" with "so" in the same clause connection.'
      }
    ],
    keyTips: [
      'Remember FANBOYS: For, And, Nor, But, Or, Yet, So.',
      'Parallelism with correlatives: Whatever follows "not only" should match the grammatical type of what follows "but also".'
    ],
    practice: [
      {
        id: 'conj-1',
        question: '_____ she felt fatigued, she continued working on the dissertation.',
        options: ['Despite', 'Although', 'However', 'Because'],
        correct: 1,
        explanation: '"Although" introduces a subordinate clause containing a subject and a verb ("she felt").'
      }
    ]
  },
  {
    id: 'modal-verbs',
    title: 'Modal Verbs: Ability, Obligation & Advice',
    level: 'Intermediate',
    category: 'modals',
    readTime: '6 min',
    summary: 'Express possibility, permission, ability, advice, and strong obligation with modal auxiliaries.',
    explanation: 'Modal verbs are special auxiliary verbs that express mood, necessity, advice, possibility, or permission: can, could, may, might, must, should, would, shall, will. They never take "-s" in third person and are followed by the bare base verb.',
    rule: {
      formula: 'Subject + Modal Verb + Base Verb (V1) [No "to"!] + Object',
      heSheItRule: 'Modals do NOT add -s: He can (NOT he cans), She must (NOT she musts).',
      negativeFormula: 'Cannot / Can\'t, Should not / Shouldn\'t, Must not / Mustn\'t (indicates prohibition!).',
      questionFormula: 'Modal + Subject + Base Verb?'
    },
    examples: [
      { type: 'Ability', sentence: 'She can speak four European languages fluently.', note: 'Present ability' },
      { type: 'Advice / Recommendation', sentence: 'You should review grammar flashcards every day.', note: 'Good suggestion' },
      { type: 'Strong Obligation', sentence: 'All candidates must bring valid photo identification.', note: 'Compulsory rule' },
      { type: 'Possibility', sentence: 'It might rain later this afternoon.', note: 'Uncertain chance' },
      { type: 'Past Deduction (Must have been)', sentence: 'The ground is soaking wet; it must have rained heavily overnight.', note: 'Strong logical deduction about past event' },
      { type: 'Polite Request (Could you)', sentence: 'Could you please clarify the third sentence on the whiteboard?', note: 'Formal courteous inquiry' },
    ],
    sentenceForms: {
      positive: [
        'You must wear a helmet while riding a motorcycle.',
        'Could you please pass the water jug?',
        'Students should review the rubrics before drafting their essays.'
      ],
      negative: [
        'You mustn\'t touch that live electrical wire! (Prohibition)',
        'You don\'t have to attend the lecture if you are sick. (Lack of necessity)',
        'You shouldn\'t stay up all night before an important exam.'
      ],
      questions: [
        'May I ask a clarifying question?',
        'Should we start the presentation now?',
        'Could you explain how to apply this rule in spoken English?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'You should to visit your doctor.',
        correct: 'You should visit your doctor.',
        reason: 'Modal verbs (except "ought to") are followed by the bare infinitive without "to".'
      },
      {
        wrong: 'You don\'t have to smoke here.',
        correct: 'You mustn\'t smoke here.',
        reason: '"Mustn\'t" means prohibited/forbidden. "Don\'t have to" means optional (no obligation).'
      }
    ],
    keyTips: [
      'Mustn\'t = Forbidden / illegal.',
      'Don\'t have to = Not necessary (optional).',
      'Should = Good advice / recommended.'
    ],
    practice: [
      {
        id: 'mod-1',
        question: 'You _____ carry a passport when traveling internationally; it is legally mandatory.',
        options: ['should', 'might', 'must', 'can'],
        correct: 2,
        explanation: 'Legal obligations and strict requirements are expressed using "must".'
      }
    ]
  },
  {
    id: 'conditionals-zero-first',
    title: 'Conditionals: Zero & First',
    level: 'Intermediate',
    category: 'conditionals',
    readTime: '6 min',
    summary: 'Express universal truths and realistic real-world future possibilities.',
    explanation: 'Zero Conditional states universal scientific facts and automatic habits (If + present, present). First Conditional talks about realistic, likely future conditions and their probable outcomes (If + present, will + base verb).',
    rule: {
      formula: 'Zero: If + Present Simple, Present Simple | First: If + Present Simple, will + Base Verb',
      heSheItRule: 'If the "if" clause comes first, use a comma. If the main clause comes first, no comma is needed.',
      negativeFormula: 'Unless = If not. Example: "Unless you hurry" = "If you don\'t hurry".',
      questionFormula: 'What will you do if it rains tomorrow?'
    },
    examples: [
      { type: 'Zero Conditional', sentence: 'If you heat water to 100°C, it boils.', note: 'Scientific certainty' },
      { type: 'First Conditional', sentence: 'If you practice every day, your English will improve rapidly.', note: 'Realistic future result' },
      { type: 'First with modal', sentence: 'If you finish early, you can leave the classroom.', note: 'Modal in result clause' },
      { type: 'First Conditional with Imperative', sentence: 'If you encounter any difficulty with the formula, call me immediately.', note: 'Result clause is a direct instruction' },
      { type: 'First Conditional with Unless', sentence: 'Unless you submit the registration form by Friday, you cannot sit for the exam.', note: '"Unless" means "if you do not"' },
    ],
    sentenceForms: {
      positive: [
        'If I pass this test, my parents will celebrate.',
        'Plants die if they don\'t receive sunlight.',
        'If you practice for twenty minutes daily, your fluency accelerates.'
      ],
      negative: [
        'If you don\'t study, you won\'t pass the exam.',
        'Unless he apologizes, I will not speak to him.',
        'If it doesn\'t rain soon, the crops will suffer from drought.'
      ],
      questions: [
        'What will happen if we miss the last flight?',
        'If it snows, will the school close?',
        'What will you do if the morning train is delayed?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'If it will rain tomorrow, we will cancel the picnic.',
        correct: 'If it rains tomorrow, we will cancel the picnic.',
        reason: 'Never use "will" in the "if" conditional clause. The conditional clause takes the present simple.'
      }
    ],
    keyTips: [
      'Golden rule: No "will" in the "if" clause! If + Present Simple, ... will + V1.',
      'Substitute "when" for "if" in Zero Conditional when the condition is certain to happen.'
    ],
    practice: [
      {
        id: 'cond-1',
        question: 'If Ravi _____ hard this semester, he will win the scholarship.',
        options: ['will study', 'studies', 'study', 'studied'],
        correct: 1,
        explanation: 'In the First Conditional, the "if" clause takes the Present Simple with 3rd-person agreement ("studies").'
      }
    ]
  },
  {
    id: 'conditionals-second-third',
    title: 'Conditionals: Second & Third (Unreal & Past Regrets)',
    level: 'Intermediate',
    category: 'conditionals',
    readTime: '7 min',
    summary: 'Talk about hypothetical present dreams and imaginary past scenarios with regret.',
    explanation: 'Second Conditional imagines hypothetical, impossible, or unlikely present/future situations (If + past simple, would + base verb). Third Conditional reflects on past situations that cannot be altered, expressing past counterfactuals or regrets (If + past perfect, would have + past participle).',
    rule: {
      formula: 'Second: If + Past Simple, would + Base Verb | Third: If + had + V3, would have + V3',
      heSheItRule: 'In formal English Second Conditional, "were" is used for all subjects: "If I were you..." (subjunctive mood).',
      negativeFormula: 'If she hadn\'t lost her passport, she wouldn\'t have missed the flight.',
      questionFormula: 'What would you do if you won the lottery?'
    },
    examples: [
      { type: 'Second (Hypothetical)', sentence: 'If I had a million dollars, I would build a public school.', note: 'Unreal present condition' },
      { type: 'Second (Advice)', sentence: 'If I were you, I would consult a doctor immediately.', note: 'Subjunctive advice' },
      { type: 'Third (Past Regret)', sentence: 'If she had studied more diligently, she would have passed the exam.', note: 'Past event cannot change' },
      { type: 'Second Conditional for Advice', sentence: 'If I were in your position, I would accept the software internship in Pune.', note: 'Formal subjunctive advice structure' },
      { type: 'Third Conditional Alternative (Could have)', sentence: 'If they had brought a roadmap, they could have avoided the detour.', note: 'Lost past capability' },
    ],
    sentenceForms: {
      positive: [
        'If we lived closer to the ocean, we would surf every morning.',
        'If the team had scored that penalty, they would have won the championship.',
        'If she had more free time, she would learn classical violin.'
      ],
      negative: [
        'If he weren\'t so stubborn, he would listen to your advice.',
        'If I hadn\'t forgotten my umbrella, I wouldn\'t have gotten drenched.',
        'If we hadn\'t missed the morning bus, we wouldn\'t have been late.'
      ],
      questions: [
        'Where would you live if you could choose any country?',
        'Would you have accepted the offer if they had offered a higher stipend?',
        'What would you buy if you won the grand prize?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'If I would know the answer, I would tell you.',
        correct: 'If I knew the answer, I would tell you.',
        reason: 'Do not put "would" in the "if" clause. Use the past simple in the "if" clause.'
      },
      {
        wrong: 'If she had listened, she wouldn\'t make that mistake.',
        correct: 'If she had listened, she wouldn\'t have made that mistake.',
        reason: 'In a Third Conditional, the result clause must use "would have + V3".'
      }
    ],
    keyTips: [
      'Second Conditional = Imaginary NOW (If I were a bird, I would fly).',
      'Third Conditional = Imaginary PAST (If I had known, I would have helped).'
    ],
    practice: [
      {
        id: 'cond2-1',
        question: 'If I _____ more free time, I would take up classical guitar lessons.',
        options: ['have', 'had', 'would have', 'have had'],
        correct: 1,
        explanation: 'Second Conditional requires the Past Simple ("had") in the "if" clause.'
      },
      {
        id: 'cond3-1',
        question: 'If we had left ten minutes earlier, we _____ the train.',
        options: ['would catch', 'would have caught', 'will catch', 'had caught'],
        correct: 1,
        explanation: 'Third Conditional result clause requires "would have + V3" ("would have caught").'
      }
    ]
  },
  {
    id: 'active-passive-voice',
    title: 'Active & Passive Voice',
    level: 'Intermediate',
    category: 'voice',
    readTime: '7 min',
    summary: 'Shift focus from the doer of the action to the receiver or result.',
    explanation: 'In the Active Voice, the subject performs the action (The chef cooked the meal). In the Passive Voice, the subject receives the action (The meal was cooked by the chef). Passive voice is widely used in academic, news, scientific, and professional writing when the action or result matters more than the agent.',
    rule: {
      formula: 'Subject (Original Object) + appropriate form of "be" + Past Participle (V3) [+ by Agent]',
      heSheItRule: 'Tense preservation: Present Simple (is/are + V3); Past Simple (was/were + V3); Present Perfect (has/have been + V3); Modals (modal + be + V3).',
      negativeFormula: 'The report was not submitted on time.',
      questionFormula: 'Was the decision announced yesterday?'
    },
    examples: [
      { type: 'Present Simple', sentence: 'Active: Millions of people speak English. -> Passive: English is spoken by millions of people.', note: 'Language is spoken' },
      { type: 'Past Simple', sentence: 'Active: Alexander Fleming discovered penicillin. -> Passive: Penicillin was discovered by Alexander Fleming in 1928.', note: 'Discovery focus' },
      { type: 'Agent Omitted', sentence: 'The highway was repaired last month.', note: 'Worker is obvious or unimportant' },
      { type: 'Passive with Modal Verb', sentence: 'These grammar guidelines must be reviewed before submitting the essay.', note: 'modal + be + past participle' },
      { type: 'Continuous Passive', sentence: 'The ancient bridge is currently being restored by municipal engineers.', note: 'is/are being + past participle' },
    ],
    sentenceForms: {
      positive: [
        'The new bridge was inaugurated by the governor.',
        'All applications have been reviewed by the admissions committee.',
        'This software can be downloaded for free.',
        'The solar panels were installed by a local green energy startup.'
      ],
      negative: [
        'The parcel was not delivered because of the heavy storm.',
        'Smoking is not permitted on the premises.',
        'The sensitive documents were not shared outside the committee.'
      ],
      questions: [
        'Were you invited to the graduation ceremony?',
        'Has the email been sent yet?',
        'Has the research grant been approved by the ministry?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'The accident was happened last night.',
        correct: 'The accident happened last night.',
        reason: 'Intransitive verbs (happen, occur, arrive, die, fall) do not take direct objects and CANNOT be used in the passive voice.'
      },
      {
        wrong: 'The letter was wrote yesterday.',
        correct: 'The letter was written yesterday.',
        reason: 'Passive voice always requires the Past Participle (V3), so "written", not "wrote".'
      }
    ],
    keyTips: [
      'Only transitive verbs (verbs taking an object) can be transformed into passive voice.',
      'Omit the "by agent" when the agent is unknown, obvious, or irrelevant ("My bike was stolen").'
    ],
    practice: [
      {
        id: 'voice-1',
        question: 'Transform to passive: "The engineers built the bridge in two years."',
        options: [
          'The bridge was built in two years by the engineers.',
          'The bridge was building in two years.',
          'The bridge is built by the engineers in two years.',
          'The bridge has been built in two years.'
        ],
        correct: 0,
        explanation: 'Past Simple active "built" converts to "was built" in the passive voice.'
      }
    ]
  },
  {
    id: 'reported-speech',
    title: 'Reported Speech (Indirect Speech)',
    level: 'Intermediate',
    category: 'reported-speech',
    readTime: '7 min',
    summary: 'Report what someone said without quoting their exact words, mastering backshifting.',
    explanation: 'When reporting what someone else said without quotation marks, we shift the tenses back in time (Backshifting) if the reporting verb is in the past (said, told, asked). Pronouns, demonstratives, and time expressions also shift accordingly.',
    rule: {
      formula: 'Direct: Present Simple -> Reported: Past Simple | Present Continuous -> Past Continuous | Past Simple / Present Perfect -> Past Perfect | Will -> Would | Can -> Could',
      heSheItRule: '"Said" does not take a personal object: He said that... "Told" requires an object: He told ME that...',
      negativeFormula: 'Time shifts: today -> that day, tomorrow -> the next day, yesterday -> the previous day, now -> then, here -> there.',
      questionFormula: 'Reported questions do NOT use auxiliary do/did and follow statement order: "He asked where I lived" (NOT "where did I live").'
    },
    examples: [
      { type: 'Statement', sentence: 'Direct: "I like coffee," she said. -> Indirect: She said that she liked coffee.', note: 'Present -> Past' },
      { type: 'Modal shift', sentence: 'Direct: "I will call you tomorrow," he said. -> Indirect: He told me that he would call me the next day.', note: 'Will -> Would, tomorrow -> next day' },
      { type: 'Question', sentence: 'Direct: "Where do you live?" he asked. -> Indirect: He asked me where I lived.', note: 'Statement word order' },
      { type: 'Reported Yes/No Question', sentence: 'Direct: "Did you complete the test?" she asked. -> Indirect: She asked me if I had completed the test.', note: 'Uses if/whether and shifts to Past Perfect' },
      { type: 'Universal Truth (No Backshift)', sentence: 'Direct: "The Earth orbits the Sun," the tutor stated. -> Indirect: The tutor stated that the Earth orbits the Sun.', note: 'Timeless universal scientific fact stays in present' }
    ],
    sentenceForms: {
      positive: [
        'She explained that she had already completed her master\'s degree.',
        'The doctor advised him to rest for a week.',
        'The professor announced that the final grades had been posted.'
      ],
      negative: [
        'He mentioned that he didn\'t know the answer.',
        'They warned us not to enter the construction zone.',
        'She explained that she hadn\'t received the email attachment.'
      ],
      questions: [
        'She asked whether I was attending the evening gala.',
        'The interviewer asked why I had chosen this career path.',
        'Did he mention whether he was coming to the workshop?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'She told that she was tired.',
        correct: 'She said that she was tired. (OR: She told me that she was tired.)',
        reason: '"Told" must always be followed by the person spoken to ("told me", "told her").'
      },
      {
        wrong: 'He asked me where did I stay.',
        correct: 'He asked me where I stayed.',
        reason: 'Reported questions adopt standard subject + verb affirmative word order without auxiliary "did".'
      }
    ],
    keyTips: [
      'No backshift needed if the reported statement is still universally true: "The teacher said that the Earth orbits the Sun."',
      'Yes/No questions use "if" or "whether": "He asked if I had finished."'
    ],
    practice: [
      {
        id: 'rep-1',
        question: 'Direct: "I am traveling to Delhi tomorrow," Rahul said.\nIndirect: Rahul said that he _____ to Delhi the next day.',
        options: ['is traveling', 'was traveling', 'will travel', 'has traveled'],
        correct: 1,
        explanation: 'Present continuous ("am traveling") backshifts to Past Continuous ("was traveling").'
      }
    ]
  },
  {
    id: 'relative-clauses',
    title: 'Relative Clauses: Defining & Non-defining',
    level: 'Intermediate',
    category: 'sentence-structure',
    readTime: '6 min',
    summary: 'Join ideas smoothly using who, whom, whose, which, that, and where.',
    explanation: 'A relative clause gives extra details about a noun. A Defining relative clause provides essential information identifying which person/thing is meant (no commas). A Non-defining relative clause gives non-essential extra information (separated by commas).',
    rule: {
      formula: 'Who / Whom (people) | Which (things/animals) | That (people or things - defining ONLY) | Whose (possession) | Where (places)',
      heSheItRule: 'Never use "that" in a non-defining relative clause with commas.',
      negativeFormula: 'The relative pronoun can be omitted when it is the OBJECT of the relative clause: "The book [that] I read was fascinating."',
      questionFormula: 'Do you know the woman who won the national science award?'
    },
    examples: [
      { type: 'Defining (Essential)', sentence: 'The student who scored highest received a gold medal.', note: 'Identifies which student' },
      { type: 'Non-defining (Extra info)', sentence: 'Dr. APJ Abdul Kalam, who was India\'s 11th President, inspired millions.', note: 'Commas enclose extra fact' },
      { type: 'Possessive', sentence: 'I met an author whose novel won the Booker Prize.', note: 'Whose = of whom' },
      { type: 'Possessive Relative Clause (Whose)', sentence: 'The author whose debut novel won the Booker Prize gave a keynote speech.', note: '"whose" replaces "his/her/their"' },
      { type: 'Relative Clause of Place (Where)', sentence: 'Mysuru is the heritage city where my grandparents were raised.', note: '"where" introduces location descriptor' },
    ],
    sentenceForms: {
      positive: [
        'The smartphone that I purchased yesterday has an exceptional camera.',
        'Mysuru, which is famous for its royal heritage, attracts thousands of tourists.',
        'The professor whose lectures I enjoy most teaches linguistics.',
        'This is the university where I completed my graduation.'
      ],
      negative: [
        'Students who have not registered will not be admitted.',
        'This is not the laptop that I ordered.',
        'She didn\'t mention the candidate whose application was rejected.'
      ],
      questions: [
        'Is that the artist whose paintings are exhibited in the gallery?',
        'Is this the book that you recommended last week?',
        'Do you know the student who won first prize?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'My father, that lives in Pune, is a retired civil engineer.',
        correct: 'My father, who lives in Pune, is a retired civil engineer.',
        reason: 'Never use "that" in non-defining relative clauses set off by commas. Use "who" for persons.'
      },
      {
        wrong: 'The car which engine broke down is in the garage.',
        correct: 'The car whose engine broke down is in the garage.',
        reason: 'Use "whose" to indicate possession (the car\'s engine).'
      }
    ],
    keyTips: [
      'Defining: No commas! The meaning changes if you remove the clause.',
      'Non-defining: Always needs commas! You can delete the clause and the main idea remains complete.'
    ],
    practice: [
      {
        id: 'rel-1',
        question: 'Bangalore, _____ is known as the Silicon Valley of India, is home to thousands of startups.',
        options: ['that', 'which', 'who', 'where'],
        correct: 1,
        explanation: 'In non-defining relative clauses with commas, "which" is required for cities/things, never "that".'
      }
    ]
  },
  {
    id: 'gerunds-infinitives',
    title: 'Gerunds vs Infinitives',
    level: 'Intermediate',
    category: 'sentence-structure',
    readTime: '6 min',
    summary: 'When to use Verb-ing vs To + Verb after verbs, adjectives, and prepositions.',
    explanation: 'A gerund is the -ing form of a verb acting as a noun (Swimming is great exercise). An infinitive is "to + base verb" (I want to swim). Some verbs are followed only by gerunds (enjoy, avoid, suggest), some only by infinitives (decide, hope, plan), and some by both with differing meanings (stop, remember, forget).',
    rule: {
      formula: 'Prepositions are ALWAYS followed by gerunds (-ing)! Example: interested in learning, good at speaking, thank you for coming.',
      heSheItRule: 'Verbs + Gerund: enjoy, avoid, admit, deny, finish, suggest, mind, keep, risk.',
      negativeFormula: 'Verbs + Infinitive: decide, plan, hope, refuse, offer, agree, promise, hesitate.',
      questionFormula: 'Do you mind opening the window? (Gerund)'
    },
    examples: [
      { type: 'Gerund as Subject', sentence: 'Learning grammar systematically accelerates your fluency.', note: 'Acts as the subject noun' },
      { type: 'After Preposition', sentence: 'She is passionate about teaching mathematics.', note: 'Preposition "about" + gerund' },
      { type: 'Meaning Change', sentence: 'He stopped smoking (quit the habit) vs He stopped to smoke (paused an activity in order to smoke).', note: 'Critical semantic difference' },
      { type: 'Meaning Shift (Stop to do vs Stop doing)', sentence: 'He stopped to drink tea vs He stopped drinking sugary beverages.', note: '"stopped to drink" = paused to; "stopped drinking" = quit habit' },
      { type: 'Gerund as Subject', sentence: 'Reading English literature daily sharpens your vocabulary retention.', note: 'Gerund phrase acting as sentence subject' },
    ],
    sentenceForms: {
      positive: [
        'I look forward to hearing from you soon.',
        'They decided to launch the initiative ahead of schedule.',
        'Practicing regularly helps you master irregular verbs.'
      ],
      negative: [
        'She avoided talking about her previous employment.',
        'Try not to worry about minor setbacks.',
        'He decided not to attend the evening reception.'
      ],
      questions: [
        'Would you consider moving abroad for higher studies?',
        'Did you remember to lock the front gate?',
        'Do you enjoy listening to audiobooks while commuting?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'She is fond of to read novels.',
        correct: 'She is fond of reading novels.',
        reason: 'After any preposition (of, in, at, with, about), always use a gerund (-ing).'
      },
      {
        wrong: 'I look forward to meet you.',
        correct: 'I look forward to meeting you.',
        reason: 'In the phrasal verb "look forward to", "to" is a preposition, not part of the infinitive, so it must be followed by a gerund.'
      }
    ],
    keyTips: [
      'Preposition + Verb = ALWAYS -ing (good at coding, without complaining).',
      'Remember + to = duty to perform. Remember + -ing = recall past memory.'
    ],
    practice: [
      {
        id: 'gi-1',
        question: 'We are looking forward to _____ our grandparents this festival.',
        options: ['visit', 'visiting', 'visited', 'have visited'],
        correct: 1,
        explanation: '"Look forward to" ends with a preposition ("to"), requiring the gerund form "visiting".'
      }
    ]
  },
  {
    id: 'complex-sentences',
    title: 'Sentence Structure: Simple, Compound & Complex',
    level: 'Advanced',
    category: 'sentence-structure',
    readTime: '7 min',
    summary: 'Elevate your writing style from repetitive short sentences to sophisticated compound-complex clauses.',
    explanation: 'Mastering sentence variety is the hallmark of advanced English fluency. Simple sentences have one independent clause. Compound sentences join two independent clauses with FANBOYS or a semicolon. Complex sentences combine an independent clause with one or more dependent clauses using subordinating conjunctions.',
    rule: {
      formula: 'Simple: 1 Independent Clause | Compound: IC + , + FANBOYS + IC | Complex: IC + Subordinator + DC (or Subordinator + DC, IC) | Compound-Complex: 2+ ICs and 1+ DC',
      heSheItRule: 'Independent clause can stand alone as a sentence. Dependent clause lacks full meaning without the main clause.',
      negativeFormula: 'Avoid comma splices: never join two independent clauses with just a comma without a conjunction.',
      questionFormula: 'How do transitions enhance rhetorical cohesion?'
    },
    examples: [
      { type: 'Simple', sentence: 'The dedicated student passed all examinations with distinction.', note: 'One subject-verb nexus' },
      { type: 'Compound', sentence: 'The heavy rain flooded the streets, yet the emergency services responded swiftly.', note: 'Two complete thoughts joined by yet' },
      { type: 'Complex', sentence: 'Because the economic climate had shifted dramatically, the board revised their five-year strategy.', note: 'Dependent cause clause leading' },
      { type: 'Compound-Complex Sentence', sentence: 'Although she was fatigued from travel, she attended the lecture, and she took detailed notes.', note: 'Two independent clauses joined with one dependent clause' },
      { type: 'Joined with Conjunctive Adverb', sentence: 'The project deadline was tight; nevertheless, the team delivered all modules on time.', note: 'Semicolon + conjunctive adverb' },
    ],
    sentenceForms: {
      positive: [
        'Although renewable energy investments have surged, conventional sources still supply the bulk of power.',
        'The researcher analyzed the data thoroughly; consequently, she uncovered an unexpected anomaly.',
        'Because she was deeply passionate about education, she founded a rural library.',
        'When the bell rang, the students submitted their papers, and the proctor collected them.'
      ],
      negative: [
        'Unless substantive reforms are instituted, the institutional deficits will not subside.',
        'Although he was well-prepared, he didn\'t expect the exam to be so challenging.',
        'She didn\'t leave the lab until all data had been compiled.'
      ],
      questions: [
        'While automation improves productivity, what safeguards are established for displaced workers?',
        'Since you have already finished, can you help your teammate?',
        'While you were living in Delhi, did you learn to speak Hindi?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'I love grammar, it helps me communicate better.',
        correct: 'I love grammar; it helps me communicate better. (OR: I love grammar, because it helps me communicate better.)',
        reason: 'This is a "Comma Splice" error. Two independent sentences cannot be spliced with only a comma.'
      }
    ],
    keyTips: [
      'Use semicolons (;) between independent clauses that are closely related in thought.',
      'Conjunct adverbs (however, therefore, furthermore) require: ; however, OR Period. However,'
    ],
    practice: [
      {
        id: 'ss-1',
        question: 'Which of the following is a Compound-Complex sentence?',
        options: [
          'Although he was tired, he finished his report.',
          'He was tired, but he finished his report.',
          'Although he was tired, he finished his report, and he submitted it before midnight.',
          'He finished his report before midnight.'
        ],
        correct: 2,
        explanation: 'It contains one dependent clause ("Although he was tired") and two independent clauses joined by "and".'
      }
    ]
  },
  {
    id: 'inversion-emphasis',
    title: 'Inversion & Advanced Sentence Emphasis',
    level: 'Advanced',
    category: 'sentence-structure',
    readTime: '6 min',
    summary: 'Create rhetorical flair and formal sophistication by inverting subject and auxiliary verb.',
    explanation: 'Inversion occurs when we flip the normal subject-verb order (Subject + Auxiliary -> Auxiliary + Subject) for stylistic impact, dramatic emphasis, or formality. It is most commonly triggered by negative or restrictive adverbs at the beginning of a sentence (rarely, seldom, scarcely, not only, under no circumstances).',
    rule: {
      formula: 'Negative Adverbial + Auxiliary Verb + Subject + Main Verb + Object',
      heSheItRule: 'Negative expressions triggering inversion: Seldom, Rarely, Never before, Hardly/Scarcely...when, No sooner...than, Under no circumstances, Little did he know.',
      negativeFormula: 'Under no circumstances should you disclose this confidential passcode.',
      questionFormula: 'Notice how inversion looks structurally identical to a question, but is punctuated as a statement!'
    },
    examples: [
      { type: 'Frequency Inversion', sentence: 'Rarely have I witnessed such profound dedication to academic excellence.', note: 'Standard: I have rarely witnessed...' },
      { type: 'Sequential Inversion', sentence: 'No sooner had the keynote speaker stepped onto the stage than the applause erupted.', note: 'No sooner...than structure' },
      { type: 'Conditional Inversion', sentence: 'Had I known about the schedule change, I would have arrived earlier.', note: 'Omission of "If" in conditional' },
      { type: 'Hardly...when Inversion', sentence: 'Hardly had we entered the lecture hall when the presentation began.', note: 'Negative time correlation' },
      { type: 'Under no circumstances', sentence: 'Under no circumstances should you share confidential system passwords.', note: 'Strict authoritative warning' },
    ],
    sentenceForms: {
      positive: [
        'Not only did they meet their annual targets, but they also exceeded investor expectations.',
        'Should you require further assistance, do not hesitate to contact our desk.',
        'Never before had the country witnessed such rapid technological expansion.',
        'Little did they suspect that their prototype would revolutionize the field.'
      ],
      negative: [
        'Seldom do we encounter an argument so rigorously substantiated.',
        'At no time did the management conceal the financial risks.',
        'In no way does this exception invalidate the primary rule.'
      ],
      questions: [
        'Scarcely had the plane taken off when the engine anomaly was detected.',
        'Rarely does one encounter such dedication, does one?',
        'Under what circumstances should an employee bypass the protocol?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'Rarely I have seen such courage.',
        correct: 'Rarely have I seen such courage.',
        reason: 'When a negative adverbial begins the sentence, the auxiliary verb MUST precede the subject.'
      },
      {
        wrong: 'No sooner had she arrived when the meeting began.',
        correct: 'No sooner had she arrived than the meeting began.',
        reason: '"No sooner" must be paired with "than", while "scarcely/hardly" pairs with "when".'
      }
    ],
    keyTips: [
      'Had + Subject + V3 = If + Subject + had + V3 (e.g., "Had she known" = "If she had known").',
      'Should + Subject + V1 = If + Subject + V1 (e.g., "Should you need help" = "If you need help").'
    ],
    practice: [
      {
        id: 'inv-1',
        question: 'Seldom _____ such an inspiring theatrical performance.',
        options: ['we have seen', 'have we seen', 'we saw', 'did we saw'],
        correct: 1,
        explanation: 'Starting with restrictive adverb "Seldom" triggers inversion: auxiliary ("have") + subject ("we") + participle ("seen").'
      }
    ]
  },
  {
    id: 'advanced-punctuation',
    title: 'Advanced Punctuation: Semicolons, Colons & Dashes',
    level: 'Advanced',
    category: 'punctuation',
    readTime: '6 min',
    summary: 'Master semicolons, colons, em-dashes, hyphens, and apostrophes to write like a seasoned scholar.',
    explanation: 'Advanced punctuation transforms ordinary prose into crisp, professional communication. Semicolons connect closely related thoughts without coordinating conjunctions. Colons introduce explanations, lists, or amplifications after an independent clause. Em-dashes create emphatic pauses.',
    rule: {
      formula: 'Semicolon (;): IC; IC | Colon (:): Independent Clause : Explanation/List | Em Dash (—): Parenthetical emphasis',
      heSheItRule: 'The clause preceding a colon MUST be a grammatically complete independent clause.',
      negativeFormula: 'Never use a semicolon where a comma or colon is required.',
      questionFormula: 'How does punctuation shape reader perception and clarity?'
    },
    examples: [
      { type: 'Semicolon', sentence: 'The laboratory experiment yielded contradictory results; the scientists decided to replicate the trials.', note: 'Links two independent thoughts' },
      { type: 'Colon for Explanation', sentence: 'The team possessed one undeniable advantage: unyielding resilience under pressure.', note: 'Introduces direct explanation' },
      { type: 'Em-dash Emphasis', sentence: 'The solution seemed obvious—invest in teacher training—yet policymakers resisted.', note: 'Emphatic parenthetical break' },
      { type: 'Colon for Amplification', sentence: 'The researcher reached a single conclusion: deliberate practice drives mastery.', note: 'Second clause explains the first' },
      { type: 'Em Dash for Dramatic Emphasis', sentence: 'He had all the technical qualifications for the position—except integrity.', note: 'Em-dash creates a sudden rhetorical break' },
    ],
    sentenceForms: {
      positive: [
        'He has visited three global capitals: Tokyo, Japan; Paris, France; and London, England.',
        'Punctuation is not merely cosmetic; it directs the rhythm of human thought.',
        'We had three clear priorities: accuracy, consistency, and student engagement.',
        'The keynote speaker—an internationally acclaimed scientist—received a standing ovation.'
      ],
      negative: [
        'Do not confuse "its" (possessive) with "it\'s" (contraction of it is).',
        'The report didn\'t lack evidence; it lacked coherent structural organization.',
        'Do not use a comma before a conjunction unless it connects independent clauses.'
      ],
      questions: [
        'Have you mastered the distinction between hyphens and dashes?',
        'Why did the author use a semicolon instead of a coordinating conjunction?',
        'Should this parenthetical remark be enclosed in parentheses, commas, or em-dashes?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'The grocery list includes: apples, milk, and eggs.',
        correct: 'The grocery list includes the following items: apples, milk, and eggs. (OR: The grocery list includes apples, milk, and eggs.)',
        reason: 'Do not place a colon directly after a verb (like "includes") or preposition unless it follows a complete independent clause.'
      }
    ],
    keyTips: [
      'Semicolon test: Can you replace it with a period without causing a sentence fragment? If yes, the semicolon is valid.',
      'Use semicolons in complex lists when items already contain internal commas (e.g., "Austin, Texas; Seattle, Washington; ...").'
    ],
    practice: [
      {
        id: 'punc-1',
        question: 'Which sentence demonstrates correct punctuation?',
        options: [
          'She had only one goal in mind: to earn her doctoral degree.',
          'She had only one goal in mind; to earn her doctoral degree.',
          'She had only one goal in mind, to earn her doctoral degree:',
          'She had only one goal in mind: and to earn her doctoral degree.'
        ],
        correct: 0,
        explanation: 'A colon is properly used following a complete independent clause to introduce an explanation or amplification.'
      }
    ]
  },
  {
    id: 'phrasal-verbs-mastery',
    title: 'Phrasal Verbs: Separable vs Inseparable',
    level: 'Intermediate',
    category: 'phrasal-verbs',
    readTime: '7 min',
    summary: 'Master transitive vs intransitive phrasal verbs, pronoun insertion rules, and daily idioms.',
    explanation: 'A phrasal verb combines a base verb with one or two particles (prepositions or adverbs), creating a meaning completely distinct from the original verb. With separable phrasal verbs, direct object nouns can sit between the verb and particle or after it. However, if the object is a pronoun (him, her, it, them), it MUST sit between the verb and particle (e.g., "turn it off", never "turn off it").',
    rule: {
      formula: 'Separable: Verb + [Noun] + Particle OR Verb + Particle + [Noun] | With Pronoun: Verb + PRONOUN + Particle ONLY',
      heSheItRule: 'The base verb inflects according to subject and tense: "He turns down the offer", "She turned it down".',
      negativeFormula: 'Subject + Auxiliary negative (don\'t / didn\'t) + Base Verb + Particle + Object',
      questionFormula: 'Did / Can / Will + Subject + Verb + Object + Particle?'
    },
    examples: [
      { type: 'Separable (Noun)', sentence: 'Please turn down the music. / Please turn the music down.', note: 'Both word orders are grammatically correct' },
      { type: 'Separable (Pronoun)', sentence: 'The radio is too loud; please turn it down.', note: 'Pronoun must split the verb and particle' },
      { type: 'Inseparable (Transitive)', sentence: 'She ran into an old friend at the train station.', note: 'Never separate "run into" (meet by chance)' },
      { type: 'Intransitive (No Object)', sentence: 'The airplane took off smoothly at dawn.', note: '"Take off" requires no object when meaning departure' },
      { type: 'Three-Part Inseparable', sentence: 'I look forward to meeting your research collaborators next week.', note: 'look + forward + to + noun/gerund' },
      { type: 'Transitive Separable with Noun', sentence: 'She turned on the projector / She turned the projector on.', note: 'Noun object can go before or after the particle' },
    ],
    sentenceForms: {
      positive: [
        'I will look after your puppy while you travel.',
        'They gave up smoking after twenty years.',
        'He looked up the definition in an Oxford dictionary.',
        'We ran out of petrol near Bangalore.'
      ],
      negative: [
        'She did not turn down the prestigious scholarship.',
        'Do not give up when challenges arise.',
        'They haven\'t figured out the solution yet.'
      ],
      questions: [
        'Can you pick me up from the airport?',
        'Did you throw away the receipts?',
        'Who came up with this brilliant marketing proposal?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'I have turned off it.',
        correct: 'I have turned it off.',
        reason: 'Pronoun objects (it, me, them, him, her) must always be placed BETWEEN the verb and particle in separable phrasal verbs.'
      },
      {
        wrong: 'She looked my dog after.',
        correct: 'She looked after my dog.',
        reason: '"Look after" is an inseparable phrasal verb; its object must follow the particle.'
      }
    ],
    keyTips: [
      'Top separable verbs: turn on/off, give up, pick up, figure out, put off, call off.',
      'Top inseparable verbs: look after, run into, get over, come across, stand for.',
      'Three-word phrasal verbs (verb + particle + preposition) are always inseparable: "look forward to", "run out of", "put up with".'
    ],
    practice: [
      {
        id: 'pv-1',
        question: 'The television was bothering grandmother, so Rahul _____ .',
        options: ['turned off it', 'turned it off', 'it turned off', 'turned off them'],
        correct: 1,
        explanation: 'When the direct object is a pronoun ("it"), it must be placed between the verb and particle: "turned it off".'
      },
      {
        id: 'pv-2',
        question: 'We need to cancel the meeting due to rain. Which phrasal verb means "to cancel"?',
        options: ['call off', 'put off', 'take off', 'give off'],
        correct: 0,
        explanation: '"Call off" means to cancel an event. "Put off" means to postpone or delay.'
      },
      {
        id: 'pv-3',
        question: 'I am really looking _____ meeting your family next weekend.',
        options: ['forward to', 'ahead on', 'forward for', 'toward to'],
        correct: 0,
        explanation: 'The three-part idiom is "look forward to + gerund/noun".'
      }
    ]
  },
  {
    id: 'question-tags',
    title: 'Question Tags & Echo Questions',
    level: 'Elementary',
    category: 'question-tags',
    readTime: '6 min',
    summary: 'Form natural confirmation tags, master auxiliary matching, rising/falling intonation, and irregular exceptions.',
    explanation: 'Question tags turn declarative statements into questions, commonly used to seek confirmation, agreement, or politely verify facts. The universal rule is polarity reversal: a positive sentence takes a negative tag ("You are ready, aren\'t you?"), while a negative sentence takes a positive tag ("She hasn\'t arrived, has she?"). The tag repeats the auxiliary or modal verb and replaces the subject with an appropriate pronoun.',
    rule: {
      formula: 'Positive Statement + , + Negative Auxiliary + Subject Pronoun? | Negative Statement + , + Positive Auxiliary + Subject Pronoun?',
      heSheItRule: 'If the main clause uses no auxiliary in Present/Past Simple, use do/does/did: "Ravi plays cricket, doesn\'t he?"',
      negativeFormula: 'Negative words like "never", "rarely", "seldom", "hardly" make the statement negative; use a positive tag!',
      questionFormula: 'Intonation: Falling tone = expecting agreement ("Nice day, isn\'t it?"). Rising tone = real question.'
    },
    examples: [
      { type: 'Positive to Negative', sentence: 'Ananya is an exceptional coder, isn\'t she?', note: 'Positive statement takes negative tag' },
      { type: 'Negative to Positive', sentence: 'You don\'t eat meat, do you?', note: 'Negative statement takes positive tag' },
      { type: 'No Explicit Auxiliary', sentence: 'They arrived on time yesterday, didn\'t they?', note: 'Past simple uses "did / didn\'t"' },
      { type: 'Irregular "I am"', sentence: 'I am included on the guest list, aren\'t I?', note: '"Am I not" is contracted colloquially to "aren\'t I?"' },
      { type: 'Imperative Tag (Polite Request)', sentence: 'Pass me that dictionary, would you?', note: 'Imperatives take "will you" or "would you"' },
      { type: 'Negative Pronoun Subject (Nothing)', sentence: 'Nothing went wrong during the live demonstration, did it?', note: '"Nothing" is negative, so tag is positive "did it"' }
    ],
    sentenceForms: {
      positive: [
        'You have visited London before, haven\'t you?',
        'He can speak fluent German, can\'t he?',
        'We should help the underprivileged, shouldn\'t we?',
        'Let\'s take a short coffee break, shall we?'
      ],
      negative: [
        'They won\'t forget our appointment, will they?',
        'She never speaks rudely, does she?',
        'There is no reason to worry, is there?'
      ],
      questions: [
        'Close the front door quietly, will you?',
        'Don\'t make any noise, will you?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'I am right, amn\'t I?',
        correct: 'I am right, aren\'t I?',
        reason: '"Amn\'t I" does not exist in standard English. The standard contraction is "aren\'t I?".'
      },
      {
        wrong: 'She seldom complains, doesn\'t she?',
        correct: 'She seldom complains, does she?',
        reason: 'Words like "seldom", "never", "barely", and "scarcely" make the main clause negative, requiring a POSITIVE tag.'
      }
    ],
    keyTips: [
      'Imperatives: "Pass the salt, will you / could you?" (polite request).',
      '"Let\'s" tag is always "shall we?": "Let\'s begin the quiz, shall we?".',
      '"Everyone / Somebody" takes pronoun "they" in the tag: "Everyone was satisfied, weren\'t they?".'
    ],
    practice: [
      {
        id: 'qt-1',
        question: 'She hardly ever watches horror movies, _____ ?',
        options: ['doesn\'t she', 'does she', 'is she', 'isn\'t she'],
        correct: 1,
        explanation: '"Hardly ever" gives the sentence a negative meaning, so the question tag must be positive: "does she?".'
      },
      {
        id: 'qt-2',
        question: 'Let\'s revise our grammar notes before the quiz, _____ ?',
        options: ['will we', 'shall we', 'don\'t we', 'aren\'t we'],
        correct: 1,
        explanation: 'Suggestions beginning with "Let\'s" always take the question tag "shall we?".'
      },
      {
        id: 'qt-3',
        question: 'I am responsible for coordinating the project, _____ ?',
        options: ['am not I', 'aren\'t I', 'isn\'t it', 'don\'t I'],
        correct: 1,
        explanation: 'In standard English, the question tag for "I am" is always "aren\'t I?".'
      }
    ]
  },
  {
    id: 'causative-verbs',
    title: 'Causative Verbs: Have, Get, Make, Let & Help',
    level: 'Intermediate',
    category: 'causatives',
    readTime: '7 min',
    summary: 'Express arranged actions, persuasion, obligation, permission, and assistance in active & passive voice.',
    explanation: 'Causative verbs describe situations where a subject causes someone else to perform an action. The primary causative verbs are Have (arrange / delegate), Get (persuade / convince), Make (force / require), Let (allow / permit), and Help (assist). In passive causative ("have / get something done"), the focus shifts to the service completed rather than who performed it.',
    rule: {
      formula: 'Make/Have/Let + Person + Base Verb (Bare Infinitive) | Get + Person + to + Verb | Passive: Have/Get + Object + Past Participle (V3)',
      heSheItRule: '"Make someone do" expresses force or obligation. "Get someone to do" expresses gentle persuasion.',
      negativeFormula: 'Subject + auxiliary negative + causative verb + person + verb form',
      questionFormula: 'Did you have / get your car serviced yesterday?'
    },
    examples: [
      { type: 'Have (Active: Delegate)', sentence: 'The director had his assistant prepare the annual report.', note: 'Base verb "prepare" without "to"' },
      { type: 'Get (Active: Persuade)', sentence: 'Sneha got her brother to wash the dishes.', note: '"Get" requires the full infinitive "to wash"' },
      { type: 'Make (Obligation/Force)', sentence: 'The strict teacher made the students rewrite their essays.', note: 'Bare infinitive "rewrite"' },
      { type: 'Passive Causative (Service)', sentence: 'I had my smartphone repaired at the authorized center.', note: 'Have + object + V3 past participle' },
      { type: 'Passive Causative with Get', sentence: 'I must get my passport renewed before international travel.', note: 'get + object + V3' },
      { type: 'Negative Causative with Let', sentence: 'The security officer did not let unauthorized visitors enter the laboratory.', note: 'let + object + base verb' },
    ],
    sentenceForms: {
      positive: [
        'We let our children play in the garden until dusk.',
        'My mother got the doctor to explain the diagnosis clearly.',
        'David had his suit tailored for the convocation ceremony.',
        'Learning English helps you communicate across cultures.'
      ],
      negative: [
        'She didn\'t let anyone see her personal journal.',
        'They couldn\'t get the engine to start in the freezing cold.',
        'He didn\'t have his teeth checked this year.'
      ],
      questions: [
        'Where do you usually get your hair cut?',
        'Did the police officer make him take a breathalyzer test?',
        'Why won\'t your boss let you work remotely?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'She made me to apologize to her friend.',
        correct: 'She made me apologize to her friend.',
        reason: '"Make" takes a bare infinitive (without "to"). Only "get" uses "to + verb".'
      },
      {
        wrong: 'I will cut my hair tomorrow. (when done by a barber)',
        correct: 'I will have my hair cut tomorrow. / I will get my hair cut tomorrow.',
        reason: 'Unless you cut your own hair with scissors, use the passive causative "have/get my hair cut".'
      }
    ],
    keyTips: [
      'Memory formula: "Get someone TO do" (takes "to"), but "Have someone DO" (bare infinitive).',
      '"Help" is flexible: "She helped me understand" OR "She helped me to understand" (both are accepted).',
      '"Let" means permit: "Let me know" = "Allow me to know". Never say "let me to know".'
    ],
    practice: [
      {
        id: 'cv-1',
        question: 'The manager _____ the software engineers work overtime to fix the critical bug.',
        options: ['got', 'made', 'allowed', 'persuaded'],
        correct: 1,
        explanation: 'Only "made" is followed by a person + bare infinitive ("work"). "Got", "allowed", and "persuaded" require "to work".'
      },
      {
        id: 'cv-2',
        question: 'I need to have my passport _____ before traveling abroad next month.',
        options: ['renew', 'to renew', 'renewed', 'renewing'],
        correct: 2,
        explanation: 'Passive causative formula: "have + object (passport) + past participle (renewed)".'
      },
      {
        id: 'cv-3',
        question: 'How did you get the landlord _____ the leaking roof so promptly?',
        options: ['repair', 'to repair', 'repaired', 'for repairing'],
        correct: 1,
        explanation: '"Get + person" takes the full infinitive: "to repair".'
      }
    ]
  },
  {
    id: 'subjunctive-mood',
    title: 'Subjunctive Mood & Formal Hypotheticals',
    level: 'Advanced',
    category: 'subjunctive',
    readTime: '8 min',
    summary: 'Use the mandative subjunctive (insist that he be) and hypothetical counter-factuals (were) in elegant English.',
    explanation: 'The subjunctive mood expresses wishes, hypothetical states, urgency, demands, or conditions contrary to fact. The Mandative Subjunctive follows verbs of demand, advice, or necessity (recommend, demand, suggest, insist, vital, essential) and uses the bare base form of the verb for all subjects—including third-person singular (e.g., "I insist that he be present", NOT "he is"). The Hypothetical Subjunctive replaces "was" with "were" for all subjects in unreal conditionals ("If I were you", "I wish he were here").',
    rule: {
      formula: 'Mandative: Verb of urgency + that + Subject + Base Verb (V1) | Unreal: If + Subject + were + Complement',
      heSheItRule: 'No -s ending is added in the mandative subjunctive: "She recommended that he study harder", NOT "studies".',
      negativeFormula: 'Subject + Verb + that + Subject + NOT + Base Verb (e.g., "I insist that he not leave").',
      questionFormula: 'Did the committee demand that the CEO resign immediately?'
    },
    examples: [
      { type: 'Mandative (Verb "Be")', sentence: 'It is imperative that every citizen be treated with dignity.', note: 'Base verb "be" used instead of "is" or "are"' },
      { type: 'Mandative (Base Verb)', sentence: 'The doctor advised that Priya take complete bed rest.', note: '"Take" instead of "takes"' },
      { type: 'Hypothetical (Were)', sentence: 'If I were the prime minister, I would prioritize healthcare.', note: '"Were" used with first-person singular "I"' },
      { type: 'Wish / Unreal State', sentence: 'He speaks as if he were an authority on astrophysics.', note: 'Unreal comparison with "as if / as though"' },
      { type: 'Subjunctive of Urgency', sentence: 'It is crucial that every candidate arrive thirty minutes before the exam.', note: 'Fixed base verb "arrive", not "arrives"' },
      { type: 'Fixed Formulaic Set Phrase', sentence: 'Be that as it may, we must adhere strictly to company policy.', note: 'Ancient surviving subjunctive set phrase' },
    ],
    sentenceForms: {
      positive: [
        'The judge ordered that the evidence remain sealed until the trial.',
        'We suggest that the company hire an independent auditor.',
        'I wish this peaceful moment were everlasting.'
      ],
      negative: [
        'It is crucial that she not disclose the proprietary algorithm.',
        'The board demanded that the chief executive not speak to the media.'
      ],
      questions: [
        'Did the committee request that he submit his credentials again?',
        'Would you accept the promotion if you were in my shoes?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'The doctor recommended that he takes the antibiotic twice daily.',
        correct: 'The doctor recommended that he take the antibiotic twice daily.',
        reason: 'In the mandative subjunctive following "recommended that", the verb remains in its bare base form ("take"), not third-person singular ("takes").'
      },
      {
        wrong: 'If I was you, I would accept the job offer.',
        correct: 'If I were you, I would accept the job offer.',
        reason: 'In formal standard English, the subjunctive "were" is required in hypothetical conditions contrary to reality.'
      }
    ],
    keyTips: [
      'Subjunctive triggers: insist, suggest, recommend, demand, request, require, urge, propose.',
      'Subjunctive adjectives: vital, essential, imperative, crucial, important, necessary (followed by "that... be / V1").',
      '"It\'s high time + past simple": "It\'s high time we left for the airport" (expresses overdue necessity).'
    ],
    practice: [
      {
        id: 'sub-1',
        question: 'The council insisted that the old heritage building _____ preserved.',
        options: ['is', 'be', 'was', 'being'],
        correct: 1,
        explanation: 'Following the verb of urgency "insisted that", the subjunctive base form "be" is required.'
      },
      {
        id: 'sub-2',
        question: 'It is essential that every student _____ their registration form before Friday.',
        options: ['submits', 'submit', 'submitted', 'would submit'],
        correct: 1,
        explanation: '"Essential that" triggers the mandative subjunctive, which uses the base form "submit" regardless of the singular subject.'
      },
      {
        id: 'sub-3',
        question: 'I wish yesterday\'s weather _____ as pleasant as today.',
        options: ['was', 'had been', 'is', 'were be'],
        correct: 1,
        explanation: 'For an unreal wish about the past ("yesterday"), the past perfect "had been" is required.'
      }
    ]
  },
  {
    id: 'determiners-and-quantifiers',
    title: 'Determiners & Quantifiers: Few vs A Few, Little vs A Little, Each vs Every',
    level: 'Elementary',
    category: 'determiners',
    readTime: '6 min',
    summary: 'Master positive vs negative nuances, countable vs uncountable agreements, and distributive determiners.',
    explanation: 'Determiners precede nouns to clarify quantity, specificity, or possession. While "few" and "little" emphasize scarcity and negative limitation (meaning "almost none"), "a few" and "a little" carry a positive nuance (meaning "some, a small but sufficient amount"). Additionally, "each" focuses on individual members of a group considered separately, whereas "every" considers all members collectively.',
    rule: {
      formula: 'Few / A Few + Countable Plural Nouns | Little / A Little + Uncountable Nouns | Each / Every + Singular Noun + Singular Verb',
      heSheItRule: 'Few / Little = Negative nuance (insufficient / barely any). A few / A little = Positive nuance (some / enough).',
      negativeFormula: 'Not many + Countable | Not much + Uncountable',
      questionFormula: 'How many [countable plural] / How much [uncountable] do you need?'
    },
    examples: [
      { type: 'A Few (Positive Countable)', sentence: 'She has a few close friends who support her unconditionally.', note: 'Positive: several supportive friends' },
      { type: 'Few (Negative Countable)', sentence: 'Unfortunately, few students passed the rigorous calculus exam.', note: 'Negative: almost none passed' },
      { type: 'A Little (Positive Uncountable)', sentence: 'There is a little milk left in the fridge for your tea.', note: 'Positive: enough for a cup' },
      { type: 'Little (Negative Uncountable)', sentence: 'He had little hope of recovering the lost passport.', note: 'Negative: virtually no hope' },
      { type: 'Each vs Every Nuance', sentence: 'Each student received an individual certificate, and every certificate was framed.', note: '"Each" focuses on individuals; "Every" on the collective group' },
      { type: 'Little vs A Little with Mass Noun', sentence: 'We have a little coffee left, so we can make breakfast together.', note: 'Positive nuance: enough to satisfy' },
    ],
    sentenceForms: {
      positive: [
        'Each student received an individual certificate of merit.',
        'Every participant contributed meaningfully to the panel discussion.',
        'Both applicants demonstrated exceptional analytical skills.'
      ],
      negative: [
        'Neither candidate satisfied all the prerequisite qualifications.',
        'There wasn\'t much traffic on the highway this morning.'
      ],
      questions: [
        'Do you have a little time to review my presentation draft?',
        'How many grammar lessons have you completed this week?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'I have little friends in the new neighborhood. (meaning some friends)',
        correct: 'I have a few friends in the new neighborhood.',
        reason: '"Friends" is a countable noun, so use "few / a few", not "little". Furthermore, to express a positive amount, use "a few".'
      },
      {
        wrong: 'Every students were present in the hall.',
        correct: 'Every student was present in the hall.',
        reason: '"Every" must always be followed by a singular countable noun and a singular verb ("student was").'
      }
    ],
    keyTips: [
      'Countable quantifiers: many, a few, few, several, both, each, every, number of.',
      'Uncountable quantifiers: much, a little, little, a great deal of, amount of.',
      'Dual quantifiers (both countable & uncountable): some, any, a lot of, plenty of, all, most.'
    ],
    practice: [
      {
        id: 'det-1',
        question: 'We need to hurry because we have _____ time before the train departs.',
        options: ['a few', 'few', 'little', 'a little'],
        correct: 2,
        explanation: '"Time" is uncountable, and needing to hurry indicates scarcity (almost no time), requiring "little".'
      },
      {
        id: 'det-2',
        question: '_____ candidate was interviewed for fifteen minutes by the panel.',
        options: ['Each', 'Every of', 'Both of', 'All'],
        correct: 0,
        explanation: '"Each" emphasizes individuals one by one and pairs with singular "candidate was".'
      },
      {
        id: 'det-3',
        question: 'Don\'t worry! I have _____ knowledge of French, so I can order food for us.',
        options: ['little', 'a little', 'few', 'a few'],
        correct: 1,
        explanation: '"Knowledge" is uncountable, and being able to order food expresses a positive, sufficient amount ("a little").'
      }
    ]
  },
  {
    id: 'participle-clauses',
    title: 'Participle Clauses & Reduced Relative Clauses',
    level: 'Advanced',
    category: 'clauses',
    readTime: '8 min',
    summary: 'Condense complex sentences using present (-ing), past (-ed), and perfect (having done) participles cleanly.',
    explanation: 'Participle clauses enable writers to package complex ideas concisely by replacing subordinate clauses of time, cause, condition, or concession. Present participles (-ing) indicate active or simultaneous actions. Past participles (-ed/V3) represent passive meanings. Perfect participles ("having + V3") indicate an action completed prior to the main clause. The subject of the participle clause must match the subject of the main clause to avoid the notorious "dangling participle" blunder.',
    rule: {
      formula: 'Present Participle: Verb-ing ..., Subject + Verb | Past Participle: V3 ..., Subject + Verb | Perfect: Having + V3 ..., Subject + Verb',
      heSheItRule: 'The implied subject of the participle MUST be identical to the subject of the main independent clause.',
      negativeFormula: 'Not + Verb-ing ... (e.g., "Not knowing the answer, she remained silent").',
      questionFormula: 'Having reviewed the evidence, what conclusion did the jury reach?'
    },
    examples: [
      { type: 'Present Participle (Cause)', sentence: 'Feeling exhausted from the marathon, Karthik fell asleep instantly.', note: 'Equivalent to: Because he felt exhausted...' },
      { type: 'Present Participle (Time)', sentence: 'Opening the old wooden chest, she discovered ancestral gold coins.', note: 'Equivalent to: When she opened the chest...' },
      { type: 'Past Participle (Passive)', sentence: 'Surrounded by enthusiastic fans, the violinist signed autographs.', note: 'Equivalent to: Because she was surrounded...' },
      { type: 'Perfect Participle (Prior Action)', sentence: 'Having finished her degree, Ananya joined an AI research laboratory.', note: 'Equivalent to: After she had finished...' },
      { type: 'Having + V3 for Completed Past Sequence', sentence: 'Having finished his daily homework, Karthik logged on to practice vocabulary.', note: 'Clear sequence: homework finished first' },
      { type: 'Present Participle of Cause / Reason', sentence: 'Not knowing the Wi-Fi password, Priya asked the librarian for assistance.', note: 'Equivalent to "Because she did not know..."' },
    ],
    sentenceForms: {
      positive: [
        'Walking along the serene beach, we observed a pod of dolphins.',
        'Published in 1813, Pride and Prejudice remains a beloved classic.',
        'Having saved enough capital, they launched their technology venture.',
        'Encouraged by her high marks, Sneha set a new goal to master public speaking.'
      ],
      negative: [
        'Not wanting to disturb the meeting, Priya tiptoed into the conference hall.',
        'Never having traveled outside Asia, he felt nervous about visiting Canada.',
        'Not having reviewed the instructions, he did not know where to submit the form.'
      ],
      questions: [
        'Having heard both testimonies, how would you evaluate the dispute?',
        'Having completed the placement test, are you ready to choose your first module?',
        'Walking down the hallway, did you notice the new noticeboard?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'Walking down the boulevard, the ancient trees looked mesmerizing. (Dangling Participle!)',
        correct: 'Walking down the boulevard, I thought the ancient trees looked mesmerizing. / As I walked down the boulevard, the trees looked mesmerizing.',
        reason: 'The trees were not walking down the boulevard! The subject after the comma must be the person performing the action.'
      },
      {
        wrong: 'Having arrived at the station, the train had already left.',
        correct: 'When I arrived at the station, the train had already left. / Having arrived at the station, I realized the train had already left.',
        reason: 'The train did not arrive at itself; the subject must logically execute the participial action.'
      }
    ],
    keyTips: [
      'To test for dangling participles, ask: "Who is doing the action in the -ing clause?" Make that person the subject immediately after the comma.',
      'Reduced relative clauses: "The man who is speaking to Priya" becomes "The man speaking to Priya".',
      'Passive reduced clause: "The cars that were damaged in the storm" becomes "The cars damaged in the storm".'
    ],
    practice: [
      {
        id: 'pc-1',
        question: 'Identify the sentence with NO dangling modifier:',
        options: [
          'Looking through the telescope, a brilliant comet was spotted by the astronomer.',
          'Looking through the telescope, the astronomer spotted a brilliant comet.',
          'Looking through the telescope, the comet appeared exceptionally bright.',
          'Looking through the telescope, excitement filled the astronomer\'s heart.'
        ],
        correct: 1,
        explanation: 'Only in option B is "the astronomer" (the one looking through the telescope) the grammatical subject following the participle clause.'
      },
      {
        id: 'pc-2',
        question: '_____ all the necessary documentation, she submitted her visa application.',
        options: ['Having collected', 'Collected', 'To collect', 'Have collecting'],
        correct: 0,
        explanation: 'The perfect participle "Having collected" correctly indicates an action completed before the main action ("submitted").'
      },
      {
        id: 'pc-3',
        question: 'Rewrite concisely: "Because she was terrified of the dark, Sneha left the hallway light on."',
        options: [
          'Terrified of the dark, Sneha left the hallway light on.',
          'Terrifying of the dark, Sneha left the hallway light on.',
          'Being terrifying of the dark, Sneha left the hallway light on.',
          'Having terrified of the dark, Sneha left the hallway light on.'
        ],
        correct: 0,
        explanation: 'The past participle "Terrified of the dark" expresses the passive emotional state concisely.'
      }
    ]
  },
  {
    id: 'mixed-conditionals',
    title: 'Mixed Conditionals & Unreal Past Wishes',
    level: 'Advanced',
    category: 'conditionals',
    readTime: '7 min',
    summary: 'Connect past causes with present consequences and present states with past results plus "wish" nuances.',
    explanation: 'While standard conditionals keep timeframes synchronized, Mixed Conditionals bridge distinct temporal realities. Type 1 connects an unreal past condition (Third Conditional) with a present result (Second Conditional): "If I had taken that flight, I would be in Paris right now." Type 2 connects an enduring present characteristic with a past consequence: "If I were braver, I would have confronted him yesterday." These nuances provide the expressive depth necessary for master-level communication.',
    rule: {
      formula: 'Type 1 (Past Cause -> Present Result): If + Past Perfect, Subject + would + Base Verb | Type 2 (Present State -> Past Result): If + Past Simple, Subject + would have + V3',
      heSheItRule: 'Look for temporal indicator words: "yesterday, last year" (past) versus "now, today, currently" (present).',
      negativeFormula: 'If + had not (hadn\'t) + V3, Subject + would not (wouldn\'t) + Base Verb',
      questionFormula: 'Would you be happier today if you had chosen a different career path?'
    },
    examples: [
      { type: 'Type 1 (Past -> Present)', sentence: 'If he had accepted the scholarship last year, he would be studying in Oxford today.', note: 'Past decision alters present reality' },
      { type: 'Type 2 (Present -> Past)', sentence: 'If Sneha spoke fluent Japanese, she would have secured that translation job last month.', note: 'Enduring skill would have changed past event' },
      { type: 'Wish About Present', sentence: 'I wish I had more free time to practice English grammar daily.', note: 'Wish + Past Simple expresses present dissatisfaction' },
      { type: 'Wish About Past', sentence: 'David wishes he hadn\'t sold his vintage motorcycle.', note: 'Wish + Past Perfect expresses past regret' },
      { type: 'Mixed Type 2 (Present Trait -> Past Result)', sentence: 'If I were more courageous, I would have applied for the scholarship last year.', note: 'Permanent trait "were" explains past missed action' },
      { type: 'Mixed with Wish for Present State', sentence: 'I wish I spoke German fluently so I could converse with our Munich partners.', note: 'Unreal present wish using past tense' },
    ],
    sentenceForms: {
      positive: [
        'If we had invested early in renewable energy, our company would be profitable today.',
        'If I weren\'t afraid of heights, I would have gone skydiving with you last weekend.',
        'If he hadn\'t fractured his ankle last winter, he would be playing in the championship today.'
      ],
      negative: [
        'If they hadn\'t missed the train, they wouldn\'t be stranded at the platform right now.',
        'I wouldn\'t have forgotten her birthday if I didn\'t have such an unreliable memory.',
        'If she weren\'t so disciplined, she wouldn\'t have graduated with top honors last month.'
      ],
      questions: [
        'Where would you be living right now if your family hadn\'t relocated in 2018?',
        'If you hadn\'t chosen computer science, what profession would you be in right now?',
        'If he were more communicative, would he have resolved the dispute earlier?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'If I had won the lottery last week, I would have been rich today.',
        correct: 'If I had won the lottery last week, I would be rich today.',
        reason: 'Because the result is in the present ("today"), use "would be", not the past conditional "would have been".'
      },
      {
        wrong: 'I wish I would have studied harder for yesterday\'s examination.',
        correct: 'I wish I had studied harder for yesterday\'s examination.',
        reason: 'Do not use "would have" inside a wish clause. Use the past perfect ("had studied") for past regrets.'
      }
    ],
    keyTips: [
      'Type 1 indicator keywords: "If had + V3 ... would [now / today / currently]".',
      'Type 2 indicator keywords: "If [were / past verb] ... would have [yesterday / last year]".',
      '"If only" is an emphatic form of "I wish": "If only I had listened to your advice!"'
    ],
    practice: [
      {
        id: 'mc-1',
        question: 'If Ravi _____ his alarm last night, he wouldn\'t be rushing to the airport right now.',
        options: ['set', 'had set', 'would set', 'sets'],
        correct: 1,
        explanation: 'The past condition ("last night") requires the past perfect "had set", producing the present result ("wouldn\'t be rushing right now").'
      },
      {
        id: 'mc-2',
        question: 'If she weren\'t so terrified of flying, she _____ to London with her family last summer.',
        options: ['would travel', 'would have traveled', 'will travel', 'had traveled'],
        correct: 1,
        explanation: 'A present enduring characteristic ("If she weren\'t terrified") causing a past consequence ("last summer") requires "would have traveled".'
      },
      {
        id: 'mc-3',
        question: 'I wish I _____ so many unnecessary expenses during the festive holiday.',
        options: ['didn\'t incur', 'hadn\'t incurred', 'wouldn\'t incur', 'haven\'t incurred'],
        correct: 1,
        explanation: 'Regrets about actions completed in the past require "wish + past perfect" ("hadn\'t incurred").'
      }
    ]
  },
  {
    id: 'direct-indirect-objects',
    title: 'Direct & Indirect Objects: Ditransitive Verbs & Dative Shift',
    level: 'Beginner',
    category: 'sentence-structure',
    readTime: '6 min',
    summary: 'Master verbs taking two objects, prepositional shifts with "to" and "for", and verbs that prohibit shifts.',
    explanation: 'Ditransitive verbs are verbs that take both a Direct Object (DO - the thing being acted upon or transferred) and an Indirect Object (IO - the recipient or beneficiary of the action). English allows two structural patterns (the Dative Shift): Pattern A places the indirect object first without a preposition ("She gave him a gift"), while Pattern B places the direct object first followed by a prepositional phrase with "to" or "for" ("She gave a gift to him"). Crucially, some Latinate verbs like "explain", "describe", and "suggest" strictly forbid Pattern A.',
    rule: {
      formula: 'Pattern A: Subject + Verb + Indirect Object (Recipient) + Direct Object (Thing) | Pattern B: Subject + Verb + Direct Object + to/for + Indirect Object',
      heSheItRule: 'Use "to" when transfer/motion is involved (give, send, show, lend). Use "for" when benefit/service is created (buy, bake, cook, build).',
      negativeFormula: 'Subject + auxiliary negative + Verb + IO + DO OR Verb + DO + to/for + IO',
      questionFormula: 'Did you send the invoice to the client? / Did you send the client the invoice?'
    },
    examples: [
      { type: 'Pattern A (IO + DO)', sentence: 'Karthik sent Priya an encrypted email.', note: 'Priya (IO) precedes an encrypted email (DO)' },
      { type: 'Pattern B (DO + to + IO)', sentence: 'Karthik sent an encrypted email to Priya.', note: 'Preposition "to" required when DO comes first' },
      { type: 'Preposition "For" (Benefit)', sentence: 'My mother baked my sister a delicious chocolate cake.', note: 'Or: baked a delicious chocolate cake FOR my sister' },
      { type: 'Non-shifting Verb (Explain)', sentence: 'The professor explained the theorem to the students.', note: 'NEVER say: "explained the students the theorem"' },
      { type: 'Beneficiary Preposition (For)', sentence: 'Grandmother baked delicious butter cookies for all the grandchildren.', note: '"for" marks beneficiary prepositional shift' },
      { type: 'Double Pronoun Object Rule', sentence: 'Did you give the textbook to Ravi? Yes, I gave it to him.', note: 'When both objects are pronouns, prepositional structure is mandatory' },
    ],
    sentenceForms: {
      positive: [
        'The company offered Sneha a competitive starting salary.',
        'He lent his car to his younger brother for the weekend.',
        'Could you pass me the dictionary, please?',
        'She brought her study group some fresh mango juice.'
      ],
      negative: [
        'She did not tell anyone her top-secret password.',
        'They didn\'t disclose the financial discrepancy to the board.',
        'He didn\'t lend his laptop to anyone during finals week.'
      ],
      questions: [
        'Did you buy flowers for your mother on her birthday?',
        'Can you show me the way to the railway station?',
        'Could you pass me the dictionary, please?'
      ]
    },
    commonMistakes: [
      {
        wrong: 'Please explain me this grammar rule.',
        correct: 'Please explain this grammar rule to me.',
        reason: 'Verbs like "explain", "describe", "suggest", "introduce", and "admit" CANNOT take an indirect object directly without "to".'
      },
      {
        wrong: 'She gave to him the book.',
        correct: 'She gave him the book. / She gave the book to him.',
        reason: 'Do not use "to" if the recipient pronoun directly follows the verb.'
      }
    ],
    keyTips: [
      'Pronoun rule: If BOTH objects are pronouns, English strongly prefers Pattern B: "Give it to me" (NOT "Give me it").',
      'Verbs requiring "to": give, send, lend, pass, show, tell, teach, promise, offer.',
      'Verbs requiring "for": buy, cook, bake, make, build, find, order, save.'
    ],
    practice: [
      {
        id: 'dio-1',
        question: 'Which of the following sentences is grammatically INCORRECT?',
        options: [
          'She suggested a brilliant marketing strategy to her manager.',
          'She suggested her manager a brilliant marketing strategy.',
          'She offered her manager a brilliant marketing strategy.',
          'She presented a brilliant marketing strategy to her manager.'
        ],
        correct: 1,
        explanation: 'The verb "suggest" cannot be followed directly by an indirect object. It must be: "suggested [something] to [someone]".'
      },
      {
        id: 'dio-2',
        question: 'When both objects are pronouns, which sentence is most natural in standard English?',
        options: ['Hand me it.', 'Hand it to me.', 'Hand to me it.', 'Hand it me.'],
        correct: 1,
        explanation: 'When both objects are pronouns, English standard usage dictates "Verb + Pronoun DO + to + Pronoun IO": "Hand it to me".'
      },
      {
        id: 'dio-3',
        question: 'My father built a treehouse _____ my little brother last summer.',
        options: ['to', 'for', 'with', 'at'],
        correct: 1,
        explanation: 'The verb "build" describes creating a benefit for someone, requiring the preposition "for".'
      }
    ]
  }

];
