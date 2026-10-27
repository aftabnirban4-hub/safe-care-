import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, Send, User, Sparkles, ShieldAlert, PhoneCall, 
  ArrowLeft, HelpCircle, HeartHandshake, RefreshCw, Wind, Stethoscope
} from 'lucide-react';
import { INDIA_EMERGENCY_HELPLINES } from '../data/mockData';
import { isCrisisQuery } from '../utils/logic';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isCrisis?: boolean;
  actionType?: 'breathing' | 'professionals';
}

export const AiCompanionPage: React.FC = () => {
  const { setCurrentScreen } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'ai',
      text: "Hi! I'm your SAFE CARE wellness companion. I can help you explore general wellness resources, gentle study stress tips, and simple self-care exercises. I am not a therapist or a doctor. What would you like to explore today?"
    }
  ]);

  const [input, setInput] = useState('');

  const sampleChips = [
    'I feel stressed about my exams and placements.',
    'I want to improve my sleep routine.',
    'I feel overwhelmed right now.',
    'Can you guide me through breathing?',
    'I want to find a certified professional.'
  ];

  const handleSend = (textToSend?: string) => {
    const userText = textToSend || input;
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Safety & Crisis keywords check for emergency protocol
    const isCrisis = isCrisisQuery(userText);
    const lower = userText.toLowerCase();

    setTimeout(() => {
      let aiResponse = '';
      let actionType: 'breathing' | 'professionals' | undefined = undefined;

      if (isCrisis) {
        aiResponse = "I'm hearing that you are in deep distress, and I want you to be safe. Please know you are not alone and help is immediately available. Because I am an automated wellness tool and not a doctor, I strongly urge you to connect right now with a verified human helpline or professional.";
      } else if (lower.includes('exam') || lower.includes('placement') || lower.includes('study')) {
        aiResponse = "Engineering exam and placement expectations can feel very heavy. Would you like to try our 4-4-4-4 Box Breathing exercise right now, break your study goals into 25-minute Pomodoro blocks, or connect with our student counselors on the directory?";
        actionType = 'breathing';
      } else if (lower.includes('sleep') || lower.includes('tired') || lower.includes('insomnia')) {
        aiResponse = "Rest is foundational to cognitive health. A helpful routine is to shut off laptop screens 30 minutes before sleep and try our guided 5-4-3-2-1 sensory grounding. You can also consult our sleep and neuro-wellness specialists.";
      } else if (lower.includes('breath') || lower.includes('breathe') || lower.includes('calm')) {
        aiResponse = "Taking a conscious pause works wonders for regulating your nervous system. You can launch our animated 1-minute box breathing tool with one click below!";
        actionType = 'breathing';
      } else if (lower.includes('professional') || lower.includes('doctor') || lower.includes('counselor')) {
        aiResponse = "SAFE CARE provides direct access to verified clinical psychologists, psychiatrists, and telemedicine general physicians with student-friendly consultation slots. Let me open the directory for you.";
        actionType = 'professionals';
      } else {
        aiResponse = "Thank you for sharing that with me. Acknowledging your feelings is an essential step toward balance. Would you like to write a private journal note or try a quick calming exercise?";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiResponse,
          isCrisis,
          actionType
        }
      ]);
    }, 450);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner & Demarcation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sanctuary</span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-[11px] bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-full border border-amber-200">
            Simulated AI Companion • Not Clinical Care
          </span>
        </div>
      </div>

      {/* Main Chat Deck */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[650px] overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 bg-brand-50/70 border-b border-brand-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-brand-700 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">SAFE CARE Wellness Companion</div>
              <div className="text-[10px] text-teal-800">Supportive self-care routing • Safe responses</div>
            </div>
          </div>
          <button
            onClick={() => setMessages([{
              id: 'm-init',
              sender: 'ai',
              text: "Hi! I'm your SAFE CARE wellness companion. What would you like to explore today?"
            }])}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-white transition cursor-pointer"
            title="Clear Chat Conversation"
            aria-label="Reset chat history"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-calm-bg">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-700 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                }`}
              >
                {msg.text}

                {/* If AI detected crisis keywords, render verified emergency action card */}
                {msg.isCrisis && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-950 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-xs text-red-700">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Immediate 24/7 Free Human Help in India:</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div>• <strong>National Tele-MANAS:</strong> <a href="tel:14416" className="font-mono underline text-red-800 font-bold">14416 / 1800-891-4416</a></div>
                      <div>• <strong>Kiran Helpline (Govt):</strong> <a href="tel:18005990019" className="font-mono underline text-red-800 font-bold">1800-599-0019</a></div>
                      <div>• <strong>National Emergency:</strong> <a href="tel:112" className="font-mono underline text-red-800 font-bold">112</a></div>
                      <div>• <strong>Vandrevala Foundation:</strong> <a href="tel:+919999666555" className="font-mono underline text-red-800 font-bold">+91 9999 666 555</a></div>
                    </div>
                  </div>
                )}

                {/* Interactive Tool Suggestions */}
                {msg.actionType === 'breathing' && (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => setCurrentScreen('breathing')}
                      className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-800 font-semibold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Wind className="w-3.5 h-3.5 text-brand-600" />
                      <span>Start 4-4-4-4 Breathing</span>
                    </button>
                  </div>
                )}

                {msg.actionType === 'professionals' && (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => setCurrentScreen('professionals')}
                      className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                      <span>Browse Doctor Directory</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="px-4 py-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto text-xs">
          {sampleChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap px-3 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-700 rounded-full border border-slate-200 transition text-[11px] cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for grounding exercises, study stress tips, or sleep advice..."
              className="flex-1 text-xs sm:text-sm p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-slate-50"
            />
            <button
              type="submit"
              className="p-3 bg-brand-700 hover:bg-brand-800 text-white rounded-xl shadow-xs transition cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-2">
            Simulated companion. Never replaces a certified medical practitioner or licensed psychologist.
          </div>
        </div>

      </div>

    </div>
  );
};
