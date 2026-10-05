import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Star, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  BookOpen, 
  Flame, 
  Volume2, 
  Edit3, 
  Target,
  BarChart2,
  Compass,
  Check
} from 'lucide-react';

export const StudentAnalysisModal = ({ student, isOpen, onClose }) => {
  const [graphMode, setGraphMode] = useState('radar'); // 'radar' | 'benchmark'
  const [activeMetricKey, setActiveMetricKey] = useState('grammar');

  if (!isOpen || !student) return null;

  const marks = student.marks || {
    total: 490,
    max: 500,
    percentage: 98.0,
    grade: 'A+ (Distinction)',
    grammar: 98.5,
    vocabulary: 97.0,
    quizAccuracy: 98.0,
    writing: 97.0,
    pronunciation: 96.0
  };

  const skills = student.skills || {
    topSkill: 'Advanced Grammar & Syntax',
    strengths: ['Tenses', 'Clauses', 'Daily Quizzes', 'Vocabulary'],
    accuracyRate: '98.5%',
    weeklyGrowth: '+15%',
    avgSpeed: '1.8s / question',
    studyTime: '14 hrs',
    quizzesMastered: 45
  };

  const rankColors = {
    1: 'from-amber-500 to-yellow-400 text-amber-950',
    2: 'from-slate-300 to-slate-200 text-slate-800',
    3: 'from-amber-700 to-amber-600 text-amber-50'
  };

  // 5 Core Evaluated Skills for Graph Rendering
  const skillMetrics = [
    { key: 'grammar', label: 'Grammar Syntax', score: marks.grammar, icon: BookOpen, color: '#0ea5e9' },
    { key: 'vocabulary', label: 'Vocabulary Recall', score: marks.vocabulary, icon: Star, color: '#f59e0b' },
    { key: 'quizAccuracy', label: 'Quiz Speed', score: marks.quizAccuracy, icon: Zap, color: '#a855f7' },
    { key: 'writing', label: 'Writing Fluency', score: marks.writing, icon: Edit3, color: '#f43f5e' },
    { key: 'pronunciation', label: 'Phonetics & Speech', score: marks.pronunciation, icon: Volume2, color: '#06b6d4' }
  ];

  // Mathematical Geometry for SVG 5-Axis Spider / Radar Graph
  const center = 140;
  const radius = 95;
  const numAxes = skillMetrics.length;
  const benchmarkScore = 75.0; // Standard peer class average

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric radar grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100];

  const studentPoints = skillMetrics.map((m, i) => {
    const { x, y } = getCoordinates(i, m.score);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const benchmarkPoints = skillMetrics.map((_, i) => {
    const { x, y } = getCoordinates(i, benchmarkScore);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeMetricObj = skillMetrics.find(m => m.key === activeMetricKey) || skillMetrics[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600 px-6 pt-6 pb-12 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-white/25 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Top 5 Student of the Week • Rank #{student.rank}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            Skill & Marks Performance Analysis
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-lg">
            Detailed evaluation of grammar accuracy, vocabulary recall, writing fluency, and quiz speed.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 -mt-8">
          {/* Student Profile Card (Floating) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 shadow-md border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-brand-500/40 shadow-md"
              />
              <span className={`absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-xs font-black shadow-sm ${rankColors[student.rank] || 'bg-brand-600 text-white'}`}>
                #{student.rank}
              </span>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {student.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {student.levelTier} • {student.country || 'Global Student'}
                  </p>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-black border border-amber-200 dark:border-amber-900/60 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {student.streak}d streak
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-black border border-brand-200 dark:border-brand-900/60">
                    {student.xp} XP
                  </span>
                </div>
              </div>

              {student.quote && (
                <p className="mt-3 text-xs italic text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  “{student.quote}”
                </p>
              )}
            </div>
          </div>

          {/* VISUAL PERFORMANCE ANALYSIS GRAPH SECTION */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    Performance Analysis Graph
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Multidimensional skill evaluation & peer benchmark comparison
                  </p>
                </div>
              </div>

              {/* Graph Mode Toggle */}
              <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                <button
                  onClick={() => setGraphMode('radar')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    graphMode === 'radar'
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Radar Web</span>
                </button>
                <button
                  onClick={() => setGraphMode('benchmark')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    graphMode === 'benchmark'
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Peer Benchmark</span>
                </button>
              </div>
            </div>

            {/* GRAPH VIEW 1: 5-AXIS RADAR / SPIDER WEB */}
            {graphMode === 'radar' ? (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-around gap-4 pt-2">
                  {/* SVG Radar Chart */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 shrink-0">
                    <svg viewBox="0 0 280 280" className="w-full h-full drop-shadow-sm overflow-visible">
                      {/* Concentric Background Polygons */}
                      {gridLevels.map((lvl) => {
                        const pts = skillMetrics.map((_, i) => {
                          const { x, y } = getCoordinates(i, lvl);
                          return `${x.toFixed(1)},${y.toFixed(1)}`;
                        }).join(' ');
                        return (
                          <polygon
                            key={lvl}
                            points={pts}
                            fill={lvl === 100 ? 'rgba(241, 245, 249, 0.4)' : 'none'}
                            stroke="currentColor"
                            className="text-slate-300 dark:text-slate-700/80"
                            strokeWidth="1"
                            strokeDasharray={lvl < 100 ? '3 3' : undefined}
                          />
                        );
                      })}

                      {/* Axes Lines from Center to Outer Edge */}
                      {skillMetrics.map((_, i) => {
                        const { x, y } = getCoordinates(i, 100);
                        return (
                          <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="currentColor"
                            className="text-slate-300 dark:text-slate-700"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Benchmark Polygon (75% Peer Avg) */}
                      <polygon
                        points={benchmarkPoints}
                        fill="rgba(148, 163, 184, 0.15)"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />

                      {/* Student Skill Polygon */}
                      <polygon
                        points={studentPoints}
                        fill="url(#radarGradient)"
                        stroke="#0284c7"
                        strokeWidth="2.5"
                        className="transition-all duration-700"
                      />

                      {/* Radar Fill Gradient */}
                      <defs>
                        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>

                      {/* Student Data Point Nodes */}
                      {skillMetrics.map((m, i) => {
                        const { x, y } = getCoordinates(i, m.score);
                        const isSelected = activeMetricKey === m.key;
                        return (
                          <g key={m.key} onClick={() => setActiveMetricKey(m.key)} className="cursor-pointer group">
                            <circle
                              cx={x}
                              cy={y}
                              r={isSelected ? 6 : 4.5}
                              fill="#0284c7"
                              stroke="#ffffff"
                              strokeWidth="2"
                              className="transition-all hover:scale-125"
                            />
                            {isSelected && (
                              <circle
                                cx={x}
                                cy={y}
                                r={10}
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="2"
                                className="animate-ping opacity-75"
                              />
                            )}
                          </g>
                        );
                      })}

                      {/* Axis Labels outside perimeter */}
                      {skillMetrics.map((m, i) => {
                        const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                        const labelR = radius + 22;
                        const lx = center + labelR * Math.cos(angle);
                        const ly = center + labelR * Math.sin(angle);
                        const isSelected = activeMetricKey === m.key;
                        return (
                          <text
                            key={`lbl-${m.key}`}
                            x={lx}
                            y={ly}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={`text-[9px] sm:text-[10px] font-black tracking-tight select-none cursor-pointer transition-colors ${
                              isSelected
                                ? 'fill-brand-600 dark:fill-brand-400 font-extrabold'
                                : 'fill-slate-600 dark:fill-slate-400 hover:fill-brand-500'
                            }`}
                            onClick={() => setActiveMetricKey(m.key)}
                          >
                            {m.label.split(' ')[0]} ({m.score}%)
                          </text>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Selected Metric Breakdown Card */}
                  <div className="w-full md:w-56 space-y-2.5">
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">Selected Dimension</span>
                        <span className="font-black text-brand-600 dark:text-brand-400">
                          {activeMetricObj.score}%
                        </span>
                      </div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">
                        {activeMetricObj.label}
                      </p>
                      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-500 to-sky-400 rounded-full"
                          style={{ width: `${activeMetricObj.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 pt-1">
                        <Check className="w-3 h-3" />
                        +{(activeMetricObj.score - benchmarkScore).toFixed(1)}% above peer benchmark
                      </p>
                    </div>

                    {/* Chart Legend */}
                    <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-[11px] space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-sky-500 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{student.name} (Top Tier)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-400 shrink-0" />
                        <span className="text-slate-500 font-medium">Class Baseline (75%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* GRAPH VIEW 2: PEER BENCHMARK COMPARATIVE BAR CHART */
              <div className="space-y-3 pt-2">
                {skillMetrics.map((m) => {
                  const delta = (m.score - benchmarkScore).toFixed(1);
                  return (
                    <div 
                      key={m.key}
                      className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <m.icon className="w-3.5 h-3.5 text-brand-500" />
                          {m.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[11px]">Avg: {benchmarkScore}%</span>
                          <span className="font-black text-brand-600 dark:text-brand-400">{m.score}%</span>
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60">
                            +{delta}%
                          </span>
                        </div>
                      </div>

                      {/* Stacked Comparative Visual Bar */}
                      <div className="relative h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        {/* 75% Benchmark Indicator Line */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                          style={{ left: `${benchmarkScore}%` }}
                          title="Peer Average 75%"
                        />
                        {/* Student Fill Bar */}
                        <div 
                          className="h-full bg-gradient-to-r from-brand-500 via-sky-400 to-indigo-500 rounded-full transition-all duration-700"
                          style={{ width: `${m.score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* MARKS EXAMINATION SUMMARY BANNER */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-500" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Weekly Marks Examination Breakdown
                </h4>
              </div>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Grade: {marks.grade}
              </span>
            </div>

            {/* Total Marks Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-sky-500/10 border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Marks Achieved</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {marks.total} <span className="text-sm font-semibold text-slate-400">/ {marks.max}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Aggregate Marks</p>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {marks.percentage}%
                </p>
              </div>
            </div>
          </div>

          {/* SKILLS ANALYSIS SECTION */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-brand-500" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Cognitive Skill & Learning Efficiency
              </h4>
            </div>

            {/* Quick Stat Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Top Skill</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                  {skills.topSkill}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Weekly Gain</span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  {skills.weeklyGrowth}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Avg Response</span>
                <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400 mt-0.5 block">
                  {skills.avgSpeed}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Study Hours</span>
                <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 mt-0.5 block">
                  {skills.studyTime}
                </span>
              </div>
            </div>

            {/* Strength Badges */}
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                Certified Mastery Areas:
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.strengths?.map((str, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-900/60"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                    {str}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
