import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Compass, 
  GitFork, 
  Search, 
  Copy, 
  Check, 
  HelpCircle,
  Layers,
  ArrowRight,
  Volume2,
  Lightbulb,
  AlertTriangle,
  Brain,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { speechService } from '../services/speechService';

export const GrammarCheatSheetModal = ({ isOpen, onClose, onSelectLesson }) => {
  const [activeTab, setActiveTab] = useState('tenses'); // 'tenses' | 'irregular' | 'prepositions' | 'conditionals' | 'keypoints'
  const [verbSearch, setVerbSearch] = useState('');
  const [copiedFormula, setCopiedFormula] = useState(null);
  const [speakingText, setSpeakingText] = useState(null);
  const [keyPointsCategory, setKeyPointsCategory] = useState('rules'); // 'rules' | 'mnemonics' | 'fixes'

  if (!isOpen) return null;

  const handleCopy = (formula, id) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(id);
    setTimeout(() => setCopiedFormula(null), 1800);
  };

  const handleSpeak = (text) => {
    if (!text) return;
    setSpeakingText(text);
    speechService.speak(text, {
      rate: 0.9,
      onEnd: () => setSpeakingText(null),
      onError: () => setSpeakingText(null)
    });
  };

  // 12 English Tenses Data
  const tensesMatrix = [
    {
      id: 'ps',
      name: 'Present Simple',
      time: 'Present',
      formula: 'S + V1 (s/es) + O',
      signals: 'always, usually, often, every day, rarely, never',
      example: 'The Earth revolves around the sun.',
      lessonId: 'present-simple'
    },
    {
      id: 'pc',
      name: 'Present Continuous',
      time: 'Present',
      formula: 'S + is/am/are + V-ing + O',
      signals: 'now, right now, at the moment, currently, look!',
      example: 'She is preparing an AI research paper right now.',
      lessonId: 'present-continuous'
    },
    {
      id: 'pp',
      name: 'Present Perfect',
      time: 'Present',
      formula: 'S + has/have + V3 + O',
      signals: 'already, just, yet, ever, never, since, for, so far',
      example: 'They have completed four grammar modules today.',
      lessonId: 'present-perfect'
    },
    {
      id: 'ppc',
      name: 'Present Perfect Continuous',
      time: 'Present',
      formula: 'S + has/have + been + V-ing + O',
      signals: 'for 2 hours, since morning, all day, lately',
      example: 'Ravi has been coding this application since 8 AM.',
      lessonId: 'present-perfect'
    },
    {
      id: 'pas',
      name: 'Past Simple',
      time: 'Past',
      formula: 'S + V2 (ed/irregular) + O',
      signals: 'yesterday, last night, 2 days ago, in 2020, then',
      example: 'Dr. Watson arrived in London yesterday afternoon.',
      lessonId: 'past-simple'
    },
    {
      id: 'pac',
      name: 'Past Continuous',
      time: 'Past',
      formula: 'S + was/were + V-ing + O',
      signals: 'while, as, at 7 PM yesterday, when',
      example: 'We were discussing the budget when the lights flickered.',
      lessonId: 'past-continuous'
    },
    {
      id: 'pap',
      name: 'Past Perfect',
      time: 'Past',
      formula: 'S + had + V3 + O',
      signals: 'before, after, by the time, already, prior to',
      example: 'The train had departed before we reached the platform.',
      lessonId: 'past-perfect'
    },
    {
      id: 'papc',
      name: 'Past Perfect Continuous',
      time: 'Past',
      formula: 'S + had + been + V-ing + O',
      signals: 'for 3 hours before, since morning until',
      example: 'They had been hiking for six hours before finding the lodge.',
      lessonId: 'past-perfect'
    },
    {
      id: 'fs',
      name: 'Future Simple (Will / Be Going To)',
      time: 'Future',
      formula: 'S + will + V1 + O  /  S + am/is/are going to + V1',
      signals: 'tomorrow, next week, soon, in 2 days, probably',
      example: 'The team will release the updated build tomorrow morning.',
      lessonId: 'future-tenses'
    },
    {
      id: 'fc',
      name: 'Future Continuous',
      time: 'Future',
      formula: 'S + will + be + V-ing + O',
      signals: 'at this time tomorrow, this time next week',
      example: 'At 10 AM tomorrow, she will be presenting to the board.',
      lessonId: 'future-tenses'
    },
    {
      id: 'fp',
      name: 'Future Perfect',
      time: 'Future',
      formula: 'S + will + have + V3 + O',
      signals: 'by tomorrow, by 2030, by the end of next month',
      example: 'By December, we will have graduated from university.',
      lessonId: 'future-tenses'
    },
    {
      id: 'fpc',
      name: 'Future Perfect Continuous',
      time: 'Future',
      formula: 'S + will + have + been + V-ing + O',
      signals: 'by next month for 5 years',
      example: 'By next July, he will have been teaching here for 10 years.',
      lessonId: 'future-tenses'
    }
  ];

  // Irregular Verbs List
  const irregularVerbs = [
    { v1: 'arise', v2: 'arose', v3: 'arisen', meaning: 'to emerge or begin' },
    { v1: 'be (am/is/are)', v2: 'was / were', v3: 'been', meaning: 'to exist' },
    { v1: 'become', v2: 'became', v3: 'become', meaning: 'to develop into' },
    { v1: 'begin', v2: 'began', v3: 'begun', meaning: 'to start' },
    { v1: 'break', v2: 'broke', v3: 'broken', meaning: 'to fracture or pause' },
    { v1: 'bring', v2: 'brought', v3: 'brought', meaning: 'to carry toward' },
    { v1: 'build', v2: 'built', v3: 'built', meaning: 'to construct' },
    { v1: 'buy', v2: 'bought', v3: 'bought', meaning: 'to purchase' },
    { v1: 'catch', v2: 'caught', v3: 'caught', meaning: 'to capture' },
    { v1: 'choose', v2: 'chose', v3: 'chosen', meaning: 'to select' },
    { v1: 'come', v2: 'came', v3: 'come', meaning: 'to approach' },
    { v1: 'do', v2: 'did', v3: 'done', meaning: 'to perform an action' },
    { v1: 'drive', v2: 'drove', v3: 'driven', meaning: 'to operate a vehicle' },
    { v1: 'eat', v2: 'ate', v3: 'eaten', meaning: 'to consume food' },
    { v1: 'fall', v2: 'fell', v3: 'fallen', meaning: 'to drop down' },
    { v1: 'find', v2: 'found', v3: 'found', meaning: 'to discover' },
    { v1: 'fly', v2: 'flew', v3: 'flown', meaning: 'to move in air' },
    { v1: 'forget', v2: 'forgot', v3: 'forgotten', meaning: 'to fail to recall' },
    { v1: 'give', v2: 'gave', v3: 'given', meaning: 'to transfer' },
    { v1: 'go', v2: 'went', v3: 'gone', meaning: 'to travel' },
    { v1: 'grow', v2: 'grew', v3: 'grown', meaning: 'to expand or mature' },
    { v1: 'have', v2: 'had', v3: 'had', meaning: 'to possess' },
    { v1: 'know', v2: 'knew', v3: 'known', meaning: 'to understand' },
    { v1: 'leave', v2: 'left', v3: 'left', meaning: 'to depart' },
    { v1: 'make', v2: 'made', v3: 'made', meaning: 'to create' },
    { v1: 'run', v2: 'ran', v3: 'run', meaning: 'to sprint' },
    { v1: 'see', v2: 'saw', v3: 'seen', meaning: 'to perceive with eyes' },
    { v1: 'speak', v2: 'spoke', v3: 'spoken', meaning: 'to talk' },
    { v1: 'take', v2: 'took', v3: 'taken', meaning: 'to grasp or accept' },
    { v1: 'write', v2: 'wrote', v3: 'written', meaning: 'to compose text' }
  ];

  const filteredVerbs = irregularVerbs.filter(v => 
    v.v1.toLowerCase().includes(verbSearch.toLowerCase()) ||
    v.v2.toLowerCase().includes(verbSearch.toLowerCase()) ||
    v.v3.toLowerCase().includes(verbSearch.toLowerCase()) ||
    v.meaning.toLowerCase().includes(verbSearch.toLowerCase())
  );

  // Conditionals Summary
  const conditionalsList = [
    {
      type: 'Zero Conditional',
      use: 'Scientific facts, general truths, predictable realities',
      ifClause: 'If / When + Present Simple',
      mainClause: 'Present Simple',
      example: 'If water reaches 100°C, it boils.'
    },
    {
      type: 'First Conditional',
      use: 'Real, likely future possibilities with high probability',
      ifClause: 'If + Present Simple',
      mainClause: 'will / can / may + Base Verb',
      example: 'If you study daily, you will pass the English proficiency test.'
    },
    {
      type: 'Second Conditional',
      use: 'Hypothetical, imaginary, or contrary-to-fact present situations',
      ifClause: 'If + Past Simple (were for all persons)',
      mainClause: 'would / could / might + Base Verb',
      example: 'If I had a million dollars, I would travel across Europe.'
    },
    {
      type: 'Third Conditional',
      use: 'Unreal past situations and unchangeable past regrets',
      ifClause: 'If + Past Perfect (had + V3)',
      mainClause: 'would have + Past Participle (V3)',
      example: 'If we had left ten minutes earlier, we would not have missed the flight.'
    },
    {
      type: 'Mixed Conditional',
      use: 'Past unperformed action that affects the current present state',
      ifClause: 'If + Past Perfect (had + V3)',
      mainClause: 'would + Base Verb (Present)',
      example: 'If I had taken that engineering job, I would be living in Tokyo now.'
    }
  ];

  // 10 Golden Rules to Learn Grammar Easily
  const goldenRules = [
    {
      id: 'gr-1',
      title: 'The Singular "S" Anchor',
      subtitle: 'Present Simple Agreement',
      rule: 'In Present Simple, only 3rd-person singular (He / She / It / Singular noun) takes an -s/-es on the verb.',
      example: 'He walks to university, but they walk together.',
      tip: 'Remember: Plural NOUNS have "s" (dogs), but Singular VERBS take "s" (barks). A sentence rarely has double -s!'
    },
    {
      id: 'gr-2',
      title: 'The Past Timestamp Rule',
      subtitle: 'Past Simple vs Present Perfect',
      rule: 'If a sentence mentions a FINISHED time point (yesterday, in 2022, 2 hours ago, last night), ALWAYS use Past Simple.',
      example: 'I met him yesterday. (NOT: *I have met him yesterday.)',
      tip: 'Present Perfect has NO specific past timestamp; it connects past action to the present moment.'
    },
    {
      id: 'gr-3',
      title: 'Since vs For Memory Shortcut',
      subtitle: 'Time Expressions',
      rule: 'Use SINCE for a specific starting point in time. Use FOR for a duration or total count of units.',
      example: 'Living here SINCE 2018 (point) vs FOR 6 years (duration).',
      tip: 'Ask: "Can I count the number of days/hours?" If yes, use FOR!'
    },
    {
      id: 'gr-4',
      title: 'Few vs A Few / Little vs A Little',
      subtitle: 'Positive vs Negative Nuance',
      rule: '"A" adds positivity! "A few" / "A little" = some (enough). Without "A" ("few" / "little") = almost none (negative deficit).',
      example: 'I have a few friends (good, I am happy) vs I have few friends (sad, lonely).',
      tip: 'FEW is for countable nouns (apples, books); LITTLE is for uncountable nouns (water, money).'
    },
    {
      id: 'gr-5',
      title: 'Active vs Passive Question Test',
      subtitle: 'Voice & Focus',
      rule: 'Ask: "Who is doing the action?" If the actor is upfront, it is ACTIVE. If the receiver is upfront, it is PASSIVE.',
      example: 'Active: Alexander Fleming discovered penicillin. Passive: Penicillin was discovered by Alexander Fleming.',
      tip: 'Use passive when the actor is unknown, obvious, or unimportant.'
    },
    {
      id: 'gr-6',
      title: 'Preposition Pronoun Case',
      subtitle: 'Object Pronoun Rule',
      rule: 'Prepositions (between, for, with, to, about) must ALWAYS be followed by Object Pronouns (me, him, her, us, them).',
      example: 'This conversation is between you and ME. (NEVER: *between you and I)',
      tip: 'Test by dropping "you and": You wouldn\'t say "This is for I", you say "This is for ME"!'
    },
    {
      id: 'gr-7',
      title: 'Indefinite Pronouns are Singular',
      subtitle: 'Subject-Verb Agreement',
      rule: 'Everyone, everybody, somebody, nobody, anyone, each, and neither ALWAYS take a singular verb.',
      example: 'Everyone HAS a goal. (NOT: *Everyone have a goal.)',
      tip: 'Think of "Every-ONE" as focusing on each individual ONE person at a time.'
    },
    {
      id: 'gr-8',
      title: 'Adjective Order: OSASCOMP Mnemonic',
      subtitle: 'Descriptive Word Order',
      rule: 'When multiple adjectives describe a noun, follow: Opinion → Size → Age → Shape → Color → Origin → Material → Purpose.',
      example: 'A lovely (O) small (S) antique (A) round (S) brown (C) Italian (O) wooden (M) dining (P) table.',
      tip: 'Opinion always comes first, Purpose/Material always hugs the noun!'
    },
    {
      id: 'gr-9',
      title: 'Coordinating Conjunctions: FANBOYS',
      subtitle: 'Compound Sentence Punctuation',
      rule: 'Use a comma before FANBOYS (For, And, Nor, But, Or, Yet, So) when connecting two complete sentences.',
      example: 'She studied diligently for the exam, BUT the power went out.',
      tip: 'If what follows cannot stand alone as a sentence, do not use a comma.'
    },
    {
      id: 'gr-10',
      title: 'The Modal Bare-Verb Rule',
      subtitle: 'Modal Auxiliary Verbs',
      rule: 'Modal verbs (can, could, should, would, must, may, might) are ALWAYS followed directly by a BARE verb (V1 without "to" or "-s").',
      example: 'She must GO now. (NOT: *must to go or *must goes.)',
      tip: 'Modals never change form: no "shoulds", no "canned", and no "to"!'
    }
  ];

  // 12 Common "Never Say vs Always Say" Quick Fixes
  const quickFixes = [
    {
      wrong: 'I have 25 years old.',
      correct: 'I am 25 years old.',
      reason: 'In English, age is a state of being expressed with "to be", not possession with "have".'
    },
    {
      wrong: 'I am agree with your opinion.',
      correct: 'I agree with your opinion.',
      reason: '"Agree" is an active verb, not an adjective. Say "I agree" or "I disagree".'
    },
    {
      wrong: 'She married with a doctor.',
      correct: 'She married a doctor. / She is married to a doctor.',
      reason: 'Use "marry someone" directly, or the passive adjective "married TO someone", never "with".'
    },
    {
      wrong: 'I look forward to meet you.',
      correct: 'I look forward to meeting you.',
      reason: 'In "look forward to", the "to" is a preposition, which requires a gerund (-ing form).'
    },
    {
      wrong: 'He plays tennis very good.',
      correct: 'He plays tennis very well.',
      reason: '"Good" is an adjective describing nouns. "Well" is an adverb describing the action verb plays.'
    },
    {
      wrong: 'Every students was present.',
      correct: 'Every student was present.',
      reason: '"Every" and "Each" must be followed by a singular countable noun and singular verb.'
    },
    {
      wrong: 'She explained me the problem.',
      correct: 'She explained the problem to me.',
      reason: '"Explain" cannot take an indirect personal object directly. You explain something TO someone.'
    },
    {
      wrong: 'Did you went to London?',
      correct: 'Did you go to London?',
      reason: 'The auxiliary "did" already marks past tense. The main verb must stay in its base form (go).'
    },
    {
      wrong: 'I lost the morning bus.',
      correct: 'I missed the morning bus.',
      reason: 'Use "miss" for vehicles, flights, and opportunities. Use "lose" for physical misplaced possessions.'
    },
    {
      wrong: 'Can you give me an advice / many informations?',
      correct: 'Can you give me some advice / much information?',
      reason: '"Advice" and "information" are strictly uncountable nouns. They never take an "s" or "an".'
    },
    {
      wrong: 'Although it rained, but we went out.',
      correct: 'Although it rained, we went out.',
      reason: 'Never use "although" and "but" in the same sentence; choose one connector or the other.'
    },
    {
      wrong: 'I prefer coffee than tea.',
      correct: 'I prefer coffee to tea.',
      reason: 'The comparative verb "prefer" is paired with the preposition "to", not "than".'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600 px-6 pt-5 pb-5 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                Master Reference Sheet
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display">
              Grammar Cheat Sheet & Reference Hub
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('tenses')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'tenses'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>12 Tenses Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('keypoints')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-black border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'keypoints'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Key Points (Learn Easily)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[10px] font-black">
              NEW
            </span>
          </button>

          <button
            onClick={() => setActiveTab('irregular')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'irregular'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Top Irregular Verbs</span>
          </button>

          <button
            onClick={() => setActiveTab('prepositions')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'prepositions'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Prepositions (At / On / In)</span>
          </button>

          <button
            onClick={() => setActiveTab('conditionals')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'conditionals'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>Conditionals Formula Sheet</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">

          {/* TAB: KEY POINTS TO LEARN EASILY */}
          {activeTab === 'keypoints' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Category Filter Pills */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setKeyPointsCategory('rules')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      keyPointsCategory === 'rules'
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    10 Golden Rules (Quick Mastery)
                  </button>
                  <button
                    onClick={() => setKeyPointsCategory('fixes')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      keyPointsCategory === 'fixes'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Never Say vs Always Say (12 Fixes)
                  </button>
                </div>

                <span className="text-[11px] text-slate-400 font-medium">
                  Tap 🔊 to listen to native pronunciation
                </span>
              </div>

              {/* VIEW 1: 10 GOLDEN RULES */}
              {keyPointsCategory === 'rules' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {goldenRules.map((r, idx) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-amber-400 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <h4 className="font-black text-sm text-slate-900 dark:text-white">
                              {r.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleSpeak(r.example)}
                              className={`p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors ${
                                speakingText === r.example ? 'text-amber-600 animate-pulse' : ''
                              }`}
                              title="Listen to example"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleCopy(r.rule, r.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-700 transition-colors"
                              title="Copy rule"
                            >
                              {copiedFormula === r.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          {r.subtitle}
                        </span>

                        <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                          {r.rule}
                        </p>

                        <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Example:</span>
                          <span className="font-mono text-brand-600 dark:text-brand-400">"{r.example}"</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-200 flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span><strong>Shortcut:</strong> {r.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW 2: NEVER SAY VS ALWAYS SAY */}
              {keyPointsCategory === 'fixes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {quickFixes.map((fix, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                          Fix #{idx + 1}
                        </span>
                        <button
                          onClick={() => handleSpeak(fix.correct)}
                          className={`p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors ${
                            speakingText === fix.correct ? 'text-emerald-600 animate-pulse' : ''
                          }`}
                          title="Listen to correct sentence"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1.5 text-xs sm:text-sm">
                        <div className="flex items-start gap-1.5 text-rose-600 dark:text-rose-400 line-through">
                          <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
                          <span>{fix.wrong}</span>
                        </div>
                        <div className="flex items-start gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" />
                          <span>{fix.correct}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <strong className="text-slate-700 dark:text-slate-300">Why?</strong> {fix.reason}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* TAB 1: 12 TENSES MASTER MATRIX */}
          {activeTab === 'tenses' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/40 text-xs text-brand-800 dark:text-brand-200 leading-relaxed">
                💡 <strong>Master Strategy:</strong> English has 3 temporal dimensions (Past, Present, Future) multiplied by 4 action aspects (Simple, Continuous, Perfect, Perfect Continuous). Click any formula to copy or tap <ArrowRight className="inline w-3 h-3" /> to study the full lesson!
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {tensesMatrix.map((t) => (
                  <div 
                    key={t.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-brand-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {t.name}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          t.time === 'Present'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : t.time === 'Past'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                            : 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300'
                        }`}>
                          {t.time}
                        </span>
                      </div>

                      {/* Formula Box (Clickable to copy) */}
                      <button
                        onClick={() => handleCopy(t.formula, t.id)}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800 hover:border-brand-400 group transition-all"
                        title="Click to copy formula"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase mb-1">
                          <span>Positive Formula</span>
                          <span className="flex items-center gap-1 group-hover:text-brand-600 transition-colors">
                            {copiedFormula === t.id ? (
                              <span className="text-emerald-600 font-black flex items-center gap-1">
                                <Check className="w-3 h-3" /> Copied!
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy className="w-3 h-3" /> Copy
                              </span>
                            )}
                          </span>
                        </div>
                        <p className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                          {t.formula}
                        </p>
                      </button>

                      {/* Signal Words */}
                      <div className="mt-2.5 text-xs">
                        <span className="text-slate-400 text-[11px] block font-medium">Keywords / Signals:</span>
                        <p className="text-slate-600 dark:text-slate-300 font-medium italic mt-0.5">
                          {t.signals}
                        </p>
                      </div>

                      {/* Example sentence */}
                      <div className="mt-2 text-xs text-slate-700 dark:text-slate-200 bg-slate-100/50 dark:bg-slate-800/40 p-2 rounded-lg flex items-center justify-between gap-1">
                        <p className="italic">"{t.example}"</p>
                        <button
                          onClick={() => handleSpeak(t.example)}
                          className="p-1 text-slate-400 hover:text-brand-600 shrink-0"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectLesson) onSelectLesson(t.lessonId);
                        }}
                        className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                      >
                        Study Full Lesson <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TOP IRREGULAR VERBS TABLE */}
          {activeTab === 'irregular' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={verbSearch}
                    onChange={(e) => setVerbSearch(e.target.value)}
                    placeholder="Search V1, V2, V3 or meaning..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <span className="text-xs text-slate-400">
                  Showing {filteredVerbs.length} verbs
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3.5">V1 (Base Form)</th>
                        <th className="py-2.5 px-3.5">V2 (Simple Past)</th>
                        <th className="py-2.5 px-3.5">V3 (Past Participle)</th>
                        <th className="py-2.5 px-3.5">Meaning / Use</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredVerbs.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-2 px-3.5 font-bold text-slate-900 dark:text-white flex items-center justify-between">
                            <span>{v.v1}</span>
                            <button
                              onClick={() => handleSpeak(`${v.v1}, ${v.v2}, ${v.v3}`)}
                              className="text-slate-300 hover:text-brand-500 p-0.5"
                              title="Pronounce V1, V2, V3"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </td>
                          <td className="py-2 px-3.5 font-mono text-brand-600 dark:text-brand-400 font-semibold">{v.v2}</td>
                          <td className="py-2 px-3.5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{v.v3}</td>
                          <td className="py-2 px-3.5 text-slate-500 dark:text-slate-400">{v.meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PREPOSITIONS PYRAMID (AT / ON / IN) */}
          {activeTab === 'prepositions' && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  The Prepositions Triangle (Specific to General)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Remember: <strong>AT</strong> is pinpoint, <strong>ON</strong> is surface/days, and <strong>IN</strong> is enclosed space/wide timeframe.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Prepositions of Time */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs space-y-4">
                  <h4 className="font-bold text-sm text-brand-600 dark:text-brand-400 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                    <Clock className="w-4 h-4" /> Prepositions of Time
                  </h4>

                  {/* IN */}
                  <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 text-xs">
                    <span className="font-black text-purple-700 dark:text-purple-300 block mb-1">
                      IN (General, Long Periods)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      Months, Years, Centuries, Seasons: <em>in July, in 2026, in the 21st century, in summer, in the morning</em>
                    </p>
                  </div>

                  {/* ON */}
                  <div className="p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40 text-xs">
                    <span className="font-black text-sky-700 dark:text-sky-300 block mb-1">
                      ON (More Specific, Days & Dates)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      Days of the week, Specific calendar dates: <em>on Monday, on October 1st, on my birthday, on Christmas Day</em>
                    </p>
                  </div>

                  {/* AT */}
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
                    <span className="font-black text-emerald-700 dark:text-emerald-300 block mb-1">
                      AT (Exact Pinpoint Moments)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      Clock times, Precise points: <em>at 5:30 PM, at midnight, at noon, at sunrise, at bedtime</em>
                    </p>
                  </div>
                </div>

                {/* Prepositions of Place */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs space-y-4">
                  <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                    <Compass className="w-4 h-4" /> Prepositions of Place
                  </h4>

                  {/* IN */}
                  <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 text-xs">
                    <span className="font-black text-purple-700 dark:text-purple-300 block mb-1">
                      IN (Enclosed 3D Space, Cities, Countries)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      Countries, Cities, Rooms: <em>in India, in London, in the library, in a car, in a box</em>
                    </p>
                  </div>

                  {/* ON */}
                  <div className="p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40 text-xs">
                    <span className="font-black text-sky-700 dark:text-sky-300 block mb-1">
                      ON (Surfaces, Floors, Streets, Public Transit)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      Streets, Surfaces: <em>on Oxford Street, on the table, on the 3rd floor, on the bus, on the train</em>
                    </p>
                  </div>

                  {/* AT */}
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
                    <span className="font-black text-emerald-700 dark:text-emerald-300 block mb-1">
                      AT (Specific Point, Address, Landmark)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300">
                      Exact address, Point of activity: <em>at 221B Baker Street, at the bus stop, at the entrance, at home</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONDITIONALS FORMULA SHEET */}
          {activeTab === 'conditionals' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/40 text-xs text-brand-800 dark:text-brand-200 leading-relaxed">
                💡 <strong>Conditionals Rule of Thumb:</strong> Notice how the verb tense takes one step back into the past as the situation becomes more hypothetical or unreal!
              </div>

              <div className="space-y-3">
                {conditionalsList.map((c, i) => (
                  <div 
                    key={i}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {c.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-brand-600 dark:text-brand-400">
                        <span className="text-[10px] text-slate-400 block font-sans">IF CLAUSE:</span>
                        {c.ifClause}
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">
                        <span className="text-[10px] text-slate-400 block font-sans">RESULT CLAUSE:</span>
                        {c.mainClause}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 italic pt-1">
                      <p>Example: "{c.example}"</p>
                      <button
                        onClick={() => handleSpeak(c.example)}
                        className="p-1 text-slate-400 hover:text-brand-600"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500">
          <span>Tip: Tap on formulas to copy or 🔊 to hear native pronunciation!</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-300 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
