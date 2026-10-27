import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, 
  Clock, FileText, CheckCircle, ArrowLeft, Shield, AlertCircle
} from 'lucide-react';

export const VideoConsultationPage: React.FC = () => {
  const { setCurrentScreen, appointments } = useApp();

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callActive, setCallActive] = useState(true);
  const [callSeconds, setCallSeconds] = useState(145); // simulated active duration

  const activeApt = appointments.find(a => a.status === 'Scheduled') || appointments[0];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (callActive) {
      timer = setInterval(() => setCallSeconds(s => s + 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callActive]);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Consultation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Live Demo Tele-Consultation
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Session with {activeApt ? activeApt.professionalName : 'Dr. Ananya Sharma (Demo)'}
          </h1>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Duration: {formatDuration(callSeconds)}</span>
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">Encrypted WebRTC Demo Channel</div>
        </div>
      </div>

      {callActive ? (
        /* Active Call Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Video Stream */}
          <div className="lg:col-span-8 bg-slate-900 rounded-3xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-800 shadow-xl">
            {/* Doctor Stream Placeholder */}
            <div className="text-center text-white space-y-2 p-4">
              <div className="w-24 h-24 rounded-full bg-teal-800/80 mx-auto flex items-center justify-center border-2 border-teal-400 text-2xl font-bold shadow-lg">
                AS
              </div>
              <div className="font-bold text-base">Dr. Ananya Sharma, Ph.D.</div>
              <div className="text-xs text-teal-300 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Speaking... (Simulated Audio Stream)</span>
              </div>
              <div className="text-[11px] text-slate-400 max-w-sm mx-auto pt-2">
                "Hello Aftab, glad to connect today. Let's discuss your semester exam stress and how your breathing exercises have felt so far."
              </div>
            </div>

            {/* Self Picture-in-Picture */}
            <div className="absolute bottom-4 right-4 w-32 h-24 sm:w-44 sm:h-32 bg-slate-800 rounded-2xl border-2 border-slate-600 overflow-hidden flex items-center justify-center shadow-lg">
              {videoOn ? (
                <div className="text-center text-white text-[10px] p-2">
                  <div className="w-8 h-8 rounded-full bg-brand-700 mx-auto flex items-center justify-center font-bold mb-1">
                    You
                  </div>
                  <span>Student Camera (Simulated)</span>
                </div>
              ) : (
                <div className="text-slate-400 text-[10px] flex items-center gap-1">
                  <VideoOff className="w-3.5 h-3.5" />
                  <span>Camera Off</span>
                </div>
              )}
            </div>

            {/* In-call Control Deck */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-slate-700">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-xl transition cursor-pointer ${micOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-600 text-white'}`}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
                aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
              >
                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-3 rounded-xl transition cursor-pointer ${videoOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-600 text-white'}`}
                title={videoOn ? 'Turn Off Video' : 'Turn On Video'}
                aria-label={videoOn ? 'Turn off camera' : 'Turn on camera'}
              >
                {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setCallActive(false)}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md cursor-pointer transition"
                aria-label="End call"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Doctor Clinical Notes Demo */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-brand-700 font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Consultation Care Summary</span>
              </div>

              <div className="text-xs text-slate-600 space-y-2">
                <p><strong>Patient:</strong> Aftab (JECRC Student)</p>
                <p><strong>Chief Focus:</strong> Semester Exam Stress & Nighttime Racing Thoughts</p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] leading-relaxed">
                  "Recommend continuing 4-4-4-4 box breathing before exams. Schedule sleep cut-off at 11:30 PM. Follow up in 10 days if symptoms persist."
                </div>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-900">
                <strong>Demonstration Note:</strong> All audio/video channels in this environment are simulated without requiring webcam hardware permissions.
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              SAFE CARE Telemedicine Platform • Certified Encrypted Session Mock
            </div>
          </div>
        </div>
      ) : (
        /* Post Call Summary Screen */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-xl mx-auto space-y-5 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Consultation Ended</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Total consultation time: <strong>{formatDuration(callSeconds)}</strong>. Your simulated post-care notes and follow-up recommendations have been stored in your Health Records module.
          </p>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => setCurrentScreen('records')}
              className="py-2.5 px-4 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
            >
              View Telemedicine Records
            </button>
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Return to Sanctuary
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
