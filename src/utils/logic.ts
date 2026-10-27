import { MoodEntry, MoodType } from '../types';

export const CRISIS_KEYWORDS = [
  'suicide',
  'kill myself',
  'end my life',
  'harm myself',
  'die',
  'self-harm',
  'cut myself',
  'can’t live anymore',
  'cant live anymore',
  'want to die'
];

export function isCrisisQuery(input: string): boolean {
  if (!input) return false;
  const lower = input.toLowerCase();
  return CRISIS_KEYWORDS.some(kw => lower.includes(kw));
}

export type BreathingPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Pause';

export function getBreathingPhase(seconds: number): { phase: BreathingPhase; progressInPhase: number } {
  const cycleSec = seconds % 16;
  if (cycleSec >= 0 && cycleSec < 4) {
    return { phase: 'Inhale', progressInPhase: cycleSec + 1 };
  } else if (cycleSec >= 4 && cycleSec < 8) {
    return { phase: 'Hold', progressInPhase: (cycleSec - 4) + 1 };
  } else if (cycleSec >= 8 && cycleSec < 12) {
    return { phase: 'Exhale', progressInPhase: (cycleSec - 8) + 1 };
  } else {
    return { phase: 'Pause', progressInPhase: (cycleSec - 12) + 1 };
  }
}

export function generateBookingRef(year = new Date().getFullYear()): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `SC-JAIPUR-${year}-${randomSuffix}`;
}

export function calculateMoodStats(moodHistory: MoodEntry[]): Record<MoodType, { count: number; percentage: number }> {
  const allMoods: MoodType[] = ['Great', 'Good', 'Okay', 'Low', 'Stressed'];
  const total = moodHistory.length;
  const result = {} as Record<MoodType, { count: number; percentage: number }>;

  for (const m of allMoods) {
    const count = moodHistory.filter(entry => entry.mood === m).length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    result[m] = { count, percentage };
  }

  return result;
}
