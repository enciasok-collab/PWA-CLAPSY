/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AudioTrack, UserProfile } from '../types';
import { AUDIO_LIBRARY } from '../mockData';
import { Play, Pause, Lock, Volume2, SkipBack, SkipForward, Sparkles, Headphones, Disc } from 'lucide-react';

interface AudiosProps {
  user: UserProfile;
  onUnlockPremium: () => void;
}

export default function Audios({ user, onUnlockPremium }: AudiosProps) {
  // Category filter
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Relajación' | 'Meditación' | 'Frecuencias' | 'Fisioterapia Mandibular'>('Todos');
  
  // Custom Player State
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter tracks
  const filteredTracks = AUDIO_LIBRARY.filter(track => {
    if (activeCategory === 'Todos') return true;
    return track.category === activeCategory;
  });

  // Handle Track Selection & Play
  const handleSelectTrack = (track: AudioTrack) => {
    // Check Premium Lock
    if (track.isPremium && !user.isPremium) {
      onUnlockPremium();
      return;
    }

    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  // Timer Effect for progress bar
  useEffect(() => {
    if (isPlaying && currentTrack) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.durationSeconds) {
            setIsPlaying(false);
            clearInterval(timerRef.current!);
            return currentTrack.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentTrack]);

  const handleSkipForward = () => {
    if (!currentTrack) return;
    setCurrentTime(prev => Math.min(prev + 15, currentTrack.durationSeconds));
  };

  const handleSkipBackward = () => {
    if (!currentTrack) return;
    setCurrentTime(prev => Math.max(prev - 15, 0));
  };

  const formatSeconds = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = currentTrack 
    ? (currentTime / currentTrack.durationSeconds) * 100 
    : 0;

  return (
    <div id="audios-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-8 pb-32">
      
      <div className="space-y-2">
        <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal">Biblioteca de Audios Circadianos</h2>
        <p className="text-sm text-brand-brown max-w-xl">
          Sonidos terapéuticos de alta fidelidad. Utiliza auriculares estéreo para beneficiarte del arrastre de ondas cerebrales mediante tonos binaurales.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2 p-1 bg-brand-beige rounded-2xl border border-brand-olive/10">
        {(['Todos', 'Relajación', 'Meditación', 'Frecuencias', 'Fisioterapia Mandibular'] as const).map((cat) => (
          <button
            key={cat}
            id={`audio-filter-${cat.replace(' ', '')}`}
            onClick={() => setActiveCategory(cat)}
            className={`flex-1 text-[11px] sm:text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
              activeCategory === cat 
                ? 'bg-white text-brand-olive shadow-sm font-bold border-b border-brand-olive/15' 
                : 'text-brand-brown hover:text-brand-charcoal'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Custom Player Module */}
      {currentTrack && (
        <div className="bg-brand-charcoal text-brand-beige rounded-3xl p-6 shadow-premium-lg border border-brand-olive/15 space-y-5 animate-fade-in relative overflow-hidden">
          
          {/* Wave animation in bg */}
          <div className="absolute inset-x-0 bottom-0 opacity-10 flex items-end justify-center gap-0.5 h-16 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className="bg-brand-gold w-1.5 rounded-t"
                style={{ 
                  height: isPlaying ? `${Math.floor(Math.random() * 80) + 20}%` : '15%',
                  transition: 'height 0.3s ease-in-out'
                }}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className={`w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold shrink-0 border border-brand-gold/25 ${
                isPlaying ? 'animate-spin' : ''
              }`} style={{ animationDuration: '10s' }}>
                <Disc className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] text-brand-gold-dark font-mono uppercase font-bold tracking-wider">
                  Reproduciendo: {currentTrack.category}
                </span>
                <h3 className="font-serif text-lg text-white mt-0.5">{currentTrack.title}</h3>
                <p className="text-[11px] text-brand-brown line-clamp-1 max-w-md">{currentTrack.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-brand-brown font-mono">
              <Headphones className="w-4 h-4 text-brand-gold" />
              <span>Auriculares Recomendados</span>
            </div>
          </div>

          {/* Interactive slider tracking bar */}
          <div className="space-y-1.5 relative z-10">
            <div className="w-full bg-white/10 rounded-full h-1.5 relative overflow-hidden">
              <div 
                className="bg-brand-gold h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-brand-brown">
              <span>{formatSeconds(currentTime)}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Audio controller buttons */}
          <div className="flex items-center justify-center gap-6 relative z-10">
            <button
              onClick={handleSkipBackward}
              className="p-2.5 text-brand-brown hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              title="Retroceder 15s"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              id="player-play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center hover:bg-brand-gold-dark hover:text-white transition-all transform hover:scale-105 shadow-premium-lg cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              )}
            </button>

            <button
              onClick={handleSkipForward}
              className="p-2.5 text-brand-brown hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              title="Avanzar 15s"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

        </div>
      )}

      {/* Tracks Grid List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTracks.map((track) => {
          const isSelected = currentTrack?.id === track.id;
          const isLocked = track.isPremium && !user.isPremium;

          return (
            <div
              key={track.id}
              id={`audio-card-${track.id}`}
              onClick={() => handleSelectTrack(track)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSelected 
                  ? 'bg-brand-olive/10 border-brand-olive shadow-sm' 
                  : 'bg-white hover:bg-brand-beige-light/55 border-brand-olive/10 hover:border-brand-olive/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                  isSelected 
                    ? 'bg-brand-olive text-white border-brand-olive' 
                    : isLocked 
                    ? 'bg-brand-beige border-brand-gold/30 text-brand-gold-dark'
                    : 'bg-brand-beige border-brand-olive/10 text-brand-olive'
                }`}>
                  {isLocked ? (
                    <Lock className="w-5 h-5" />
                  ) : isSelected && isPlaying ? (
                    <div className="flex items-end gap-0.5 h-4">
                      <div className="bg-white w-1 rounded-t h-2 animate-pulse" />
                      <div className="bg-white w-1 rounded-t h-4 animate-pulse" style={{ animationDelay: '0.15s' }} />
                      <div className="bg-white w-1 rounded-t h-3 animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>
                  ) : (
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-brand-beige text-brand-brown">
                      {track.category}
                    </span>
                    {isLocked && (
                      <span className="text-[9px] font-bold text-brand-gold-dark flex items-center gap-0.5 uppercase font-mono bg-brand-gold/15 px-2 py-0.5 rounded">
                        <Sparkles className="w-2.5 h-2.5" /> Premium
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-brand-charcoal">{track.title}</h4>
                  <p className="text-xs text-brand-brown leading-relaxed">{track.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-brand-olive/5 pt-3 sm:pt-0 shrink-0 font-mono text-xs">
                <div className="text-brand-brown">Duración: <strong>{track.duration}</strong></div>
                
                <button
                  id={`play-track-btn-${track.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTrack(track);
                  }}
                  className={`text-[11px] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    isSelected && isPlaying
                      ? 'bg-brand-olive text-white hover:bg-brand-olive-dark'
                      : isLocked
                      ? 'bg-brand-gold/15 text-brand-gold-dark hover:bg-brand-gold/25'
                      : 'bg-brand-olive/10 text-brand-olive hover:bg-brand-olive/20'
                  }`}
                >
                  {isLocked ? 'Desbloquear' : isSelected && isPlaying ? 'Pausar' : 'Escuchar'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
