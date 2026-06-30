/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Moon, Sparkles, Activity, ArrowRight, UserCheck, Star, Volume2, Award } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onLoginClick: () => void;
}

export default function Landing({ onStart, onLoginClick }: LandingProps) {
  return (
    <div id="landing-page" className="min-h-screen flex flex-col bg-brand-beige-light">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-brand-beige-light/80 backdrop-blur-md border-b border-brand-olive/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-brand-olive flex items-center justify-center text-white font-display font-bold text-lg tracking-wider shadow-premium">
            C
          </div>
          <span className="font-display font-bold text-xl text-brand-charcoal tracking-widest">CLAPSY</span>
          <span className="text-[10px] bg-brand-gold/25 text-brand-olive-dark font-medium px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
            ATM & Sueño
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            id="nav-login-btn"
            onClick={onLoginClick}
            className="text-sm font-medium text-brand-olive hover:text-brand-olive-dark transition-colors cursor-pointer"
          >
            Iniciar Sesión
          </button>
          <button
            id="nav-start-btn"
            onClick={onStart}
            className="bg-brand-olive text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-brand-olive-dark shadow-premium transition-all hover:scale-[1.02] cursor-pointer"
          >
            Evaluarme Gratis
          </button>
        </div>
      </header>

      {/* Hero Section - StoryBrand Character Entry */}
      <section className="px-6 pt-12 pb-20 max-w-4xl mx-auto text-center flex-grow flex flex-col justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-olive/10 text-brand-olive-dark text-xs font-medium mb-6 animate-fade-in self-center">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
          <span>No vendemos audios para dormir. Reprogramamos tu descanso.</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-charcoal tracking-tight leading-tight mb-6">
          Despierta sin dolor.<br />
          <span className="font-sans font-semibold text-brand-olive italic">Libera tu mandíbula</span> y recupera tu energía.
        </h1>

        <p className="text-brand-brown text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          El bruxismo y los microdespertares no son problemas dentales casuales. Son la respuesta de tu sistema autónomo ante el estrés y la falta de aire. Descubre el origen real con nuestro triaje clínico digital y activa tu recuperación hoy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            id="hero-primary-btn"
            onClick={onStart}
            className="w-full sm:w-auto bg-brand-olive text-white font-medium px-8 py-4 rounded-2xl hover:bg-brand-olive-dark shadow-premium-lg transition-all hover:scale-[1.03] flex items-center justify-center gap-2 group cursor-pointer"
          >
            Comenzar Evaluación Gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            id="hero-secondary-btn"
            onClick={onLoginClick}
            className="w-full sm:w-auto bg-white text-brand-charcoal border border-brand-brown/30 font-medium px-8 py-4 rounded-2xl hover:bg-brand-beige transition-all shadow-premium flex items-center justify-center gap-2 cursor-pointer"
          >
            Tengo una cuenta
          </button>
        </div>

        {/* Social Proof (Authority & Trust) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-brand-olive/10">
          <div className="flex items-start gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-brand-olive/5 text-brand-olive">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-medium text-brand-charcoal text-sm">Cribados Clínicos Validados</h4>
              <p className="text-xs text-brand-brown mt-0.5">Basado en STOP-BANG y la Escala de Epworth, estándares de oro médicos.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-brand-olive/5 text-brand-olive">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-medium text-brand-charcoal text-sm">Descompresión Neuromuscular</h4>
              <p className="text-xs text-brand-brown mt-0.5">Ejercicios activos para inhibir los reflejos rítmicos del músculo masetero.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-brand-olive/5 text-brand-olive">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-medium text-brand-charcoal text-sm">Frecuencias Inteligentes</h4>
              <p className="text-xs text-brand-brown mt-0.5">Inducción con ondas delta y ruido rosa para suprimir microdespertares.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & The Solution - Hormozi Concept Strategy */}
      <section className="bg-brand-beige py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-brand-charcoal mb-4">
            El gran error de las férulas convencionales
          </h2>
          <p className="text-center text-brand-brown max-w-xl mx-auto mb-14 text-sm sm:text-base">
            Las férulas de descarga protegen tus dientes del desgaste mecánico, pero no detienen el impulso neuronal de apretar la mandíbula ni resuelven el ahogo nocturno.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-3xl border border-red-200/50 shadow-premium">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6 font-bold text-lg">✗</div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal mb-3">Enfoque Paliativo Común</h3>
              <ul className="space-y-3 text-sm text-brand-brown">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Férulas de plástico:</strong> Protegen el esmalte pero aumentan el reflejo de morder por resistencia elástica.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Fármacos relajantes:</strong> Alteran la arquitectura natural del sueño y crean dependencia crónica.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Desconocimiento respiratorio:</strong> Ignoran las apneas obstructivas que detonan el apriete mandibular.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-brand-olive/30 shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-gold text-brand-charcoal text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl font-mono tracking-wider">
                Recomendado
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-olive/10 text-brand-olive flex items-center justify-center mb-6 font-bold text-lg">✓</div>
              <h3 className="font-display font-semibold text-lg text-brand-charcoal mb-3">El Protocolo Integrativo CLAPSY</h3>
              <ul className="space-y-3 text-sm text-brand-charcoal">
                <li className="flex items-start gap-2">
                  <span className="text-brand-olive font-bold">✓</span>
                  <span><strong>Descompresión Miofuncional:</strong> Masajes y estiramientos guiados que desactivan el masetero.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-olive font-bold">✓</span>
                  <span><strong>Cribado Multidisciplinar:</strong> Algoritmos validados STOP-BANG y somnolencia Epworth en un solo lugar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-olive font-bold">✓</span>
                  <span><strong>Higiene Somática:</strong> Sincronización circadiana mediante sonido binaural y educación científica.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Proof Quote - Dentist */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-brand-olive/10 shadow-premium max-w-2xl mx-auto flex flex-col items-center text-center">
            <div className="flex gap-1 mb-4 text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-serif italic text-brand-charcoal text-base mb-6">
              "El 70% de mis pacientes con bruxismo severo también reportan ronquidos y fatiga diurna. CLAPSY proporciona la herramienta de monitoreo, ejercicios miofuncionales y triaje que faltaba para un manejo médico real desde casa."
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop"
                alt="Dra. Lucía S."
                className="w-10 h-10 rounded-full object-cover border border-brand-gold"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <div className="font-display font-semibold text-xs text-brand-charcoal">Dra. Lucía Sotomayor</div>
                <div className="text-[10px] text-brand-brown font-mono">Especialista en Medicina Dental del Sueño y ATM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="bg-brand-charcoal text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Award className="w-12 h-12 text-brand-gold mx-auto mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl mb-4 text-brand-beige">Nuestra Misión y Compromiso Ético</h2>
          <p className="text-brand-brown text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            CLAPSY es un complemento digital interactivo enfocado en bienestar somático, ejercicio guiado e higiene circadiana. Aclaramos que no reemplaza un diagnóstico médico especializado para patologías graves de ATM o apneas severas, pero te ayuda a identificar riesgos y recopilar métricas para tu especialista.
          </p>
          <button
            id="footer-action-btn"
            onClick={onStart}
            className="bg-brand-gold text-brand-charcoal font-display font-semibold px-8 py-3.5 rounded-2xl hover:bg-brand-gold-dark hover:text-white shadow-premium transition-all hover:scale-[1.03] cursor-pointer"
          >
            Comenzar mi Cribado Completo Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-beige-light border-t border-brand-olive/10 py-10 px-6 text-center text-xs text-brand-brown font-mono">
        <p className="mb-2">© 2026 CLAPSY ATM & Sueño. Todos los derechos reservados.</p>
        <p>Diseño premium optimizado. PWA de Salud y Bienestar.</p>
      </footer>
    </div>
  );
}
