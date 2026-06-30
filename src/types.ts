/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  registeredAt: string;
  currentStreak: number;
  lastCompletedDate?: string;
  testsCompleted: {
    general?: boolean;
    bruxism?: boolean;
    stopbang?: boolean;
    epworth?: boolean;
  };
}

export type RiskLevel = 'Bajo' | 'Medio' | 'Alto';

export interface TestResultSummary {
  testType: 'general' | 'bruxism' | 'stopbang' | 'epworth';
  title: string;
  score: number;
  maxScore: number;
  riskLevel: RiskLevel;
  recommendations: string[];
  completedAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: {
    value: number;
    text: string;
  }[];
}

export interface AudioTrack {
  id: string;
  title: string;
  duration: string; // e.g., "12:30"
  durationSeconds: number;
  category: 'Relajación' | 'Meditación' | 'Frecuencias' | 'Fisioterapia Mandibular';
  description: string;
  isPremium: boolean;
  isPlaying?: boolean;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: 'Bruxismo' | 'Apnea del Sueño' | 'Manejo del Estrés' | 'Higiene del Sueño';
  readTime: string;
  summary: string;
  content: string[];
  isPremium: boolean;
  iconName: string;
}

export interface RoutineStep {
  title: string;
  description: string;
  durationSeconds: number;
  exerciseType?: 'respiracion' | 'masaje' | 'estiramiento' | 'mental';
}

export interface Routine {
  id: string;
  title: string;
  category: 'Noche' | 'Mañana' | 'Alivio SOS';
  description: string;
  durationMinutes: number;
  isPremium: boolean;
  steps: RoutineStep[];
}

export interface SleepSpecialist {
  id: string;
  name: string;
  role: 'Odontólogo especialista en ATM' | 'Somnólogo' | 'Fisioterapeuta Maxilofacial' | 'Psicólogo del Sueño';
  credentials: string;
  city: string;
  rating: number;
  avatarUrl: string;
  contactEmail: string;
  contactPhone: string;
  isPremiumPartner: boolean;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  sleepQuality: number; // 1 to 5
  bruxismTension: number; // 1 to 5
  stressLevel: number; // 1 to 5
  routineCompleted: boolean;
  notes?: string;
}
