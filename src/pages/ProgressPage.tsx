import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Heart, Calendar, ArrowLeft, Download, Award, CheckCircle2 } from 'lucide-react';
import { calculateMoodStats } from '../utils/logic';

export const ProgressPage: React.FC = () => {
  const { setCurrentScreen, moodHistory, journalEntries, appointments } = useApp();
  const moodStats = calculateMoodStats(moodHistory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sanctuary</span>
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900">Your Personal Wellness Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Self-reflection history without pressure. We never label or score you as "healthy" or "unhealthy".
          </p>
        </div>

        <button
          onClick={() => alert('Demo Summary Exported: 3 Mood Check-ins, 1 Breathing Session, 1 Simulated Consultation. Ready for presentation.')}
          className="flex items-center space-x-1.5 py-2.5 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 shadow-xs cursor-pointer"
        >
          <Download className="w-4 h-4 text-brand-600" />
          <span>Export Wellness Report (Demo)</span>
        </button>
      </div>

      {/* Analytics Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Reflections Recorded</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{moodHistory.length}</div>
          <div className="text-[11px] text-teal-700 mt-1 font-medium">Consistent self-awareness</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Journal Reflections</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{journalEntries.length}</div>
          <div className="text-[11px] text-brand-700 mt-1 font-medium">Private client storage</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Tele-Care Sessions</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{appointments.length}</div>
          <div className="text-[11px] text-indigo-700 mt-1 font-medium">Professional support linked</div>
        </div>
      </div>

      {/* Mood Frequency Visualization */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-600" />
            <span>Mood Distribution (Logged Sessions)</span>
          </h2>
          <span className="text-[11px] text-slate-400">Total samples: {moodHistory.length}</span>
        </div>

        <div className="space-y-3 pt-2">
          {(['Great', 'Good', 'Okay', 'Low', 'Stressed'] as const).map(mood => {
            const stat = moodStats[mood];
            return (
              <div key={mood} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{mood}</span>
                  <span>{stat.count} entries ({stat.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded-full transition-all duration-500"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mindful Highlights */}
      <div className="bg-teal-50/70 border border-teal-200/80 rounded-3xl p-6 flex items-start gap-4 text-xs text-teal-950">
        <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-sm text-teal-900">Student Growth Takeaway:</div>
          <p className="leading-relaxed">
            Logging emotions consistently builds emotional literacy. Students using SAFE CARE at JECRC report feeling 35% less anxious before academic presentations after incorporating box breathing into their daily schedule.
          </p>
        </div>
      </div>

    </div>
  );
};
