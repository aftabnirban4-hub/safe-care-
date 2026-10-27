import React, { createContext, useContext, useState, useEffect } from 'react';
import { Screen, UserState, MoodEntry, JournalEntry, Appointment, Professional, ReminderItem } from '../types';
import { INITIAL_PROFESSIONALS, INITIAL_MOODS, INITIAL_JOURNAL, INITIAL_APPOINTMENTS } from '../data/mockData';
import { generateBookingRef } from '../utils/logic';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  moodHistory: MoodEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  deleteMoodEntry: (id: string) => void;
  journalEntries: JournalEntry[];
  saveJournalEntry: (entry: JournalEntry) => void;
  deleteJournalEntry: (id: string) => void;
  professionals: Professional[];
  selectedProfessional: Professional | null;
  setSelectedProfessional: (prof: Professional | null) => void;
  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, 'id' | 'bookingRef'>) => string;
  cancelAppointment: (id: string) => void;
  reminders: ReminderItem[];
  toggleReminder: (id: string) => void;
  addReminder: (label: string, time: string) => void;
  deleteReminder: (id: string) => void;
  resetAllDemoData: () => void;
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'SAFECARE_DEMO_STATE_V1';

const INITIAL_REMINDERS: ReminderItem[] = [
  { id: 'rem-1', label: 'Evening Mindful Reflection Check-in', time: '08:30 PM', enabled: true },
  { id: 'rem-2', label: 'Campus Hydration & 1-min Breathing', time: '02:00 PM', enabled: true },
  { id: 'rem-3', label: 'Bedtime Screen Disconnect Routine', time: '10:45 PM', enabled: false },
  { id: 'rem-4', label: 'Upcoming Telemedicine Consultation Alert', time: '30 mins before', enabled: true }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  // User State
  const [user, setUser] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
      return saved ? JSON.parse(saved) : {
        displayName: 'Aftab (Student Demo)',
        email: 'aftab.ai@jecrc.ac.in',
        isAuthenticated: true,
        onboarded: true,
        selectedFocus: ['Academic Pressure', 'Better Sleep', 'Building Healthier Habits'],
        wellnessGoals: ['Daily 5-min calm breathing', 'Sleep by 11:30 PM', 'Weekly self-reflection'],
        privacyConsent: true,
        role: 'student'
      };
    } catch {
      return {
        displayName: 'Aftab (Student Demo)',
        email: 'aftab.ai@jecrc.ac.in',
        isAuthenticated: true,
        onboarded: true,
        selectedFocus: ['Academic Pressure', 'Better Sleep', 'Building Healthier Habits'],
        wellnessGoals: ['Daily 5-min calm breathing', 'Sleep by 11:30 PM', 'Weekly self-reflection'],
        privacyConsent: true,
        role: 'student'
      };
    }
  });

  // Moods
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_moods`);
      return saved ? JSON.parse(saved) : INITIAL_MOODS;
    } catch {
      return INITIAL_MOODS;
    }
  });

  // Journals
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_journal`);
      return saved ? JSON.parse(saved) : INITIAL_JOURNAL;
    } catch {
      return INITIAL_JOURNAL;
    }
  });

  // Professionals & Appointments
  const [professionals] = useState<Professional[]>(INITIAL_PROFESSIONALS);
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_apts`);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // Reminders
  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_reminders`);
      return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
    } catch {
      return INITIAL_REMINDERS;
    }
  });

  // Sync to local storage for realistic persistence
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(user));
    } catch (e) {
      console.warn('Storage sync skipped', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_moods`, JSON.stringify(moodHistory));
    } catch (e) {
      console.warn('Storage sync skipped', e);
    }
  }, [moodHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_journal`, JSON.stringify(journalEntries));
    } catch (e) {
      console.warn('Storage sync skipped', e);
    }
  }, [journalEntries]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_apts`, JSON.stringify(appointments));
    } catch (e) {
      console.warn('Storage sync skipped', e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_reminders`, JSON.stringify(reminders));
    } catch (e) {
      console.warn('Storage sync skipped', e);
    }
  }, [reminders]);

  const addMoodEntry = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: `m-${Date.now()}`
    };
    setMoodHistory(prev => [newEntry, ...prev]);
  };

  const deleteMoodEntry = (id: string) => {
    setMoodHistory(prev => prev.filter(m => m.id !== id));
  };

  const saveJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => {
      const exists = prev.some(j => j.id === entry.id);
      if (exists) {
        return prev.map(j => (j.id === entry.id ? entry : j));
      }
      return [entry, ...prev];
    });
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(j => j.id !== id));
  };

  const bookAppointment = (apt: Omit<Appointment, 'id' | 'bookingRef'>): string => {
    const bookingRef = generateBookingRef();
    const newApt: Appointment = {
      ...apt,
      id: `apt-${Date.now()}`,
      bookingRef
    };
    setAppointments(prev => [newApt, ...prev]);
    return bookingRef;
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
  };

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const addReminder = (label: string, time: string) => {
    const newRem: ReminderItem = {
      id: `rem-${Date.now()}`,
      label,
      time,
      enabled: true
    };
    setReminders(prev => [...prev, newRem]);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const resetAllDemoData = () => {
    try {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_user`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_moods`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_journal`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_apts`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_reminders`);
    } catch {
      // ignore
    }
    setMoodHistory(INITIAL_MOODS);
    setJournalEntries(INITIAL_JOURNAL);
    setAppointments(INITIAL_APPOINTMENTS);
    setReminders(INITIAL_REMINDERS);
    setUser({
      displayName: 'Aftab (Student Demo)',
      email: 'aftab.ai@jecrc.ac.in',
      isAuthenticated: true,
      onboarded: true,
      selectedFocus: ['Academic Pressure', 'Better Sleep', 'Building Healthier Habits'],
      wellnessGoals: ['Daily 5-min calm breathing', 'Sleep by 11:30 PM', 'Weekly self-reflection'],
      privacyConsent: true,
      role: 'student'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        user,
        setUser,
        moodHistory,
        addMoodEntry,
        deleteMoodEntry,
        journalEntries,
        saveJournalEntry,
        deleteJournalEntry,
        professionals,
        selectedProfessional,
        setSelectedProfessional,
        appointments,
        bookAppointment,
        cancelAppointment,
        reminders,
        toggleReminder,
        addReminder,
        deleteReminder,
        resetAllDemoData,
        openAuthModal,
        setOpenAuthModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
};
