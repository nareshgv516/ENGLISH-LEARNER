import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Volume2, RotateCcw } from 'lucide-react';
import { audioRecorderService } from '../services/audioRecorderService';

export const AudioPlayerWidget = ({ 
  audioUrl, 
  audioBlob, 
  duration = 0, 
  label = 'Your Voice Recording',
  filename = 'my_pronunciation.webm',
  accentColor = 'rose'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  // Reset when audioUrl changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio play error:', e);
        setIsPlaying(false);
      });
    }
  };

  const handleDownload = () => {
    if (audioBlob) {
      audioRecorderService.downloadRecording(audioBlob, filename);
    } else if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = filename;
      a.click();
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalDuration = audioRef.current?.duration || duration || 1;
  const progressPercent = Math.min(100, (currentTime / (totalDuration || 1)) * 100);

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5">
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate max-w-[180px] sm:max-w-[240px]">
              {label}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-sm transition-all transform active:scale-95"
            title={isPlaying ? 'Pause playback' : 'Play recording'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          <button
            onClick={handleDownload}
            className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all"
            title="Download voice clip (.webm)"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar / Scrubber */}
      <div 
        className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
        onClick={(e) => {
          if (!audioRef.current || !totalDuration) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const newTime = (clickX / rect.width) * totalDuration;
          audioRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }}
      >
        <div 
          className="h-full bg-rose-500 rounded-full transition-all duration-150"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mini Waveform Visualization when playing */}
      {isPlaying && (
        <div className="flex items-center justify-center gap-1 py-1">
          <span className="w-1 bg-rose-500 rounded-full h-2 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 bg-rose-500 rounded-full h-4 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 bg-rose-500 rounded-full h-3 animate-bounce" style={{ animationDelay: '75ms' }} />
          <span className="w-1 bg-rose-500 rounded-full h-5 animate-bounce" style={{ animationDelay: '200ms' }} />
          <span className="w-1 bg-rose-500 rounded-full h-2 animate-bounce" style={{ animationDelay: '100ms' }} />
          <span className="text-[10px] text-rose-500 font-bold ml-1.5">Playing your voice recording...</span>
        </div>
      )}
    </div>
  );
};
