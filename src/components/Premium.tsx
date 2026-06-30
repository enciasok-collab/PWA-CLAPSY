/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Sparkles, ShieldCheck, Star, Award, Check, Clock, Flame, ChevronRight } from 'lucide-react';

interface PremiumProps {
  user: UserProfile;
  onUpgradeSuccess: () => void;
}

export default function Premium({ user, onUpgradeSuccess }: PremiumProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpgradeClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onUpgradeSuccess();
    }, 1500);
  };

  // Hormozi Value Stack items
  const valueStack = [
    {
      title: 'Protocolo Miofuncional Completo de ATM',
      desc: 'Acceso a rutinas de Mañana para disipar rigidez, y botón de Crisis SOS diurna.',
      value: '$49 USD'
    },
    {
      title: 'Biblioteca Completa de Ondas Binaurales',
      desc: 'Toda la gama de frecuencias delta de 2.5Hz, ruido rosa y autohipnosis para rechinado.',
      value: '$39 USD'
    },
    {
      title: 'Cribados Clínicos Certificados Ilimitados',
      desc: 'STOP-BANG para apnea, escala de Epworth y triajes periódicos exportables.',
      value: '$29 USD'
    },
    {
      title: 'Directorio Prioritario y Convenios',
      desc: 'Acceso directo a especialistas en ATM y odontólogos del sueño con un 15% de descuento en citas.',
      value: '$35 USD'
    },
    {
      title: 'Integración Inteligente de Sueño (IA Futura)',
      desc: 'Prioridad de acceso anticipado a nuestro motor de IA para predecir tus picos de tensión mandibular.',
      value: 'Invaluable'
    }
  ];

  if (success || user.isPremium) {
    return (
      <div id="premium-tab-success" className="px-6 py-12 text-center max-w-md mx-auto space-y-6 animate-fade-in pb-24">
        <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center mx-auto shadow-premium-lg animate-bounce">
          <Award className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] bg-brand-olive text-white font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
            Suscripción Activa
          </span>
          <h3 className="font-serif text-2xl text-brand-charcoal">¡Eres Miembro CLAPSY Premium!</h3>
          <p className="text-xs text-brand-brown leading-relaxed">
            Acabas de desbloquear el protocolo definitivo de descompresión mandibular, inducción circadiana con frecuencias y el directorio de profesionales.
          </p>
        </div>
        <div className="bg-brand-beige p-5 rounded-2xl border border-brand-olive/10 text-xs font-mono text-brand-charcoal/80">
          ✓ Acceso ilimitado de por vida activado.
        </div>
      </div>
    );
  }

  return (
    <div id="premium-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-12 pb-24">
      
      {/* Persuading Hero Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold-dark text-xs font-bold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LA OFERTA IRRESISTIBLE CLAPSY</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal tracking-tight leading-tight">
          Recupera un descanso reparador profundo y despierta sin tensión mandbular.
        </h2>
        <p className="text-sm text-brand-brown leading-relaxed font-sans">
          No te pedimos una suscripción mensual eterna. Únete a nuestro plan de acceso ilimitado para siempre por una fracción del costo de una sola férula de resina dura.
        </p>
      </div>

      {/* Hormozi Value Stack Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The Stack List (Col Span 7) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-brand-olive/10 p-6 sm:p-8 shadow-premium space-y-6">
          <h3 className="font-serif text-lg text-brand-charcoal border-b border-brand-olive/5 pb-2.5 flex items-center gap-2">
            <Check className="w-5 h-5 text-brand-olive" />
            Lo que estás desbloqueando hoy:
          </h3>

          <div className="space-y-5">
            {valueStack.map((item, index) => (
              <div key={index} className="flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-display font-semibold text-brand-charcoal flex items-center gap-2">
                    <span className="text-brand-gold-dark">•</span> {item.title}
                  </h4>
                  <p className="text-brand-brown leading-relaxed pr-2">{item.desc}</p>
                </div>
                <div className="text-brand-brown font-mono font-bold shrink-0">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-brand-olive/5 flex items-center justify-between font-mono text-xs font-bold text-brand-charcoal">
            <span>VALOR REAL ACUMULADO:</span>
            <span className="text-red-600 line-through">$181.00 USD</span>
          </div>
        </div>

        {/* Right Column: The Offer Box (Col Span 5) */}
        <div className="md:col-span-5 bg-brand-charcoal text-brand-beige rounded-3xl p-6 sm:p-8 shadow-premium-lg border border-brand-olive/15 text-center space-y-6 relative overflow-hidden">
          
          {/* Urgency header */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-[10px] font-bold font-mono tracking-wider">
            <Clock className="w-3.5 h-3.5" /> PAGO ÚNICO • ACCESO DE POR VIDA
          </div>

          <div className="space-y-1">
            <div className="text-xs text-brand-brown line-through font-mono">$181 USD</div>
            <div className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              $19 USD
            </div>
            <p className="text-[10px] text-brand-brown uppercase font-semibold tracking-wider pt-1">
              Único pago para siempre. Sin cuotas recurrentes.
            </p>
          </div>

          {/* Bullet proofs */}
          <ul className="text-left space-y-3.5 text-xs text-brand-beige/90 pt-2 border-t border-white/5">
            <li className="flex items-center gap-2">
              <span className="text-brand-gold text-lg font-bold">✓</span>
              <span>Acceso inmediato a todos los audios</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-gold text-lg font-bold">✓</span>
              <span>Rutinas de Mañana y SOS diurnas</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-gold text-lg font-bold">✓</span>
              <span>Estadísticas clínicas completas</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-gold text-lg font-bold">✓</span>
              <span>15% descuento en Especialistas</span>
            </li>
          </ul>

          <button
            id="premium-buy-btn"
            onClick={handleUpgradeClick}
            disabled={loading}
            className="w-full bg-brand-gold text-brand-charcoal font-display font-bold py-4 rounded-2xl hover:bg-brand-gold-dark hover:text-white transition-all shadow-premium hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-brand-charcoal border-t-transparent animate-spin" />
            ) : (
              <>
                Desbloquear Todo por $19
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[9px] text-brand-brown font-mono">
            Soporta Google Pay, tarjetas de crédito internacionales y PayPal de forma segura.
          </p>
        </div>

      </div>

      {/* The Cialdini Risk Reversal Guarantee */}
      <div className="bg-brand-beige p-6 sm:p-8 rounded-3xl border border-brand-olive/10 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto shadow-premium">
        <div className="p-3.5 bg-brand-olive/10 rounded-full text-brand-olive shrink-0">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h4 className="font-serif text-lg text-brand-charcoal">La Garantía Incondicional de Descanso por 30 Días</h4>
          <p className="text-xs text-brand-brown leading-relaxed font-sans">
            Creemos firmemente en el método de descompresión neuromuscular de CLAPSY. Si realizas las rutinas diariamente durante 14 días y sigues despertando con rigidez mandibular dolorosa, pesadez o fatiga diurna inhabilitante, simplemente escríbenos a soporte y te reembolsaremos tu compra al 100%. Sin preguntas de filtro ni letra pequeña. Asumimos el riesgo total porque confiamos en la ciencia del descanso reparador.
          </p>
        </div>
      </div>

    </div>
  );
}
