import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, Wind, BookOpen, MessageSquareText, Stethoscope, 
  Calendar, CheckCircle, ArrowRight, ShieldCheck, Sparkles, Bell, BarChart2
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, setCurrentScreen, moodHistory, appointments, reminders } = useApp();

  const latestMood = moodHistory[0];
  const upcomingApt = appointments.find(a => a.status === 'Scheduled');
  const activeReminders = reminders.filter(r => r.enabled);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-800 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs text-teal-200 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome back to your Sanctuary</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hello, {user.displayName}
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
            Take a moment to breathe and observe how you're feeling right now. There are no right or wrong emotions today.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setCurrentScreen('mood-checkin')}
              className="bg-white text-brand-900 hover:bg-teal-50 px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Log Daily Reflection
            </button>
            <button
              onClick={() => setCurrentScreen('breathing')}
              className="bg-brand-900/70 hover:bg-brand-900 text-white border border-teal-300/30 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              1-Minute Box Breathing
            </button>
            <button
              onClick={() => setCurrentScreen('ai-companion')}
              className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Chat with AI Companion
            </button>
          </div>
        </div>
      </div>

      {/* Quick Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setCurrentScreen('mood-checkin')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-300 text-left transition cursor-pointer"
        >
          <div className="text-xs text-slate-500">Current Mood Status</div>
          <div className="text-lg font-black text-brand-700 mt-1 flex items-center gap-2">
            <span>{latestMood ? latestMood.mood : 'Not logged'}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Last: {latestMood?.date || 'Today'}</div>
        </button>

        <button
          onClick={() => setCurrentScreen('progress')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-300 text-left transition cursor-pointer"
        >
          <div className="text-xs text-slate-500">Total Check-Ins</div>
          <div className="text-lg font-black text-slate-800 mt-1">{moodHistory.length} Recorded</div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">Demonstration State Active</div>
        </button>

        <button
          onClick={() => setCurrentScreen('reminders')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-300 text-left transition cursor-pointer"
        >
          <div className="text-xs text-slate-500">Active Daily Habits</div>
          <div className="text-lg font-black text-slate-800 mt-1">{user.wellnessGoals.length} Tracked</div>
          <div className="text-[11px] text-slate-400 mt-1">{activeReminders.length} Reminders enabled</div>
        </button>

        <button
          onClick={() => setCurrentScreen(upcomingApt ? 'video-consultation' : 'professionals')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-brand-300 text-left transition cursor-pointer"
        >
          <div className="text-xs text-slate-500">Next Tele-Consult</div>
          <div className="text-lg font-black text-teal-700 mt-1 truncate">
            {upcomingApt ? upcomingApt.time : 'No Upcoming'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {upcomingApt ? upcomingApt.professionalName.split(' ')[1] : 'Easily book below'}
          </div>
        </button>
      </div>

      {/* Main Grid: Action Deck & Upcoming Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Quick Actions */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-bold text-slate-900">Self-Care Quick Access</h2>
              <button
                onClick={() => setCurrentScreen('wellness')}
                className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Toolkit Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'mood-checkin' as const, label: 'Mood Reflection', desc: 'Identify emotions & triggers', icon: Heart, color: 'text-rose-600 bg-rose-50' },
                { id: 'breathing' as const, label: 'Guided Breathing', desc: 'Box breathing to relax', icon: Wind, color: 'text-teal-600 bg-teal-50' },
                { id: 'grounding' as const, label: '5-4-3-2-1 Grounding', desc: 'Anchor against sensory panic', icon: Sparkles, color: 'text-indigo-600 bg-indigo-50' },
                { id: 'journal' as const, label: 'Private Journal', desc: 'Thought unpack with prompts', icon: BookOpen, color: 'text-amber-600 bg-amber-50' },
                { id: 'ai-companion' as const, label: 'AI Companion', desc: 'Friendly wellness routing', icon: MessageSquareText, color: 'text-emerald-600 bg-emerald-50' },
                { id: 'professionals' as const, label: 'Doctors Directory', desc: 'Verified counselors & MDs', icon: Stethoscope, color: 'text-blue-600 bg-blue-50' },
                { id: 'reminders' as const, label: 'Reminders & Habits', desc: 'Manage your daily gentle schedule', icon: Bell, color: 'text-purple-600 bg-purple-50' },
                { id: 'progress' as const, label: 'Wellness Analytics', desc: 'Private reflection history', icon: BarChart2, color: 'text-teal-600 bg-teal-50' },
                { id: 'records' as const, label: 'Telehealth Records', desc: 'View prescriptions & notes', icon: ShieldCheck, color: 'text-slate-600 bg-slate-100' },
              ].map(action => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => setCurrentScreen(action.id)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-sm text-left transition group cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${action.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-brand-700 transition">
                      {action.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{action.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Micro-Habit Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Today’s Gentle Wellness Routine</h3>
                <p className="text-xs text-slate-500">No penalties for missed days — progress at your own pace.</p>
              </div>
              <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                Student Mode
              </span>
            </div>

            <div className="space-y-2.5">
              {user.wellnessGoals.map((goal, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center space-x-2.5 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{goal}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Daily habit</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Tele-consultation & Safe Support */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Appointment Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>Next Tele-Consult</span>
              </h3>
              <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full">
                Simulated
              </span>
            </div>

            {upcomingApt ? (
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-xs">
                    MD
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{upcomingApt.professionalName}</div>
                    <div className="text-[11px] text-teal-800">{upcomingApt.role} • {upcomingApt.mode} Call</div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-teal-100/50">
                  <div><strong>Date:</strong> {upcomingApt.date} at {upcomingApt.time}</div>
                  <div><strong>Ref:</strong> <span className="font-mono text-teal-800">{upcomingApt.bookingRef}</span></div>
                </div>

                <button
                  onClick={() => setCurrentScreen('video-consultation')}
                  className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition"
                >
                  Join Simulated Consultation Room
                </button>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p>No appointment scheduled yet.</p>
                <button
                  onClick={() => setCurrentScreen('professionals')}
                  className="mt-3 text-brand-700 font-bold hover:underline cursor-pointer"
                >
                  Find a Doctor or Counselor →
                </button>
              </div>
            )}
          </div>

          {/* Need More Support Card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-brand-300">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Campus Care Guarantee</span>
            </div>
            <h4 className="font-bold text-sm">Need someone to talk to right now?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Counselors are available for exam stress, career anxiety, and mental health assistance.
            </p>
            <button
              onClick={() => setCurrentScreen('professionals')}
              className="w-full py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-900 font-bold rounded-xl text-xs transition cursor-pointer"
            >
              Browse Verified Directory
            </button>
          </div>

          {/* JIC Evaluation Quick Link */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-800">Evaluator / Mentor Shortcuts:</div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentScreen('doctor-portal')}
                className="flex-1 p-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-semibold rounded-lg text-center cursor-pointer"
              >
                Doctor Portal
              </button>
              <button
                onClick={() => setCurrentScreen('admin-overview')}
                className="flex-1 p-2 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-semibold rounded-lg text-center cursor-pointer"
              >
                JIC Analytics
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
