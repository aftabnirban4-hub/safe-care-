import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Users, Heart, Stethoscope, ShieldCheck, ArrowLeft, TrendingUp, BarChart3, CheckCircle } from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const { setCurrentScreen, moodHistory, appointments } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900">JIC Incubation Analytics Overview</h1>
            <span className="text-xs bg-brand-100 text-brand-800 font-bold px-2.5 py-0.5 rounded-full">
              Mentor View
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulated high-level platform health metrics for JECRC Incubation Centre evaluators.
          </p>
        </div>

        <button
          onClick={() => alert('JIC Pitch Deck Metrics exported: Pilot engagement 88%, Retention 74%, Telehealth conversion 18%.')}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-xs cursor-pointer"
        >
          Download Pitch Metrics PDF
        </button>
      </div>

      {/* JIC Key Metric KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Student Users (Pilot)</div>
          <div className="text-2xl font-black text-slate-900 mt-1">1,240</div>
          <div className="text-[10px] text-teal-600 mt-1 font-semibold">JECRC Campus Target</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Reflections Logged</div>
          <div className="text-2xl font-black text-brand-700 mt-1">{moodHistory.length + 420}</div>
          <div className="text-[10px] text-slate-400 mt-1">Simulated aggregation</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Breathing Sessions</div>
          <div className="text-2xl font-black text-indigo-700 mt-1">892</div>
          <div className="text-[10px] text-slate-400 mt-1">4-4-4-4 Cycles complete</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Tele-Consults Completed</div>
          <div className="text-2xl font-black text-teal-700 mt-1">{appointments.length + 65}</div>
          <div className="text-[10px] text-emerald-600 mt-1 font-semibold">Doctor-verified demo</div>
        </div>
      </div>

      {/* Top Stress Triggers on Campus */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-brand-600" />
          <span>Aggregated Campus Triggers (Fictional Pilot Data)</span>
        </h2>
        <div className="space-y-3 pt-2">
          {[
            { label: 'Exams & Continuous Assessment', pct: 44, count: '545 students' },
            { label: 'Campus Placements & Career Anxiety', pct: 28, count: '347 students' },
            { label: 'Sleep Deprivation & Late Study', pct: 18, count: '223 students' },
            { label: 'Social & Peer Loneliness', pct: 10, count: '125 students' },
          ].map((t, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{t.label} ({t.count})</span>
                <span>{t.pct}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600 rounded-full" style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JIC Strategic Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>Incubation Pilot Milestones</span>
          </div>
          <h3 className="font-bold text-base">Stage 1: Campus Deployment</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Deployment across JECRC University engineering departments with student mentors trained on non-judgmental peer listening and Tele-MANAS escalation pathways.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>DPDP & Clinical Compliance</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Zero Clinical Liability Design</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Self-care modules maintain clear legal demarcation from clinical prescriptions. All medical consultations are strictly executed by registered third-party medical doctors.
          </p>
        </div>
      </div>

    </div>
  );
};
