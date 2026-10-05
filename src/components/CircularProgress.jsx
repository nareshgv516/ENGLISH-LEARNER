import React from 'react';

export const CircularProgress = ({
  percentage = 68,
  size = 180,
  strokeWidth = 14,
  label = 'Grammar Progress',
  sublabel = 'Overall Mastery',
  colorClass = 'from-brand-500 to-accent-500'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c87eb" />
            <stop offset="50%" stopColor="#36a6f7" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800"
          fill="transparent"
        />

        {/* Animated Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Text Info */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        <span className="text-3xl font-black font-display tracking-tight text-slate-800 dark:text-white">
          {percentage}%
        </span>
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mt-0.5">
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
