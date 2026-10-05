import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  RotateCcw, 
  ArrowRight,
  Send,
  Wand2,
  FileCheck,
  Shield,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { aiGrammarService } from '../services/aiGrammarService';

export const AIAssistantPage = () => {
  const [inputText, setInputText] = useState('He go to school yesterday.');
  const [activeMode, setActiveMode] = useState('check');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Quick preset sentences
  const sampleSentences = [
    'He go to school yesterday.',
    'She don\'t like coffee in the morning.',
    'Although he worked hard, but he failed.',
    'Me and Suresh went to Bangalore for the weekend.',
    'She gave me many valuable advices.',
    'I am agree with your proposal.'
  ];

  const handleProcess = async (mode) => {
    setActiveMode(mode);
    setIsLoading(true);
    setCopied(false);

    try {
      const result = await aiGrammarService.processSentence(inputText, mode);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-wider">
              Smart Assistant
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Engine Online
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
            AI Grammar Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time sentence correction, grammatical rationale, stylistic enhancement, and tone adaptation
          </p>
        </div>

        {/* Backend status indicator */}
        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">AI Integration</span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {import.meta.env.VITE_AI_API_URL ? 'Custom AI API Connected' : 'Smart Heuristic Engine'}
          </span>
        </div>
      </div>

      {/* Main Text Input Box */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Write a sentence here...
        </label>

        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste any English sentence you wish to evaluate..."
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
        />

        {/* Quick Sample Sentence Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Try a common mistake sample:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleSentences.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(sample)}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950 dark:hover:text-purple-300 transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* THE 5 ACTION BUTTONS */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => handleProcess('check')}
              disabled={isLoading || !inputText.trim()}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 btn-press ${
                activeMode === 'check'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Check Grammar</span>
            </button>

            <button
              onClick={() => handleProcess('explain')}
              disabled={isLoading || !inputText.trim()}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 btn-press ${
                activeMode === 'explain'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Explain Mistake</span>
            </button>

            <button
              onClick={() => handleProcess('improve')}
              disabled={isLoading || !inputText.trim()}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 btn-press ${
                activeMode === 'improve'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Improve Sentence</span>
            </button>

            <button
              onClick={() => handleProcess('formal')}
              disabled={isLoading || !inputText.trim()}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 btn-press ${
                activeMode === 'formal'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Make It Formal</span>
            </button>

            <button
              onClick={() => handleProcess('simple')}
              disabled={isLoading || !inputText.trim()}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 btn-press ${
                activeMode === 'simple'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Make It Simple</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="p-8 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 space-y-3">
          <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">
            Synthesizing grammatical rules & linguistic structures...
          </p>
        </div>
      )}

      {/* ANALYSIS RESULT DISPLAY */}
      {analysisResult && !isLoading && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6 animate-fadeIn">
          {/* Top Status Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Assistant Analysis Output
                </h3>
                <span className="text-[11px] text-slate-400 font-semibold capitalize">
                  Mode: {analysisResult.mode || activeMode}
                </span>
              </div>
            </div>

            {analysisResult.isCorrect !== undefined && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                analysisResult.isCorrect 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200'
              }`}>
                {analysisResult.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                <span>{analysisResult.isCorrect ? '✅ Correct' : '❌ Incorrect'}</span>
              </span>
            )}
          </div>

          {/* Corrected or Modified Sentence Box */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {activeMode === 'formal' ? 'Formal Academic Version' : activeMode === 'simple' ? 'Plain English Version' : activeMode === 'improve' ? 'Enhanced High-Impact Version' : 'Correct Sentence'}
              </span>
              <button
                onClick={() => handleCopy(analysisResult.formalSentence || analysisResult.simpleSentence || analysisResult.enhancedSentence || analysisResult.corrected)}
                className="text-xs font-semibold text-slate-500 hover:text-purple-600 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {analysisResult.formalSentence || analysisResult.simpleSentence || analysisResult.enhancedSentence || analysisResult.corrected}
            </p>
          </div>

          {/* Detailed Explanation */}
          <div className="space-y-2 text-xs sm:text-sm">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Linguistic Explanation:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-5 whitespace-pre-line">
              {analysisResult.explanation}
            </p>
          </div>

          {/* Detected mistakes list if any */}
          {analysisResult.mistakes && analysisResult.mistakes.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                Breakdown of Identified Issues:
              </span>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {analysisResult.mistakes.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      <strong className="text-slate-900 dark:text-white">{m.type}:</strong> Replaced "{m.wrong}" with "{m.correct}". {m.explanation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stylistic notes for improve/formal/simple */}
          {(analysisResult.improvementsMade || analysisResult.changes) && (
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 text-xs space-y-1">
              <span className="font-bold text-purple-900 dark:text-purple-300">Stylistic Refinements:</span>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                {(analysisResult.improvementsMade || analysisResult.changes).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
