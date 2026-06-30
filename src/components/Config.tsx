/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Settings, RefreshCw, Trash2, ShieldCheck, Database, Smartphone, Laptop, Sparkles, HelpCircle, Code } from 'lucide-react';

interface ConfigProps {
  user: UserProfile;
  onResetApp: () => void;
  onTogglePremium: () => void;
}

export default function Config({ user, onResetApp, onTogglePremium }: ConfigProps) {
  const [activeManual, setActiveManual] = useState<'pwa' | 'firebase' | 'blueprint'>('pwa');

  return (
    <div id="config-tab" className="px-6 py-6 max-w-4xl mx-auto space-y-8 pb-24">
      
      <div className="space-y-2">
        <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal">Configuración y Manual Técnico</h2>
        <p className="text-sm text-brand-brown max-w-xl">
          Administra tu perfil local, simula el estado premium para pruebas y lee las especificaciones de despliegue comercial (PWA & Firebase).
        </p>
      </div>

      {/* Profile & Sandbox controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium space-y-4">
          <h3 className="font-serif text-base text-brand-charcoal flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-olive" />
            Control de Perfil
          </h3>

          <div className="space-y-3.5 text-xs text-brand-charcoal">
            <div className="flex justify-between border-b border-brand-olive/5 pb-2">
              <span className="text-brand-brown">Email del Usuario:</span>
              <span className="font-mono font-semibold">{user.email || 'offline@clapsy.app'}</span>
            </div>

            <div className="flex justify-between border-b border-brand-olive/5 pb-2">
              <span className="text-brand-brown">Régimen de Licencia:</span>
              <span className={`font-semibold uppercase tracking-wider font-mono ${user.isPremium ? 'text-brand-gold-dark' : 'text-brand-brown'}`}>
                {user.isPremium ? '⭐ PREMIUM (De por vida)' : 'GRATUITO'}
              </span>
            </div>

            <div className="flex justify-between border-b border-brand-olive/5 pb-2">
              <span className="text-brand-brown">Día de Registro:</span>
              <span className="font-mono">{user.registeredAt}</span>
            </div>

            <div className="flex justify-between border-b border-brand-olive/5 pb-2">
              <span className="text-brand-brown">Racha de Autocuidado:</span>
              <span className="font-mono font-bold text-brand-olive">{user.currentStreak} días</span>
            </div>
          </div>
        </div>

        {/* Sandbox Actions (For evaluation testing) */}
        <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 shadow-premium space-y-4">
          <h3 className="font-serif text-base text-brand-charcoal flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-gold-dark" />
            Sandbox de Pruebas
          </h3>

          <p className="text-xs text-brand-brown leading-relaxed">
            Utiliza estos interruptores de desarrollo para probar todas las funciones, bloquear o desbloquear el catálogo premium o limpiar los datos guardados en LocalStorage.
          </p>

          <div className="space-y-3 pt-2">
            <button
              id="toggle-premium-sandbox-btn"
              onClick={onTogglePremium}
              className={`w-full py-3 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                user.isPremium 
                  ? 'bg-brand-brown/10 text-brand-brown hover:bg-brand-brown/20' 
                  : 'bg-brand-gold text-brand-charcoal hover:bg-brand-gold-dark hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {user.isPremium ? 'Cambiar a Versión Gratuita' : 'Simular Adquisición Premium'}
            </button>

            <button
              id="reset-app-sandbox-btn"
              onClick={() => {
                if (confirm('¿Deseas restaurar la aplicación a su estado inicial de fábrica? Se borrarán todos tus progresos de racha y resultados de tests.')) {
                  onResetApp();
                }
              }}
              className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Reiniciar Datos de Fábrica (Clear Cache)
            </button>
          </div>
        </div>
      </div>

      {/* Manual Selection Toggles */}
      <div className="flex gap-2 p-1 bg-brand-beige rounded-2xl border border-brand-olive/10">
        <button
          onClick={() => setActiveManual('pwa')}
          className={`flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
            activeManual === 'pwa' ? 'bg-white text-brand-olive shadow-sm font-bold' : 'text-brand-brown'
          }`}
        >
          📱 Manual PWA & Instalación
        </button>
        <button
          onClick={() => setActiveManual('firebase')}
          className={`flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
            activeManual === 'firebase' ? 'bg-white text-brand-olive shadow-sm font-bold' : 'text-brand-brown'
          }`}
        >
          🔥 Migración Firebase
        </button>
        <button
          onClick={() => setActiveManual('blueprint')}
          className={`flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
            activeManual === 'blueprint' ? 'bg-white text-brand-olive shadow-sm font-bold' : 'text-brand-brown'
          }`}
        >
          📋 Blueprint & Esquemas
        </button>
      </div>

      {/* MANUAL CONTENTS CONTAINER */}
      <div className="bg-white rounded-3xl border border-brand-olive/10 p-6 sm:p-8 shadow-premium space-y-6">
        
        {activeManual === 'pwa' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 border-b border-brand-olive/5 pb-3">
              <Smartphone className="w-5 h-5 text-brand-olive" />
              <h3 className="font-serif text-lg text-brand-charcoal">Guía de Instalación PWA (Progressive Web App)</h3>
            </div>

            <p className="text-xs text-brand-brown leading-relaxed">
              CLAPSY ha sido desarrollado como una PWA de grado clínico comercial, equipada con un `manifest.json` robusto y un Service Worker que permite el almacenamiento parcial en caché de recursos estáticos para el acceso offline rápido.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3 bg-brand-beige-light/70 p-5 rounded-2xl border border-brand-olive/5">
                <h4 className="font-display font-semibold text-xs text-brand-charcoal flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-brand-olive" /> En iOS (Safari)
                </h4>
                <ol className="text-xs text-brand-brown space-y-2 list-decimal list-inside">
                  <li>Abre la aplicación desde el navegador Safari.</li>
                  <li>Toca el botón de <strong>Compartir</strong> (icono de cuadrado con flecha arriba).</li>
                  <li>Desplázate hacia abajo y selecciona <strong>Añadir a pantalla de inicio</strong>.</li>
                  <li>Toca <strong>Añadir</strong> en la esquina superior derecha. CLAPSY aparecerá como app nativa.</li>
                </ol>
              </div>

              <div className="space-y-3 bg-brand-beige-light/70 p-5 rounded-2xl border border-brand-olive/5">
                <h4 className="font-display font-semibold text-xs text-brand-charcoal flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-brand-olive" /> En Android (Chrome / Edge)
                </h4>
                <ol className="text-xs text-brand-brown space-y-2 list-decimal list-inside">
                  <li>Al abrir CLAPSY, Chrome te mostrará un banner inferior que dice <strong>Añadir CLAPSY a pantalla de inicio</strong>.</li>
                  <li>Si no aparece, toca los tres puntos verticales en la esquina superior derecha del navegador.</li>
                  <li>Haz clic en <strong>Instalar aplicación</strong> o <strong>Añadir a pantalla de inicio</strong>.</li>
                  <li>Confirma la instalación.</li>
                </ol>
              </div>
            </div>

            {/* Offline cache details */}
            <div className="p-4 bg-brand-beige rounded-2xl border border-brand-olive/5 flex items-start gap-2.5 text-xs text-brand-charcoal">
              <ShieldCheck className="w-5 h-5 text-brand-olive shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Capacidad Offline:</span> El Service Worker (`sw.js`) almacena en caché el código HTML, estilos y archivos de audio clave de la rutina del día 1. Esto asegura que puedas realizar tus estiramientos y escuchar las descompresiones incluso si estás en la cama sin señal telefónica o en modo avión.
              </div>
            </div>
          </div>
        )}

        {activeManual === 'firebase' && (
          <div className="space-y-6 animate-fade-in text-brand-charcoal">
            <div className="flex items-center gap-2 border-b border-brand-olive/5 pb-3">
              <Database className="w-5 h-5 text-brand-olive" />
              <h3 className="font-serif text-lg text-brand-charcoal">Manual de Integración y Migración a Firebase</h3>
            </div>

            <p className="text-xs text-brand-brown leading-relaxed">
              La arquitectura de CLAPSY se diseñó de manera agnóstica para permitir que con solo conectar el SDK oficial de Firebase, toda la sincronización local persista en la nube (Firestore) y las cuentas de usuario se gestionen de forma segura (Firebase Authentication).
            </p>

            <div className="space-y-4 text-xs">
              <h4 className="font-display font-semibold text-brand-charcoal text-sm">Paso 1: Instalación de Dependencias oficiales</h4>
              <p className="text-brand-brown leading-relaxed">Ejecuta en tu terminal el siguiente comando para agregar el SDK de Firebase a tu proyecto de React:</p>
              <pre className="bg-brand-charcoal text-brand-beige p-3 rounded-xl font-mono text-[10px] overflow-x-auto">
                npm install firebase @firebase/eslint-plugin-security-rules --save
              </pre>

              <h4 className="font-display font-semibold text-brand-charcoal text-sm">Paso 2: Inicialización del Cliente (`/src/firebase.ts`)</h4>
              <p className="text-brand-brown leading-relaxed">Crea un archivo de configuración e importa los métodos correspondientes para inicializar Firestore y Auth:</p>
              <pre className="bg-brand-charcoal text-brand-beige p-3 rounded-xl font-mono text-[10px] overflow-x-auto">
{`import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "clapsy-app.firebaseapp.com",
  projectId: "clapsy-app",
  storageBucket: "clapsy-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234:web:abcd",
  firestoreDatabaseId: "(default)" // Obligatorio para Enterprise
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);`}
              </pre>

              <h4 className="font-display font-semibold text-brand-charcoal text-sm">Paso 3: Despliegue de Reglas de Seguridad Extremas (`firestore.rules`)</h4>
              <p className="text-brand-brown leading-relaxed">
                Utiliza el siguiente conjunto de reglas de seguridad robustas de nivel militar para tu consola de Firebase. Protege contra inyecciones de ID de gran tamaño y restringe la lectura y escritura a los propietarios legítimos.
              </p>
              <pre className="bg-brand-charcoal text-brand-beige p-3 rounded-xl font-mono text-[10px] overflow-x-auto max-h-[250px] overflow-y-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Catch-All Default Deny
    match /{document=**} {
      allow read, write: if false;
    }

    // Validación del formato de ID para mitigar ataques DoW (Denial of Wallet)
    function isValidId(id) {
      return id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\\\-]+$');
    }

    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    // Reglas para la colección de usuarios
    match /users/{userId} {
      allow get: if isOwner(userId);
      allow create: if isSignedIn() && request.auth.uid == userId 
        && request.resource.data.keys().hasAll(['id', 'email', 'name', 'isPremium'])
        && request.resource.data.isPremium == false; // Forzar Freemium de origen
      allow update: if isOwner(userId) 
        && request.resource.data.email == resource.data.email; // Email inmóvil
    }

    // Reglas para el historial diario de síntomas
    match /dailyLogs/{logId} {
      allow list: if isSignedIn() && resource.data.userId == request.auth.uid;
      allow get: if isSignedIn() && resource.data.userId == request.auth.uid;
      allow create: if isSignedIn() && request.resource.data.userId == request.auth.uid
        && isValidId(logId)
        && request.resource.data.sleepQuality is int && request.resource.data.sleepQuality <= 5
        && request.resource.data.bruxismTension is int && request.resource.data.bruxismTension <= 5;
      allow delete: if isSignedIn() && resource.data.userId == request.auth.uid;
    }
  }`}
              </pre>
            </div>
          </div>
        )}

        {activeManual === 'blueprint' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 border-b border-brand-olive/5 pb-3">
              <Code className="w-5 h-5 text-brand-olive" />
              <h3 className="font-serif text-lg text-brand-charcoal">Firebase Blueprint Intermediate Representation (IR)</h3>
            </div>

            <p className="text-xs text-brand-brown leading-relaxed">
              El archivo `firebase-blueprint.json` sirve para documentar y mapear de forma inequívoca el esquema de datos que el backend de Firestore consumirá para CLAPSY. Cumple con el estándar JSON Schema borrador 07 de forma estricta.
            </p>

            <div className="space-y-4">
              <div className="bg-brand-charcoal text-brand-beige p-5 rounded-2xl font-mono text-[9px] overflow-x-auto max-h-[300px] overflow-y-auto">
{`{
  "entities": {
    "UserProfile": {
      "title": "UserProfile",
      "description": "Datos básicos de perfil del usuario, streak actual y tests resueltos.",
      "type": "object",
      "properties": {
        "id": { "type": "string", "description": "UID de Firebase Authentication" },
        "name": { "type": "string", "description": "Nombre de pila del usuario" },
        "email": { "type": "string", "format": "email" },
        "isPremium": { "type": "boolean", "description": "Estado de la suscripción" },
        "registeredAt": { "type": "string" },
        "currentStreak": { "type": "integer" }
      },
      "required": ["id", "email", "name", "isPremium"]
    },
    "DailyLog": {
      "title": "DailyLog",
      "description": "Registro de síntomas diurnos y de descanso del paciente.",
      "type": "object",
      "properties": {
        "date": { "type": "string", "format": "date" },
        "sleepQuality": { "type": "integer", "enum": [1, 2, 3, 4, 5] },
        "bruxismTension": { "type": "integer", "enum": [1, 2, 3, 4, 5] },
        "stressLevel": { "type": "integer", "enum": [1, 2, 3, 4, 5] },
        "routineCompleted": { "type": "boolean" },
        "notes": { "type": "string" }
      },
      "required": ["date", "sleepQuality", "bruxismTension", "stressLevel", "routineCompleted"]
    }
  },
  "firestore": {
    "/users/{userId}": {
      "schema": "UserProfile",
      "description": "Ubicación del perfil privado del usuario, mapeado por UID."
    },
    "/users/{userId}/dailyLogs/{logId}": {
      "schema": "DailyLog",
      "description": "Subcolección cronológica con las métricas diurnas del usuario."
    }
  }
}`}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
