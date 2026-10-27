import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Professional, Appointment } from '../types';
import { 
  Stethoscope, Star, Video, MapPin, Calendar, 
  Search, Filter, ShieldCheck, CheckCircle2, ArrowLeft, Phone, UserCheck, X
} from 'lucide-react';

export const ProfessionalsPage: React.FC = () => {
  const { professionals, setCurrentScreen, bookAppointment, appointments, cancelAppointment } = useApp();

  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTab, setViewTab] = useState<'directory' | 'my-appointments'>('directory');

  // Booking Modal State
  const [bookingProf, setBookingProf] = useState<Professional | null>(null);
  const [bookingMode, setBookingMode] = useState<'Video' | 'Audio' | 'In-person'>('Video');
  const [bookingDate, setBookingDate] = useState('2026-10-29');
  const [bookingTime, setBookingTime] = useState('04:00 PM');
  const [bookingNote, setBookingNote] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const filtered = professionals.filter(p => {
    const matchRole = selectedRole === 'All' || p.role === selectedRole;
    const matchMode = selectedMode === 'All' || p.availableModes.includes(selectedMode as any);
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchRole && matchMode && matchSearch;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingProf) return;
    const ref = bookAppointment({
      professionalId: bookingProf.id,
      professionalName: bookingProf.name,
      role: bookingProf.role,
      mode: bookingMode,
      date: bookingDate,
      time: bookingTime,
      status: 'Scheduled',
      notes: bookingNote
    });
    setConfirmedRef(ref);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <span className="text-xs bg-teal-50 text-teal-800 font-bold px-3 py-1 rounded-full border border-teal-200">
            Telemedicine & Mentorship
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Certified Mental Health Professionals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse verified counselors, clinical psychologists, and psychiatrists with campus-friendly consultations.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setViewTab('directory')}
            className={`px-4 py-2 rounded-lg transition cursor-pointer ${
              viewTab === 'directory' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Find Doctor ({professionals.length})
          </button>
          <button
            onClick={() => setViewTab('my-appointments')}
            className={`px-4 py-2 rounded-lg transition cursor-pointer ${
              viewTab === 'my-appointments' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Appointments ({appointments.length})
          </button>
        </div>
      </div>

      {viewTab === 'directory' ? (
        <>
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by name, exam anxiety, sleep, career stress, depression..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="text-xs p-2.5 border border-slate-200 rounded-xl bg-white font-medium text-slate-700 cursor-pointer"
                aria-label="Filter by specialty role"
              >
                <option value="All">All Categories</option>
                <option value="Counsellor">Counsellors</option>
                <option value="Psychologist">Psychologists</option>
                <option value="Psychiatrist">Psychiatrists</option>
                <option value="General Physician">General Physicians</option>
              </select>

              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="text-xs p-2.5 border border-slate-200 rounded-xl bg-white font-medium text-slate-700 cursor-pointer"
                aria-label="Filter by consultation mode"
              >
                <option value="All">All Modes</option>
                <option value="Video">Video Call</option>
                <option value="Audio">Audio Call</option>
                <option value="In-person">In-Person (Jaipur)</option>
              </select>
            </div>
          </div>

          {/* Professional Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filtered.map(prof => (
              <div key={prof.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-100"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{prof.name}</h3>
                        <p className="text-xs text-brand-700 font-semibold">{prof.role} • {prof.experience}</p>
                        <div className="flex items-center space-x-1 text-amber-500 text-xs mt-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold text-slate-800">{prof.rating}</span>
                          <span className="text-slate-400 text-[10px]">(Fictional Demo Profile)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900">₹{prof.consultationFee}</span>
                      <div className="text-[10px] text-slate-400">per 45m session</div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5">
                    {prof.specialties.map((s, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-0.5 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-slate-500 space-y-1 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prof.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>Next available: <strong className="text-teal-800">{prof.nextSlot}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Book CTA */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => {
                      setBookingProf(prof);
                      setConfirmedRef(null);
                    }}
                    className="flex-1 py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    Book Demo Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* My Appointments Tab */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="font-bold text-slate-900 text-base">Your Tele-Consultation Schedule</h2>
          {appointments.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No appointments booked yet.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map(apt => (
                <div key={apt.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{apt.professionalName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        apt.status === 'Scheduled' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      {apt.role} • <strong>{apt.mode} Session</strong>
                    </div>
                    <div className="text-xs text-slate-500">
                      📅 {apt.date} at ⏰ {apt.time} • Ref: <span className="font-mono font-bold text-teal-800">{apt.bookingRef}</span>
                    </div>
                    {apt.notes && (
                      <p className="text-[11px] text-slate-500 italic mt-1">Focus: "{apt.notes}"</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {apt.status === 'Scheduled' && (
                      <>
                        <button
                          onClick={() => setCurrentScreen('video-consultation')}
                          className="px-3.5 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Video Room</span>
                        </button>
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-3 py-2 border border-slate-300 text-slate-600 hover:text-red-700 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booking Modal Flow */}
      {bookingProf && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative">
            
            {confirmedRef ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-600">
                  Your simulated session with <strong>{bookingProf.name}</strong> has been scheduled.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-teal-800">
                  Demo Ref ID: <strong>{confirmedRef}</strong>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setBookingProf(null);
                      setCurrentScreen('video-consultation');
                    }}
                    className="flex-1 py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Test Video Consult Room
                  </button>
                  <button
                    onClick={() => {
                      setBookingProf(null);
                      setViewTab('my-appointments');
                    }}
                    className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    View in Appointments
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Schedule Tele-Consultation</h3>
                    <p className="text-xs text-slate-500">{bookingProf.name} ({bookingProf.role})</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingProf(null)}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Consultation Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Video', 'Audio', 'In-person'] as const).map(mode => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setBookingMode(mode)}
                          className={`p-2.5 rounded-xl border text-center font-semibold cursor-pointer ${
                            bookingMode === mode
                              ? 'border-brand-600 bg-brand-50 text-brand-900'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full p-2.5 border border-slate-200 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full p-2.5 border border-slate-200 rounded-xl"
                      >
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="06:30 PM">06:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Topics to Cover (Optional)</label>
                    <textarea
                      rows={2}
                      value={bookingNote}
                      onChange={(e) => setBookingNote(e.target.value)}
                      placeholder="e.g. Dealing with upcoming exam stress and sleep disturbances..."
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-900">
                    <strong>Simulated Booking:</strong> No real bank cards or SMS alerts required. This stores directly in your interactive demo session.
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition"
                  >
                    Confirm Booking (₹{bookingProf.consultationFee} Demo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingProf(null)}
                    className="px-4 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
