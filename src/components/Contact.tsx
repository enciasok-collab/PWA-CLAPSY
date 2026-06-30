/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SleepSpecialist } from '../types';
import { SPECIALISTS_DIRECTORY } from '../mockData';
import { Heart, Mail, Phone, CalendarCheck, ShieldCheck, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [selectedSpecialist, setSelectedSpecialist] = useState<SleepSpecialist | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Listen to cross-navigation events from other tabs
  useEffect(() => {
    const handleNavigate = () => {
      // By default, focus the first specialist
      setSelectedSpecialist(SPECIALISTS_DIRECTORY[0]);
    };
    window.addEventListener('navigate-to-contact', handleNavigate);
    return () => {
      window.removeEventListener('navigate-to-contact', handleNavigate);
    };
  }, []);

  const handleSymptomToggle = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpecialist) return;

    // Simulate backend sending email
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setUserName('');
      setUserEmail('');
      setMessage('');
      setSymptoms([]);
      setSelectedSpecialist(null);
    }, 4000);
  };

  return (
    <div id="contact-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-8 pb-24">
      
      <div className="space-y-2">
        <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal">Red de Especialistas Verificados</h2>
        <p className="text-sm text-brand-brown max-w-xl">
          Encuentra odontólogos expertos en ATM, fisioterapeutas maxilofaciales y médicos somnólogos recomendados por CLAPSY para un diagnóstico definitivo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: List of Specialists (Col Span 7) */}
        <div className="md:col-span-7 space-y-5">
          {SPECIALISTS_DIRECTORY.map((sp) => (
            <div 
              key={sp.id}
              id={`specialist-card-${sp.id}`}
              onClick={() => setSelectedSpecialist(sp)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex gap-4 ${
                selectedSpecialist?.id === sp.id 
                  ? 'bg-brand-olive/10 border-brand-olive shadow-sm' 
                  : 'bg-white hover:bg-brand-beige-light border-brand-olive/10'
              }`}
            >
              <img 
                src={sp.avatarUrl} 
                alt={sp.name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-brand-charcoal">{sp.name}</h3>
                  {sp.isPremiumPartner && (
                    <span className="text-[8px] bg-brand-gold/25 text-brand-gold-dark font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-wide">
                      Verificado
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-brand-olive">{sp.role}</div>
                <div className="text-[11px] text-brand-brown leading-relaxed">{sp.credentials}</div>
                <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-brand-brown">
                  <span>📍 {sp.city}</span>
                  <span>⭐ {sp.rating} (Opiniones)</span>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/25 flex items-start gap-2.5">
            <AlertCircle className="w-4.5 h-4.5 text-brand-gold-dark shrink-0 mt-0.5" />
            <p className="text-[10px] text-brand-charcoal leading-relaxed">
              <strong>Descuento Especial Miembros:</strong> Al contactar mediante este formulario, tienes asegurado un <strong>15% de descuento</strong> en tu primera teleconsulta u orientación diagnóstica con los especialistas Premium de la red.
            </p>
          </div>
        </div>

        {/* Right Column: Referral / Booking Request Form (Col Span 5) */}
        <div className="md:col-span-5">
          <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium space-y-5">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-brand-olive" />
              <h4 className="font-serif text-base text-brand-charcoal">Solicitud de Orientación</h4>
            </div>

            {submitted ? (
              <div className="bg-brand-olive/10 border border-brand-olive/20 rounded-2xl p-6 text-center space-y-3 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-brand-olive text-white flex items-center justify-center mx-auto">✓</div>
                <h5 className="font-display font-semibold text-sm text-brand-charcoal">¡Solicitud Enviada!</h5>
                <p className="text-xs text-brand-brown">
                  El equipo de {selectedSpecialist?.name} ha recibido tus respuestas de triaje. Se pondrán en contacto contigo en tu email para coordinar la llamada diagnóstica.
                </p>
              </div>
            ) : selectedSpecialist ? (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="p-3 bg-brand-beige rounded-2xl border border-brand-olive/5 flex items-center gap-2.5 text-xs text-brand-charcoal">
                  <img 
                    src={selectedSpecialist.avatarUrl} 
                    alt={selectedSpecialist.name} 
                    className="w-8 h-8 rounded-full object-cover border border-brand-gold shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-bold">{selectedSpecialist.name}</div>
                    <div className="text-[10px] text-brand-olive font-semibold">{selectedSpecialist.role}</div>
                  </div>
                </div>

                {/* Patient details */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-brand-charcoal mb-1">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Ej. Sofía López"
                      className="w-full text-xs rounded-xl border border-brand-brown/20 p-2.5 outline-none focus:border-brand-olive bg-brand-beige-light/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-brand-charcoal mb-1">Email de Contacto</label>
                    <input 
                      type="email" 
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Ej. sofia@gmail.com"
                      className="w-full text-xs rounded-xl border border-brand-brown/20 p-2.5 outline-none focus:border-brand-olive bg-brand-beige-light/40"
                    />
                  </div>
                </div>

                {/* Symptom Checklist */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-brand-charcoal">Síntomas Principales</label>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {['Bruxismo nocturno', 'Ronquido fuerte', 'Cansancio diurno', 'Dolor mandibular'].map((sym) => (
                      <label 
                        key={sym} 
                        className={`flex items-center gap-1.5 p-2 rounded-xl border cursor-pointer transition-colors ${
                          symptoms.includes(sym) ? 'bg-brand-olive/10 border-brand-olive' : 'bg-brand-beige-light border-transparent'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={symptoms.includes(sym)}
                          onChange={() => handleSymptomToggle(sym)}
                          className="hidden"
                        />
                        <span>{sym}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-medium text-brand-charcoal mb-1">Motivo de consulta (opcional)</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe brevemente tus molestias, si usas férula de descarga..."
                    rows={3}
                    className="w-full text-xs rounded-xl border border-brand-brown/20 p-2.5 outline-none focus:border-brand-olive bg-brand-beige-light/40"
                  />
                </div>

                <button
                  id="submit-booking-btn"
                  type="submit"
                  className="w-full bg-brand-olive hover:bg-brand-olive-dark text-white text-xs font-semibold py-3 rounded-xl shadow-premium transition-colors cursor-pointer"
                >
                  Enviar Información de Triaje
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-2">
                <MessageSquare className="w-8 h-8 text-brand-gold mx-auto" />
                <h5 className="font-display font-medium text-brand-charcoal text-xs">Selecciona un Especialista</h5>
                <p className="text-[10px] text-brand-brown max-w-xs mx-auto">
                  Haz clic en cualquiera de los médicos o terapeutas de la izquierda para ver su perfil completo e iniciar el envío seguro de tus síntomas.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
