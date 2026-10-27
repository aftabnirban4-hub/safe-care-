import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Stethoscope, Calendar, Clock, Video, CheckCircle, UserCheck, ArrowLeft, ShieldCheck, Search } from 'lucide-react';

export const DoctorPortalPage: React.FC = () => {
  const { appointments, setCurrentScreen, user } = useApp();
  const [activeTab, setActiveTab] = useState<'queue' | 'patients'>('queue');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Portal Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-teal-300 hover:text-teal-200 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Sanctuary</span>
          </button>
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4" />
            <span>SAFE CARE Clinician Dashboard (Demo)</span>
          </div>
          <h1 className="text-2xl font-bold">Dr. Ananya Sharma, Ph.D.</h1>
          <p className="text-xs text-slate-400">Registered Psychologist • JECRC Incubation Telehealth Partner</p>
        </div>

        <button
          onClick={() => setCurrentScreen('video-consultation')}
          className="bg-brand-500 hover:bg-brand-400 text-slate-900 px-5 py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer transition"
        >
          Launch Doctor Video Room
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Today's Scheduled Consults</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{appointments.length}</div>
          <div className="text-[11px] text-teal-700 mt-1 font-medium">All students pre-screened</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Student Patient Reach</div>
          <div className="text-2xl font-black text-brand-700 mt-1">42 Campus Users</div>
          <div className="text-[11px] text-slate-400 mt-1">JECRC Incubation Cohort</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500">Verified Telemedicine Mode</div>
          <div className="text-2xl font-black text-teal-700 mt-1">RMC Active</div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">Encrypted WebRTC Session</div>
        </div>
      </div>

      {/* Appointments Queues */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-slate-900 text-base">Upcoming Student Consultations Queue</h2>
          <span className="text-xs text-brand-700 bg-brand-50 font-semibold px-2.5 py-1 rounded-full">
            Live Queue Demo
          </span>
        </div>

        <div className="space-y-3">
          {appointments.map(apt => (
            <div key={apt.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">Student: {user.displayName}</span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded">
                    {apt.mode}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Scheduled for {apt.date} at {apt.time} • Booking Ref: <span className="font-mono font-bold text-slate-700">{apt.bookingRef}</span>
                </div>
                {apt.notes && (
                  <p className="text-[11px] text-slate-600 italic">Chief Issue: "{apt.notes}"</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentScreen('video-consultation')}
                  className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Start Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
