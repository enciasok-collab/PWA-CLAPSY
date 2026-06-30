/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EducationalArticle, UserProfile } from '../types';
import { EDUCATIONAL_LIBRARY } from '../mockData';
import { BookOpen, Clock, Lock, Sparkles, ArrowLeft, Share2, Star } from 'lucide-react';

interface EducationProps {
  user: UserProfile;
  onUnlockPremium: () => void;
}

export default function Education({ user, onUnlockPremium }: EducationProps) {
  // Category filter
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Bruxismo' | 'Apnea del Sueño' | 'Manejo del Estrés' | 'Higiene del Sueño'>('Todos');
  
  // Selected article for reader mode
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);

  // Filter articles
  const filteredArticles = EDUCATIONAL_LIBRARY.filter(art => {
    if (activeCategory === 'Todos') return true;
    return art.category === activeCategory;
  });

  const handleSelectArticle = (art: EducationalArticle) => {
    if (art.isPremium && !user.isPremium) {
      onUnlockPremium();
      return;
    }
    setSelectedArticle(art);
  };

  return (
    <div id="education-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-8 pb-24">
      
      {!selectedArticle ? (
        // ARTICLES LISTING VIEW
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal">Biblioteca Educativa Científica</h2>
            <p className="text-sm text-brand-brown max-w-xl">
              Artículos cortos redactados por odontólogos y somnólogos para ayudarte a comprender el origen del bruxismo y los microdespertares.
            </p>
          </div>

          {/* Topic Filters */}
          <div className="flex flex-wrap gap-2 p-1 bg-brand-beige rounded-2xl border border-brand-olive/10">
            {(['Todos', 'Bruxismo', 'Apnea del Sueño', 'Manejo del Estrés', 'Higiene del Sueño'] as const).map((cat) => (
              <button
                key={cat}
                id={`edu-filter-${cat.replace(' ', '')}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 text-[11px] sm:text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-white text-brand-olive shadow-sm font-bold border-b border-brand-olive/15' 
                    : 'text-brand-brown hover:text-brand-charcoal'
                }`}
              >
                {cat === 'Todos' ? 'Todos' : cat}
              </button>
            ))}
          </div>

          {/* Articles Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((art) => {
              const isLocked = art.isPremium && !user.isPremium;

              return (
                <div 
                  key={art.id}
                  id={`article-card-${art.id}`}
                  onClick={() => handleSelectArticle(art)}
                  className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium hover:border-brand-olive/30 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-brand-brown uppercase tracking-wider bg-brand-beige px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                      
                      {isLocked ? (
                        <span className="text-[10px] font-bold text-brand-gold-dark flex items-center gap-0.5 uppercase font-mono bg-brand-gold/15 px-2 py-0.5 rounded">
                          <Lock className="w-3 h-3" /> Lock
                        </span>
                      ) : (
                        <span className="text-[10px] text-brand-brown font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brand-gold" /> {art.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base sm:text-lg text-brand-charcoal line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-brand-brown line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-brand-olive/5 flex items-center justify-between">
                    <span className="text-[10px] text-brand-brown font-mono">
                      {isLocked ? 'Contenido Premium' : 'Disponible gratis'}
                    </span>
                    <span className="text-xs font-semibold text-brand-olive hover:underline">
                      {isLocked ? 'Desbloquear guía ➔' : 'Leer artículo ➔'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // DISTRACTION-FREE CLINICAL READER MODE
        <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 sm:p-10 shadow-premium max-w-2xl mx-auto space-y-8 animate-fade-in">
          
          {/* Back button */}
          <div className="flex items-center justify-between border-b border-brand-olive/10 pb-4">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs text-brand-olive hover:text-brand-olive-dark font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a la Biblioteca
            </button>

            <button
              onClick={() => alert('¡Enlace de artículo copiado! Ahora puedes compartirlo.')}
              className="p-2 rounded-full hover:bg-brand-beige text-brand-brown hover:text-brand-charcoal transition-colors cursor-pointer"
              title="Compartir"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Article Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-brand-olive-dark bg-brand-olive/10 px-2.5 py-1 rounded-full uppercase">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-brand-brown font-mono">
                Lectura de {selectedArticle.readTime}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-brand-charcoal leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-brand-brown font-mono border-t border-brand-olive/5 pt-3">
              <Star className="w-3.5 h-3.5 text-brand-gold" />
              <span>Revisado clínicamente por la Comisión Médica CLAPSY</span>
            </div>
          </div>

          {/* Article Contents */}
          <div className="space-y-6 text-brand-charcoal leading-relaxed font-sans text-sm sm:text-base">
            {selectedArticle.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Bottom Call to Action or advisory */}
          <div className="bg-brand-beige p-6 rounded-2xl border border-brand-olive/10 text-center space-y-3">
            <h5 className="font-display font-semibold text-brand-charcoal text-xs sm:text-sm">¿Te gustaría recibir asesoramiento individualizado?</h5>
            <p className="text-xs text-brand-brown max-w-md mx-auto leading-relaxed">
              Consulta nuestro directorio de profesionales verificados especialistas en dolor facial, trastornos respiratorios nocturnos y kinesiología ATM.
            </p>
            <button
              id="reader-view-directory-btn"
              onClick={() => {
                setSelectedArticle(null);
                // Trigger navigation to contact
                const customEvent = new CustomEvent('navigate-to-contact');
                window.dispatchEvent(customEvent);
              }}
              className="bg-brand-olive text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-brand-olive-dark transition-colors cursor-pointer shadow-sm"
            >
              Consultar Especialistas ATM
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
