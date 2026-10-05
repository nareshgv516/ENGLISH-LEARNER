# GrammarLearner AI — Modern Interactive English Learning Platform

> **"Learn English. Practice Daily. Improve Forever."**

GrammarLearner AI is a full-featured, modern, and responsive educational web application engineered to guide students from foundational grammar to advanced academic and professional English fluency.

---

## 🌟 Key Features

1. **Structured Learning Roadmap (4 User Levels)**
   - **Beginner**: Alphabet & basics, nouns, pronouns, present simple, articles, prepositions.
   - **Elementary**: Past simple, continuous, future forms, comparatives, conjunctions.
   - **Intermediate**: Present & past perfect, modals, conditionals (0, 1, 2, 3), passive voice, reported speech, gerunds & infinitives.
   - **Advanced**: Complex & compound-complex clauses, inversion for emphasis, advanced punctuation (semicolons, colons, dashes), subjunctive mood.

2. **24 Comprehensive Grammar Lessons**
   - Core grammatical explanation with visual highlights
   - Mathematical formula boxes (e.g. `Subject + Base Verb (+s/es) + Object`)
   - Real-life contextual examples
   - Sentence variation tables (Positive, Negative, Questions)
   - Common mistakes callouts (❌ Wrong vs ✅ Correct with linguistic rationale)
   - Interactive *Check Your Understanding* mini-practice with instant XP

3. **Interactive Practice Hub (5 Question Types)**
   - **Multiple Choice**: Instant feedback, rule explanation, and score update
   - **Fill in the Blank**: Real-time text validation
   - **Sentence Correction**: Error detection and re-writing
   - **Rearrange Sentence**: Word tile ordering engine
   - **True / False**: Grammar concept verification

4. **Timed Quiz Engine**
   - Difficulty tiers: *Easy*, *Medium*, *Hard*
   - Length options: *10*, *20*, or *30* Questions
   - Live timer and progress bar
   - Animated celebratory score evaluation (Total, Correct, Wrong, %, XP, Time)
   - Answer review mode with complete explanations

5. **Daily Grammar Challenge**
   - 5 Grammar questions
   - 5 Vocabulary questions
   - 1 Sentence correction
   - 1 Mini writing reflection
   - Streak tracking (e.g. 🔥 7 Day Streak) with +50 XP bonus

6. **Vocabulary Builder (50+ Curated Words)**
   - Categories: Daily English, Education, Business, Travel, Technology, Food, Common Verbs, Common Adjectives
   - Definition, IPA phonetics, example sentences, synonyms, and antonyms
   - 🔊 Native browser speech synthesis audio playback for all words

7. **Pronunciation Practice**
   - Web Speech API integration (`speechSynthesis` + `webkitSpeechRecognition`)
   - Live microphone recording with audio wave animation
   - Accuracy percentage score and phonetic pronunciation tips
   - Friendly microphone permission error handling

8. **AI Grammar Assistant**
   - Instant multi-mode sentence analysis:
     - 🔍 *Check Grammar*
     - 💡 *Explain Mistake*
     - 🪄 *Improve Sentence*
     - 🛡️ *Make It Formal*
     - ✨ *Make It Simple*
   - Built-in heuristic grammar analyzer + pluggable backend AI API via `VITE_AI_API_URL`

9. **Writing Practice ("Improve Your Writing")**
   - 8 topics: *My College, My Family, My Favourite Food, My Daily Routine, My Hometown, My Future Career, Technology, Environment*
   - Real-time word count and readability assessment
   - Automated grading rubric: Grammar score, Vocabulary richness, Sentence structure, and constructive suggestions

10. **Gamification & Analytics Dashboard**
    - 5 Progressive Tiers: *Level 1 (Beginner) ➔ Level 2 (Learner) ➔ Level 3 (Grammar Explorer) ➔ Level 4 (Grammar Master) ➔ Level 5 (English Pro)*
    - Circular Progress gauge
    - 12 Unlockable milestone achievements with badges and celebratory confetti
    - Personalized Recommendations: Automatically targets grammar topics where the student made mistakes
    - Global & weekly student leaderboard with podium display

11. **Level Diagnostic Placement Test**
    - 20 calibrated diagnostic questions
    - Benchmarks starting proficiency (*Beginner, Elementary, Intermediate, Advanced*) and prescribes a customized curriculum

12. **Settings & Customization**
    - Profile management
    - Daily question target (10, 20, 30)
    - Dark Mode toggle with persistent storage
    - Synthesized Web Audio UI sound effects
    - Reset progress and simulated authentication

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Vanilla Tailwind CSS with custom design tokens, modern typography (`Plus Jakarta Sans` & `Outfit`), glassmorphism
- **Icons**: Lucide Icons (`lucide-react`)
- **Animation & FX**: Canvas Confetti, Web Audio API chimes, CSS keyframe micro-interactions
- **Speech**: Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)
- **State & Storage**: React Context + LocalStorage persistence

---

## 🚀 Quick Start Guide (VS Code)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```
ENGLISH LEARNER/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                   # Top header, search trigger, badges, theme toggle
│   │   ├── Sidebar.jsx                  # Main navigation sidebar & mobile drawer
│   │   ├── BottomNav.jsx                # Mobile bottom navigation bar
│   │   ├── SearchModal.jsx              # Global instant search modal
│   │   ├── AuthModal.jsx                # Login & signup modal
│   │   ├── CircularProgress.jsx         # Animated SVG circular gauge
│   │   ├── PersonalizedRecommendations.jsx # Smart mistake-based recommendations
│   │   └── Footer.jsx                   # Professional platform footer
│   ├── pages/
│   │   ├── LandingPage.jsx              # Hero, stats, features, 4 levels overview
│   │   ├── DashboardPage.jsx            # Personalized stats, progress, daily goals
│   │   ├── GrammarPage.jsx              # Categorized lessons library with filters
│   │   ├── LessonDetailPage.jsx         # Full lesson: formula, forms, mistakes, mini-quiz
│   │   ├── PracticePage.jsx             # Interactive practice hub (5 question types)
│   │   ├── QuizPage.jsx                 # Timed quiz engine with results & review
│   │   ├── DailyChallengePage.jsx       # 4-segment daily challenge with streak tracking
│   │   ├── VocabularyPage.jsx           # Categorized flashcards with native audio
│   │   ├── PronunciationPage.jsx        # Voice speech recognition practice
│   │   ├── AIAssistantPage.jsx          # AI Grammar Assistant with 5 modes
│   │   ├── WritingPage.jsx              # Paragraph writing analysis with rubric
│   │   ├── ProgressPage.jsx             # Analytics, SVG charts, strong & weak topics
│   │   ├── AchievementsPage.jsx         # Badges & gamification milestones
│   │   ├── LeaderboardPage.jsx          # Student rankings with podium display
│   │   ├── PlacementTestPage.jsx        # 20-question level diagnostic test
│   │   └── SettingsPage.jsx             # Preferences, daily target, dark mode, reset
│   ├── data/
│   │   ├── grammarLessons.js            # 24 structured lessons across 11 categories
│   │   ├── practiceQuestions.js         # 100+ questions across 5 formats
│   │   ├── vocabularyData.js            # 52 curated words across 8 categories
│   │   ├── dailyChallenges.js           # 7 daily challenge sets
│   │   ├── achievementsData.js          # 12 gamification badges & conditions
│   │   ├── placementTestData.js         # 20 diagnostic placement questions
│   │   ├── writingPrompts.js            # 8 writing topics with guidance
│   │   └── leaderboardData.js           # Sample student ranking dataset
│   ├── services/
│   │   ├── soundService.js              # Synthesized Web Audio UI sound effects
│   │   ├── speechService.js             # TTS audio playback & speech recognition
│   │   ├── aiGrammarService.js          # Heuristic grammar checker + AI API adapter
│   │   └── writingAnalysisService.js    # Paragraph scoring & feedback algorithm
│   ├── context/
│   │   └── LearningContext.jsx          # Central state & LocalStorage persistence
│   ├── App.jsx                          # App orchestrator & navigation routing
│   ├── index.css                        # Tailwind directives & design tokens
│   └── main.jsx                         # Application entry point
├── package.json
├── tailwind.config.js
└── README.md
```
