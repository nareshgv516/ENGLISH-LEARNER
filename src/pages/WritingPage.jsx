import React, { useState } from 'react';
import { 
  FileEdit, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  BookOpen, 
  RotateCcw,
  BarChart2
} from 'lucide-react';
import { writingTopics } from '../data/writingPrompts';
import { analyzeWriting } from '../services/writingAnalysisService';
import { useLearning } from '../context/LearningContext';

export const WritingPage = () => {
  const { recordWritingSubmission } = useLearning();

  const [selectedTopicId, setSelectedTopicId] = useState('my-college');
  const [essayText, setEssayText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const activeTopic = writingTopics.find(t => t.id === selectedTopicId) || writingTopics[0];

  const handleAnalyze = () => {
    if (!essayText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeWriting(essayText, activeTopic);
      setAnalysis(result);
      setIsAnalyzing(false);
      if (result && result.overallScore) {
        recordWritingSubmission(result.overallScore);
      }
    }, 600);
  };

  const handleUseSampleOpening = () => {
    if (activeTopic.sampleOpening) {
      setEssayText(activeTopic.sampleOpening + ' ');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
          Improve Your Writing
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Select a prompt, compose a structured paragraph, and receive instant rubric feedback across grammar, structure, and vocabulary
        </p>
      </div>

      {/* Topic Selector Tabs */}
      <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Select a Writing Prompt:
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {writingTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopicId(topic.id);
                setAnalysis(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors ${
                selectedTopicId === topic.id
                  ? 'bg-brand-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {topic.title}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600">
            {activeTopic.category}
          </span>
          <button
            onClick={handleUseSampleOpening}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Insert sample opening
          </button>
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {activeTopic.prompt}
        </h2>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          <strong>Guidance:</strong> {activeTopic.guidance}
        </p>

        {/* Suggested Vocab Bank */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Suggested Vocabulary Bank:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeTopic.suggestedVocab.map((w, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2 pt-2">
          <textarea
            rows={7}
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Write your paragraph here (aim for at least 40-60 words for thorough rubric feedback)..."
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-y"
          />

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Words: <strong>{essayText.trim().split(/\s+/).filter(Boolean).length}</strong></span>
            <span>Recommended: 40+ words</span>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!essayText.trim() || isAnalyzing}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-700 hover:to-sky-600 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 btn-press"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAnalyzing ? 'Analyzing Paragraph Structure...' : 'Analyze Writing & Get Score'}</span>
        </button>
      </div>

      {/* ANALYSIS RESULT DASHBOARD */}
      {analysis && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6 animate-fadeIn">
          {/* Top Score Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Evaluation Summary
              </span>
              <h3 className="text-2xl font-black font-display text-slate-900 dark:text-white mt-0.5">
                Overall Writing Score
              </h3>
              <p className="text-xs text-slate-500">
                Readability: <strong className="text-slate-700 dark:text-slate-300">{analysis.readabilityGrade}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white flex flex-col items-center justify-center font-black shadow-md">
                <span className="text-xl font-display leading-none">{analysis.overallScore}</span>
                <span className="text-[10px] text-brand-100 uppercase">/ 100</span>
              </div>
            </div>
          </div>

          {/* 4 Rubric Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Grammar
              </span>
              <span className="text-xl font-black font-display text-brand-600 dark:text-brand-400">
                {analysis.grammarScore}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Vocabulary
              </span>
              <span className="text-xl font-black font-display text-emerald-600 dark:text-emerald-400">
                {analysis.vocabScore}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Structure
              </span>
              <span className="text-xl font-black font-display text-purple-600 dark:text-purple-400">
                {analysis.structureScore}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Sentences
              </span>
              <span className="text-xl font-black font-display text-slate-800 dark:text-slate-200">
                {analysis.sentenceCount}
              </span>
            </div>
          </div>

          {/* Detected Grammar Issues if any */}
          {analysis.grammarIssues.length > 0 ? (
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-2">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Grammar & Structure Issues Found:
              </span>
              <div className="space-y-1.5 text-xs text-rose-700 dark:text-rose-300">
                {analysis.grammarIssues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span>•</span>
                    <div>
                      <strong>{issue.type}:</strong> {issue.advice} (<em>"{issue.snippet}"</em>)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>No blatant capitalization or run-on sentence errors detected! Good foundation.</span>
            </div>
          )}

          {/* Constructive Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/20 border border-brand-200/60 dark:border-brand-900/40 space-y-2 text-xs">
              <span className="font-bold text-brand-900 dark:text-brand-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-brand-500" />
                Actionable Next Steps:
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 pl-4 list-disc">
                {analysis.suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
