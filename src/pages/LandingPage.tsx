import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, Shield, Sparkles, Stethoscope, ArrowRight, Brain, 
  Smile, Moon, Clock, CheckCircle2, Award, Users, BookOpen
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentScreen, setOpenAuthModal } = useApp();

  return (
    <div className="min-h-screen bg-calm-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Empathetic Mental Wellness Prototype for JIC Incubation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Your Mental Wellness <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-teal-500">
                  Deserves True Care.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Check in with yourself daily, build resilient routines, and connect seamlessly with certified mental health professionals and campus-friendly telemedicine.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setCurrentScreen('onboarding')}
                  className="flex items-center justify-center space-x-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-700/20 transition-all text-sm group cursor-pointer"
                >
                  <span>Start Your Wellness Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setCurrentScreen('wellness')}
                  className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-6 py-3.5 rounded-xl transition text-sm shadow-xs cursor-pointer"
                >
                  <span>Explore Wellness Tools</span>
                </button>
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className="flex items-center justify-center space-x-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold px-5 py-3.5 rounded-xl transition text-sm cursor-pointer"
                >
                  <span>Direct Sanctuary Demo</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Confidential Demo State</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-brand-600" />
                  <span>Stigma-Free for Men & Young Adults</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>JECRC Incubation Pilot</span>
                </div>
              </div>
            </div>

            {/* Interactive Hero Illustration / Mock Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-bold text-sm">
                      AF
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Daily Sanctuary Check-in</div>
                      <div className="text-xs text-slate-400">Jaipur • Campus Mode</div>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full">
                    Balanced
                  </span>
                </div>

                <div className="bg-brand-50/70 p-4 rounded-2xl border border-brand-100">
                  <p className="text-xs text-brand-900 font-medium mb-2">How is your energy right now?</p>
                  <div className="flex justify-between gap-1">
                    {[
                      { emoji: '🌟', label: 'Great' },
                      { emoji: '🙂', label: 'Good' },
                      { emoji: '😐', label: 'Okay' },
                      { emoji: '😔', label: 'Low' },
                      { emoji: '⚡', label: 'Stressed' }
                    ].map((m, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentScreen('mood-checkin')}
                        className="text-xs bg-white/90 hover:bg-white px-2 py-1.5 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer text-center"
                      >
                        <div>{m.emoji}</div>
                        <div className="text-[10px] mt-0.5">{m.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => setCurrentScreen('breathing')}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-300 text-left cursor-pointer transition"
                  >
                    <div className="text-slate-400 font-medium">Breathe & Reset</div>
                    <div className="font-bold text-slate-800 mt-1">4-4-4-4 Box Timer</div>
                    <div className="text-[11px] text-teal-600 mt-2 font-medium flex items-center gap-1">
                      <span>Ready in 1 click →</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('professionals')}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-300 text-left cursor-pointer transition"
                  >
                    <div className="text-slate-400 font-medium">Next Tele-Consult</div>
                    <div className="font-bold text-slate-800 mt-1">Dr. Sharma (Psych)</div>
                    <div className="text-[11px] text-brand-600 mt-2 font-medium">Tomorrow 4:30 PM →</div>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setCurrentScreen('dashboard')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
                  >
                    Enter Live Interactive Demo
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-wider text-brand-700">The Problem & Our Innovation</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Existing Solutions Fall Short for Students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Social Stigma & Privacy Fears</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Particularly among young college men and undergraduates, visiting an on-campus clinical counselor feels intimidating. SAFE CARE gives an anonymous, respectful starting point.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Fragmented Self-Care vs Medical Care</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Breathing apps don't connect you to doctors, while hospital booking portals feel transactional and cold. SAFE CARE merges daily mental micro-habits with verified tele-consultations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 transition">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Responsible, Safe AI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlike unverified chatbots, SAFE CARE's companion never pretends to diagnose or prescribe. It gently routes to Indian crisis lines (Tele-MANAS) or qualified verified therapists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Features */}
      <section className="py-16 bg-calm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-wider text-brand-700">Holistic Care Spectrum</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Built for Real Day-to-Day Well-Being
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                screen: 'mood-checkin' as const,
                icon: Smile,
                title: 'Empathetic Mood Logging',
                desc: 'Reflect in seconds on emotions, study triggers, and personal progress without clinical pressure.'
              },
              {
                screen: 'breathing' as const,
                icon: Brain,
                title: 'Guided Box Breathing',
                desc: 'Scientifically validated 4-4-4-4 pacing to alleviate panic, exam anxiety, and somatic tension.'
              },
              {
                screen: 'grounding' as const,
                icon: Sparkles,
                title: '5-4-3-2-1 Sensory Grounding',
                desc: 'Anchor rapidly when overwhelmed using physical senses and tactile surroundings.'
              },
              {
                screen: 'journal' as const,
                icon: BookOpen,
                title: 'Confidential Journal',
                desc: 'Reflective guided prompts stored strictly in private demo storage with 1-click wipe capability.'
              },
              {
                screen: 'ai-companion' as const,
                icon: Heart,
                title: 'AI Wellness Companion',
                desc: 'Supportive guidance and active grounding exercises with built-in Tele-MANAS crisis safety guardrails.'
              },
              {
                screen: 'professionals' as const,
                icon: Stethoscope,
                title: 'Telemedicine Booking',
                desc: 'Book audio, video, or in-person slots with demo psychologists, psychiatrists, and physicians.'
              }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentScreen(feat.screen)}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brand-300 text-left transition cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-brand-700 transition">{feat.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-wider text-brand-700">Simple 4-Step Flow</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              How SAFE CARE Operates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { step: '01', title: 'Daily Check-in', desc: 'Take 30 seconds to rate your mood, fatigue, and triggers.' },
              { step: '02', title: 'Ground & Breathe', desc: 'Use sensory grounding or box breathing before classes or study.' },
              { step: '03', title: 'AI Guided Reflection', desc: 'Discuss challenges with your private self-care assistant.' },
              { step: '04', title: 'Connect with Care', desc: 'Schedule certified video tele-consults when you need professional advice.' },
            ].map((s, idx) => (
              <div key={idx} className="p-4">
                <div className="text-3xl font-black text-brand-600/30 mb-2">{s.step}</div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{s.title}</h4>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incubation CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-brand-800 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="bg-brand-600/50 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full border border-teal-400/30">
            JECRC Foundation Incubation Centre (JIC)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to experience the working SAFE CARE prototype?
          </h2>
          <p className="text-sm text-teal-100 max-w-2xl mx-auto">
            Test the live mood logging, guided 5-4-3-2-1 exercise, AI conversation with safety checks, and simulated video doctor consultation.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="bg-white text-brand-900 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-teal-50 transition text-sm cursor-pointer"
            >
              Launch Interactive Student Dashboard
            </button>
            <button
              onClick={() => setCurrentScreen('about')}
              className="bg-brand-700/60 hover:bg-brand-700 text-white border border-teal-300/40 font-bold px-6 py-3.5 rounded-xl transition text-sm cursor-pointer"
            >
              Read Pitch & JIC Vision
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
