import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Sparkles } from 'lucide-react';

export const MobileStatusBar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const isAM = hours < 12;
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md px-5 pt-3 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-800 dark:text-slate-200 select-none z-30 border-b border-slate-200/50 dark:border-slate-800/50">
      {/* Left: Clock */}
      <span className="font-extrabold tracking-tight">
        {time || '9:41'}
      </span>

      {/* Center: Dynamic Island / Camera Notch */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 dark:bg-slate-950 text-white shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] font-black tracking-wider text-sky-200 uppercase">
          AI Active
        </span>
      </div>

      {/* Right: Signals & Battery */}
      <div className="flex items-center gap-1.5">
        <span className="text-[9px] font-black text-slate-600 dark:text-slate-400">5G</span>
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <div className="w-4 h-2.5 rounded-xs border border-slate-700 dark:border-slate-300 p-0.5 flex items-center">
            <div className="h-full w-full bg-emerald-500 rounded-2xs" />
          </div>
        </div>
      </div>
    </div>
  );
};
