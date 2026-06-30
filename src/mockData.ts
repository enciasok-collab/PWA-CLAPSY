/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, AudioTrack, EducationalArticle, Routine, SleepSpecialist, DailyLog } from './types';

// ==========================================
// 1. PREGUNTAS DEL TEST GENERAL Y SUEÑO
// ==========================================
export const GENERAL_QUESTIONS: Question[] = [
  {
    id: 'g1',
    text: '¿Cuántas horas duermes en promedio por noche?',
    options: [
      { value: 0, text: '7 a 8 horas o más (Óptimo)' },
      { value: 1, text: '6 a 7 horas (Ligeramente insuficiente)' },
      { value: 2, text: 'Menos de 6 horas (Insuficiente)' },
    ],
  },
  {
    id: 'g2',
    text: '¿Sueles usar pantallas (móvil, tablet, TV) en la cama antes de apagar la luz?',
    options: [
      { value: 0, text: 'No, las evito al menos 1 hora antes de dormir' },
      { value: 1, text: 'A veces, por menos de 15 minutos' },
      { value: 2, text: 'Sí, casi todas las noches hasta el momento de dormir' },
    ],
  },
  {
    id: 'g3',
    text: '¿Consumes cafeína, bebidas energéticas o alcohol en las 6 horas previas a acostarte?',
    options: [
      { value: 0, text: 'Rara vez o nunca' },
      { value: 1, text: 'Ocasionalmente (1-2 veces por semana)' },
      { value: 2, text: 'Sí, de forma habitual o diaria' },
    ],
  },
  {
    id: 'g4',
    text: 'En las últimas semanas, ¿cómo calificarías tu nivel general de estrés diario?',
    options: [
      { value: 0, text: 'Bajo y manejable' },
      { value: 1, text: 'Moderado, con picos ocasionales' },
      { value: 2, text: 'Muy alto, persistente y abrumador' },
    ],
  },
];

// ==========================================
// 2. PREGUNTAS DEL TEST DE BRUXISMO
// ==========================================
export const BRUXISM_QUESTIONS: Question[] = [
  {
    id: 'b1',
    text: '¿Te ha dicho tu pareja o alguien en casa que haces ruidos de rechinar de dientes al dormir?',
    options: [
      { value: 0, text: 'Nunca' },
      { value: 1, text: 'A veces, en épocas de mucha presión' },
      { value: 3, text: 'Sí, con frecuencia o regularmente' },
    ],
  },
  {
    id: 'b2',
    text: '¿Sientes cansancio, dolor o rigidez en la mandíbula al despertarte por la mañana?',
    options: [
      { value: 0, text: 'Nunca o casi nunca' },
      { value: 1, text: 'A veces, algunas mañanas' },
      { value: 3, text: 'Sí, casi todos los días' },
    ],
  },
  {
    id: 'b3',
    text: '¿Sufres de dolores de cabeza (especialmente en las sienes) por la mañana de forma habitual?',
    options: [
      { value: 0, text: 'Rara vez o nunca' },
      { value: 1, text: 'Ocasionalmente (unas pocas veces al mes)' },
      { value: 2, text: 'Con mucha frecuencia (varias veces por semana)' },
    ],
  },
  {
    id: 'b4',
    text: '¿Notas tensión en el cuello, hombros o dificultades para abrir completamente la boca?',
    options: [
      { value: 0, text: 'Movilidad normal sin molestias' },
      { value: 1, text: 'Leve tensión en cuello u hombros' },
      { value: 2, text: 'Rigidez severa o dolor al abrir la boca' },
    ],
  },
];

// ==========================================
// 3. CUESTIONARIO STOP-BANG (Screener de Apnea)
// ==========================================
export const STOPBANG_QUESTIONS: Question[] = [
  {
    id: 's1',
    text: 'S (Snoring - Ronquido): ¿Roncas fuerte (más fuerte que hablar o audible con puertas cerradas)?',
    options: [
      { value: 1, text: 'Sí' },
      { value: 0, text: 'No' },
    ],
  },
  {
    id: 's2',
    text: 'T (Tired - Cansancio): ¿Sueles sentir cansancio, fatiga o somnolencia extrema durante el día?',
    options: [
      { value: 1, text: 'Sí' },
      { value: 0, text: 'No' },
    ],
  },
  {
    id: 's3',
    text: 'O (Observed - Observado): ¿Alguien ha observado que dejas de respirar o ahogas mientras duermes?',
    options: [
      { value: 1, text: 'Sí' },
      { value: 0, text: 'No' },
    ],
  },
  {
    id: 's4',
    text: 'P (Pressure - Presión): ¿Tienes o estás bajo tratamiento para la presión arterial alta?',
    options: [
      { value: 1, text: 'Sí' },
      { value: 0, text: 'No' },
    ],
  },
  {
    id: 's5',
    text: 'B (BMI - IMC): ¿Tu Índice de Masa Corporal (IMC) es mayor a 35 kg/m²?',
    options: [
      { value: 1, text: 'Sí o sospecho que sí' },
      { value: 0, text: 'No' },
    ],
  },
  {
    id: 's6',
    text: 'A (Age - Edad): ¿Tienes más de 50 años de edad?',
    options: [
      { value: 1, text: 'Sí' },
      { value: 0, text: 'No' },
    ],
  },
  {
    id: 's7',
    text: 'N (Neck - Cuello): ¿El contorno de tu cuello mide más de 40 cm (16 pulgadas)?',
    options: [
      { value: 1, text: 'Sí' },
      { value: 0, text: 'No' },
    ],
  },
  {
    id: 's8',
    text: 'G (Gender - Género): ¿Tu sexo biológico es masculino?',
    options: [
      { value: 1, text: 'Sí' },
      { value: 0, text: 'No' },
    ],
  },
];

// ==========================================
// 4. ESCALA DE SOMNOLENCIA DE EPWORTH
// ==========================================
// Escenario de probabilidad de quedarse dormido en 8 situaciones (0 = nunca, 3 = alta probabilidad)
export const EPWORTH_QUESTIONS: Question[] = [
  {
    id: 'e1',
    text: 'Sentado y leyendo un libro o artículo.',
    options: [
      { value: 0, text: 'Nunca se dormiría' },
      { value: 1, text: 'Baja probabilidad' },
      { value: 2, text: 'Moderada probabilidad' },
      { value: 3, text: 'Alta probabilidad de dormirse' },
    ],
  },
  {
    id: 'e2',
    text: 'Viendo la televisión.',
    options: [
      { value: 0, text: 'Nunca se dormiría' },
      { value: 1, text: 'Baja probabilidad' },
      { value: 2, text: 'Moderada probabilidad' },
      { value: 3, text: 'Alta probabilidad de dormirse' },
    ],
  },
  {
    id: 'e3',
    text: 'Sentado, inactivo, en un lugar público (teatro, cine, reunión).',
    options: [
      { value: 0, text: 'Nunca se dormiría' },
      { value: 1, text: 'Baja probabilidad' },
      { value: 2, text: 'Moderada probabilidad' },
      { value: 3, text: 'Alta probabilidad de dormirse' },
    ],
  },
  {
    id: 'e4',
    text: 'Como pasajero en un coche durante una hora seguida sin parar.',
    options: [
      { value: 0, text: 'Nunca se dormiría' },
      { value: 1, text: 'Baja probabilidad' },
      { value: 2, text: 'Moderada probabilidad' },
      { value: 3, text: 'Alta probabilidad de dormirse' },
    ],
  },
  {
    id: 'e5',
    text: 'Estando acostado para descansar por la tarde, cuando las circunstancias lo permiten.',
    options: [
      { value: 0, text: 'Nunca se dormiría' },
      { value: 1, text: 'Baja probabilidad' },
      { value: 2, text: 'Moderada probabilidad' },
      { value: 3, text: 'Alta probabilidad de dormirse' },
    ],
  },
  {
    id: 'e6',
    text: 'Sentado y hablando con alguien.',
    options: [
      { value: 0, text: 'Nunca se dormiría' },
      { value: 1, text: 'Baja probabilidad' },
      { value: 2, text: 'Moderada probabilidad' },
      { value: 3, text: 'Alta probabilidad de dormirse' },
    ],
  },
  {
    id: 'e7',
    text: 'Sentado tranquilamente después de comer (sin haber tomado alcohol).',
    options: [
      { value: 0, text: 'Nunca se dormiría' },
      { value: 1, text: 'Baja probabilidad' },
      { value: 2, text: 'Moderada probabilidad' },
      { value: 3, text: 'Alta probabilidad de dormirse' },
    ],
  },
  {
    id: 'e8',
    text: 'En un coche parado durante unos minutos debido al tráfico.',
    options: [
      { value: 0, text: 'Nunca se dormiría' },
      { value: 1, text: 'Baja probabilidad' },
      { value: 2, text: 'Moderada probabilidad' },
      { value: 3, text: 'Alta probabilidad de dormirse' },
    ],
  },
];

// ==========================================
// 5. BIBLIOTECA DE AUDIOS (2 Gratis, 3 Premium)
// ==========================================
export const AUDIO_LIBRARY: AudioTrack[] = [
  {
    id: 'a1',
    title: 'Descompresión Mandibular Nocturna',
    duration: '08:45',
    durationSeconds: 525,
    category: 'Fisioterapia Mandibular',
    description: 'Guía auditiva con respiración controlada y ejercicios isométricos suaves para desprogramar los músculos maseteros antes de dormir.',
    isPremium: false,
  },
  {
    id: 'a2',
    title: 'Frecuencia Delta de Inducción Al Sueño',
    duration: '15:00',
    durationSeconds: 900,
    category: 'Frecuencias',
    description: 'Tono binaural puro con oscilación a 2.5Hz diseñado para ralentizar la actividad cortical y propiciar el sueño profundo de onda lenta.',
    isPremium: false,
  },
  {
    id: 'a3',
    title: 'Autohipnosis para el Control del Bruxismo Céntrico',
    duration: '18:20',
    durationSeconds: 1100,
    category: 'Meditación',
    description: 'Sugerencias hipnóticas premium para establecer un anclaje inconsciente de labios juntos y dientes separados.',
    isPremium: true,
  },
  {
    id: 'a4',
    title: 'Mindfulness para Aliviar la Ansiedad Somática',
    duration: '12:00',
    durationSeconds: 720,
    category: 'Meditación',
    description: 'Escaneo corporal enfocado en soltar la tensión residual de mandíbula, lengua, cervicales superiores y hombros.',
    isPremium: true,
  },
  {
    id: 'a5',
    title: 'Paisaje Sonoro Bosque de Niebla y Ruido Rosa',
    duration: '30:00',
    durationSeconds: 1800,
    category: 'Relajación',
    description: 'Enmascarador de ruido de alta fidelidad que amortigua los microdespertares y suaviza los espasmos de masticación nocturna.',
    isPremium: true,
  },
];

// ==========================================
// 6. BIBLIOTECA EDUCATIVA
// ==========================================
export const EDUCATIONAL_LIBRARY: EducationalArticle[] = [
  {
    id: 'e_art1',
    title: '¿Qué es el bruxismo de sueño y por qué no es solo un problema de dientes?',
    category: 'Bruxismo',
    readTime: '4 min',
    summary: 'Aprende por qué apretar los dientes es una respuesta neuromuscular orquestada por el sistema nervioso central ante el estrés microdespertar.',
    iconName: 'Activity',
    content: [
      'El bruxismo no es una enfermedad dental, sino un comportamiento motor regulado centralmente. Durante décadas se pensó que era provocado por una mala oclusión (dientes desalineados), pero hoy la ciencia médica sabe que se asocia con microdespertares en el sueño.',
      'Cuando experimentas un microdespertar (una interrupción inconsciente del descanso provocada por estrés, reflujo o problemas respiratorios), tu sistema autónomo se activa bruscamente. El pulso se eleva y el cerebro activa los músculos de la masticación (principalmente el masetero y el temporal) como un reflejo defensivo para reabrir la vía aérea.',
      'El daño dental es solo la consecuencia secundaria. La raíz del problema reside en la desregulación de la respuesta al estrés y la fragmentación del sueño. Enfocarse únicamente en usar férulas de descarga protege las coronas dentales, pero no cura el origen neuromuscular subyacente. Por eso, el manejo debe incluir higiene cognitiva, ejercicios miofasciales de relajación y técnicas que disminuyan el nivel basal de alerta antes del descanso.'
    ],
    isPremium: false,
  },
  {
    id: 'e_art2',
    title: 'El Círculo Vicioso: Estrés, Cortisol y Apriete Nocturno',
    category: 'Manejo del Estrés',
    readTime: '5 min',
    summary: 'Descubre cómo los picos de cortisol diurnos desprograman la relajación muscular nocturna y cómo romper este ciclo de tensión.',
    iconName: 'BrainCircuit',
    content: [
      'Cuando te enfrentas a situaciones de estrés continuo durante el día, tu cuerpo libera cortisol y adrenalina de forma crónica. Estos neuromoduladores mantienen al sistema nervioso simpático en un estado de hiperalerta permanente que no se apaga instantáneamente al meterse en la cama.',
      'Bajo la influencia de altos niveles de cortisol, la arquitectura del sueño se deforma: el sueño profundo de ondas lentas disminuye y el número de microdespertares se triplica. Es precisamente en estos episodios de semialerta donde se gatilla la actividad rítmica de los músculos masticatorios (RMMA).',
      'Para romper esta sinergia patológica, se requieren técnicas de relajación activa en la fase crepuscular de la tarde-noche. Los estiramientos suaves de los músculos del cuello, la lengua en posición de reposo, y las respiraciones profundas diafragmáticas (con exhalaciones prolongadas) actúan como un freno vagal, informando al tronco encefálico que es seguro desconectarse.'
    ],
    isPremium: false,
  },
  {
    id: 'e_art3',
    title: 'Apnea Obstructiva del Sueño: Los Peligros del Ronquido Crónico',
    category: 'Apnea del Sueño',
    readTime: '6 min',
    summary: 'Identifica los síntomas de alerta de las apneas del sueño y por qué el STOP-BANG es un estándar de oro clínico para el cribado.',
    iconName: 'ShieldAlert',
    content: [
      'La Apnea Obstructiva del Sueño (AOS) es un trastorno grave caracterizado por colapsos repetidos de la vía aérea superior durante el sueño, impidiendo que el oxígeno llegue correctamente a tus órganos vitales.',
      'El síntoma cardinal es el ronquido fuerte e intermitente, que suele interrumpirse por un silencio sepulcral que termina con un jadeo o ronquido explosivo. Este silencio representa la apnea: segundos en los que el usuario literalmente no respira, disminuyendo su saturación de oxígeno en sangre.',
      'El cerebro, al detectar la asfixia, genera un microdespertar de emergencia para recuperar el tono muscular de la garganta. Esto fragmenta el descanso y provoca dolores de cabeza matinales, somnolencia extrema diurna y eleva drásticamente el riesgo de accidentes cardiovasculares.',
      'El cuestionario STOP-BANG es un instrumento de cribado validado internacionalmente de alta sensibilidad. Identificar tu riesgo a tiempo mediante esta herramienta te permite buscar una polisomnografía (estudio del sueño) con un somnólogo profesional antes de que afecte gravemente tu salud.'
    ],
    isPremium: true,
  },
  {
    id: 'e_art4',
    title: 'Guía Clínica de Higiene del Sueño no Farmacológica',
    category: 'Higiene del Sueño',
    readTime: '4 min',
    summary: 'Pautas de base científica para adecuar tu habitación, horarios y rituales pre-sueño para reprogramar tu reloj biológico.',
    iconName: 'Compass',
    content: [
      'El sueño de calidad no es casualidad; es la consecuencia directa de sincronizadores biológicos (ritmos circadianos). El factor regulador más potente es la luz y la temperatura.',
      'Puntos clave para regular tu arquitectura de sueño:',
      '1. Oscuridad Absoluta: La luz azul de las pantallas bloquea la secreción de melatonina en la glándula pineal, reprogramando tu cerebro para pensar que es mediodía. Evita pantallas 60-90 minutos antes del descanso.',
      '2. Gradiente Térmico: Para iniciar el sueño, la temperatura corporal central debe disminuir aproximadamente 1°C. Mantener la habitación fresca (entre 17°C y 20°C) acelera el sueño profundo.',
      '3. El Ancla Horaria: Levantarse a la misma hora todos los días (incluso fines de semana) estabiliza la presión de sueño, asegurando somnolencia óptima a la hora de acostarse.'
    ],
    isPremium: true,
  }
];

// ==========================================
// 7. RUTINAS DE EJERCICIOS (1 Gratis, 2 Premium)
// ==========================================
export const GUIDED_ROUTINES: Routine[] = [
  {
    id: 'r1',
    title: 'Ritual Crepuscular de Descompresión ATM',
    category: 'Noche',
    description: 'Rutina indispensable antes de dormir para relajar la musculatura masticatoria y desactivar el estado de alerta general.',
    durationMinutes: 6,
    isPremium: false,
    steps: [
      {
        title: 'Respiración de Freno Vagal (4-7-8)',
        description: 'Inhala en 4 segundos, mantén el aire por 7 segundos y exhala ruidosamente por la boca durante 8 segundos. Repite con la punta de la lengua tocando el paladar, justo detrás de los dientes frontales superiores.',
        durationSeconds: 120,
        exerciseType: 'respiracion',
      },
      {
        title: 'Masaje Liberador del Músculo Masetero',
        description: 'Ubica tus dedos índices y medios justo debajo del pómulo. Realiza una presión firme pero gentil en movimientos circulares descendentes hacia el ángulo de la mandíbula mientras dejas la boca ligeramente entreabierta.',
        durationSeconds: 120,
        exerciseType: 'masaje',
      },
      {
        title: 'Estiramiento Pasivo del Músculo Temporal',
        description: 'Coloca las palmas de tus manos planas sobre los laterales de la cabeza (en las sienes). Presiona ligeramente hacia arriba y hacia atrás, mientras dejas caer el maxilar inferior por su propio peso. Siente cómo se alivia la compresión articular.',
        durationSeconds: 120,
        exerciseType: 'estiramiento',
      },
    ],
  },
  {
    id: 'r2',
    title: 'Activación Miofuncional Matutina',
    category: 'Mañana',
    description: 'Diseñada para disipar la rigidez muscular acumulada durante la noche y reeducar la posición postural de la mandíbula.',
    durationMinutes: 5,
    isPremium: true,
    steps: [
      {
        title: 'Termoterapia y Estiramiento de Cuello',
        description: 'Haz círculos lentos con la cabeza mientras mantienes los labios juntos pero los dientes separados. Siente cómo se relaja el músculo trapecio y el esternocleidomastoideo.',
        durationSeconds: 90,
        exerciseType: 'estiramiento',
      },
      {
        title: 'Isométrico Mandibular de Estabilización',
        description: 'Coloca un puño cerrado debajo de tu barbilla. Intenta abrir ligeramente la boca ejerciendo una suave fuerza opositora con la mano. Sostén 5 segundos, relaja y repite 5 veces.',
        durationSeconds: 120,
        exerciseType: 'estiramiento',
      },
      {
        title: 'Posicionamiento Lingual Correcto (Letra N)',
        description: 'Di la letra "N" en voz alta y mantén la punta de la lengua en esa posición sobre el paladar. Cierra los labios de forma relajada y respira exclusivamente por la nariz de forma rítmica.',
        durationSeconds: 90,
        exerciseType: 'mental',
      },
    ],
  },
  {
    id: 'r3',
    title: 'Botón de Emergencia para Crisis de Estrés (SOS)',
    category: 'Alivio SOS',
    description: 'Protocolo de intervención rápida para momentos de apriete mandibular inconsciente o dolor agudo durante el día laboral.',
    durationMinutes: 4,
    isPremium: true,
    steps: [
      {
        title: 'Respiración de Caja (Box Breathing)',
        description: 'Inhala en 4s, retén en 4s, exhala en 4s, mantén los pulmones vacíos en 4s. Esto equilibra la química de dióxido de carbono y desactiva instantáneamente la amígdala cerebral.',
        durationSeconds: 120,
        exerciseType: 'respiracion',
      },
      {
        title: 'Técnica de Contracción-Relajación Mandibular',
        description: 'Aprieta tus dientes conscientemente con un 20% de tu fuerza máxima por 5 segundos, y luego suelta de golpe permitiendo que la mandíbula cuelgue libremente con los labios suavemente cerrados. Siente el contraste de la relajación.',
        durationSeconds: 120,
        exerciseType: 'masaje',
      },
    ],
  },
];

// ==========================================
// 8. DIRECTORIO DE ESPECIALISTAS DE SUEÑO Y ATM
// ==========================================
export const SPECIALISTS_DIRECTORY: SleepSpecialist[] = [
  {
    id: 'sp1',
    name: 'Dr. Alejandro Restrepo',
    role: 'Odontólogo especialista en ATM',
    credentials: 'Máster en Dolor Orofacial y Disfunción Craneomandibular (Univ. de Barcelona). 12 años de experiencia.',
    city: 'Madrid / Online',
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=250&auto=format&fit=crop',
    contactEmail: 'consultas@dralejandrorestrepo.com',
    contactPhone: '+34 912 345 678',
    isPremiumPartner: true,
  },
  {
    id: 'sp2',
    name: 'Dra. Elena Gómez',
    role: 'Fisioterapeuta Maxilofacial',
    credentials: 'Especialista en Rehabilitación del Dolor de Cabeza y Trastornos Mandibulares. Clínica del Sueño Integral.',
    city: 'Barcelona / Online',
    rating: 4.8,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=250&auto=format&fit=crop',
    contactEmail: 'citas@elenagomezfisiomax.es',
    contactPhone: '+34 934 567 890',
    isPremiumPartner: true,
  },
  {
    id: 'sp3',
    name: 'Dr. Martín Valenzuela',
    role: 'Somnólogo',
    credentials: 'Médico Neumólogo, certificado por el Board Europeo de Medicina del Sueño (ESRS). Experto en Apnea y CPAP.',
    city: 'Bogotá / Online',
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=250&auto=format&fit=crop',
    contactEmail: 'mvalenzuela@unidadsueño.co',
    contactPhone: '+57 311 234 5678',
    isPremiumPartner: false,
  },
];

// ==========================================
// 9. HISTORIAL SIMULADO DE 7 DÍAS (Estadísticas)
// ==========================================
export const MOCK_DAILY_LOGS: DailyLog[] = [
  {
    date: '2026-06-24',
    sleepQuality: 2,
    bruxismTension: 4,
    stressLevel: 5,
    routineCompleted: false,
    notes: 'Día laboral terrible. Me desperté con dolor fuerte en sienes.',
  },
  {
    date: '2026-06-25',
    sleepQuality: 3,
    bruxismTension: 4,
    stressLevel: 4,
    routineCompleted: true,
    notes: 'Hice la rutina de noche. Siento los maseteros algo cansados, pero dormí mejor.',
  },
  {
    date: '2026-06-26',
    sleepQuality: 3,
    bruxismTension: 3,
    stressLevel: 3,
    routineCompleted: true,
    notes: 'Mejorando el ambiente de sueño. Apagué pantallas temprano.',
  },
  {
    date: '2026-06-27',
    sleepQuality: 4,
    bruxismTension: 2,
    stressLevel: 2,
    routineCompleted: true,
    notes: 'Sábado relajado, dormí de corrido sin dolor de mandíbula por la mañana.',
  },
  {
    date: '2026-06-28',
    sleepQuality: 4,
    bruxismTension: 2,
    stressLevel: 2,
    routineCompleted: true,
    notes: 'Frecuencia Delta me ayudó a conciliar el sueño rápido.',
  },
  {
    date: '2026-06-29',
    sleepQuality: 3,
    bruxismTension: 3,
    stressLevel: 4,
    routineCompleted: true,
    notes: 'Lunes con algo de estrés pero mantengo la rutina de descompresión ATM.',
  },
  {
    date: '2026-06-30',
    sleepQuality: 4,
    bruxismTension: 2,
    stressLevel: 3,
    routineCompleted: true,
    notes: '¡Me siento con mucha más energía hoy! El dolor de cuello es casi imperceptible.',
  },
];
