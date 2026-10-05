import React from 'react';
import { Sparkles, Heart, Mail, Globe, Shield, BookOpen, Compass } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-sky-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-black font-display text-xl text-white">
                GrammarLearner <span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Learn English. Practice Daily. Improve Forever. A modern interactive EdTech platform engineered to guide students from foundational grammar to advanced academic fluency.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                ESL & Academic Ready
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand-950 text-brand-400 border border-brand-800 font-semibold">
                AI Powered
              </span>
            </div>
          </div>

          {/* Grammar Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Grammar Topics
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('grammar')} className="hover:text-white transition-colors">
                  Present & Past Tenses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('grammar')} className="hover:text-white transition-colors">
                  Subject-Verb Agreement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('grammar')} className="hover:text-white transition-colors">
                  Conditionals (0, 1, 2, 3)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('grammar')} className="hover:text-white transition-colors">
                  Passive & Active Voice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('grammar')} className="hover:text-white transition-colors">
                  Reported Speech
                </button>
              </li>
            </ul>
          </div>

          {/* Practice Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Interactive Practice
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-white transition-colors">
                  Multiple Choice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-white transition-colors">
                  Sentence Correction
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-white transition-colors">
                  Rearrange Words
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-white transition-colors">
                  Timed Quiz Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('daily-challenge')} className="hover:text-white transition-colors">
                  Daily Challenge 🔥
                </button>
              </li>
            </ul>
          </div>

          {/* Vocabulary & Voice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Vocabulary & Speech
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('vocabulary')} className="hover:text-white transition-colors">
                  Word Flashcards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vocabulary')} className="hover:text-white transition-colors">
                  IPA Pronunciation Audio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pronunciation')} className="hover:text-white transition-colors">
                  Microphone Speech Test
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('writing')} className="hover:text-white transition-colors">
                  Essay Writing Feedback
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-assistant')} className="hover:text-white transition-colors">
                  AI Grammar Checker
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Help & Placement
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('placement-test')} className="hover:text-white transition-colors font-semibold text-brand-400">
                  Take Level Test
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('leaderboard')} className="hover:text-white transition-colors">
                  Student Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('progress')} className="hover:text-white transition-colors">
                  Learning Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('settings')} className="hover:text-white transition-colors">
                  Preferences & Dark Mode
                </button>
              </li>
              <li>
                <span className="text-slate-500">support@grammarlearner.ai</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GrammarLearner AI. All rights reserved. Crafted for English language learners worldwide.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
