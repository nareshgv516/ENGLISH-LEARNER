import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  LogOut, 
  Check, 
  AlertTriangle,
  Globe,
  Bell,
  Target,
  Sparkles,
  Upload,
  Camera
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { availableStudentProfiles } from '../data/leaderboardData';

export const SettingsPage = ({ onNavigate }) => {
  const { 
    user, 
    updateProfile, 
    dailyGoal, 
    darkMode, 
    toggleDarkMode, 
    soundEnabled, 
    toggleSound, 
    resetProgress, 
    logout 
  } = useLearning();

  const [name, setName] = useState(user.name);
  const [level, setLevel] = useState(user.level);
  const [avatar, setAvatar] = useState(user.avatar || '/students/ananya.jpg');
  const [questionsTarget, setQuestionsTarget] = useState(dailyGoal.questionsTarget);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      level,
      avatar
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
          Preferences & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your profile, daily learning goals, theme, sound feedback, and data management
        </p>
      </div>

      {/* SECTION 1: PROFILE SETTINGS */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            User Profile
          </h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={avatar || user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/40 shadow-sm"
            />
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-slate-400">
                {user.email}
              </p>
              <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">
                Photo displays across Navbar, Dashboard & Rankings
              </span>
            </div>
          </div>

          {/* Student Photo Selection */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-brand-500" />
                <span>Select Display Student Photo:</span>
              </label>
              <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold">
                Updates Across App
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {availableStudentProfiles.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setAvatar(st.avatar)}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
                    avatar === st.avatar
                      ? 'ring-2 ring-brand-500 bg-brand-50/50 dark:bg-brand-950/40 scale-105'
                      : 'opacity-70 hover:opacity-100 hover:bg-slate-200/40 dark:hover:bg-slate-700/40'
                  }`}
                >
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-12 h-12 rounded-xl object-cover shadow-sm"
                  />
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-full">
                    {st.name.split(' ')[0]}
                  </span>
                </button>
              ))}

              {/* Own Photo Option Tile */}
              <label
                htmlFor="settings-own-photo-file"
                className={`flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                  avatar && !availableStudentProfiles.some(p => p.avatar === avatar)
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/60 ring-2 ring-brand-500'
                    : 'border-slate-300 dark:border-slate-700 hover:border-brand-400'
                }`}
                title="Upload your own photo from device"
              >
                <input
                  type="file"
                  id="settings-own-photo-file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="relative w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                  {avatar && !availableStudentProfiles.some(p => p.avatar === avatar) ? (
                    <img
                      src={avatar}
                      alt="Your Custom Photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  )}
                  {avatar && !availableStudentProfiles.some(p => p.avatar === avatar) && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-extrabold text-brand-600 dark:text-brand-400 text-center leading-tight">
                  + Own Photo
                </span>
              </label>
            </div>

            {/* Upload Own Photo helper line */}
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <label
                htmlFor="settings-own-photo-file"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-brand-600 text-[11px] font-bold cursor-pointer shadow-2xs hover:shadow-xs transition-all"
              >
                <Upload className="w-3.5 h-3.5 text-brand-500" />
                <span>Upload Own Photo from Computer</span>
              </label>
              {avatar && !availableStudentProfiles.some(p => p.avatar === avatar) && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                  Custom photo selected
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Full Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Current Learning Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Beginner">Beginner (Foundations & Simple Sentences)</option>
                <option value="Elementary">Elementary (Past, Continuous & Adjectives)</option>
                <option value="Intermediate">Intermediate (Conditionals & Passive Voice)</option>
                <option value="Advanced">Advanced (Inversion & Complex Clauses)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Profile updated successfully!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: LEARNING GOAL & PREFERENCES */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Daily Learning Goals
          </h2>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Target Questions per Day
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[10, 20, 30].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionsTarget(count)}
                className={`py-3 rounded-2xl border text-center font-bold text-xs transition-all ${
                  questionsTarget === count
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 shadow-2xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                }`}
              >
                {count} Questions / Day
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: AUDIO, THEME & SYSTEM PREFERENCES */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Theme & Accessibility
        </h2>

        {/* Dark Mode Row */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                Dark Mode Appearance
              </p>
              <p className="text-xs text-slate-400">
                Gentle on the eyes during evening study hours
              </p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              darkMode ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              darkMode ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Sound FX Row */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                Interactive Sound Effects
              </p>
              <p className="text-xs text-slate-400">
                Auditory chimes for correct answers, level ups, and achievements
              </p>
            </div>
          </div>
          <button
            onClick={toggleSound}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              soundEnabled ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              soundEnabled ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Notifications Row */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                Streak & Daily Reminders
              </p>
              <p className="text-xs text-slate-400">
                Keep your consistency active every 24 hours
              </p>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              notificationsEnabled ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* SECTION 4: DATA RESET & LOGOUT */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-950/40 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Account & Data Management
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              Reset Learning Progress
            </p>
            <p className="text-xs text-slate-400">
              Clear completed lesson records, mistake analytics, and XP scores to start afresh.
            </p>
          </div>

          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors shrink-0"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleConfirmReset}
                className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs"
              >
                Confirm Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="font-bold text-sm text-slate-900 dark:text-white">
              Sign Out of Account
            </p>
            <p className="text-xs text-slate-400">
              Safely end your current session on this device.
            </p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
