import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  Award, 
  Flame, 
  Check,
  Upload
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { availableStudentProfiles } from '../data/leaderboardData';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, signup } = useLearning();
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  
  // Selected Student Avatar
  const [selectedAvatar, setSelectedAvatar] = useState('/students/ananya.jpg');
  const [selectedStudentName, setSelectedStudentName] = useState('Ananya Sharma');
  const [customPhoto, setCustomPhoto] = useState(null);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup Form State
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState('Beginner');

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSelectStudentProfile = (student) => {
    setSelectedAvatar(student.avatar);
    setSelectedStudentName(student.name);
    if (mode === 'signup' && !name) {
      setName(student.name);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Photo size must be under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomPhoto(reader.result);
        setSelectedAvatar(reader.result);
        setSelectedStudentName(name || 'Custom Student');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickLoginAsStudent = (student) => {
    login(
      `${student.name.toLowerCase().replace(/\s+/g, '.')}@grammarlearner.ai`,
      'password123',
      true,
      student.avatar,
      student.name
    );
    onClose();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) {
      setError('Please fill in both email and password.');
      return;
    }
    const success = login(
      loginEmail, 
      loginPassword, 
      rememberMe, 
      selectedAvatar, 
      selectedStudentName || null
    );
    if (success) {
      onClose();
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !signupEmail || !signupPassword) {
      setError('Please provide your name, email, and password.');
      return;
    }
    if (signupPassword !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const success = signup({ 
      name, 
      email: signupEmail, 
      level, 
      avatar: selectedAvatar 
    });
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden relative flex flex-col md:flex-row max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 shadow-sm transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT / TOP SIDE: STUDENT SHOWCASE BANNER */}
        <div className="md:w-5/12 bg-gradient-to-br from-brand-900 via-brand-800 to-sky-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shrink-0">
          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Pill */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-200 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Student Community</span>
            </div>

            <div>
              <h3 className="text-2xl font-black font-display text-white">
                Learn English With High Achievers
              </h3>
              <p className="text-xs text-sky-100/90 mt-1">
                Your selected student profile and photo will display in your learning dashboard, navbar, and weekly leaderboards!
              </p>
            </div>

            {/* Featured Student Photography */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/20 mt-4 group">
              <img
                src="/students/login-showcase.jpg"
                alt="Students studying English together"
                className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <p className="text-xs font-bold text-white drop-shadow-sm">
                    12,400+ active students online right now
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top 5 Students Photo Badges */}
          <div className="relative z-10 pt-4 mt-4 border-t border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sky-200/80 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Top 5 Students of the Week:</span>
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden py-1">
              {availableStudentProfiles.map((student, i) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => handleSelectStudentProfile(student)}
                  title={`${student.name} • Click to select profile photo`}
                  className="relative group transition-transform hover:scale-110 hover:z-20 focus:outline-none"
                >
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white/80 shadow-md group-hover:ring-amber-400"
                  />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-500 text-[8px] font-black flex items-center justify-center text-white">
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-sky-200/70 mt-1.5">
              Click any photo to adopt that student portrait for your account.
            </p>
          </div>
        </div>

        {/* RIGHT / MAIN SIDE: LOGIN / SIGNUP FORM */}
        <div className="md:w-7/12 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
                  {mode === 'login' ? 'Student Sign In' : 'Create Student Account'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {mode === 'login' 
                    ? 'Enter credentials or select a student photo to sign in' 
                    : 'Personalize your English grammar journey today'}
                </p>
              </div>

              {/* Mode Toggle Switch */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    mode === 'signup'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium border border-rose-200 dark:border-rose-900/50">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STUDENT PHOTO SELECTOR */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-brand-500" />
                  <span>Choose Your Student Photo to Display:</span>
                </label>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold">
                  Displays on Web
                </span>
              </div>

              {/* Photo Avatar Circles + Own Photo Tile */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableStudentProfiles.map((student) => {
                  const isSelected = selectedAvatar === student.avatar && selectedAvatar !== customPhoto;
                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => handleSelectStudentProfile(student)}
                      className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-all ${
                        isSelected 
                          ? 'ring-2 ring-brand-500 bg-brand-50/50 dark:bg-brand-950/40 scale-105' 
                          : 'hover:bg-slate-200/50 dark:hover:bg-slate-700/50 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-11 h-11 rounded-xl object-cover shadow-sm"
                        />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-full">
                        {student.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}

                {/* Own Photo Option Tile */}
                <label
                  htmlFor="own-photo-modal-file"
                  className={`flex flex-col items-center justify-center gap-1 p-1 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                    customPhoto && selectedAvatar === customPhoto
                      ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/60 ring-2 ring-brand-500'
                      : 'border-slate-300 dark:border-slate-700 hover:border-brand-400'
                  }`}
                  title="Upload your own student photo from your device"
                >
                  <input
                    type="file"
                    id="own-photo-modal-file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="relative w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                    {customPhoto ? (
                      <img
                        src={customPhoto}
                        alt="Your Own Uploaded Photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    )}
                    {customPhoto && selectedAvatar === customPhoto && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-black text-brand-600 dark:text-brand-400 text-center leading-tight">
                    {customPhoto ? 'Your Photo' : '+ Own Photo'}
                  </span>
                </label>
              </div>

              {/* Upload Own Photo helper line */}
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                <label
                  htmlFor="own-photo-modal-file"
                  className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold hover:underline cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Own Photo from Computer</span>
                </label>
                {customPhoto && selectedAvatar === customPhoto && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                    Own photo active
                  </span>
                )}
              </div>
            </div>

            {/* LOGIN FORM */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="ananya@grammarlearner.ai"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                </div>

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
                    onClick={() => alert('Demo account: Enter any email and password or use 1-click student buttons below!')}
                    className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-700 hover:to-sky-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all btn-press mt-2"
                >
                  Sign In with Student Photo
                </button>
              </form>
            )}

            {/* SIGNUP FORM */}
            {mode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Student Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ananya Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Confirm
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    English Skill Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Beginner">Beginner (Basic rules & simple tenses)</option>
                    <option value="Elementary">Elementary (Past, adjectives, conjunctions)</option>
                    <option value="Intermediate">Intermediate (Conditionals, passive voice)</option>
                    <option value="Advanced">Advanced (Complex clauses, inversion)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all btn-press mt-2"
                >
                  Register & Display Photo on Web
                </button>
              </form>
            )}
          </div>

          {/* QUICK 1-CLICK TOP STUDENT LOGIN BAR */}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
              ⚡ Instant 1-Click Login As Top Student:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableStudentProfiles.slice(0, 3).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleQuickLoginAsStudent(st)}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left border border-slate-200/60 dark:border-slate-700/60 transition-colors"
                >
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-brand-500/30"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {st.name.split(' ')[0]}
                    </p>
                    <span className="text-[9px] text-brand-600 dark:text-brand-400 font-semibold block truncate">
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
  );
};
