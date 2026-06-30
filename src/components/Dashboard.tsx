/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  UserProfile, 
  TestResultSummary, 
  DailyLog 
} from '../types';
import { 
  Sparkles, 
  Flame, 
  ClipboardList, 
  Compass, 
  BookOpen, 
  Plus, 
  Calendar, 
  Activity, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  PlayCircle
} from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  completedTests: TestResultSummary[];
  dailyLogs: DailyLog[];
  onNavigate: (tab: string) => void;
  onSaveDailyLog: (log: Omit<DailyLog, 'date'>) => void;
  onUnlockPremium: () => void;
}

export default function Dashboard({ 
  user, 
  completedTests, 
  dailyLogs, 
  onNavigate, 
  onSaveDailyLog,
  onUnlockPremium 
}: DashboardProps) {
  // Quick Log State
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [bruxismTension, setBruxismTension] = useState<number>(3);
  const [stressLevel, setStressLevel] = useState<number>(3);
  const [routineCompleted, setRoutineCompleted] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [logSubmitted, setLogSubmitted] = useState<boolean>(false);

  // Find today's log if any
  const todayStr = new Date().toISOString().split('T')[0];
  const hasLoggedToday = dailyLogs.some(log => log.date === todayStr);

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveDailyLog({
      sleepQuality,
      bruxismTension,
      stressLevel,
      routineCompleted,
      notes
    });
    setLogSubmitted(true);
    setTimeout(() => {
      setLogSubmitted(false);
    }, 4000);
  };

  // Helper to find specific test result
  const getTestResult = (type: 'general' | 'bruxism' | 'stopbang' | 'epworth') => {
    return completedTests.find(t => t.testType === type);
  };

  // Status for each test
  const testItems = [
    {
      id: 'general',
      title: 'Triaje General & Hábitos',
      desc: 'Higiene del sueño, cafeína, pantallas',
      completed: !!user.testsCompleted.general,
      result: getTestResult('general'),
      tab: 'tests-general'
    },
    {
      id: 'bruxism',
      title: 'Tensión ATM & Bruxismo',
      desc: 'Dolor masetero, rechinar nocturno',
      completed: !!user.testsCompleted.bruxism,
      result: getTestResult('bruxism'),
      tab: 'tests-bruxism'
    },
    {
      id: 'stopbang',
      title: 'STOP-BANG (Apnea)',
      desc: 'Ronquido, asfixia, hipertensión',
      completed: !!user.testsCompleted.stopbang,
      result: getTestResult('stopbang'),
      tab: 'tests-stopbang'
    },
    {
      id: 'epworth',
      title: 'Somnolencia de Epworth',
      desc: 'Cribado de fatiga diurna extrema',
      completed: !!user.testsCompleted.epworth,
      result: getTestResult('epworth'),
      tab: 'tests-epworth'
    }
  ];

  return (
    <div id="dashboard-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-8 pb-24">
      {/* Premium Upgrade Banner */}
      {!user.isPremium && (
        <div id="premium-banner" className="bg-gradient-to-r from-brand-olive to-brand-olive-dark text-white rounded-3xl p-6 shadow-premium relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
            <Sparkles className="w-48 h-48" />
          </div>
          <div className="space-y-2 z-10">
            <span className="bg-brand-gold text-brand-charcoal text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono">
              Acceso Limitado (Gratuito)
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-brand-beige">Consigue el Protocolo Completo de Descanso</h3>
            <p className="text-brand-beige/80 text-xs sm:text-sm max-w-lg">
              Estás en la versión básica. Libera todas las rutinas diarias de ATM, audios premium de inducción de ondas delta y un canal de contacto prioritario para fisioterapeutas.
            </p>
          </div>
          <button
            id="dashboard-upgrade-btn"
            onClick={onUnlockPremium}
            className="z-10 bg-brand-gold text-brand-charcoal font-display font-semibold text-xs px-6 py-3 rounded-xl hover:bg-brand-gold-dark hover:text-white transition-all shadow-premium whitespace-nowrap cursor-pointer hover:scale-[1.02]"
          >
            Obtener Premium Completo
          </button>
        </div>
      )}

      {/* Header and Streak Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal">
            Hola, {user.name || 'Buscador de Descanso'}
          </h2>
          <p className="text-sm text-brand-brown">Tu ritual de sueño consciente hoy es tu mejor medicina.</p>
        </div>

        {/* Daily Streak Indicator */}
        <div className="inline-flex items-center gap-3 bg-brand-beige border border-brand-olive/15 px-4 py-2.5 rounded-2xl shadow-premium">
          <div className="p-1.5 bg-brand-gold/20 text-brand-gold-dark rounded-xl">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="font-mono text-lg font-bold text-brand-charcoal leading-none">
              {user.currentStreak} {user.currentStreak === 1 ? 'Día' : 'Días'}
            </div>
            <div className="text-[10px] text-brand-brown uppercase font-semibold tracking-wider mt-0.5">Racha de Cuidado ATM</div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Left Column (Routine & Quick Log) | Right Column (Clinical Triages & Health Status) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT SECTION (Col Span 7) */}
        <div className="md:col-span-7 space-y-8">
          
          {/* Today's Recommended Action / Routine */}
          <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] bg-brand-olive/10 text-brand-olive-dark font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                Práctica Guiada Recomendada
              </span>
              <span className="text-xs text-brand-brown flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                Día 1 (Gratuito)
              </span>
            </div>

            <h4 className="font-serif text-lg text-brand-charcoal mb-2">Ritual Crepuscular de Descompresión ATM</h4>
            <p className="text-xs text-brand-brown mb-6 leading-relaxed">
              3 pasos sencillos (Respiración, Masaje y Estiramiento) diseñados científicamente para aliviar de inmediato el dolor y desprogramar los maseteros cansados antes de meterte a la cama.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-brand-olive/5">
              <div className="text-xs font-mono text-brand-charcoal/80">
                Duración: <strong>6 min</strong>
              </div>
              <button
                id="dashboard-start-routine-btn"
                onClick={() => onNavigate('routines')}
                className="bg-brand-olive text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-olive-dark shadow-premium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                Iniciar Rutina
              </button>
            </div>
          </div>

          {/* Quick Symptom Logger */}
          <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-brand-olive" />
              <h4 className="font-serif text-lg text-brand-charcoal">Registro Diario de Síntomas</h4>
            </div>

            {hasLoggedToday ? (
              <div className="bg-brand-beige/50 border border-brand-olive/10 rounded-2xl p-6 text-center space-y-3">
                <div className="w-8 h-8 rounded-full bg-brand-olive/10 text-brand-olive flex items-center justify-center mx-auto">✓</div>
                <h5 className="font-display font-medium text-brand-charcoal text-sm">¡Registro de hoy completado!</h5>
                <p className="text-xs text-brand-brown">
                  Has guardado con éxito tus métricas de descanso y tensión mandibular de hoy. Consulta tus avances en la pestaña de Estadísticas.
                </p>
                <button
                  onClick={() => onNavigate('stats')}
                  className="text-xs font-semibold text-brand-olive hover:underline"
                >
                  Ver Historial de Tendencias ➔
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitLog} className="space-y-5">
                <p className="text-xs text-brand-brown mb-2 leading-relaxed">
                  Registra rápidamente tu estado para generar gráficos de tendencias y ver cómo disminuye tu tensión mandibular con las rutinas.
                </p>

                {/* Question 1: Sleep Quality */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-brand-charcoal mb-1.5">
                    <span>Calidad de Sueño Anoche</span>
                    <span className="font-mono text-brand-olive font-bold">{sleepQuality} / 5</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(Number(e.target.value))}
                    className="w-full accent-brand-olive bg-brand-beige rounded-lg cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[9px] text-brand-brown mt-1">
                    <span>1 (Pésima, interrumpida)</span>
                    <span>5 (Reparadora, profunda)</span>
                  </div>
                </div>

                {/* Question 2: Jaw Tension */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-brand-charcoal mb-1.5">
                    <span>Tensión Mandibular (Apriete)</span>
                    <span className="font-mono text-brand-gold-dark font-bold">{bruxismTension} / 5</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={bruxismTension}
                    onChange={(e) => setBruxismTension(Number(e.target.value))}
                    className="w-full accent-brand-gold bg-brand-beige rounded-lg cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[9px] text-brand-brown mt-1">
                    <span>1 (Mandíbula suelta y cómoda)</span>
                    <span>5 (Rigidez, dolor severo)</span>
                  </div>
                </div>

                {/* Question 3: Stress Level */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-brand-charcoal mb-1.5">
                    <span>Nivel de Estrés General</span>
                    <span className="font-mono text-brand-brown font-bold">{stressLevel} / 5</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={stressLevel}
                    onChange={(e) => setStressLevel(Number(e.target.value))}
                    className="w-full accent-brand-brown bg-brand-beige rounded-lg cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[9px] text-brand-brown mt-1">
                    <span>1 (Calma absoluta)</span>
                    <span>5 (Ansiedad o estrés crítico)</span>
                  </div>
                </div>

                {/* Notes Input */}
                <div>
                  <label className="block text-xs font-medium text-brand-charcoal mb-1.5">Notas o observaciones adicionales (opcional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Desperté con ligero dolor de cuello, pero los ejercicios me aliviaron..."
                    rows={2}
                    className="w-full rounded-xl border border-brand-brown/20 bg-brand-beige-light p-2.5 text-xs focus:border-brand-olive focus:ring-1 focus:ring-brand-olive outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs text-brand-charcoal cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={routineCompleted}
                      onChange={(e) => setRoutineCompleted(e.target.checked)}
                      className="rounded border-brand-brown/30 text-brand-olive focus:ring-brand-olive"
                    />
                    <span>¿Hiciste al menos una rutina hoy?</span>
                  </label>

                  <button
                    id="submit-daily-log-btn"
                    type="submit"
                    className="bg-brand-olive text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-brand-olive-dark shadow-premium transition-all cursor-pointer"
                  >
                    Guardar Registro
                  </button>
                </div>

                {logSubmitted && (
                  <div className="text-center text-xs font-medium text-brand-olive bg-brand-olive/10 py-2 rounded-xl animate-fade-in">
                    ✓ ¡Métricas de salud sincronizadas localmente!
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* RIGHT SECTION: Clinical Triages & Screenings (Col Span 5) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium space-y-5">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-brand-olive" />
              <h4 className="font-serif text-lg text-brand-charcoal">Cribados Clínicos</h4>
            </div>

            <p className="text-xs text-brand-brown leading-relaxed">
              Completa los tests estandarizados para diagnosticar tu nivel de riesgo. Estos datos sirven para que los exportes o compartas con un especialista.
            </p>

            <div className="space-y-3.5">
              {testItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 rounded-2xl border border-brand-olive/5 bg-brand-beige-light/60 hover:bg-brand-beige-light transition-colors"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-brand-charcoal flex items-center gap-1.5">
                      {item.title}
                      {item.completed ? (
                        <CheckCircle className="w-3.5 h-3.5 text-brand-olive fill-brand-olive/15" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                      )}
                    </div>
                    <div className="text-[10px] text-brand-brown leading-none">{item.desc}</div>
                    
                    {/* Test Result Tag if Complete */}
                    {item.completed && item.result && (
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                          item.result.riskLevel === 'Bajo' ? 'bg-green-100 text-green-700' :
                          item.result.riskLevel === 'Medio' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          Riesgo {item.result.riskLevel} (S: {item.result.score})
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    id={`triage-btn-${item.id}`}
                    onClick={() => onNavigate(item.tab)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      item.completed 
                        ? 'bg-brand-olive/10 text-brand-olive hover:bg-brand-olive/20' 
                        : 'bg-brand-gold text-brand-charcoal hover:bg-brand-gold-dark hover:text-white shadow-sm'
                    }`}
                  >
                    {item.completed ? 'Repetir' : 'Iniciar'}
                  </button>
                </div>
              ))}
            </div>

            {/* General Advice warning */}
            <div className="p-3 bg-brand-gold/10 rounded-2xl border border-brand-gold/25 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
              <p className="text-[10px] text-brand-charcoal leading-relaxed">
                <strong>Cláusula Importante:</strong> El resultado de estos cribados es puramente orientativo para el autocuidado y no sustituye un examen de laboratorio o polisomnografía formal.
              </p>
            </div>
          </div>

          {/* Quick Educational Fact Box */}
          <div className="bg-brand-beige rounded-3xl p-6 border border-brand-olive/10 space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-olive" />
              <h5 className="font-serif text-sm text-brand-charcoal">El Dato Científico</h5>
            </div>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed italic">
              "Investigaciones recientes de la Asociación Europea de Medicina del Sueño confirman que corregir el hábito de respiración bucal mediante posicionamiento lingual reduce hasta un 38% la fuerza espasmódica de los maseteros durante la fase REM."
            </p>
            <button
              id="dashboard-edu-link"
              onClick={() => onNavigate('education')}
              className="text-[10px] font-bold text-brand-olive hover:underline"
            >
              Explorar Artículos de ATM ➔
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
