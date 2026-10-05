// Vocabulary Database - 50+ words across 8 distinct categories
// Includes pronunciation (IPA), meanings, examples, synonyms, and antonyms

export const vocabCategories = [
  { id: 'all', name: 'All Words', icon: 'BookOpen' },
  { id: 'daily-english', name: 'Daily English', icon: 'Coffee' },
  { id: 'education', name: 'Education', icon: 'GraduationCap' },
  { id: 'business', name: 'Business', icon: 'Briefcase' },
  { id: 'travel', name: 'Travel', icon: 'Compass' },
  { id: 'technology', name: 'Technology', icon: 'Cpu' },
  { id: 'food', name: 'Food & Dining', icon: 'Utensils' },
  { id: 'common-verbs', name: 'Common Verbs', icon: 'Activity' },
  { id: 'common-adjectives', name: 'Common Adjectives', icon: 'Sparkles' }
];

export const vocabularyWords = [
  // ==================== DAILY ENGLISH ====================
  {
    id: 'v-1',
    word: 'Beautiful',
    ipa: '/ˈbjuː.tɪ.fəl/',
    partOfSpeech: 'Adjective',
    category: 'daily-english',
    meaning: 'Attractive, pleasant, or giving great pleasure to the senses or mind.',
    example: 'She greeted everyone with a beautiful and reassuring smile.',
    synonyms: ['Gorgeous', 'Stunning', 'Lovely', 'Attractive'],
    antonyms: ['Ugly', 'Unattractive', 'Repulsive']
  },
  {
    id: 'v-2',
    word: 'Gratitude',
    ipa: '/ˈɡræt.ɪ.tjuːd/',
    partOfSpeech: 'Noun',
    category: 'daily-english',
    meaning: 'The feeling of being thankful and appreciative for kindness received.',
    example: 'He expressed profound gratitude to his parents for their unwavering support.',
    synonyms: ['Thankfulness', 'Appreciation', 'Gratefulness'],
    antonyms: ['Ingratitude', 'Unthankfulness']
  },
  {
    id: 'v-3',
    word: 'Leisure',
    ipa: '/ˈleʒ.ər/',
    partOfSpeech: 'Noun',
    category: 'daily-english',
    meaning: 'Time free from work or duties, spent in relaxation or enjoyable pursuits.',
    example: 'During her leisure time, she enjoys sketching historic monuments.',
    synonyms: ['Free time', 'Recreation', 'Relaxation'],
    antonyms: ['Labor', 'Work', 'Duty']
  },
  {
    id: 'v-4',
    word: 'Sincere',
    ipa: '/sɪnˈsɪər/',
    partOfSpeech: 'Adjective',
    category: 'daily-english',
    meaning: 'Free from pretense or deceit; proceeding from genuine feelings.',
    example: 'Please accept my sincere apologies for the unexpected delay.',
    synonyms: ['Genuine', 'Heartfelt', 'Honest', 'Authentic'],
    antonyms: ['Insincere', 'Hypocritical', 'Deceitful']
  },
  {
    id: 'v-5',
    word: 'Polite',
    ipa: '/pəˈlaɪt/',
    partOfSpeech: 'Adjective',
    category: 'daily-english',
    meaning: 'Having or showing behavior that is respectful and considerate of other people.',
    example: 'The hotel staff was exceptionally polite and accommodating.',
    synonyms: ['Courteous', 'Respectful', 'Well-mannered'],
    antonyms: ['Rude', 'Impolite', 'Discourteous']
  },
  {
    id: 'v-6',
    word: 'Generous',
    ipa: '/ˈdʒen.ər.əs/',
    partOfSpeech: 'Adjective',
    category: 'daily-english',
    meaning: 'Showing a readiness to give more of something (such as money or time) than is strictly necessary.',
    example: 'The community received a generous donation for constructing a public library.',
    synonyms: ['Benevolent', 'Giving', 'Charitable', 'Unselfish'],
    antonyms: ['Stingy', 'Selfish', 'Miserly']
  },

  // ==================== EDUCATION ====================
  {
    id: 'v-7',
    word: 'Curriculum',
    ipa: '/kəˈrɪk.jə.ləm/',
    partOfSpeech: 'Noun',
    category: 'education',
    meaning: 'The subjects comprising a course of study in a school or college.',
    example: 'The updated science curriculum emphasizes hands-on experiments and critical thinking.',
    synonyms: ['Syllabus', 'Course of study', 'Program'],
    antonyms: ['Extracurriculars']
  },
  {
    id: 'v-8',
    word: 'Comprehend',
    ipa: '/ˌkɒm.prɪˈhend/',
    partOfSpeech: 'Verb',
    category: 'education',
    meaning: 'To grasp mentally; to fully understand the nature or significance of something.',
    example: 'After studying the examples, the students were able to comprehend the difficult theorem.',
    synonyms: ['Understand', 'Grasp', 'Fathom', 'Perceive'],
    antonyms: ['Misunderstand', 'Misinterpret']
  },
  {
    id: 'v-9',
    word: 'Pedagogy',
    ipa: '/ˈped.ə.ɡɒdʒ.i/',
    partOfSpeech: 'Noun',
    category: 'education',
    meaning: 'The method and practice of teaching, especially as an academic subject.',
    example: 'Modern pedagogy focuses heavily on interactive and student-centered learning methodologies.',
    synonyms: ['Teaching methodology', 'Instruction', 'Didactics'],
    antonyms: []
  },
  {
    id: 'v-10',
    word: 'Dissertation',
    ipa: '/ˌdɪs.əˈteɪ.ʃən/',
    partOfSpeech: 'Noun',
    category: 'education',
    meaning: 'A long essay on a particular subject, especially one written for a university doctorate or master’s degree.',
    example: 'She submitted her doctoral dissertation on computational linguistics last semester.',
    synonyms: ['Thesis', 'Treatise', 'Research paper'],
    antonyms: []
  },
  {
    id: 'v-11',
    word: 'Diligent',
    ipa: '/ˈdɪl.ɪ.dʒənt/',
    partOfSpeech: 'Adjective',
    category: 'education',
    meaning: 'Having or showing care and conscientiousness in one’s work or duties.',
    example: 'Thanks to her diligent preparation, she topped the competitive examination.',
    synonyms: ['Hardworking', 'Assiduous', 'Conscientious', 'Metanical'],
    antonyms: ['Lazy', 'Negligent', 'Careless']
  },
  {
    id: 'v-12',
    word: 'Acquire',
    ipa: '/əˈkwaɪər/',
    partOfSpeech: 'Verb',
    category: 'education',
    meaning: 'To gain or obtain a new skill, asset, or quality through one\'s own efforts.',
    example: 'Practicing English conversations daily helps you acquire natural fluency.',
    synonyms: ['Gain', 'Master', 'Attain', 'Obtain'],
    antonyms: ['Lose', 'Forfeit']
  },

  // ==================== BUSINESS ====================
  {
    id: 'v-13',
    word: 'Negotiation',
    ipa: '/nɪˌɡəʊ.ʃiˈeɪ.ʃən/',
    partOfSpeech: 'Noun',
    category: 'business',
    meaning: 'Discussion aimed at reaching an agreement between multiple parties.',
    example: 'After intensive negotiation, both corporations agreed on the merger terms.',
    synonyms: ['Discussion', 'Bargaining', 'Deliberation', 'Arbitration'],
    antonyms: ['Disagreement', 'Deadlock']
  },
  {
    id: 'v-14',
    word: 'Entrepreneur',
    ipa: '/ˌɒn.trə.prəˈnɜːr/',
    partOfSpeech: 'Noun',
    category: 'business',
    meaning: 'A person who organizes and operates a business or businesses, taking on financial risks to do so.',
    example: 'The young entrepreneur launched an innovative mobile learning platform.',
    synonyms: ['Founder', 'Innovator', 'Businessperson'],
    antonyms: ['Employee']
  },
  {
    id: 'v-15',
    word: 'Revenue',
    ipa: '/ˈrev.ən.juː/',
    partOfSpeech: 'Noun',
    category: 'business',
    meaning: 'Income, especially when of a company or organization and of a substantial nature.',
    example: 'The company reported a 25% increase in annual recurring revenue this fiscal year.',
    synonyms: ['Income', 'Earnings', 'Proceeds', 'Turnover'],
    antonyms: ['Expense', 'Deficit', 'Loss']
  },
  {
    id: 'v-16',
    word: 'Lucrative',
    ipa: '/ˈluː.krə.tɪv/',
    partOfSpeech: 'Adjective',
    category: 'business',
    meaning: 'Producing a great deal of profit; financially rewarding.',
    example: 'The consultant signed a lucrative contract with a multinational enterprise.',
    synonyms: ['Profitable', 'Rewarding', 'Gainful', 'Remunerative'],
    antonyms: ['Unprofitable', 'Loss-making']
  },
  {
    id: 'v-17',
    word: 'Strategy',
    ipa: '/ˈstræt.ə.dʒi/',
    partOfSpeech: 'Noun',
    category: 'business',
    meaning: 'A plan of action or policy designed to achieve a major or overall aim.',
    example: 'Our marketing strategy focuses on organic social media outreach and community building.',
    synonyms: ['Plan', 'Tactic', 'Approach', 'Scheme'],
    antonyms: []
  },
  {
    id: 'v-18',
    word: 'Collaborate',
    ipa: '/kəˈlæb.ə.reɪt/',
    partOfSpeech: 'Verb',
    category: 'business',
    meaning: 'To work jointly on an activity or project to create or achieve something.',
    example: 'Engineers and designers collaborate closely throughout the product development cycle.',
    synonyms: ['Cooperate', 'Team up', 'Work together', 'Partner'],
    antonyms: ['Compete', 'Oppose']
  },

  // ==================== TRAVEL ====================
  {
    id: 'v-19',
    word: 'Itinerary',
    ipa: '/aɪˈtɪn.ər.ər.i/',
    partOfSpeech: 'Noun',
    category: 'travel',
    meaning: 'A planned route or journey; a travel timetable listing destinations.',
    example: 'Our vacation itinerary includes visits to Mysuru Palace, Chamundi Hills, and Brindavan Gardens.',
    synonyms: ['Schedule', 'Travel plan', 'Route', 'Program'],
    antonyms: []
  },
  {
    id: 'v-20',
    word: 'Picturesque',
    ipa: '/ˌpɪk.tʃərˈesk/',
    partOfSpeech: 'Adjective',
    category: 'travel',
    meaning: 'Visually attractive, especially in a quaint, charming, or scenic way.',
    example: 'We stayed in a picturesque hill station surrounded by lush tea plantations.',
    synonyms: ['Scenic', 'Charming', 'Photogenic', 'Beautiful'],
    antonyms: ['Drab', 'Bleak', 'Unsightly']
  },
  {
    id: 'v-21',
    word: 'Hospitality',
    ipa: '/ˌhɒs.pɪˈtæl.ə.ti/',
    partOfSpeech: 'Noun',
    category: 'travel',
    meaning: 'The friendly and generous reception and entertainment of guests, visitors, or strangers.',
    example: 'The locals in Tumakuru welcomed the visitors with warm and gracious hospitality.',
    synonyms: ['Warmth', 'Welcomeness', 'Friendliness', 'Generosity'],
    antonyms: ['Hostility', 'Coldness']
  },
  {
    id: 'v-22',
    word: 'Souvenir',
    ipa: '/ˌsuː.vənˈɪər/',
    partOfSpeech: 'Noun',
    category: 'travel',
    meaning: 'A thing that is kept as a reminder of a person, place, or event.',
    example: 'He purchased handmade wooden toys as a souvenir from Channapatna.',
    synonyms: ['Memento', 'Keepsake', 'Token', 'Relic'],
    antonyms: []
  },
  {
    id: 'v-23',
    word: 'Excursion',
    ipa: '/ɪkˈskɜː.ʃən/',
    partOfSpeech: 'Noun',
    category: 'travel',
    meaning: 'A short journey or trip, especially one taken as a leisure activity.',
    example: 'The college organized a weekend excursion to a nearby nature reserve.',
    synonyms: ['Trip', 'Outing', 'Jaunt', 'Expedition'],
    antonyms: []
  },
  {
    id: 'v-24',
    word: 'Navigate',
    ipa: '/ˈnæv.ɪ.ɡeɪt/',
    partOfSpeech: 'Verb',
    category: 'travel',
    meaning: 'To plan and direct the course of a journey; to find one\'s way through an unfamiliar area.',
    example: 'Using a digital map made it easy to navigate through the crowded city streets.',
    synonyms: ['Steer', 'Guide', 'Traverse', 'Chart'],
    antonyms: []
  },

  // ==================== TECHNOLOGY ====================
  {
    id: 'v-25',
    word: 'Algorithm',
    ipa: '/ˈæl.ɡə.rɪ.ðəm/',
    partOfSpeech: 'Noun',
    category: 'technology',
    meaning: 'A process or set of rules followed in calculations or problem-solving operations by a computer.',
    example: 'The recommendation algorithm suggests lessons based on your past quiz scores.',
    synonyms: ['Procedure', 'Formula', 'Protocol', 'Routine'],
    antonyms: []
  },
  {
    id: 'v-26',
    word: 'Autonomous',
    ipa: '/ɔːˈtɒn.ə.məs/',
    partOfSpeech: 'Adjective',
    category: 'technology',
    meaning: 'Acting independently or having the freedom to do so without external control.',
    example: 'Self-driving vehicles use sensors and autonomous software to navigate safely.',
    synonyms: ['Independent', 'Self-governing', 'Self-operating'],
    antonyms: ['Dependent', 'Subservient', 'Manual']
  },
  {
    id: 'v-27',
    word: 'Interface',
    ipa: '/ˈɪn.tə.feɪs/',
    partOfSpeech: 'Noun',
    category: 'technology',
    meaning: 'A point where two systems, subjects, or organizations meet and interact, especially a user screen.',
    example: 'The learning platform features a sleek, user-friendly interface with dark mode.',
    synonyms: ['UI', 'Front-end', 'Boundary', 'Dashboard'],
    antonyms: []
  },
  {
    id: 'v-28',
    word: 'Innovate',
    ipa: '/ˈɪn.ə.veɪt/',
    partOfSpeech: 'Verb',
    category: 'technology',
    meaning: 'To make changes in something established, especially by introducing new methods or ideas.',
    example: 'Technology companies must constantly innovate to solve modern challenges.',
    synonyms: ['Pioneer', 'Modernize', 'Revolutionize', 'Create'],
    antonyms: ['Stagnate']
  },
  {
    id: 'v-29',
    word: 'Encryption',
    ipa: '/ɪnˈkrɪp.ʃən/',
    partOfSpeech: 'Noun',
    category: 'technology',
    meaning: 'The process of converting information or data into a code, especially to prevent unauthorized access.',
    example: 'End-to-end encryption safeguards user passwords and personal data.',
    synonyms: ['Ciphering', 'Encoding', 'Protection', 'Cryptography'],
    antonyms: ['Decryption', 'Decoding']
  },
  {
    id: 'v-30',
    word: 'Scalable',
    ipa: '/ˈskeɪ.lə.bəl/',
    partOfSpeech: 'Adjective',
    category: 'technology',
    meaning: 'Able to be scaled or adjusted in size, quantity, or capacity to handle growth.',
    example: 'Cloud computing allows developers to build scalable web applications.',
    synonyms: ['Expandable', 'Adaptable', 'Flexible'],
    antonyms: ['Fixed', 'Rigid', 'Unadaptable']
  },

  // ==================== FOOD & DINING ====================
  {
    id: 'v-31',
    word: 'Delicious',
    ipa: '/dɪˈlɪʃ.əs/',
    partOfSpeech: 'Adjective',
    category: 'food',
    meaning: 'Highly pleasant to the taste or smell; flavorful and enjoyable.',
    example: 'The freshly made South Indian masala dosa was incredibly delicious.',
    synonyms: ['Scrumptious', 'Delectable', 'Tasty', 'Mouthwatering'],
    antonyms: ['Distasteful', 'Bland', 'Unpalatable']
  },
  {
    id: 'v-32',
    word: 'Nutritious',
    ipa: '/njuːˈtrɪʃ.əs/',
    partOfSpeech: 'Adjective',
    category: 'food',
    meaning: 'Nourishing; efficient as food; providing essential vitamins and minerals.',
    example: 'A balanced diet includes fresh fruits, green vegetables, and nutritious grains.',
    synonyms: ['Nourishing', 'Wholesome', 'Healthy', 'Nutrient-rich'],
    antonyms: ['Unhealthy', 'Junk', 'Nutrient-deficient']
  },
  {
    id: 'v-33',
    word: 'Culinary',
    ipa: '/ˈkʌl.ɪ.nər.i/',
    partOfSpeech: 'Adjective',
    category: 'food',
    meaning: 'Of or for cooking; related to the kitchen or cookery arts.',
    example: 'The chef displayed exquisite culinary expertise during the cooking competition.',
    synonyms: ['Gastronomic', 'Cooking', 'Dietary'],
    antonyms: []
  },
  {
    id: 'v-34',
    word: 'Appetite',
    ipa: '/ˈæp.ə.taɪt/',
    partOfSpeech: 'Noun',
    category: 'food',
    meaning: 'A natural desire to satisfy a bodily need, especially for food.',
    example: 'A vigorous morning workout will give you a hearty appetite for breakfast.',
    synonyms: ['Hunger', 'Craving', 'Desire', 'Taste'],
    antonyms: ['Fullness', 'Satiety', 'Revulsion']
  },
  {
    id: 'v-35',
    word: 'Aromatic',
    ipa: '/ˌær.əˈmæt.ɪk/',
    partOfSpeech: 'Adjective',
    category: 'food',
    meaning: 'Having a pleasant and distinctive smell; fragrant.',
    example: 'The kitchen was filled with the aromatic fragrance of cardamom and cloves.',
    synonyms: ['Fragrant', 'Scented', 'Perfumed', 'Sweet-smelling'],
    antonyms: ['Malodorous', 'Smelly', 'Odorless']
  },
  {
    id: 'v-36',
    word: 'Gourmet',
    ipa: '/ˈɡɔː.meɪ/',
    partOfSpeech: 'Noun / Adjective',
    category: 'food',
    meaning: 'A connoisseur of good food; high quality, gourmet preparation.',
    example: 'They enjoyed a gourmet multi-course dinner prepared by an award-winning chef.',
    synonyms: ['Epicurean', 'Fine dining', 'Artisanal', 'Deluxe'],
    antonyms: ['Basic', 'Fast food']
  },

  // ==================== COMMON VERBS ====================
  {
    id: 'v-37',
    word: 'Demonstrate',
    ipa: '/ˈdem.ən.streɪt/',
    partOfSpeech: 'Verb',
    category: 'common-verbs',
    meaning: 'Clearly show the existence or truth of something by giving proof or evidence.',
    example: 'The experiment was designed to demonstrate the laws of motion.',
    synonyms: ['Show', 'Exemplify', 'Prove', 'Illustrate'],
    antonyms: ['Conceal', 'Disprove', 'Hide']
  },
  {
    id: 'v-38',
    word: 'Enhance',
    ipa: '/ɪnˈhɑːns/',
    partOfSpeech: 'Verb',
    category: 'common-verbs',
    meaning: 'Intensify, increase, or further improve the quality, value, or extent of.',
    example: 'Reading books regularly will enhance your vocabulary and writing style.',
    synonyms: ['Improve', 'Augment', 'Elevate', 'Boost'],
    antonyms: ['Diminish', 'Worsen', 'Degrade']
  },
  {
    id: 'v-39',
    word: 'Accomplish',
    ipa: '/əˈkʌm.plɪʃ/',
    partOfSpeech: 'Verb',
    category: 'common-verbs',
    meaning: 'Achieve or complete successfully; fulfill a goal.',
    example: 'With persistent determination, you can accomplish your career dreams.',
    synonyms: ['Achieve', 'Fulfill', 'Attain', 'Realize'],
    antonyms: ['Fail', 'Abandon', 'Give up']
  },
  {
    id: 'v-40',
    word: 'Persevere',
    ipa: '/ˌpɜː.sɪˈvɪər/',
    partOfSpeech: 'Verb',
    category: 'common-verbs',
    meaning: 'Continue in a course of action even in the face of difficulty or with little prospect of success.',
    example: 'Even when grammar rules seemed complex, she chose to persevere and practice daily.',
    synonyms: ['Persist', 'Endure', 'Hold out', 'Carry on'],
    antonyms: ['Quit', 'Surrender', 'Give up']
  },
  {
    id: 'v-41',
    word: 'Analyze',
    ipa: '/ˈæn.əl.aɪz/',
    partOfSpeech: 'Verb',
    category: 'common-verbs',
    meaning: 'Examine methodically and in detail the constitution or structure of something.',
    example: 'The AI assistant will analyze your sentence structure and highlight errors.',
    synonyms: ['Examine', 'Evaluate', 'Inspect', 'Scrutinize'],
    antonyms: ['Overlook', 'Ignore']
  },
  {
    id: 'v-42',
    word: 'Articulate',
    ipa: '/ɑːˈtɪk.jə.leɪt/',
    partOfSpeech: 'Verb',
    category: 'common-verbs',
    meaning: 'Express an idea or feeling fluently and coherently.',
    example: 'He was able to articulate his vision clearly to the interview panel.',
    synonyms: ['Express', 'Voice', 'Pronounce', 'Enunciate'],
    antonyms: ['Mumble', 'Suppress']
  },
  {
    id: 'v-43',
    word: 'Facilitate',
    ipa: '/fəˈsɪl.ɪ.teɪt/',
    partOfSpeech: 'Verb',
    category: 'common-verbs',
    meaning: 'Make an action or process easy or easier.',
    example: 'Interactive grammar quizzes facilitate faster and deeper language retention.',
    synonyms: ['Enable', 'Assist', 'Expedite', 'Simplify'],
    antonyms: ['Hinder', 'Obstruct', 'Impede']
  },

  // ==================== COMMON ADJECTIVES ====================
  {
    id: 'v-44',
    word: 'Eloquent',
    ipa: '/ˈel.ə.kwənt/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Fluent or persuasive in speaking or writing.',
    example: 'Her eloquent speech on environmental sustainability received a standing ovation.',
    synonyms: ['Fluent', 'Articulate', 'Expressive', 'Persuasive'],
    antonyms: ['Inarticulate', 'Hesitant', 'Stammering']
  },
  {
    id: 'v-45',
    word: 'Meticulous',
    ipa: '/məˈtɪk.jə.ləs/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Showing great attention to detail; very careful and precise.',
    example: 'The editor paid meticulous attention to punctuation and subject-verb agreement.',
    synonyms: ['Careful', 'Thorough', 'Precise', 'Conscientious'],
    antonyms: ['Careless', 'Sloppy', 'Slapdash']
  },
  {
    id: 'v-46',
    word: 'Resilient',
    ipa: '/rɪˈzɪl.jənt/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Able to withstand or recover quickly from difficult conditions or adversity.',
    example: 'Resilient learners treat mistakes as valuable feedback on their path to fluency.',
    synonyms: ['Tough', 'Adaptable', 'Robust', 'Hardy'],
    antonyms: ['Fragile', 'Vulnerable', 'Weak']
  },
  {
    id: 'v-47',
    word: 'Comprehensive',
    ipa: '/ˌkɒm.prɪˈhen.sɪv/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Complete; including or dealing with all or nearly all elements or aspects of something.',
    example: 'The website provides a comprehensive guide to English grammar from beginner to advanced.',
    synonyms: ['Thorough', 'Exhaustive', 'All-inclusive', 'Extensive'],
    antonyms: ['Partial', 'Incomplete', 'Limited']
  },
  {
    id: 'v-48',
    word: 'Ambiguous',
    ipa: '/æmˈbɪɡ.ju.əs/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Open to more than one interpretation; not having one obvious meaning.',
    example: 'Avoid ambiguous phrasing in formal business correspondence to prevent confusion.',
    synonyms: ['Equivocal', 'Unclear', 'Vague', 'Obscure'],
    antonyms: ['Clear', 'Unambiguous', 'Precise', 'Definite']
  },
  {
    id: 'v-49',
    word: 'Profound',
    ipa: '/prəˈfaʊnd/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Very great or intense; having or showing great knowledge or insight.',
    example: 'Reading classic literature had a profound impact on his vocabulary development.',
    synonyms: ['Deep', 'Intense', 'Wise', 'Far-reaching'],
    antonyms: ['Superficial', 'Shallow', 'Mild']
  },
  {
    id: 'v-50',
    word: 'Versatile',
    ipa: '/ˈvɜː.sə.taɪl/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Able to adapt or be adapted to many different functions or activities.',
    example: 'English is a remarkably versatile language used across global science, arts, and commerce.',
    synonyms: ['Adaptable', 'Multifaceted', 'Flexible', 'All-around'],
    antonyms: ['Inflexible', 'Limited', 'Single-purpose']
  },
  {
    id: 'v-51',
    word: 'Concise',
    ipa: '/kənˈsaɪs/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Giving a lot of information clearly and in a few words; brief but comprehensive.',
    example: 'A concise grammar rule is much easier for beginners to memorize and apply.',
    synonyms: ['Succinct', 'Pithy', 'Brief', 'Compact'],
    antonyms: ['Wordy', 'Verbose', 'Prolix', 'Rambling']
  },
  {
    id: 'v-52',
    word: 'Pragmatic',
    ipa: '/præɡˈmæt.ɪk/',
    partOfSpeech: 'Adjective',
    category: 'common-adjectives',
    meaning: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.',
    example: 'He adopted a pragmatic approach to language learning by focusing on conversational fluency first.',
    synonyms: ['Practical', 'Realistic', 'Sensible', 'Hard-headed'],
    antonyms: ['Idealistic', 'Impractical', 'Theoretical']
  }
];
