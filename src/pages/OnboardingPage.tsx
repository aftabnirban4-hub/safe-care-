import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Shield, ArrowRight, Sparkles, Heart } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { setCurrentScreen, user, setUser } = useApp();
  const [step, setStep] = useState(1);

  const focusOptions = [
    'Academic & Exam Pressure',
    'Better Sleep Quality',
    'Managing Overwhelm & Stress',
    'Workplace & Career Uncertainty',
    'Building Consistent Daily Habits',
    'Finding a Trusted Professional'
  ];

  const goalOptions = [
    'Take a 1-minute breathing break daily',
    'Reflect on my mood every evening',
    'Reduce screen time before bed',
    'Learn somatic grounding techniques',
    'Book an exploratory counselling session'
  ];

  const toggleFocus = (item: string) => {
    setUser(prev => {
      const exists = prev.selectedFocus.includes(item);
      const updated = exists
        ? prev.selectedFocus.filter(f => f !== item)
        : [...prev.selectedFocus, item];
      return { ...prev, selectedFocus: updated };
    });
  };

  const toggleGoal = (item: string) => {
    setUser(prev => {
      const exists = prev.wellnessGoals.includes(item);
      const updated = exists
        ? prev.wellnessGoals.filter(g => g !== item)
        : [...prev.wellnessGoals, item];
      return { ...prev, wellnessGoals: updated };
    });
  };

  return (
    <div className="min-h-screen bg-calm-bg flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        
        {/* Progress Dots */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-brand-600 fill-brand-600/20" />
            <span className="font-bold text-sm text-slate-800">SAFE CARE Onboarding</span>
          </div>
          <div className="flex space-x-1.5">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  step === s ? 'w-6 bg-brand-600' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="inline-block p-3 bg-brand-50 rounded-2xl text-brand-700">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Welcome to your Sanctuary</h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                SAFE CARE is your judgment-free, confidential space to track wellness, regain calm, and connect with licensed care at your own pace.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Zero Pressure Guarantee</span>
              </div>
              <p>We do not ask for intimate clinical details or pass judgments. You control everything you log.</p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md transition cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Focus Areas */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">What would you like to focus on?</h2>
              <p className="text-xs text-slate-500 mt-1">Select all that resonate. You can change this anytime.</p>
            </div>

            <div className="space-y-2.5">
              {focusOptions.map(option => {
                const selected = user.selectedFocus.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleFocus(option)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition cursor-pointer ${
                      selected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{option}</span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        selected ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Personalize Your Small Habits</h2>
              <p className="text-xs text-slate-500 mt-1">Mental wellness happens in small, consistent daily steps.</p>
            </div>

            <div className="space-y-2.5">
              {goalOptions.map(goal => {
                const selected = user.wellnessGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition cursor-pointer ${
                      selected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{goal}</span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        selected ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Privacy & Consent */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Privacy & Consent Choices</h2>
              <p className="text-xs text-slate-500 mt-1">Designed under Indian DPDP Act principles.</p>
            </div>

            <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl space-y-3 text-xs text-teal-900">
              <div className="font-bold flex items-center gap-2 text-teal-800">
                <Shield className="w-4 h-4 text-teal-700" />
                <span>Local Demonstration Storage</span>
              </div>
              <p className="leading-relaxed">
                All mock moods, journals, and bookings reside in your client browser state. No marketing trackers or unencrypted data transfers are active.
              </p>
              <label className="flex items-center space-x-2 pt-2 cursor-pointer font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={user.privacyConsent}
                  onChange={(e) => setUser(u => ({ ...u, privacyConsent: e.target.checked }))}
                  className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4 cursor-pointer"
                />
                <span>I understand and agree to the demo wellness data policy</span>
              </label>
            </div>

            <button
              onClick={() => {
                setUser(u => ({ ...u, onboarded: true }));
                setCurrentScreen('dashboard');
              }}
              disabled={!user.privacyConsent}
              className={`w-full py-3.5 rounded-xl text-xs font-bold transition shadow-md cursor-pointer ${
                user.privacyConsent
                  ? 'bg-brand-700 hover:bg-brand-800 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Enter Sanctuary Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
