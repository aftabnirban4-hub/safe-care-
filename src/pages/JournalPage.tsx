import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JournalEntry } from '../types';
import { BookOpen, Plus, Trash2, ArrowLeft, Check, Sparkles, Calendar, Tag } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { setCurrentScreen, journalEntries, saveJournalEntry, deleteJournalEntry } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('What went well today?');
  const [selectedTag, setSelectedTag] = useState('Academics');
  const [isSaved, setIsSaved] = useState(false);

  const prompts = [
    'What went well today, even if small?',
    'How did my body and breathing feel during campus labs?',
    'What is one expectation I can let go of this evening?',
    'What would I say to a friend going through my current stress?',
    'One thing I am genuinely looking forward to tomorrow.'
  ];

  const availableTags = ['Academics', 'Mindset', 'Sleep', 'Campus Life', 'Gratitude', 'Career'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const todayStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: todayStr,
      title: title.trim(),
      prompt: selectedPrompt,
      content: content.trim(),
      tags: [selectedTag]
    };

    saveJournalEntry(newEntry);
    setTitle('');
    setContent('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('wellness')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Wellness Toolkit</span>
        </button>
        <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-3 py-1 rounded-full border border-amber-200">
          Private Client Journal
        </span>
      </div>

      {/* New Entry Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Your Confidential Journal</h1>
          <p className="text-xs text-slate-500 mt-1">
            Writing down racing thoughts transfers mental overload onto paper. Your notes remain strictly on this device.
          </p>
        </div>

        {isSaved && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-2 text-xs font-bold">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Journal entry saved safely to your local sanctuary!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Choose a Guiding Prompt (Optional)</label>
            <select
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
            >
              {prompts.map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Entry Title</label>
            <input
              type="text"
              placeholder="e.g. Preparing for engineering viva and taking a breather"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Category Tag</label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map(tag => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-amber-700 text-white font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Your Thoughts & Reflections</label>
            <textarea
              rows={4}
              placeholder="Express whatever is on your mind freely... no formatting, no judgment."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3.5 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              required
            />
          </div>

          <button
            type="submit"
            className="py-3 px-6 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs transition shadow-xs cursor-pointer flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Save Confidential Entry</span>
          </button>
        </form>
      </div>

      {/* Existing Journal Entries List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-600" />
          <span>Past Reflection Entries ({journalEntries.length})</span>
        </h2>

        {journalEntries.length === 0 ? (
          <p className="text-xs text-slate-400">No journal entries saved yet.</p>
        ) : (
          <div className="space-y-4">
            {journalEntries.map(entry => (
              <div key={entry.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{entry.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{entry.date}</span>
                      {entry.tags && entry.tags.map((t, idx) => (
                        <span key={idx} className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 rounded transition cursor-pointer"
                    title="Delete journal entry"
                    aria-label={`Delete journal entry ${entry.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {entry.prompt && (
                  <div className="text-[11px] text-amber-900/80 font-medium bg-amber-50/80 p-2 rounded-lg border border-amber-200/50">
                    Prompt: "{entry.prompt}"
                  </div>
                )}

                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pt-1">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
