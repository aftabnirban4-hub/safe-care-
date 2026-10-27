import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, X, Check, Shield, User, Lock, Mail, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { openAuthModal, setOpenAuthModal, user, setUser, setCurrentScreen } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'student' | 'doctor' | 'admin'>('student');
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('demo-password');
  const [success, setSuccess] = useState(false);

  if (!openAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      displayName: name || (role === 'doctor' ? 'Dr. Ananya Sharma' : role === 'admin' ? 'JIC Evaluator' : 'Aftab'),
      email: email || `${role}@jecrc.ac.in`,
      role,
      isAuthenticated: true
    }));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setOpenAuthModal(false);
      if (role === 'doctor') setCurrentScreen('doctor-portal');
      else if (role === 'admin') setCurrentScreen('admin-overview');
      else setCurrentScreen('dashboard');
    }, 900);
  };

  const selectPersonaQuick = (pRole: 'student' | 'doctor' | 'admin', pName: string, pEmail: string) => {
    setRole(pRole);
    setName(pName);
    setEmail(pEmail);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in duration-200">
        <button
          onClick={() => setOpenAuthModal(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {mode === 'signin' ? 'Sign In to SAFE CARE' : 'Create Student Sanctuary Account'}
            </h2>
            <p className="text-[11px] text-slate-500">JECRC Campus & Telemedicine Portal</p>
          </div>
        </div>

        {/* Quick Demo Persona Switcher */}
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-2xl">
          <div className="text-[11px] font-bold text-teal-900 mb-1.5">⚡ Instant Demo Personas for Mentors:</div>
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => selectPersonaQuick('student', 'Aftab (Student Demo)', 'aftab.ai@jecrc.ac.in')}
              className={`p-1.5 rounded-lg border text-center font-medium cursor-pointer ${
                role === 'student' ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-700 border-teal-200'
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => selectPersonaQuick('doctor', 'Dr. Ananya Sharma', 'ananya.psych@safecare.in')}
              className={`p-1.5 rounded-lg border text-center font-medium cursor-pointer ${
                role === 'doctor' ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-700 border-teal-200'
              }`}
            >
              🩺 Doctor
            </button>
            <button
              type="button"
              onClick={() => selectPersonaQuick('admin', 'JIC Incubator Committee', 'incubator@jecrc.ac.in')}
              className={`p-1.5 rounded-lg border text-center font-medium cursor-pointer ${
                role === 'admin' ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-slate-700 border-teal-200'
              }`}
            >
              🏛️ JIC Mentor
            </button>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2 text-emerald-700">
            <Check className="w-10 h-10 mx-auto bg-emerald-100 p-2 rounded-full" />
            <div className="font-bold text-sm">Authenticated as {role.toUpperCase()}</div>
            <div className="text-xs text-slate-500">Redirecting to targeted portal...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Campus or Professional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer mt-2"
            >
              {mode === 'signin' ? 'Sign In with Persona' : 'Complete Registration'}
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-500">
              {mode === 'signin' ? (
                <>
                  Want to register new student profile?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-brand-700 font-bold hover:underline cursor-pointer"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-brand-700 font-bold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
