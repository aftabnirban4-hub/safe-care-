export type Screen =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'mood-checkin'
  | 'wellness'
  | 'breathing'
  | 'grounding'
  | 'journal'
  | 'ai-companion'
  | 'professionals'
  | 'appointments'
  | 'video-consultation'
  | 'progress'
  | 'reminders'
  | 'records'
  | 'profile'
  | 'doctor-portal'
  | 'admin-overview'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export type MoodType = 'Great' | 'Good' | 'Okay' | 'Low' | 'Stressed';

export interface MoodEntry {
  id: string;
  date: string;
  timestamp: string;
  mood: MoodType;
  emotions: string[];
  factors: string[];
  note: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  prompt?: string;
  tags?: string[];
}

export interface Professional {
  id: string;
  name: string;
  role: 'Counsellor' | 'Psychologist' | 'Psychiatrist' | 'General Physician';
  experience: string;
  languages: string[];
  specialties: string[];
  rating: number;
  consultationFee: number;
  availableModes: ('Video' | 'In-person' | 'Audio')[];
  nextSlot: string;
  avatar: string;
  location: string;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  professionalId: string;
  professionalName: string;
  role: string;
  mode: 'Video' | 'Audio' | 'In-person';
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface UserState {
  displayName: string;
  email: string;
  isAuthenticated: boolean;
  onboarded: boolean;
  selectedFocus: string[];
  wellnessGoals: string[];
  privacyConsent: boolean;
  role: 'student' | 'doctor' | 'admin';
}

export interface ReminderItem {
  id: string;
  label: string;
  time: string;
  enabled: boolean;
}
