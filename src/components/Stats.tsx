/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DailyLog } from '../types';
import { Activity, Calendar, ShieldAlert, Sparkles, TrendingUp, Moon, Award, Info } from 'lucide-react';

interface StatsProps {
  dailyLogs: DailyLog[];
  onClearLogs: () => void;
}

export default function Stats({ dailyLogs, onClearLogs }: StatsProps) {
  const [activeMetric, setActiveMetric] = useState<'all' | 'sleep' | 'bruxism' | 'stress'>('all');

  // If logs are empty, render empty state
  if (dailyLogs.length === 0) {
    return (
      <div id="stats-tab" className="px-6 py-12 text-center max-w-md mx-auto space-y-4">
        <TrendingUp className="w-12 h-12 text-brand-gold mx-auto" />
        <h3 className="font-serif text-xl text-brand-charcoal">Sin historial disponible</h3>
        <p className="text-xs text-brand-brown leading-relaxed">
          Para ver tus gráficos de evolución de bruxismo y calidad del sueño, primero debes registrar tus síntomas diarios utilizando el formulario del panel principal.
        </p>
      </div>
    );
  }

  // Sort logs by date to ensure proper chronological order in chart
  const sortedLogs = [...dailyLogs].sort((a, b) => a.date.localeCompare(b.date));

  // Determine average scores
  const totalLogs = sortedLogs.length;
  const avgSleep = parseFloat((sortedLogs.reduce((acc, log) => acc + log.sleepQuality, 0) / totalLogs).toFixed(1));
  const avgBruxism = parseFloat((sortedLogs.reduce((acc, log) => acc + log.bruxismTension, 0) / totalLogs).toFixed(1));
  const avgStress = parseFloat((sortedLogs.reduce((acc, log) => acc + log.stressLevel, 0) / totalLogs).toFixed(1));
  const routineComplianceCount = sortedLogs.filter(log => log.routineCompleted).length;
  const complianceRate = Math.round((routineComplianceCount / totalLogs) * 100);

  // SVG Chart Dimensions
  const width = 500;
  const height = 180;
  const padding = 25;

  // Calculate coordinates for a 7-day log slice
  const getCoordinates = (metric: 'sleep' | 'bruxism' | 'stress') => {
    return sortedLogs.map((log, index) => {
      const x = padding + (index / (totalLogs - 1 || 1)) * (width - padding * 2);
      
      // Values are 1 to 5. Map to chart height (inverted)
      const val = log[metric === 'sleep' ? 'sleepQuality' : metric === 'bruxism' ? 'bruxismTension' : 'stressLevel'];
      const y = height - padding - ((val - 1) / 4) * (height - padding * 2);
      
      return { x, y, val };
    });
  };

  const sleepCoords = getCoordinates('sleep');
  const bruxismCoords = getCoordinates('bruxism');
  const stressCoords = getCoordinates('stress');

  // Convert coordinate list to SVG polyline points string
  const getPointsString = (coords: { x: number; y: number }[]) => {
    return coords.map(c => `${c.x},${c.y}`).join(' ');
  };

  return (
    <div id="stats-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-8 pb-24">
      
      <div className="space-y-2">
        <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal">Evolución de Síntomas ATM y Sueño</h2>
        <p className="text-sm text-brand-brown max-w-xl">
          Visualiza tus tendencias clínicas a lo largo de las semanas para verificar la eficacia de tu descompresión neuromuscular diaria.
        </p>
      </div>

      {/* Grid of Averages (Bento boxes style) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Sleep Quality Box */}
        <div className="bg-white rounded-2xl border border-brand-olive/10 p-4 shadow-sm space-y-1">
          <span className="text-[9px] font-mono text-brand-olive uppercase font-bold tracking-wider">Promedio de Sueño</span>
          <div className="text-2xl font-serif text-brand-charcoal flex items-baseline gap-1">
            {avgSleep} <span className="text-xs text-brand-brown">/ 5</span>
          </div>
          <div className="text-[10px] text-brand-brown">Calidad reparadora</div>
        </div>

        {/* Bruxism Tension Box */}
        <div className="bg-white rounded-2xl border border-brand-olive/10 p-4 shadow-sm space-y-1">
          <span className="text-[9px] font-mono text-brand-gold-dark uppercase font-bold tracking-wider">Tensión Mandibular</span>
          <div className="text-2xl font-serif text-brand-charcoal flex items-baseline gap-1">
            {avgBruxism} <span className="text-xs text-brand-brown">/ 5</span>
          </div>
          <div className="text-[10px] text-brand-brown">Nivel de apriete o dolor</div>
        </div>

        {/* Stress Level Box */}
        <div className="bg-white rounded-2xl border border-brand-olive/10 p-4 shadow-sm space-y-1">
          <span className="text-[9px] font-mono text-brand-brown uppercase font-bold tracking-wider">Nivel de Estrés</span>
          <div className="text-2xl font-serif text-brand-charcoal flex items-baseline gap-1">
            {avgStress} <span className="text-xs text-brand-brown">/ 5</span>
          </div>
          <div className="text-[10px] text-brand-brown">Carga psicosomática</div>
        </div>

        {/* Routine compliance Box */}
        <div className="bg-white rounded-2xl border border-brand-olive/10 p-4 shadow-sm space-y-1">
          <span className="text-[9px] font-mono text-brand-olive-dark uppercase font-bold tracking-wider">Adherencia Rutina</span>
          <div className="text-2xl font-serif text-brand-charcoal flex items-baseline gap-1">
            {complianceRate}%
          </div>
          <div className="text-[10px] text-brand-brown">Días con ejercicios</div>
        </div>
      </div>

      {/* SVG Interactive Line Chart Card */}
      <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-serif text-base text-brand-charcoal">Gráfico Comparativo de Tendencias</h4>
            <p className="text-[10px] text-brand-brown">Visualización consolidada de tus últimos {totalLogs} registros.</p>
          </div>

          {/* Metric Toggles */}
          <div className="flex bg-brand-beige p-1 rounded-xl text-[10px] font-bold">
            <button 
              onClick={() => setActiveMetric('all')}
              className={`px-2.5 py-1.5 rounded-lg cursor-pointer ${activeMetric === 'all' ? 'bg-white text-brand-olive shadow-sm' : 'text-brand-brown'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setActiveMetric('sleep')}
              className={`px-2.5 py-1.5 rounded-lg cursor-pointer ${activeMetric === 'sleep' ? 'bg-white text-brand-olive shadow-sm' : 'text-brand-brown'}`}
            >
              Sueño
            </button>
            <button 
              onClick={() => setActiveMetric('bruxism')}
              className={`px-2.5 py-1.5 rounded-lg cursor-pointer ${activeMetric === 'bruxism' ? 'bg-white text-brand-olive shadow-sm' : 'text-brand-brown'}`}
            >
              Bruxismo
            </button>
            <button 
              onClick={() => setActiveMetric('stress')}
              className={`px-2.5 py-1.5 rounded-lg cursor-pointer ${activeMetric === 'stress' ? 'bg-white text-brand-olive shadow-sm' : 'text-brand-brown'}`}
            >
              Estrés
            </button>
          </div>
        </div>

        {/* Custom Responsive SVG element wrapper */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[450px]">
            <svg 
              viewBox={`0 0 ${width} ${height}`} 
              className="w-full h-auto overflow-visible select-none font-sans text-[8px]"
            >
              {/* Grid Background Lines (1 to 5) */}
              {[0, 1, 2, 3, 4].map((step) => {
                const y = height - padding - (step / 4) * (height - padding * 2);
                return (
                  <g key={step} className="opacity-15">
                    <line 
                      x1={padding} 
                      y1={y} 
                      x2={width - padding} 
                      y2={y} 
                      stroke="#9A8C81" 
                      strokeWidth="0.5" 
                      strokeDasharray="3,3"
                    />
                    <text x={padding - 10} y={y + 2.5} fill="#2E2E2A" textAnchor="end" className="font-mono font-bold">
                      {step + 1}
                    </text>
                  </g>
                );
              })}

              {/* Day Labels on X Axis */}
              {sortedLogs.map((log, index) => {
                const x = padding + (index / (totalLogs - 1 || 1)) * (width - padding * 2);
                // Format YYYY-MM-DD to short DD/MM
                const dateParts = log.date.split('-');
                const shortLabel = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}` : log.date;

                return (
                  <text 
                    key={index} 
                    x={x} 
                    y={height - padding + 12} 
                    fill="#9A8C81" 
                    textAnchor="middle" 
                    className="font-mono"
                  >
                    {shortLabel}
                  </text>
                );
              })}

              {/* 1. Sleep quality line (Olive Green) */}
              {(activeMetric === 'all' || activeMetric === 'sleep') && (
                <g>
                  <polyline
                    fill="none"
                    stroke="#5A6E5D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={getPointsString(sleepCoords)}
                  />
                  {sleepCoords.map((c, i) => (
                    <circle 
                      key={i} 
                      cx={c.x} 
                      cy={c.y} 
                      r="3.5" 
                      fill="#5A6E5D" 
                      stroke="#FFFFFF" 
                      strokeWidth="1"
                    />
                  ))}
                </g>
              )}

              {/* 2. Bruxism tension line (Subtle Gold) */}
              {(activeMetric === 'all' || activeMetric === 'bruxism') && (
                <g>
                  <polyline
                    fill="none"
                    stroke="#C5A880"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={getPointsString(bruxismCoords)}
                  />
                  {bruxismCoords.map((c, i) => (
                    <circle 
                      key={i} 
                      cx={c.x} 
                      cy={c.y} 
                      r="3.5" 
                      fill="#C5A880" 
                      stroke="#FFFFFF" 
                      strokeWidth="1"
                    />
                  ))}
                </g>
              )}

              {/* 3. Stress level line (Soft Brown) */}
              {(activeMetric === 'all' || activeMetric === 'stress') && (
                <g>
                  <polyline
                    fill="none"
                    stroke="#9A8C81"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={getPointsString(stressCoords)}
                  />
                  {stressCoords.map((c, i) => (
                    <circle 
                      key={i} 
                      cx={c.x} 
                      cy={c.y} 
                      r="3.5" 
                      fill="#9A8C81" 
                      stroke="#FFFFFF" 
                      strokeWidth="1"
                    />
                  ))}
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs border-t border-brand-olive/5 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded-full bg-brand-olive" />
            <span className="text-brand-charcoal">Calidad del Sueño (1-5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded-full bg-brand-gold" />
            <span className="text-brand-charcoal">Tensión Mandibular (1-5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded-full bg-brand-brown" />
            <span className="text-brand-charcoal">Nivel de Estrés (1-5)</span>
          </div>
        </div>
      </div>

      {/* Historical Logging entries list with notes (Clinical audit log) */}
      <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-base text-brand-charcoal">Historial Reciente de Observaciones</h4>
          <span className="text-[10px] text-brand-brown font-mono">{totalLogs} registros guardados</span>
        </div>

        <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
          {sortedLogs.map((log, index) => (
            <div 
              key={index} 
              className="p-4 rounded-2xl bg-brand-beige-light/70 border border-brand-olive/5 text-xs space-y-2 hover:bg-brand-beige-light transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-olive/5 pb-1.5">
                <span className="font-mono font-bold text-brand-olive flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {log.date}
                </span>

                <div className="flex gap-2 text-[9px] font-mono">
                  <span className="bg-brand-olive/10 text-brand-olive-dark px-1.5 py-0.5 rounded font-bold">S: {log.sleepQuality}</span>
                  <span className="bg-brand-gold/20 text-brand-gold-dark px-1.5 py-0.5 rounded font-bold">M: {log.bruxismTension}</span>
                  <span className="bg-brand-brown/15 text-brand-brown px-1.5 py-0.5 rounded font-bold">E: {log.stressLevel}</span>
                  {log.routineCompleted && (
                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase">Rutina OK</span>
                  )}
                </div>
              </div>

              {log.notes ? (
                <p className="text-brand-charcoal/90 italic font-sans leading-relaxed">
                  "{log.notes}"
                </p>
              ) : (
                <p className="text-brand-brown/60 italic font-mono text-[10px]">
                  Sin anotaciones adicionales en este registro.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Clear Logs Button */}
        <div className="pt-2 text-right">
          <button
            id="clear-logs-btn"
            onClick={() => {
              if (confirm('¿Estás seguro de que deseas eliminar permanentemente todo tu historial local de registros clínicos? Esta acción es irreversible.')) {
                onClearLogs();
              }
            }}
            className="text-[10px] font-semibold text-red-600 hover:underline hover:text-red-800 transition-colors cursor-pointer"
          >
            Limpiar Todo el Historial Local
          </button>
        </div>
      </div>

    </div>
  );
}
