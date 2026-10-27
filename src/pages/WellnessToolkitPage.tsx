import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wind, Sparkles, BookOpen, Moon, Droplets, Sun, 
  ArrowRight, ShieldCheck, Heart, ArrowLeft, RefreshCw 
} from 'lucide-react';

export const WellnessToolkitPage: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [affirmationIdx, setAffirmationIdx] = useState(0);

  const affirmations = [
    "I am capable of handling this semester one assignment and one day at a time.",
    "My worth as a human is not defined by one placement interview or grade.",
    "Taking five minutes to breathe is productive self-care, not wasted time.",
    "It is strong and mature to pause when feeling overwhelmed.",
    "I am learning, growing, and building resilience every single day."
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Somatic & Cognitive Self-Care Deck</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Wellness Toolkit & Micro-Practices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Quick, scientifically grounded practices to regulate your nervous system, release exam anxiety, and restore cognitive clarity.
          </p>
        </div>
      </div>

      {/* Daily Affirmation Card */}
      <div className="bg-gradient-to-r from-teal-50 to-brand-50 border border-teal-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Daily Grounding Affirmation for College Engineers</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-800 italic">
            "{affirmations[affirmationIdx]}"
          </p>
          <div className="text-[11px] text-slate-500">Read this aloud or mentally reflect on it during study breaks.</div>
        </div>
        <button
          onClick={() => setAffirmationIdx((affirmationIdx + 1) % affirmations.length)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-teal-200 text-teal-800 hover:bg-teal-100 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Next Affirmation</span>
        </button>
      </div>

      {/* Core Interactive Practice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Box Breathing */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                1-2 Min Protocol
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">Box Breathing (4-4-4-4)</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Equalized pacing (Inhale 4s, Hold 4s, Exhale 4s, Pause 4s) to reset your vagal tone during acute panic or exam fatigue.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('breathing')}
            className="w-full mt-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Launch Breathing Timer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5-4-3-2-1 Sensory Grounding */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                Sensory Anchoring
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">5-4-3-2-1 Grounding</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Direct your awareness into the physical room through sight, touch, sound, smell, and taste to halt escalating racing thoughts.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('grounding')}
            className="w-full mt-6 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Start Sensory Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Private Reflective Journal */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                Reflective Space
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">Confidential Journal</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Unpack daily study challenges and celebrate small personal milestones with prompt templates stored safely in client memory.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('journal')}
            className="w-full mt-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Open Private Journal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bedtime Disconnect Guide */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Sleep Hygiene for Engineers</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cut blue screen exposure 30 minutes before sleep. Consistent 7 hours of sleep improves code retention and problem-solving by 40%.
            </p>
            <div className="text-[11px] text-teal-700 bg-teal-50 p-2.5 rounded-xl border border-teal-100">
              Tip: Keep your phone across the room to prevent 1 AM scrolling loops.
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('reminders')}
            className="w-full mt-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Enable Bedtime Reminder
          </button>
        </div>

        {/* Hydration & Campus Walk */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Hydration & Movement</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dehydration mimics anxiety by accelerating heart rate. Drink 300ml water and take a 5-minute stroll around the campus lawn between study blocks.
            </p>
            <div className="text-[11px] text-blue-700 bg-blue-50 p-2.5 rounded-xl border border-blue-100">
              Tip: Step outside into natural daylight to reset your circadian rhythms.
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('reminders')}
            className="w-full mt-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Enable Hydration Alert
          </button>
        </div>

        {/* AI Companion Access */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Wellness Companion</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Need immediate reflective guidance? Converse with our respectful AI assistant designed specifically with Indian emergency crisis routing.
            </p>
            <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              Safe & ethical: Recommends certified doctors when needed.
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('ai-companion')}
            className="w-full mt-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Open Companion Chat
          </button>
        </div>
      </div>

    </div>
  );
};
