import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MoodType } from '../types';
import { Heart, Sparkles, Check, ArrowLeft, Trash2, Calendar } from 'lucide-react';

export const MoodCheckinPage: React.FC = () => {
  const { setCurrentScreen, addMoodEntry, moodHistory, deleteMoodEntry } = useApp();

  const [selectedMood, setSelectedMood] = useState<MoodType>('Good');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(['Calm']);
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['College', 'Good Sleep']);
  const [note, setNote] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const moodOptions: { type: MoodType; emoji: string; desc: string }[] = [
    { type: 'Great', emoji: '🌟', desc: 'Energized & grounded' },
    { type: 'Good', emoji: '🙂', desc: 'Positive & balanced' },
    { type: 'Okay', emoji: '😐', desc: 'Neutral, getting by' },
    { type: 'Low', emoji: '😔', desc: 'Tired, feeling heavy' },
    { type: 'Stressed', emoji: '⚡', desc: 'Anxious, overwhelmed' },
  ];

  const emotionList = [
    'Calm', 'Grateful', 'Hopeful', 'Exhausted', 'Anxious', 
    'Overwhelmed', 'Irritable', 'Lonely', 'Motivated', 'Restless'
  ];

  const factorList = [
    'Academics / Exams', 'College Placements', 'Good Sleep', 'Lack of Sleep',
    'Family & Relationships', 'Workplace / Internship', 'Physical Health',
    'Financial Stress', 'Screen Time', 'Campus Walk'
  ];

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    addMoodEntry({
      date: today,
      timestamp: timeStr,
      mood: selectedMood,
      emotions: selectedEmotions,
      factors: selectedFactors,
      note: note.trim()
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setCurrentScreen('dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Back button & Heading */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <span className="text-xs bg-brand-50 text-brand-800 font-semibold px-3 py-1 rounded-full border border-brand-200">
          Self-Reflection Log
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">How are you feeling right now?</h1>
          <p className="text-xs text-slate-500 mt-1">
            Tracking emotions helps you notice patterns over time. This is for your self-reflection and not a clinical diagnosis.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center space-x-2 text-sm font-semibold animate-in fade-in">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Reflection recorded successfully! Updating sanctuary dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Mood Selector Cards */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              1. Select Primary Mood
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {moodOptions.map(m => (
                <button
                  type="button"
                  key={m.type}
                  onClick={() => setSelectedMood(m.type)}
                  className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                    selectedMood === m.type
                      ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/30 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-2xl mb-1">{m.emoji}</span>
                  <span className="text-xs">{m.type}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Specific Emotions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Specific Emotions (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {emotionList.map(em => {
                const active = selectedEmotions.includes(em);
                return (
                  <button
                    type="button"
                    key={em}
                    onClick={() => toggleItem(selectedEmotions, setSelectedEmotions, em)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                      active
                        ? 'bg-brand-700 text-white font-semibold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {em}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contributing Triggers */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Influencing Triggers (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {factorList.map(f => {
                const active = selectedFactors.includes(f);
                return (
                  <button
                    type="button"
                    key={f}
                    onClick={() => toggleItem(selectedFactors, setSelectedFactors, f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                      active
                        ? 'bg-teal-700 text-white font-semibold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Private Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              4. Private Reflection Note (Optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's taking up mental bandwidth today? (e.g., studying for semester exam, felt good after campus walk)"
              className="w-full text-xs p-3.5 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="py-3 px-6 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
            >
              Save Reflection Entry
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('dashboard')}
              className="py-3 px-5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

      {/* Historical Entries Review */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-600" />
          <span>Your Recent Reflection Log</span>
        </h2>

        {moodHistory.length === 0 ? (
          <p className="text-xs text-slate-400">No reflections logged yet.</p>
        ) : (
          <div className="space-y-3">
            {moodHistory.map(entry => (
              <div key={entry.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900">{entry.mood}</span>
                    <span className="text-[10px] text-slate-400">• {entry.date} at {entry.timestamp}</span>
                  </div>
                  {entry.emotions.length > 0 && (
                    <div className="text-[11px] text-brand-700">
                      <strong>Emotions:</strong> {entry.emotions.join(', ')}
                    </div>
                  )}
                  {entry.factors.length > 0 && (
                    <div className="text-[11px] text-teal-800">
                      <strong>Triggers:</strong> {entry.factors.join(', ')}
                    </div>
                  )}
                  {entry.note && (
                    <p className="text-xs text-slate-600 italic pt-1">"{entry.note}"</p>
                  )}
                </div>

                <button
                  onClick={() => deleteMoodEntry(entry.id)}
                  className="text-slate-400 hover:text-red-600 p-1.5 rounded transition cursor-pointer"
                  title="Delete entry from demo"
                  aria-label={`Delete mood entry from ${entry.date}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
