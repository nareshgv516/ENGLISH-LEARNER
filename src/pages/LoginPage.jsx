import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Check, 
  Award, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  Camera,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { availableStudentProfiles } from '../data/leaderboardData';

export const LoginPage = ({ onNavigate, initialMode = 'login' }) => {
  const { login, signup, user } = useLearning();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'

  // Selected Student Avatar & Info
  const [selectedAvatar, setSelectedAvatar] = useState('/students/ananya.jpg');
  const [selectedStudentName, setSelectedStudentName] = useState('Ananya Sharma');
  const [customPhoto, setCustomPhoto] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // Form Fields
  const [email, setEmail] = useState('ananya@grammarlearner.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup fields
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState('Beginner');

  // Feedback states
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Photo size must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomPhoto(reader.result);
        setSelectedAvatar(reader.result);
        if (mode === 'signup' && !name) {
          setName('My Profile');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput && urlInput.trim().startsWith('http')) {
      setCustomPhoto(urlInput.trim());
      setSelectedAvatar(urlInput.trim());
      setShowUrlInput(false);
      setUrlInput('');
    } else {
      setError('Please provide a valid web image URL (starting with http:// or https://)');
    }
  };

  const handleSelectStudentProfile = (student) => {
    setSelectedAvatar(student.avatar);
    setSelectedStudentName(student.name);
    setEmail(`${student.name.toLowerCase().replace(/\s+/g, '.')}@grammarlearner.ai`);
    if (mode === 'signup' && !name) {
      setName(student.name);
    }
  };

  const handleQuickLoginAsStudent = (student) => {
    setIsSubmitting(true);
    setTimeout(() => {
      login(
        `${student.name.toLowerCase().replace(/\s+/g, '.')}@grammarlearner.ai`,
        'password123',
        true,
        student.avatar,
        student.name
      );
      onNavigate('dashboard');
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        login(email, password, rememberMe, selectedAvatar, selectedStudentName || null);
        setIsSubmitting(false);
        onNavigate('dashboard');
      }, 400);
    } else {
      if (!name || !email || !password) {
        setError('Please provide your name, email, and password.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        signup({ name, email, level, avatar: selectedAvatar });
        setIsSubmitting(false);
        onNavigate('dashboard');
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center animate-fadeIn">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 text-xs font-bold shadow-2xs hover:shadow-sm transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to GrammarLearner AI</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              Need help?
            </span>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Ask AI Helper
            </button>
          </div>
        </div>

        {/* Main Card Split Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-elevated border border-slate-200/80 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* ================= LEFT COLUMN: STUDENT SHOWCASE & COMMUNITY ================= */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 via-brand-800 to-sky-950 text-white p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-sky-200 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Student Learning Community</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                  Welcome to Your English Grammar Portal
                </h1>
                <p className="text-xs sm:text-sm text-sky-100/90 mt-2 leading-relaxed">
                  Join thousands of dedicated learners mastering English grammar rules, sentence patterns, speech clarity, and weekly quizzes.
                </p>
              </div>

              {/* Student Community Photography */}
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-white/20 group">
                <img
                  src="/students/login-showcase.jpg"
                  alt="Students studying English together"
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold text-white drop-shadow-sm">
                        12,400+ Active Students Worldwide
                      </span>
                    </div>
                    <p className="text-[11px] text-sky-200/90">
                      Top 5 Students of the Week are recognized on the public leaderboard.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Platform Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <BookOpen className="w-4 h-4 text-amber-300 mb-1" />
                  <p className="text-xs font-black text-white">32 Complete Lessons</p>
                  <p className="text-[10px] text-sky-200">Beginner to Advanced</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Award className="w-4 h-4 text-emerald-300 mb-1" />
                  <p className="text-xs font-black text-white">Marks & Analysis</p>
                  <p className="text-[10px] text-sky-200">Real-time skill scoring</p>
                </div>
              </div>
            </div>

            {/* Top 5 Students Photo Badges */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-sky-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Top 5 Students of the Week:
                </span>
                <span className="text-[10px] text-sky-200/80">Click photo to select</span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {availableStudentProfiles.map((student, i) => {
                  const isSelected = selectedAvatar === student.avatar;
                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => handleSelectStudentProfile(student)}
                      className={`relative rounded-xl p-0.5 transition-all group shrink-0 ${
                        isSelected ? 'ring-2 ring-amber-400 scale-110' : 'opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      title={`${student.name} (${student.level})`}
                    >
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-xl object-cover shadow-sm"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-amber-950 font-black text-[9px] flex items-center justify-center shadow-xs">
                        #{i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: LOGIN / SIGNUP FORM ================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              {/* Header Tab Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                  <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                    {mode === 'login' ? 'Student Sign In' : 'Create Student Account'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {mode === 'login'
                      ? 'Sign in to access your grammar streak, daily quizzes, and marks analysis.'
                      : 'Choose your student portrait and start your English journey today.'}
                  </p>
                </div>

                {/* Pill Mode Switcher */}
                <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 self-start sm:self-auto border border-slate-200/80 dark:border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      mode === 'login'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      mode === 'signup'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 flex items-center gap-2 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200 dark:border-rose-900/50">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* STUDENT PHOTO SELECTOR (DISPLAYS ON THE WEB) */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-brand-500" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Choose Your Student Photo:
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2.5 py-0.5 rounded-full border border-brand-200/60 dark:border-brand-900/60">
                    Displays Across Web
                  </span>
                </div>

                {/* Preset Portraits + Own Photo Option Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {availableStudentProfiles.map((student) => {
                    const isSelected = selectedAvatar === student.avatar && selectedAvatar !== customPhoto;
                    return (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => handleSelectStudentProfile(student)}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${
                          isSelected 
                            ? 'ring-2 ring-brand-500 bg-white dark:bg-slate-900 shadow-sm scale-102' 
                            : 'opacity-70 hover:opacity-100 hover:bg-white/60 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-12 h-12 rounded-xl object-cover shadow-sm"
                          />
                          {isSelected && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate max-w-full">
                          {student.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}

                  {/* OWN PHOTO OPTION BUTTON / TILE */}
                  <label
                    htmlFor="own-photo-file-login"
                    className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                      customPhoto && selectedAvatar === customPhoto
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/60 ring-2 ring-brand-500'
                        : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 hover:bg-white dark:hover:bg-slate-850'
                    }`}
                    title="Upload your own student photo from your device"
                  >
                    <input
                      type="file"
                      id="own-photo-file-login"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="relative w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                      {customPhoto ? (
                        <img
                          src={customPhoto}
                          alt="Your Own Uploaded Photo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                      )}
                      {customPhoto && selectedAvatar === customPhoto && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-extrabold text-brand-600 dark:text-brand-400 text-center leading-tight">
                      {customPhoto ? 'Your Photo' : '+ Own Photo'}
                    </span>
                  </label>
                </div>

                {/* Upload action bar & URL option */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-700/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="own-photo-file-login"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-brand-600 text-[11px] font-bold cursor-pointer shadow-2xs hover:shadow-xs transition-all"
                    >
                      <Upload className="w-3.5 h-3.5 text-brand-500" />
                      <span>Upload Photo from Device</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-brand-600 font-semibold"
                    >
                      {showUrlInput ? 'Hide URL' : 'or Paste Image URL'}
                    </button>
                  </div>

                  {customPhoto && selectedAvatar === customPhoto && (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Own photo active
                    </span>
                  )}
                </div>

                {/* URL Input dropdown */}
                {showUrlInput && (
                  <div className="mt-2.5 flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/my-photo.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyUrl}
                      className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* LOGIN / SIGNUP FORM */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Student Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ananya Sharma"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@grammarlearner.ai"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className={mode === 'signup' ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Starting English Level
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Beginner">Beginner (Foundations, verbs, present simple)</option>
                      <option value="Elementary">Elementary (Past tenses, adjectives, prepositions)</option>
                      <option value="Intermediate">Intermediate (Passive voice, conditionals, perfect tenses)</option>
                      <option value="Advanced">Advanced (Complex clauses, subjunctive, inversion)</option>
                    </select>
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded text-brand-600 focus:ring-brand-500 mr-2"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Demo account: Enter any email and password or use the 1-click Top Student buttons below!')}
                      className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all btn-press flex items-center justify-center gap-2"
                >
                  <span>
                    {isSubmitting
                      ? 'Signing in...'
                      : mode === 'login'
                      ? 'Sign In with Student Photo'
                      : 'Create Account & Display Photo on Web'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* ================= FAST 1-CLICK TOP STUDENT LOGIN ================= */}
            <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Instant 1-Click Login As Top 5 Student:
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Demo Ready</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {availableStudentProfiles.slice(0, 3).map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleQuickLoginAsStudent(st)}
                    className="flex items-center gap-2.5 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200/80 dark:border-slate-700/80 text-left transition-all hover:scale-102 group"
                  >
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {st.name}
                      </p>
                      <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold block">
                        {st.level}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
