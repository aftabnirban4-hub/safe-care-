import test from 'node:test';
import assert from 'node:assert/strict';
import { isCrisisQuery, getBreathingPhase, generateBookingRef, calculateMoodStats } from './logic';
import { MoodEntry } from '../types';

test('isCrisisQuery flags explicit distress phrases', () => {
  assert.equal(isCrisisQuery('I feel like I want to die and end my life'), true);
  assert.equal(isCrisisQuery('I feel stressed about my exams tomorrow'), false);
  assert.equal(isCrisisQuery(''), false);
});

test('getBreathingPhase correctly loops across 16s cycle', () => {
  assert.deepEqual(getBreathingPhase(0), { phase: 'Inhale', progressInPhase: 1 });
  assert.deepEqual(getBreathingPhase(3), { phase: 'Inhale', progressInPhase: 4 });
  assert.deepEqual(getBreathingPhase(4), { phase: 'Hold', progressInPhase: 1 });
  assert.deepEqual(getBreathingPhase(8), { phase: 'Exhale', progressInPhase: 1 });
  assert.deepEqual(getBreathingPhase(12), { phase: 'Pause', progressInPhase: 1 });
  assert.deepEqual(getBreathingPhase(16), { phase: 'Inhale', progressInPhase: 1 });
});

test('generateBookingRef returns valid Jaipur booking pattern', () => {
  const ref = generateBookingRef(2026);
  assert.match(ref, /^SC-JAIPUR-2026-\d{4}$/);
});

test('calculateMoodStats computes percentages properly', () => {
  const mockEntries: MoodEntry[] = [
    { id: '1', date: '2026-10-01', timestamp: '10:00', mood: 'Good', emotions: [], factors: [], note: '' },
    { id: '2', date: '2026-10-02', timestamp: '10:00', mood: 'Good', emotions: [], factors: [], note: '' },
    { id: '3', date: '2026-10-03', timestamp: '10:00', mood: 'Stressed', emotions: [], factors: [], note: '' },
    { id: '4', date: '2026-10-04', timestamp: '10:00', mood: 'Okay', emotions: [], factors: [], note: '' },
  ];

  const stats = calculateMoodStats(mockEntries);
  assert.equal(stats.Good.count, 2);
  assert.equal(stats.Good.percentage, 50);
  assert.equal(stats.Stressed.count, 1);
  assert.equal(stats.Stressed.percentage, 25);
  assert.equal(stats.Great.count, 0);
  assert.equal(stats.Great.percentage, 0);
});
