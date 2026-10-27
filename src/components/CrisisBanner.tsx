import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, ChevronDown, ChevronUp, X } from 'lucide-react';
import { INDIA_EMERGENCY_HELPLINES } from '../data/mockData';

export const CrisisBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-950 text-xs sm:text-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Crisis Support India:</strong> If you or someone you know is in acute distress, call Tele-MANAS at{' '}
            <a href="tel:14416" className="underline font-bold text-amber-900 hover:text-amber-950">14416</a> or Emergency at{' '}
            <a href="tel:112" className="underline font-bold text-amber-900 hover:text-amber-950">112</a>.
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1 text-amber-800 hover:text-amber-950 font-semibold underline text-xs cursor-pointer"
            aria-label={expanded ? 'Hide Directory' : 'Show All Helplines'}
          >
            <span>{expanded ? 'Hide Directory' : 'All Helplines'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-600 hover:text-amber-800 p-0.5 cursor-pointer rounded"
            title="Dismiss temporary banner"
            aria-label="Dismiss crisis banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="bg-amber-100/70 border-t border-amber-200 px-4 py-3 max-w-7xl mx-auto">
          <p className="font-semibold text-xs text-amber-900 mb-2">
            Verified Emergency & Mental Health Helplines (Govt. of India & Verified NGOs):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            {INDIA_EMERGENCY_HELPLINES.map((h, i) => (
              <div key={i} className="p-2.5 bg-white/90 rounded-xl border border-amber-200/80 shadow-xs">
                <div className="font-bold text-slate-800">{h.name}</div>
                <div className="text-teal-700 font-mono font-bold flex items-center gap-1 my-0.5">
                  <PhoneCall className="w-3 h-3" />
                  <a href={`tel:${h.number.split('/')[0].trim().replace(/\s+/g, '')}`} className="hover:underline">
                    {h.number}
                  </a>
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">{h.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-amber-900/80 italic">
            SAFE CARE is a supportive digital wellness tool and does not provide emergency medical intervention.
          </div>
        </div>
      )}
    </div>
  );
};
