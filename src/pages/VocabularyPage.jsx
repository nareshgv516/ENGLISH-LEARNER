import React, { useState } from 'react';
import { 
  Brain, 
  Search, 
  Volume2, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  Layers, 
  List,
  X
} from 'lucide-react';
import { vocabCategories, vocabularyWords } from '../data/vocabularyData';
import { speechService } from '../services/speechService';
import { useLearning } from '../context/LearningContext';

export const VocabularyPage = ({ onNavigate }) => {
  const { masteredVocab, recordVocabMastered } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpeechWord, setActiveSpeechWord] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'list'

  // Filter words
  const filteredWords = vocabularyWords.filter((w) => {
    const matchesCat = selectedCategory === 'all' || w.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = q === '' ||
      w.word.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      (w.example && w.example.toLowerCase().includes(q)) ||
      (w.partOfSpeech && w.partOfSpeech.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const handleSpeak = (text) => {
    setActiveSpeechWord(text);
    speechService.speak(text, { rate: 0.85 });
    setTimeout(() => setActiveSpeechWord(null), 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
            Vocabulary Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Expand your active lexicon with IPA phonetics, clear definitions, context examples, and native audio
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards' 
                  ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-2xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-2xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onNavigate('pronunciation')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>Pronunciation Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, meanings, phonetics..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {vocabCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Items Grid / List */}
      {filteredWords.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200">
          <Brain className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No vocabulary words match your search.
          </h3>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((item) => {
            const isMastered = masteredVocab.includes(item.id);
            const isSpeaking = activeSpeechWord === item.word;

            return (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Word, IPA, Part of Speech, Audio */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                        {item.word}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono text-slate-400 font-medium">
                          {item.ipa}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 uppercase">
                          {item.partOfSpeech}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSpeak(item.word)}
                      title="Listen to native pronunciation"
                      className={`p-2.5 rounded-xl border transition-all ${
                        isSpeaking
                          ? 'bg-brand-500 text-white border-brand-500 scale-110 shadow-glow'
                          : 'border-slate-200 dark:border-slate-800 hover:border-brand-400 text-slate-600 dark:text-slate-300 hover:text-brand-600'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Meaning */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                    <strong>Meaning:</strong> {item.meaning}
                  </p>

                  {/* Example Sentence */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 text-xs italic text-slate-700 dark:text-slate-300">
                    "{item.example}"
                  </div>

                  {/* Synonyms and Antonyms */}
                  <div className="mt-3.5 space-y-1.5 text-xs">
                    {item.synonyms && item.synonyms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-slate-400 font-semibold text-[11px]">Synonyms:</span>
                        {item.synonyms.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.antonyms && item.antonyms.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-slate-400 font-semibold text-[11px]">Antonyms:</span>
                        {item.antonyms.map((a, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-[11px] font-medium">
                            {a}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleSpeak(item.example)}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen sentence</span>
                  </button>

                  <button
                    onClick={() => recordVocabMastered(item.id)}
                    disabled={isMastered}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      isMastered 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode View */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          {filteredWords.map((item) => (
            <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {item.word}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {item.ipa}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-600 uppercase">
                    {item.partOfSpeech}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                  {item.meaning}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak(item.word)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => recordVocabMastered(item.id)}
                  disabled={masteredVocab.includes(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    masteredVocab.includes(item.id) 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-brand-600 text-white'
                  }`}
                >
                  {masteredVocab.includes(item.id) ? 'Mastered' : 'Mark Mastered'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
