/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Routine, RoutineStep, UserProfile } from '../types';
import { GUIDED_ROUTINES } from '../mockData';
import { Play, Pause, SkipForward, ArrowLeft, CheckCircle, ShieldAlert, Sparkles, Clock, Flame } from 'lucide-react';

interface RoutinesProps {
  user: UserProfile;
  onUnlockPremium: () => void;
  onRoutineCompleted: () => void;
}

export default function Routines({ user, onUnlockPremium, onRoutineCompleted }: RoutinesProps) {
  // Current tab filter
  const [activeCategory, setActiveCategory] = useState<'Noche' | 'Mañana' | 'Alivio SOS'>('Noche');
  
  // Selection and runner state
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter routines based on selected tab
  const routines = GUIDED_ROUTINES.filter(r => r.category === activeCategory);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (isPlaying && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleNextStep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, secondsRemaining, currentStepIndex]);

  const handleStartRoutine = (routine: Routine) => {
    // Check if locked
    if (routine.isPremium && !user.isPremium) {
      // Show premium locked logic or open popup
      onUnlockPremium();
      return;
    }

    setSelectedRoutine(routine);
    setCurrentStepIndex(0);
    setSecondsRemaining(routine.steps[0].durationSeconds);
    setIsPlaying(true);
    setIsCompleted(false);
  };

  const handleNextStep = () => {
    if (!selectedRoutine) return;

    if (currentStepIndex < selectedRoutine.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setSecondsRemaining(selectedRoutine.steps[nextIndex].durationSeconds);
      setIsPlaying(true);
    } else {
      // Routine finished completely!
      setIsPlaying(false);
      setIsCompleted(true);
      onRoutineCompleted();
    }
  };

  const handlePrevStep = () => {
    if (!selectedRoutine || currentStepIndex === 0) return;
    const prevIndex = currentStepIndex - 1;
    setCurrentStepIndex(prevIndex);
    setSecondsRemaining(selectedRoutine.steps[prevIndex].durationSeconds);
    setIsPlaying(true);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const activeStep = selectedRoutine ? selectedRoutine.steps[currentStepIndex] : null;

  return (
    <div id="routines-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-8 pb-24">
      
      {!selectedRoutine ? (
        // ROUTINES LISTING VIEW
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal">Ejercicios Miofuncionales de ATM</h2>
            <p className="text-sm text-brand-brown max-w-xl">
              Fisioterapia maxilofacial y decompressión neuromuscular activa. Sigue estas guías ilustradas paso a paso para relajar los músculos del cuello y maxilar inferior.
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex gap-2 p-1 bg-brand-beige rounded-2xl border border-brand-olive/10">
            {(['Noche', 'Mañana', 'Alivio SOS'] as const).map((cat) => (
              <button
                key={cat}
                id={`routine-tab-${cat.replace(' ', '')}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 text-xs font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-white text-brand-olive shadow-sm font-bold border-b border-brand-olive/15' 
                    : 'text-brand-brown hover:text-brand-charcoal'
                }`}
              >
                {cat === 'Noche' && '🌙 Ritual Noche'}
                {cat === 'Mañana' && '☀️ Despertar ATM'}
                {cat === 'Alivio SOS' && '🚨 Alivio Rápido SOS'}
              </button>
            ))}
          </div>

          {/* Routines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routines.map((routine) => {
              const isLocked = routine.isPremium && !user.isPremium;

              return (
                <div 
                  key={routine.id}
                  className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium relative flex flex-col justify-between"
                >
                  {isLocked && (
                    <div className="absolute top-4 right-4 bg-brand-gold/20 text-brand-gold-dark text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Premium
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-brand-brown uppercase font-bold">
                      <Clock className="w-3.5 h-3.5 text-brand-gold-dark" />
                      <span>{routine.durationMinutes} minutos</span>
                      <span className="mx-1">•</span>
                      <span>{routine.steps.length} ejercicios</span>
                    </div>

                    <h3 className="font-serif text-lg text-brand-charcoal">{routine.title}</h3>
                    <p className="text-xs text-brand-brown leading-relaxed">{routine.description}</p>
                    
                    {/* Tiny list of steps preview */}
                    <div className="pt-2">
                      <div className="text-[10px] text-brand-charcoal/80 font-semibold tracking-wide uppercase mb-1.5">Ejercicios incluidos:</div>
                      <div className="space-y-1">
                        {routine.steps.map((step, idx) => (
                          <div key={idx} className="text-xs text-brand-brown flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-olive/30 shrink-0" />
                            <span className="truncate">{step.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-olive/5 flex items-center justify-between">
                    <span className="text-[11px] text-brand-brown font-mono">
                      {isLocked ? 'Requiere suscripción' : 'Acceso inmediato'}
                    </span>
                    <button
                      id={`start-routine-btn-${routine.id}`}
                      onClick={() => handleStartRoutine(routine)}
                      className={`text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                        isLocked 
                          ? 'bg-brand-beige border border-brand-gold/30 text-brand-gold-dark hover:bg-brand-gold/10' 
                          : 'bg-brand-olive text-white hover:bg-brand-olive-dark'
                      }`}
                    >
                      {isLocked ? 'Desbloquear con Premium' : 'Iniciar Práctica'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick FAQ warning */}
          <div className="p-4 bg-brand-beige rounded-2xl border border-brand-olive/10 max-w-xl mx-auto text-center space-y-1.5">
            <h5 className="font-display font-semibold text-xs text-brand-charcoal">¿Sientes chasquido o dolor punzante?</h5>
            <p className="text-[10px] text-brand-brown leading-relaxed">
              Si al realizar estos estiramientos sientes dolor punzante en la articulación ATM o un fuerte ruido sordo/chasquido, detén inmediatamente la práctica. Esto podría indicar un desplazamiento de disco articular que debe ser evaluado por un odontólogo ortodoncista.
            </p>
          </div>
        </div>
      ) : (
        // ACTIVE INTERACTIVE TIMER RUNNER
        <div className="bg-brand-charcoal text-brand-beige rounded-3xl p-6 sm:p-10 shadow-premium-lg max-w-2xl mx-auto space-y-8 animate-fade-in relative overflow-hidden">
          
          {/* Subtle gold ambient glow background */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          {/* Completed screen */}
          {isCompleted ? (
            <div className="text-center space-y-6 py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-brand-olive text-white flex items-center justify-center mx-auto shadow-premium">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="bg-brand-gold text-brand-charcoal text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-mono">
                  Práctica Terminada
                </span>
                <h3 className="font-serif text-2xl text-white">¡Rutina Completada con Éxito!</h3>
                <p className="text-xs text-brand-brown max-w-md mx-auto">
                  Has liberado la tensión residual acumulada. Tu mandíbula, cervicales y sistema nervioso te lo agradecerán durante el descanso de esta noche.
                </p>
              </div>

              {/* Racha increment show */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl">
                <Flame className="w-4 h-4 text-brand-gold fill-current" />
                <span className="text-xs font-mono">Racha actual: <strong>{user.currentStreak} {user.currentStreak === 1 ? 'Día' : 'Días'}</strong></span>
              </div>

              <div className="pt-6 flex justify-center">
                <button
                  id="finish-routine-close-btn"
                  onClick={() => setSelectedRoutine(null)}
                  className="bg-brand-olive text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-brand-olive-dark shadow-premium transition-all cursor-pointer"
                >
                  Volver al Panel Principal
                </button>
              </div>
            </div>
          ) : (
            // RUNNING STEP VIEW
            <div className="space-y-8">
              {/* Top back button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedRoutine(null)}
                  className="text-xs text-brand-brown hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Salir
                </button>
                <div className="text-[10px] text-brand-brown font-mono uppercase tracking-widest font-bold">
                  Ejercicio {currentStepIndex + 1} de {selectedRoutine.steps.length}
                </div>
              </div>

              {/* Routine general details */}
              <div className="text-center space-y-1">
                <h4 className="font-serif text-lg text-white">{selectedRoutine.title}</h4>
                <div className="text-[11px] text-brand-gold-dark font-mono uppercase">
                  Paso: {activeStep?.exerciseType?.toUpperCase()}
                </div>
              </div>

              {/* Big Circular/Elliptical Timer visualizer */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-44 h-44 rounded-full border-4 border-brand-olive/30 flex flex-col items-center justify-center relative shadow-premium bg-brand-charcoal/40">
                  {/* Soothing breathing pulse effect if respiracion type */}
                  {activeStep?.exerciseType === 'respiracion' && isPlaying && (
                    <div className="absolute inset-0 border-4 border-brand-gold rounded-full animate-ping opacity-30" />
                  )}

                  <span className="text-4xl font-mono font-bold text-white tracking-tight">
                    {formatTime(secondsRemaining)}
                  </span>
                  <span className="text-[10px] text-brand-brown font-mono uppercase tracking-wider mt-1.5">
                    {isPlaying ? 'Mantente así' : 'Pausado'}
                  </span>
                </div>
              </div>

              {/* Exercise description (The Guide Step) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center space-y-2 max-w-md mx-auto">
                <h5 className="font-display font-semibold text-white text-sm">
                  {activeStep?.title}
                </h5>
                <p className="text-xs text-brand-beige/80 leading-relaxed">
                  {activeStep?.description}
                </p>
              </div>

              {/* Player Controllers */}
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className={`p-3 rounded-full border border-white/10 flex items-center justify-center transition-colors cursor-pointer ${
                    currentStepIndex === 0 ? 'text-white/20 cursor-not-allowed' : 'text-brand-brown hover:text-white'
                  }`}
                  title="Anterior"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  id="play-pause-routine-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-brand-olive text-white flex items-center justify-center hover:bg-brand-olive-dark shadow-premium-lg transition-all transform hover:scale-105 cursor-pointer"
                  title={isPlaying ? 'Pausar' : 'Iniciar'}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNextStep}
                  className="p-3 rounded-full border border-white/10 text-brand-brown hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Omitir/Siguiente"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Progress dots bar */}
              <div className="flex justify-center gap-1.5 pt-2">
                {selectedRoutine.steps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStepIndex 
                        ? 'w-6 bg-brand-gold' 
                        : idx < currentStepIndex 
                        ? 'w-2 bg-brand-olive' 
                        : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
