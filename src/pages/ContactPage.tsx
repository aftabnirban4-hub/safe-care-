import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      <div>
        <button
          onClick={() => setCurrentScreen('about')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to About JIC Vision</span>
        </button>
        <span className="text-xs bg-teal-50 text-teal-800 font-bold px-3 py-1 rounded-full border border-teal-200">
          Incubation Feedback
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Connect with the SAFE CARE Project Team
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Developed under JECRC Incubation Centre (JIC), JECRC Foundation, Jaipur.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Info Card */}
        <div className="md:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-md">
          <div className="space-y-1">
            <div className="text-xs text-teal-400 font-bold uppercase tracking-wider">Incubator Headquarters</div>
            <h3 className="font-extrabold text-lg">JECRC Incubation Centre</h3>
            <p className="text-xs text-slate-300">JECRC Foundation, Sitapura Industrial Area, Jaipur, Rajasthan 302022</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start space-x-3 text-slate-300">
              <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px]">Student Innovator:</span>
                <span className="font-semibold text-white">aftab.ai@jecrc.ac.in</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-slate-300">
              <Building2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px]">Incubation Office:</span>
                <span className="font-semibold text-white">jic@jecrc.ac.in</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-slate-300">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px]">Campus Hub:</span>
                <span className="font-semibold text-white">Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-800 rounded-xl text-[11px] text-teal-200 border border-slate-700">
            Open for university pilot evaluations, mental health clinical mentorship, and angel advisory.
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 text-base">Send Mentor Feedback or Inquiry</h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold text-sm">Thank You for Your Feedback!</div>
              <p className="text-xs text-emerald-700">
                Your message has been captured in the demo feedback repository.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Mentor / JIC Evaluator"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Feedback / Recommendation</label>
                <textarea
                  rows={4}
                  placeholder="Share feedback on the prototype, telemedicine architecture, or potential campus pilot..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-xs cursor-pointer transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Evaluation Note</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
