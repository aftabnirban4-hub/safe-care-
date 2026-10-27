import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Check, Sparkles, Eye, Hand, Volume2, Flower2, Coffee } from 'lucide-react';

export const GroundingPage: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      num: 5,
      icon: Eye,
      title: '5 Things You Can See',
      desc: 'Look around your room or campus right now. Notice 5 distinct objects (e.g., your pen, the light on the wall, a window frame, a book, your shoes).'
    },
    {
      num: 4,
      icon: Hand,
      title: '4 Things You Can Feel',
      desc: 'Notice physical sensations: the texture of your shirt, the solid floor beneath your shoes, the cool desk surface, or air from the fan.'
    },
    {
      num: 3,
      icon: Volume2,
      title: '3 Things You Can Hear',
      desc: 'Listen carefully. A ceiling fan, distant vehicle sounds on Jaipur roads, or the gentle sound of your own steady breathing.'
    },
    {
      num: 2,
      icon: Flower2,
      title: '2 Things You Can Smell',
      desc: 'Notice any scent in the air, whether fresh notebook paper, morning tea/coffee, rain, or campus trees.'
    },
    {
      num: 1,
      icon: Coffee,
      title: '1 Thing You Can Taste',
      desc: 'Take a sip of water or notice the present neutral taste in your mouth. Anchor your mind completely into the present moment.'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('wellness')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Wellness Toolkit</span>
        </button>
        <span className="text-xs bg-indigo-50 text-indigo-800 font-semibold px-3 py-1 rounded-full border border-indigo-200">
          5-4-3-2-1 Sensory Method
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">5-4-3-2-1 Sensory Grounding</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            When overwhelming anxious thoughts pull you away, use your 5 senses to bring your nervous system back into this room.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between items-center py-2">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer ${
                currentStep === idx
                  ? 'bg-brand-700 text-white shadow-md'
                  : currentStep > idx
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {s.num}
            </button>
          ))}
        </div>

        {/* Step Card */}
        {(() => {
          const step = steps[currentStep];
          const Icon = step.icon;
          return (
            <div className="bg-brand-50/50 border border-brand-200 rounded-3xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-700 text-white flex items-center justify-center mx-auto shadow-xs">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-slate-900">{step.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                {step.desc}
              </p>
            </div>
          );
        })()}

        {/* Actions */}
        <div className="flex justify-between pt-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            Previous Sense
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              I Noticed These → Next
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs flex items-center space-x-1 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Complete & Return to Sanctuary</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
