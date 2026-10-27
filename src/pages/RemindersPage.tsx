import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Clock, Plus, Trash2, ArrowLeft, Check, Sparkles } from 'lucide-react';

export const RemindersPage: React.FC = () => {
  const { setCurrentScreen, reminders, toggleReminder, addReminder, deleteReminder } = useApp();
  const [newLabel, setNewLabel] = useState('');
  const [newTime, setNewTime] = useState('09:00 PM');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    addReminder(newLabel.trim(), newTime);
    setNewLabel('');
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <span className="text-xs bg-purple-50 text-purple-800 font-bold px-3 py-1 rounded-full border border-purple-200">
            Gentle Daily Scheduling
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Wellness Reminders & Micro-Habits
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gentle self-care nudges designed for engineering students without annoying alarms.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-1.5 py-2.5 px-4 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Reminder</span>
        </button>
      </div>

      {/* Add Custom Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs animate-in fade-in">
          <div className="font-bold text-slate-900 text-sm">Create New Wellness Habit Reminder</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Reminder Name</label>
              <input
                type="text"
                placeholder="e.g. Afternoon stretch break in hostel"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Time</label>
              <input
                type="text"
                placeholder="e.g. 05:00 PM or 20 mins before bed"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="py-2.5 px-5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl cursor-pointer"
            >
              Save Habit Reminder
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="py-2.5 px-4 border border-slate-200 text-slate-600 rounded-xl font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reminders List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="font-bold text-slate-900 text-base">Configured Reminders</h2>

        <div className="space-y-3">
          {reminders.map(rem => (
            <div
              key={rem.id}
              className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                rem.enabled ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-50/30 border-slate-100 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <button
                  type="button"
                  onClick={() => toggleReminder(rem.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition cursor-pointer ${
                    rem.enabled ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 bg-white'
                  }`}
                  aria-label={`Toggle reminder ${rem.label}`}
                >
                  {rem.enabled && <Check className="w-4 h-4" />}
                </button>
                <div>
                  <div className={`font-bold text-xs sm:text-sm ${rem.enabled ? 'text-slate-900' : 'text-slate-400 line-through'}`}>
                    {rem.label}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-brand-600" />
                    <span>{rem.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  rem.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
                }`}>
                  {rem.enabled ? 'Active' : 'Paused'}
                </span>
                <button
                  onClick={() => deleteReminder(rem.id)}
                  className="text-slate-400 hover:text-red-600 p-1.5 rounded transition cursor-pointer"
                  title="Remove reminder"
                  aria-label={`Remove reminder ${rem.label}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
