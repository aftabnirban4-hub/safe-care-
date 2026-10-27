import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Building2, User, Award, ShieldCheck, Mail, ArrowRight, Sparkles, MapPin, GraduationCap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4">
        <span className="text-xs bg-brand-50 text-brand-800 font-bold px-3 py-1 rounded-full border border-brand-200">
          JECRC Incubation Centre (JIC) Concept
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          About SAFE CARE
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          “Your Mind Matters. Your Care Matters.” Making mental wellness approachable, stigma-free, and seamlessly connected to professional telemedicine in India.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5 fill-brand-700/20" />
          </div>
          <h3 className="font-extrabold text-brand-800 text-base">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide college students, young professionals, and men an approachable digital sanctuary where daily emotional self-reflection is normal, healthy, and directly supported by licensed clinical care.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-teal-800 text-base">Our Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A future where no student in India feels ashamed to seek emotional guidance, and university campuses offer verified, instantaneous mental wellness support through responsible technology.
          </p>
        </div>
      </div>

      {/* Founder Introduction */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-700 to-teal-500 text-white flex items-center justify-center font-black text-3xl shadow-lg shrink-0">
            A
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs bg-teal-50 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
              Founder & Student Innovator
            </span>
            <h2 className="text-xl font-bold text-slate-900">Aftab</h2>
            <p className="text-xs font-semibold text-brand-700 flex items-center justify-center sm:justify-start gap-1">
              <GraduationCap className="w-4 h-4" />
              <span>Computer Science & Engineering (Artificial Intelligence) Student</span>
            </p>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>JECRC Foundation, Jaipur, Rajasthan, India</span>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              Driven by the observed challenges of exam anxiety, loneliness, and societal stigma on campus, Aftab designed SAFE CARE as an AI-assisted product architecture that respects clinical boundaries while providing real daily utility.
            </p>
          </div>
        </div>
      </div>

      {/* Incubation Alignment */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
        <div className="flex items-center space-x-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>JECRC Incubation Centre (JIC) Roadmap</span>
        </div>
        <h3 className="text-lg font-bold">Why SAFE CARE is Ready for Incubation</h3>
        <ul className="text-xs text-slate-300 space-y-2.5 leading-relaxed">
          <li>• <strong>Clear User Persona:</strong> Directly targets 18–25 year old university students and young engineers facing placement and exam distress.</li>
          <li>• <strong>Ethical AI Guardrails:</strong> Built from day one to reject pseudoscientific medical claims and trigger verified Indian helplines (Tele-MANAS, Kiran, 112).</li>
          <li>• <strong>Scalable Unit Economics:</strong> Campus B2B partnerships combined with a curated directory of verified telemedicine doctors.</li>
          <li>• <strong>DPDP Compliance Architecture:</strong> Client-authoritative data retention with easy one-click demo reset.</li>
        </ul>
        <div className="pt-2 flex gap-3">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="py-2.5 px-5 bg-brand-500 hover:bg-brand-400 text-slate-900 font-bold rounded-xl text-xs transition cursor-pointer"
          >
            Launch Prototype Sanctuary
          </button>
          <button
            onClick={() => setCurrentScreen('contact')}
            className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
          >
            Contact & JIC Pitch
          </button>
        </div>
      </div>

    </div>
  );
};
