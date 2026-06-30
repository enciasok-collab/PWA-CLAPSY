/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Question, TestResultSummary, RiskLevel } from '../types';
import { 
  GENERAL_QUESTIONS, 
  BRUXISM_QUESTIONS, 
  STOPBANG_QUESTIONS, 
  EPWORTH_QUESTIONS 
} from '../mockData';
import { ClipboardList, CheckCircle, AlertTriangle, ArrowRight, RotateCcw, ShieldCheck, HeartPulse } from 'lucide-react';

interface TestsProps {
  activeSubTab: string;
  onNavigate: (tab: string) => void;
  onSaveTestResult: (result: TestResultSummary) => void;
}

export default function Tests({ activeSubTab, onNavigate, onSaveTestResult }: TestsProps) {
  // Determine active test category
  const [activeTest, setActiveTest] = useState<'general' | 'bruxism' | 'stopbang' | 'epworth'>(() => {
    if (activeSubTab.includes('general')) return 'general';
    if (activeSubTab.includes('bruxism')) return 'bruxism';
    if (activeSubTab.includes('stopbang')) return 'stopbang';
    if (activeSubTab.includes('epworth')) return 'epworth';
    return 'general';
  });

  // Questions and state
  const questions: Question[] = {
    general: GENERAL_QUESTIONS,
    bruxism: BRUXISM_QUESTIONS,
    stopbang: STOPBANG_QUESTIONS,
    epworth: EPWORTH_QUESTIONS
  }[activeTest];

  const testTitle = {
    general: 'Triaje de Hábitos y Calidad de Sueño',
    bruxism: 'Cribado de Bruxismo y Tensión ATM',
    stopbang: 'Cuestionario de Apnea STOP-BANG',
    epworth: 'Escala de Somnolencia de Epworth'
  }[activeTest];

  // Test Runner State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [latestResult, setLatestResult] = useState<TestResultSummary | null>(null);

  // Switch between tests
  const handleSwitchTest = (testType: 'general' | 'bruxism' | 'stopbang' | 'epworth') => {
    setActiveTest(testType);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setLatestResult(null);
  };

  const handleSelectAnswer = (optionValue: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const updatedAnswers = { ...selectedAnswers, [currentQuestion.id]: optionValue };
    setSelectedAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of test - calculate results
      calculateTestResults(updatedAnswers);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateTestResults = (answers: Record<string, number>) => {
    let score = 0;
    let maxScore = 0;
    let riskLevel: RiskLevel = 'Bajo';
    let recommendations: string[] = [];

    // Calculate sum of points
    questions.forEach(q => {
      score += answers[q.id] || 0;
      const maxOptionVal = Math.max(...q.options.map(o => o.value));
      maxScore += maxOptionVal;
    });

    if (activeTest === 'general') {
      if (score <= 2) {
        riskLevel = 'Bajo';
        recommendations = [
          'Mantienes pautas de higiene de sueño bastante saludables.',
          'Sigue evitando pantallas antes de acostarte para proteger tu secreción de melatonina.',
          'Conserva tu horario de despertar estable para afianzar tus ritmos circadianos.'
        ];
      } else if (score <= 5) {
        riskLevel = 'Medio';
        recommendations = [
          'Tus hábitos actuales podrían estar erosionando la profundidad de tu descanso.',
          'Recomendamos apagar pantallas móviles al menos 45 minutos antes de apagar la luz.',
          'Prueba suspender bebidas energizantes, refrescos de cola o café a partir de las 3:00 PM.',
          'Dedica 5 minutos por la noche al Ritual Crepuscular ATM para soltar tensión residual.'
        ];
      } else {
        riskLevel = 'Alto';
        recommendations = [
          'Tus hábitos y niveles de estrés actuales indican un alto riesgo de desvelo y desgaste.',
          'Es prioritario retirar todas las pantallas del dormitorio y evitar la cafeína por la tarde.',
          'Considera realizar ejercicios de respiración de freno vagal y meditación diaria guiada.',
          'Tu puntuación de estrés sugiere la necesidad de implementar rutinas de descompresión obligatorias.'
        ];
      }
    } else if (activeTest === 'bruxism') {
      if (score <= 2) {
        riskLevel = 'Bajo';
        recommendations = [
          'No presentas signos significativos de sobrecarga o desgaste temporomandibular.',
          'Sigue manteniendo los dientes ligeramente separados durante el día laboral para evitar aprietes involuntarios.',
          'Prueba la respiración vagal si notas episodios aislados de estrés.'
        ];
      } else if (score <= 5) {
        riskLevel = 'Medio';
        recommendations = [
          'Existe una sobrecarga muscular moderada en tu zona masticatoria (músculo masetero y temporal).',
          'Sugerimos iniciar la rutina "Ritual Crepuscular de Descompresión ATM" de forma diaria.',
          'Evita morder bolígrafos, morderte las uñas, o masticar chicle prolongadamente.',
          'Si utilizas férula de descarga, asegúrate de que sea revisada periódicamente por tu odontólogo.'
        ];
      } else {
        riskLevel = 'Alto';
        recommendations = [
          'Se observa una fuerte correlación con síntomas de bruxismo severo y disfunción ATM diurna/nocturna.',
          'Inicia hoy mismo el Ritual de Descompresión ATM por las noches de forma estricta.',
          'Aplica compresas húmedas tibias sobre tus sienes y maxilar inferior antes de dormir durante 10 minutos.',
          'Es altamente recomendable agendar una consulta con un Odontólogo especialista en ATM o un Fisioterapeuta Maxilofacial para evaluar el estado articular (puedes consultar nuestro directorio).'
        ];
      }
    } else if (activeTest === 'stopbang') {
      // STOP-BANG score is the sum of Yes answers (each Yes is 1 point)
      if (score <= 2) {
        riskLevel = 'Bajo';
        recommendations = [
          'Tu riesgo de padecer Apnea Obstructiva del Sueño es clínicamente bajo.',
          'Sigue vigilando la calidad de tu respiración nocturna y tu nivel de vitalidad al despertar.',
          'Mantener un peso corporal saludable y un contorno cervical estable disminuye las posibilidades de obstrucción.'
        ];
      } else if (score <= 4) {
        riskLevel = 'Medio';
        recommendations = [
          'Presentas un riesgo moderado de apnea obstructiva del sueño.',
          'Si duermes boca arriba, intenta entrenarte para dormir de lado (decúbito lateral), lo cual mantiene la vía aérea más abierta.',
          'Evita el consumo de alcohol o sedantes por la noche, ya que relajan en exceso los músculos de la garganta agravando el colapso.',
          'Menciona estos resultados en tu próximo chequeo médico general.'
        ];
      } else {
        riskLevel = 'Alto';
        recommendations = [
          'Tu puntuación en el STOP-BANG indica un riesgo clínico elevado de Apnea Obstructiva del Sueño.',
          'El ronquido fuerte y el cansancio diurno recurrente son signos de alarma que merecen un estudio médico formal.',
          'Recomendamos encarecidamente programar una cita con un Somnólogo o Neumólogo para realizar una poligrafía respiratoria o polisomnografía de diagnóstico.',
          'Considera evitar dormir boca arriba, mantener una higiene estricta y controlar tu presión arterial con frecuencia.'
        ];
      }
    } else if (activeTest === 'epworth') {
      // Epworth Sleepiness Scale (0 to 24)
      if (score <= 9) {
        riskLevel = 'Bajo';
        recommendations = [
          'Tu nivel de somnolencia diurna se encuentra dentro del rango fisiológico normal.',
          'Sientes el cansancio habitual al final del día sin que este interfiera con tus actividades cotidianas.',
          'Mantén tus rutinas de sueño estables para consolidar este buen nivel de energía.'
        ];
      } else if (score <= 15) {
        riskLevel = 'Medio';
        recommendations = [
          'Presentas somnolencia diurna moderada, lo que sugiere un sueño de mala calidad o fragmentado.',
          'Tus microdespertares nocturnos (posiblemente asociados a bruxismo o ronquido) están impidiendo que alcances las fases de sueño profundo reparador.',
          'Pon especial atención a retirar pantallas y cenar ligero antes de acostarte.',
          'Te recomendamos evaluar tu respiración nocturna con el STOP-BANG para descartar colapsos respiratorios.'
        ];
      } else {
        riskLevel = 'Alto';
        recommendations = [
          'Sufres de somnolencia diurna grave y fatiga debilitante.',
          'Quedarse dormido en situaciones de conversación o tráfico representa un riesgo real para tu seguridad y salud.',
          'Es prioritario acudir a un médico especialista en medicina del sueño para realizar un diagnóstico diferencial de apnea, narcolepsia o hipersomnio.',
          'Evita conducir vehículos o realizar tareas de precisión si sientes fatiga extrema en ese momento.'
        ];
      }
    }

    const testResult: TestResultSummary = {
      testType: activeTest,
      title: testTitle,
      score,
      maxScore,
      riskLevel,
      recommendations,
      completedAt: new Date().toLocaleString()
    };

    setLatestResult(testResult);
    setShowResults(true);
    onSaveTestResult(testResult);
  };

  const handleResetTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setLatestResult(null);
  };

  const progressPercentage = questions.length > 0 
    ? Math.round(((currentQuestionIndex) / questions.length) * 100) 
    : 0;

  return (
    <div id="tests-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-8 pb-24">
      
      {/* Test Menu Toggles */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-brand-beige rounded-2xl border border-brand-olive/10">
        {(['general', 'bruxism', 'stopbang', 'epworth'] as const).map((type) => (
          <button
            key={type}
            id={`test-menu-tab-${type}`}
            onClick={() => handleSwitchTest(type)}
            className={`flex-1 min-w-[130px] text-xs font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer ${
              activeTest === type 
                ? 'bg-white text-brand-olive shadow-sm font-bold border-b border-brand-olive/20' 
                : 'text-brand-brown hover:text-brand-charcoal'
            }`}
          >
            {type === 'general' && 'Hábitos y Sueño'}
            {type === 'bruxism' && 'ATM & Bruxismo'}
            {type === 'stopbang' && 'Apnea (STOP-BANG)'}
            {type === 'epworth' && 'Somnolencia (Epworth)'}
          </button>
        ))}
      </div>

      {!showResults ? (
        // ACTIVE TEST RUNNER
        <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 sm:p-8 shadow-premium space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] bg-brand-gold/20 text-brand-gold-dark font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                Cribado Médico Digital
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal mt-1.5">{testTitle}</h3>
            </div>
            <div className="text-xs font-mono text-brand-brown font-bold whitespace-nowrap">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-brand-beige rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-brand-olive h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="space-y-6">
            <h4 className="font-sans text-base sm:text-lg font-medium text-brand-charcoal leading-relaxed">
              {questions[currentQuestionIndex]?.text}
            </h4>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3.5">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  id={`test-option-${index}`}
                  onClick={() => handleSelectAnswer(option.value)}
                  className="w-full text-left p-4 rounded-2xl border border-brand-olive/10 hover:border-brand-olive/50 hover:bg-brand-beige-light/70 active:bg-brand-beige transition-all duration-200 shadow-sm flex items-center justify-between group cursor-pointer"
                >
                  <span className="text-xs sm:text-sm text-brand-charcoal leading-relaxed font-sans">{option.text}</span>
                  <div className="w-5 h-5 rounded-full border border-brand-brown/30 group-hover:border-brand-olive flex items-center justify-center transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-brand-olive/50 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation helpers */}
          <div className="flex items-center justify-between pt-6 border-t border-brand-olive/5">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                currentQuestionIndex === 0 ? 'text-brand-brown/40 cursor-not-allowed' : 'text-brand-olive hover:underline'
              }`}
            >
              ← Pregunta Anterior
            </button>
            <span className="text-[10px] text-brand-brown font-mono">Autocuidado Consciente CLAPSY</span>
          </div>
        </div>
      ) : (
        // RESULTS DISPLAY SCREEN
        <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 sm:p-8 shadow-premium space-y-8 animate-fade-in">
          
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-brand-olive/10 text-brand-olive mx-auto">
              <ClipboardList className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[10px] bg-brand-olive/15 text-brand-olive-dark font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                Análisis Completado
              </span>
              <h3 className="font-serif text-2xl text-brand-charcoal mt-2">{testTitle}</h3>
              <p className="text-xs text-brand-brown font-mono mt-1">Realizado el {latestResult?.completedAt}</p>
            </div>
          </div>

          {/* Risk Card */}
          <div className={`rounded-3xl p-6 border text-center space-y-3 ${
            latestResult?.riskLevel === 'Bajo' 
              ? 'bg-green-50/70 border-green-200 text-green-900' 
              : latestResult?.riskLevel === 'Medio'
              ? 'bg-amber-50/70 border-amber-200 text-amber-900'
              : 'bg-red-50/70 border-red-200 text-red-900'
          }`}>
            <div className="text-xs font-mono uppercase tracking-wider font-bold">Nivel de Riesgo Clínico</div>
            <div className="text-3xl font-serif font-bold tracking-tight">
              {latestResult?.riskLevel}
            </div>
            <div className="text-xs">
              Puntuación total calculada: <strong>{latestResult?.score}</strong> de un máximo de {latestResult?.maxScore} puntos.
            </div>
          </div>

          {/* Custom Actionable Recommendations (StoryBrand Guide Step) */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-brand-charcoal flex items-center gap-2 border-b border-brand-olive/10 pb-2">
              <HeartPulse className="w-5 h-5 text-brand-olive" />
              Tus Recomendaciones Personalizadas CLAPSY
            </h4>

            <ul className="space-y-3.5">
              {latestResult?.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-brand-charcoal/90 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-brand-olive/10 text-brand-olive flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Call to Action */}
          <div className="bg-brand-beige p-6 rounded-2xl border border-brand-olive/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h5 className="font-display font-semibold text-sm text-brand-charcoal">¿Qué hacer ahora?</h5>
              <p className="text-xs text-brand-brown">
                Inicia la rutina miofuncional recomendada para reducir la carga de tensión nocturna de inmediato.
              </p>
            </div>
            <button
              id="results-start-routine-btn"
              onClick={() => onNavigate('routines')}
              className="bg-brand-olive text-white text-xs font-semibold px-5 py-3 rounded-xl hover:bg-brand-olive-dark shadow-premium whitespace-nowrap cursor-pointer"
            >
              Ver mis Rutinas Diarias
            </button>
          </div>

          {/* Bottom disclaimer */}
          <div className="p-4 bg-brand-beige-light border border-brand-brown/10 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-gold-dark shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h6 className="font-display font-semibold text-xs text-brand-charcoal">Cláusula de Responsabilidad Médica</h6>
              <p className="text-[10px] text-brand-brown leading-relaxed">
                Esta herramienta funciona puramente como un cuestionario de cribado informativo para guiar hábitos de autocuidado. Los resultados no constituyen diagnóstico médico, pronóstico ni tratamiento profesional. Si experimentas dolor temporomandibular inhabilitante, chasquidos articulares agudos, insomnio refractario o apneas del sueño severas, te aconsejamos consultar urgentemente a un odontólogo colegiado o somnólogo.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              id="re-evaluate-btn"
              onClick={handleResetTest}
              className="px-5 py-3 rounded-xl border border-brand-brown/30 hover:bg-brand-beige text-xs text-brand-charcoal font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-brand-brown" />
              Repetir este Cribado
            </button>

            <button
              id="export-results-btn"
              onClick={() => {
                alert(`Resultados del test ${latestResult?.title}:\n- Riesgo: ${latestResult?.riskLevel}\n- Puntuación: ${latestResult?.score}/${latestResult?.maxScore}\n- Fecha: ${latestResult?.completedAt}\n\nPuedes mostrar estos resultados a tu especialista odontológico o somnólogo.`);
              }}
              className="px-5 py-3 rounded-xl bg-white border border-brand-olive/30 hover:bg-brand-beige-light text-brand-olive text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Exportar Resultados para Especialista
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
