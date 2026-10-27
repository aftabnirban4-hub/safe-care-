import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, RotateCcw, ArrowLeft, Wind, Sparkles } from 'lucide-react';
import { getBreathingPhase, BreathingPhase } from '../utils/logic';

export const BreathingPage: React.FC = () => {
  const { setCurrentScreen } = useApp();

  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [cyclePhase, setCyclePhase] = useState<BreathingPhase>('Inhale');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const nextSec = prev + 1;
          const { phase } = getBreathingPhase(nextSec);
          setCyclePhase(phase);

          if (nextSec % 16 === 0) {
            setCycleCount(c => c + 1);
          }
          return nextSec;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setCyclePhase('Inhale');
    setCycleCount(0);
  };

  const getPhaseInstruction = () => {
    switch (cyclePhase) {
      case 'Inhale': return 'Breathe in slowly through your nose... expand your chest and belly';
      case 'Hold': return 'Gently hold your breath... stay relaxed and still';
      case 'Exhale': return 'Release slowly through your mouth... let all muscular tension melt away';
      case 'Pause': return 'Pause and rest calmly before the next gentle inhalation';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 text-center">
      
      <div className="flex items-center justify-between text-left">
        <button
          onClick={() => setCurrentScreen('wellness')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Wellness Toolkit</span>
        </button>
        <span className="text-xs bg-teal-50 text-teal-800 font-semibold px-3 py-1 rounded-full border border-teal-200">
          4-4-4-4 Box Breathing
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Guided Box Breathing</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2">
            Regulate your autonomic nervous system in just 1 to 2 minutes during exam pressure or anxious thoughts.
          </p>
        </div>

        {/* Breathing Animation Circle */}
        <div className="relative py-12 flex items-center justify-center">
          <div
            className={`w-64 h-64 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
              cyclePhase === 'Inhale' || cyclePhase === 'Hold'
                ? 'scale-110 bg-teal-50/80 border-teal-500 shadow-xl shadow-teal-500/10'
                : 'scale-90 bg-brand-50/40 border-brand-300'
            }`}
          >
            <div className="text-center space-y-1">
              <div className="text-xs font-bold uppercase tracking-widest text-teal-800">
                {cyclePhase}
              </div>
              <div className="text-4xl font-black text-slate-900 font-mono">
                {(seconds % 4) + 1}s
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Cycles completed: {cycleCount}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Text Prompt */}
        <div className="h-10 text-xs sm:text-sm font-semibold text-brand-900 max-w-md mx-auto">
          {isActive ? getPhaseInstruction() : 'Press "Start Breathing" whenever you are ready.'}
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-3 pt-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-brand-700 hover:bg-brand-800 text-white'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause' : 'Start Breathing'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="px-4 py-3 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 italic pt-4">
          Note: If you feel lightheaded at any moment, pause immediately and resume your normal comfortable breathing pattern.
        </div>
      </div>

    </div>
  );
};
