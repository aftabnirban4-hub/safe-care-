import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, Activity, User, MessageSquareText, Stethoscope, 
  Menu, X, Sparkles, Building2, Bell, Shield, LogIn
} from 'lucide-react';
import { Screen } from '../types';

export const Navbar: React.FC = () => {
  const { currentScreen, setCurrentScreen, user, setUser, setOpenAuthModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: Screen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'My Sanctuary', icon: Activity },
    { id: 'mood-checkin', label: 'Mood Log', icon: Heart },
    { id: 'wellness', label: 'Wellness Toolkit', icon: Sparkles },
    { id: 'ai-companion', label: 'AI Companion', icon: MessageSquareText },
    { id: 'professionals', label: 'Doctors & Counsellors', icon: Stethoscope },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'about', label: 'JIC Vision', icon: Building2 },
  ];

  const handleNav = (screen: Screen) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Brand */}
          <button 
            type="button"
            className="flex items-center text-left cursor-pointer focus:outline-hidden" 
            onClick={() => handleNav('landing')}
            aria-label="SAFE CARE Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 mr-3">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                  SAFE<span className="text-brand-600">CARE</span>
                </span>
                <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200">
                  JIC PROTOTYPE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">Mind Wellness & Telemedicine • JECRC Jaipur</p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-50 text-brand-800 font-semibold border border-brand-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Role Switcher & Profile CTA */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Quick Role Switcher for Mentors */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <select
                value={user.role}
                onChange={(e) => {
                  const newRole = e.target.value as 'student' | 'doctor' | 'admin';
                  setUser(u => ({ ...u, role: newRole }));
                  if (newRole === 'doctor') setCurrentScreen('doctor-portal');
                  else if (newRole === 'admin') setCurrentScreen('admin-overview');
                  else setCurrentScreen('dashboard');
                }}
                className="text-xs font-semibold bg-transparent text-slate-700 px-2 py-1 focus:outline-none cursor-pointer"
                title="Test Prototype as different stakeholders"
                aria-label="Role Switcher"
              >
                <option value="student">Persona: Student (Aftab)</option>
                <option value="doctor">Persona: Dr. Sharma (Demo)</option>
                <option value="admin">Persona: JIC Mentor</option>
              </select>
            </div>

            <button
              onClick={() => handleNav('profile')}
              className="flex items-center space-x-1.5 bg-brand-50 hover:bg-brand-100 text-brand-800 px-3 py-1.5 rounded-lg border border-brand-200 text-xs font-semibold transition cursor-pointer"
              aria-label="User profile"
            >
              <User className="w-3.5 h-3.5 text-brand-600" />
              <span>{user.displayName.split(' ')[0]}</span>
            </button>

            <button
              onClick={() => setOpenAuthModal(true)}
              className="p-1.5 text-slate-500 hover:text-brand-700 hover:bg-slate-50 rounded-lg text-xs"
              title="Switch demo account"
              aria-label="Open auth modal"
            >
              <LogIn className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          <div className="p-2 mb-2 bg-teal-50 rounded-xl text-xs text-teal-800 flex justify-between items-center">
            <span className="font-semibold">Persona Mode:</span>
            <select
              value={user.role}
              onChange={(e) => {
                const newRole = e.target.value as 'student' | 'doctor' | 'admin';
                setUser(u => ({ ...u, role: newRole }));
                if (newRole === 'doctor') handleNav('doctor-portal');
                else if (newRole === 'admin') handleNav('admin-overview');
                else handleNav('dashboard');
              }}
              className="bg-white border border-teal-200 rounded text-xs p-1 font-semibold text-slate-800"
            >
              <option value="student">Student (Aftab)</option>
              <option value="doctor">Dr. Sharma (Doctor)</option>
              <option value="admin">JIC Mentor / Admin</option>
            </select>
          </div>

          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                  currentScreen === link.id
                    ? 'bg-brand-50 text-brand-800 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-brand-600" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => handleNav('profile')}
              className="flex-1 py-2 text-center text-xs font-bold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
            >
              My Profile & Demo Data
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenAuthModal(true);
              }}
              className="flex-1 py-2 text-center text-xs font-bold text-white bg-brand-700 rounded-lg cursor-pointer"
            >
              Sign In Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
