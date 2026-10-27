import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ArrowLeft, Lock, FileCheck, CheckCircle2 } from 'lucide-react';

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      <div>
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <span className="text-xs bg-teal-50 text-teal-800 font-bold px-3 py-1 rounded-full border border-teal-200">
          Compliance & Governance
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {type === 'privacy' ? 'Privacy Policy & DPDP Act Alignment' : 'Terms of Demonstration & Care Scope'}
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 text-xs text-slate-700 leading-relaxed shadow-xs">
        {type === 'privacy' ? (
          <>
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 flex items-center gap-3 text-teal-900 font-semibold">
              <Shield className="w-5 h-5 text-teal-700 shrink-0" />
              <span>Engineered in compliance with the Digital Personal Data Protection (DPDP) Act, 2023.</span>
            </div>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">1. Purpose Limitation</h2>
              <p>
                SAFE CARE collects only the minimum client-side data required to deliver interactive mood tracking, breathing regulation, and simulated tele-consultation scheduling. No commercial data harvesting occurs.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">2. Local Storage Autonomy</h2>
              <p>
                All mood check-in records, journal reflections, and demo appointment references are stored within the client's browser local storage. Users can permanently erase all stored records at any time using the "Reset Mentor Demo Data" button.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">3. Clinical Demarcation & Confidentiality</h2>
              <p>
                Journal entries are never parsed for advertising algorithms. AI Companion interactions run in an isolated environment that adheres to strict crisis detection protocols without retaining medical diagnostic profiles.
              </p>
            </section>
          </>
        ) : (
          <>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-3 text-amber-950 font-semibold">
              <FileCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <span>JECRC Incubation Centre (JIC) Startup Pitch Prototype Terms</span>
            </div>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">1. Educational & Evaluative Prototype</h2>
              <p>
                SAFE CARE is a functional incubation prototype designed by Aftab (CSE-AI) for the JECRC Incubation Centre evaluation. It demonstrates the product architecture, user workflows, and telemedicine integration.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">2. Not Emergency Medical Care</h2>
              <p>
                This application does not provide emergency medical intervention, suicide prevention dispatch, or clinical psychiatric prescriptions. In the event of a psychiatric emergency or acute self-harm distress, users in India must immediately contact <strong>Tele-MANAS (14416 / 1800-891-4416)</strong> or <strong>Emergency Services (112)</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-bold text-slate-900 text-sm">3. Simulated Professional Profiles</h2>
              <p>
                Physician and psychologist listings displayed during the prototype demonstration are illustrative personas created for incubation evaluation purposes.
              </p>
            </section>
          </>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
          <span>SAFE CARE Incubation Project • JECRC Foundation</span>
          <span>Last Updated: October 2026</span>
        </div>
      </div>

    </div>
  );
};
