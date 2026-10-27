import { Professional, Appointment, MoodEntry, JournalEntry } from '../types';

export const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'prof-1',
    name: 'Dr. Ananya Sharma (Demo)',
    role: 'Psychologist',
    experience: '8+ years',
    languages: ['Hindi', 'English'],
    specialties: ['Academic Burnout', 'Career Anxiety', 'Youth Mentoring'],
    rating: 4.9,
    consultationFee: 799,
    availableModes: ['Video', 'Audio', 'In-person'],
    nextSlot: 'Today, 4:30 PM',
    avatar: 'https://images.unsplash.com/photo-1594824813622-446960b73c22?auto=format&fit=crop&q=80&w=240',
    location: 'Jaipur (Malviya Nagar) & Online'
  },
  {
    id: 'prof-2',
    name: 'Dr. Vikramaditya Rathore (Demo)',
    role: 'Psychiatrist',
    experience: '12+ years',
    languages: ['Hindi', 'English', 'Rajasthani'],
    specialties: ['Sleep Disorders', 'Clinical Depression', 'Neuro-wellness'],
    rating: 4.8,
    consultationFee: 1199,
    availableModes: ['Video', 'In-person'],
    nextSlot: 'Tomorrow, 11:00 AM',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=240',
    location: 'Jaipur (Mansarovar) & Online'
  },
  {
    id: 'prof-3',
    name: 'Counsellor Rahul Meena (Demo)',
    role: 'Counsellor',
    experience: '5+ years',
    languages: ['Hindi', 'English'],
    specialties: ['Men’s Mental Health', 'Relationship Stress', 'Exam Phobia'],
    rating: 4.9,
    consultationFee: 499,
    availableModes: ['Video', 'Audio'],
    nextSlot: 'Today, 6:00 PM',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=240',
    location: 'Online Tele-consult'
  },
  {
    id: 'prof-4',
    name: 'Dr. Sunita Kulkarni (Demo)',
    role: 'General Physician',
    experience: '10+ years',
    languages: ['English', 'Hindi', 'Marathi'],
    specialties: ['Stress Headaches', 'Lifestyle & Nutrition', 'General Telemedicine'],
    rating: 4.7,
    consultationFee: 599,
    availableModes: ['Video', 'In-person'],
    nextSlot: 'Tomorrow, 3:00 PM',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=240',
    location: 'Jaipur (Sitapura / JECRC Campus link) & Online'
  }
];

export const INITIAL_MOODS: MoodEntry[] = [
  {
    id: 'm-1',
    date: '2026-10-24',
    timestamp: '9:30 AM',
    mood: 'Good',
    emotions: ['Calm', 'Hopeful'],
    factors: ['Good Sleep', 'Morning Walk'],
    note: 'Prepared notes for engineering semester mid-terms.'
  },
  {
    id: 'm-2',
    date: '2026-10-25',
    timestamp: '8:45 PM',
    mood: 'Stressed',
    emotions: ['Overwhelmed', 'Anxious'],
    factors: ['Exams', 'Assignments'],
    note: 'Felt time crunch for coding assignment deadline.'
  },
  {
    id: 'm-3',
    date: '2026-10-26',
    timestamp: '10:00 PM',
    mood: 'Okay',
    emotions: ['Tired'],
    factors: ['College', 'Screen Time'],
    note: 'Did 5-minute breathing session in SAFE CARE before sleep.'
  }
];

export const INITIAL_JOURNAL: JournalEntry[] = [
  {
    id: 'j-1',
    date: '26 Oct 2026',
    title: 'Navigating college expectations and finding balance',
    prompt: 'What went well today?',
    content: 'Spoke with campus mentor at JECRC. Realized everyone feels uncertain about placement drives sometimes. Taking it one step at a time.',
    tags: ['Academics', 'Mindset']
  },
  {
    id: 'j-2',
    date: '25 Oct 2026',
    title: 'Decompressing after a packed day in labs',
    prompt: 'How did my body feel today?',
    content: 'Shoulders were tense during the morning coding lab. Tried 4-4-4-4 box breathing in the library. Calmed down substantially within 5 minutes.',
    tags: ['Stress', 'Breathing']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    bookingRef: 'SC-JAIPUR-2026-8819',
    professionalId: 'prof-1',
    professionalName: 'Dr. Ananya Sharma (Demo)',
    role: 'Psychologist',
    mode: 'Video',
    date: '2026-10-28',
    time: '4:30 PM',
    status: 'Scheduled',
    notes: 'Discussion regarding stress management and focus techniques.'
  }
];

export const INDIA_EMERGENCY_HELPLINES = [
  { name: 'National Tele-MANAS (MoHFW)', number: '14416 / 1800-891-4416', desc: '24/7 Free National Tele-Mental Health Programme (Govt. of India)' },
  { name: 'Kiran Mental Health (MoSJ&E)', number: '1800-599-0019', desc: '24/7 Toll-Free Mental Health Rehabilitation Helpline' },
  { name: 'Emergency Police/Ambulance', number: '112', desc: 'National Emergency Response Support System' },
  { name: 'Vandrevala Foundation', number: '+91 9999 666 555', desc: 'Free 24/7 crisis intervention & counseling support' }
];
