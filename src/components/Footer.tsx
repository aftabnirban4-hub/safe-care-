import React from 'react';
import { Heart, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentScreen, resetAllDemoData } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 text-sm mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Vision */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-bold text-lg text-white">SAFE CARE</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              “Your Mind Matters. Your Care Matters.” An empathetic digital mental wellness and telemedicine ecosystem tailored for youth and university students.
            </p>
            <div className="text-[11px] bg-slate-800 p-2.5 rounded-lg border border-slate-700 text-teal-300">
              Incubator Concept developed for <strong>JECRC Incubation Centre (JIC)</strong>, JECRC Foundation, Jaipur.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentScreen('dashboard')} className="hover:text-brand-300 cursor-pointer">Sanctuary Dashboard</button></li>
              <li><button onClick={() => setCurrentScreen('mood-checkin')} className="hover:text-brand-300 cursor-pointer">Daily Reflection & Mood Log</button></li>
              <li><button onClick={() => setCurrentScreen('wellness')} className="hover:text-brand-300 cursor-pointer">Wellness Toolkit Hub</button></li>
              <li><button onClick={() => setCurrentScreen('breathing')} className="hover:text-brand-300 cursor-pointer">Mindful Box Breathing</button></li>
              <li><button onClick={() => setCurrentScreen('grounding')} className="hover:text-brand-300 cursor-pointer">5-4-3-2-1 Sensory Grounding</button></li>
              <li><button onClick={() => setCurrentScreen('journal')} className="hover:text-brand-300 cursor-pointer">Private Wellness Journal</button></li>
              <li><button onClick={() => setCurrentScreen('ai-companion')} className="hover:text-brand-300 cursor-pointer">AI Wellness Companion</button></li>
            </ul>
          </div>

          {/* Telemedicine & Incubation */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Telehealth & Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentScreen('professionals')} className="hover:text-brand-300 cursor-pointer">Find Counsellor or Doctor</button></li>
              <li><button onClick={() => setCurrentScreen('appointments')} className="hover:text-brand-300 cursor-pointer">Appointment Management</button></li>
              <li><button onClick={() => setCurrentScreen('records')} className="hover:text-brand-300 cursor-pointer">Telemedicine Demo Prescription</button></li>
              <li><button onClick={() => setCurrentScreen('reminders')} className="hover:text-brand-300 cursor-pointer">Daily Habits & Reminders</button></li>
              <li><button onClick={() => setCurrentScreen('progress')} className="hover:text-brand-300 cursor-pointer">Personal Analytics</button></li>
              <li><button onClick={() => setCurrentScreen('doctor-portal')} className="hover:text-brand-300 text-amber-300 cursor-pointer">Doctor Portal Demo</button></li>
              <li><button onClick={() => setCurrentScreen('admin-overview')} className="hover:text-brand-300 text-teal-300 cursor-pointer">JIC Incubator Analytics</button></li>
            </ul>
          </div>

          {/* Ethics & Legal */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Compliance & Ethics</h4>
            <ul className="space-y-2 text-xs mb-4">
              <li><button onClick={() => setCurrentScreen('privacy')} className="hover:text-brand-300 cursor-pointer">Privacy & DPDP Act Standards</button></li>
              <li><button onClick={() => setCurrentScreen('terms')} className="hover:text-brand-300 cursor-pointer">Terms of Demonstration</button></li>
              <li><button onClick={() => setCurrentScreen('about')} className="hover:text-brand-300 cursor-pointer">Founder & Academic Vision</button></li>
              <li><button onClick={() => setCurrentScreen('contact')} className="hover:text-brand-300 cursor-pointer">JIC Feedback & Contact</button></li>
            </ul>
            <button
              onClick={() => {
                resetAllDemoData();
                alert('Prototype demo data has been reset to default initial presentation state.');
              }}
              className="flex items-center space-x-1.5 text-[11px] bg-red-950/60 hover:bg-red-900 border border-red-700/50 text-red-200 px-2.5 py-1.5 rounded cursor-pointer transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Mentor Demo Data</span>
            </button>
          </div>
        </div>

        {/* Clinical Safety & Medical Disclaimer */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
          <p className="max-w-4xl mx-auto leading-relaxed">
            <strong>Medical Disclaimer:</strong> SAFE CARE is an educational, habit-tracking, and telemedicine routing prototype. It does not provide clinical diagnoses, cure, or medical treatments. If you are experiencing a life-threatening emergency or crisis, please immediately dial <strong>112 (National Emergency)</strong> or <strong>14416 (Tele-MANAS, Govt. of India)</strong>.
          </p>
          <p>© {new Date().getFullYear()} SAFE CARE Incubation Project. Designed by Aftab (CSE-AI, JECRC Foundation).</p>
        </div>
      </div>
    </footer>
  );
};
