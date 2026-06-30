/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, TestResultSummary, DailyLog } from './types';
import { MOCK_DAILY_LOGS } from './mockData';

// Component imports
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Tests from './components/Tests';
import Routines from './components/Routines';
import Audios from './components/Audios';
import Education from './components/Education';
import Stats from './components/Stats';
import Premium from './components/Premium';
import Contact from './components/Contact';
import Config from './components/Config';

import { 
  Home, 
  ClipboardList, 
  Activity, 
  Music, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  User, 
  Settings, 
  LogOut,
  Moon,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [activeSubTab, setActiveSubTab] = useState<string>(''); // For deep link to tests
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Authentication State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [completedTests, setCompletedTests] = useState<TestResultSummary[]>([]);

  // Registration Overlay states
  const [showRegModal, setShowRegModal] = useState<boolean>(false);
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regSymptoms, setRegSymptoms] = useState<string[]>([]);
  const [isLoginFlow, setIsLoginFlow] = useState<boolean>(false);

  // Load state from LocalStorage on mount
  useEffect(() => {
    // 1. Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('CLAPSY Service Worker registrado con éxito:', registration.scope);
          })
          .catch((error) => {
            console.error('Fallo al registrar el Service Worker:', error);
          });
      });
    }

    // 2. Load Local Data
    const storedUser = localStorage.getItem('clapsy_user');
    const storedLogs = localStorage.getItem('clapsy_logs');
    const storedTests = localStorage.getItem('clapsy_tests');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setActiveTab('dashboard');
    }

    if (storedLogs) {
      setDailyLogs(JSON.parse(storedLogs));
    } else {
      // Seed with beautiful 7-day logs so stats are populated and compelling
      localStorage.setItem('clapsy_logs', JSON.stringify(MOCK_DAILY_LOGS));
      setDailyLogs(MOCK_DAILY_LOGS);
    }

    if (storedTests) {
      setCompletedTests(JSON.parse(storedTests));
    }
  }, []);

  // Update localStorage when local objects change
  const saveUserData = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('clapsy_user', JSON.stringify(updatedUser));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regName) return;

    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: regName,
      email: regEmail,
      isPremium: false,
      registeredAt: new Date().toLocaleDateString(),
      currentStreak: 1,
      testsCompleted: {}
    };

    saveUserData(newUser);
    setShowRegModal(false);
    setActiveTab('dashboard');
    
    // Clear forms
    setRegName('');
    setRegEmail('');
    setRegPassword('');
    setRegSymptoms([]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail) return;

    // Simulate login by loading or creating a profile
    const existingUser: UserProfile = {
      id: 'usr_login',
      name: regName || regEmail.split('@')[0],
      email: regEmail,
      isPremium: false,
      registeredAt: new Date().toLocaleDateString(),
      currentStreak: 2,
      testsCompleted: {
        general: true,
        bruxism: true
      }
    };

    // Seed mock test result to make dashboard exciting
    const seedTestResult: TestResultSummary = {
      testType: 'bruxism',
      title: 'Cribado de Bruxismo y Tensión ATM',
      score: 6,
      maxScore: 10,
      riskLevel: 'Alto',
      recommendations: [
        'Sugerimos iniciar la rutina Ritual Crepuscular de Descompresión ATM de forma diaria.',
        'Evita morder bolígrafos, morderte las uñas, o masticar chicle prolongadamente.'
      ],
      completedAt: new Date().toLocaleString()
    };
    const updatedTests = [seedTestResult];
    setCompletedTests(updatedTests);
    localStorage.setItem('clapsy_tests', JSON.stringify(updatedTests));

    const updatedUser = { ...existingUser, testsCompleted: { general: true, bruxism: true } };
    saveUserData(updatedUser);
    setShowRegModal(false);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión? Tu perfil local se cerrará, pero tus métricas seguirán guardadas en este navegador.')) {
      setUser(null);
      localStorage.removeItem('clapsy_user');
      setActiveTab('landing');
    }
  };

  // Upgrades user to premium
  const handleUpgradeToPremium = () => {
    if (!user) return;
    const updatedUser = { ...user, isPremium: true };
    saveUserData(updatedUser);
  };

  // Handle saving completed clinical tests
  const handleSaveTestResult = (result: TestResultSummary) => {
    const updatedTests = [...completedTests.filter(t => t.testType !== result.testType), result];
    setCompletedTests(updatedTests);
    localStorage.setItem('clapsy_tests', JSON.stringify(updatedTests));

    if (user) {
      const updatedUser = {
        ...user,
        testsCompleted: {
          ...user.testsCompleted,
          [result.testType]: true
        }
      };
      saveUserData(updatedUser);
    }
  };

  // Handle saving daily log symptoms
  const handleSaveDailyLog = (logData: Omit<DailyLog, 'date'>) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newLog: DailyLog = {
      date: todayStr,
      ...logData
    };

    const updatedLogs = [...dailyLogs.filter(l => l.date !== todayStr), newLog];
    setDailyLogs(updatedLogs);
    localStorage.setItem('clapsy_logs', JSON.stringify(updatedLogs));

    // Update streak if routine completed
    if (user && logData.routineCompleted) {
      const lastDate = user.lastCompletedDate;
      let newStreak = user.currentStreak;

      if (!lastDate) {
        newStreak = 1;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          newStreak += 1;
        } else if (lastDate !== todayStr) {
          newStreak = 1;
        }
      }

      const updatedUser = {
        ...user,
        currentStreak: newStreak,
        lastCompletedDate: todayStr
      };
      saveUserData(updatedUser);
    }
  };

  // Completed routine trigger (inside Routine player)
  const handleRoutineCompleted = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (user) {
      const lastDate = user.lastCompletedDate;
      let newStreak = user.currentStreak;

      if (!lastDate) {
        newStreak = 1;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          newStreak += 1;
        } else if (lastDate !== todayStr) {
          newStreak = 1;
        }
      }

      const updatedUser = {
        ...user,
        currentStreak: newStreak,
        lastCompletedDate: todayStr
      };
      saveUserData(updatedUser);
    }

    // Also log it automatically
    const logExistsForToday = dailyLogs.find(l => l.date === todayStr);
    if (!logExistsForToday) {
      handleSaveDailyLog({
        sleepQuality: 3,
        bruxismTension: 2,
        stressLevel: 3,
        routineCompleted: true,
        notes: 'Rutina guiada de descompresión ATM completada.'
      });
    } else {
      handleSaveDailyLog({
        ...logExistsForToday,
        routineCompleted: true
      });
    }
  };

  // Clears user metrics logs
  const handleClearLogs = () => {
    localStorage.removeItem('clapsy_logs');
    setDailyLogs([]);
    if (user) {
      const updatedUser = {
        ...user,
        currentStreak: 0,
        lastCompletedDate: undefined
      };
      saveUserData(updatedUser);
    }
  };

  const handleResetApp = () => {
    localStorage.clear();
    setUser(null);
    setDailyLogs([]);
    setCompletedTests([]);
    setActiveTab('landing');
  };

  // Navigates and auto-closes mobile menus
  const handleNavigation = (tabName: string) => {
    if (tabName.startsWith('tests-')) {
      setActiveSubTab(tabName);
      setActiveTab('tests');
    } else {
      setActiveTab(tabName);
      setActiveSubTab('');
    }
    setMobileMenuOpen(false);
  };

  // Toggle premium sandbox state
  const handleTogglePremium = () => {
    if (!user) return;
    const updatedUser = { ...user, isPremium: !user.isPremium };
    saveUserData(updatedUser);
  };

  const symptomCheckboxes = [
    'Aprieto los dientes durante el día',
    'Tengo dolores de cabeza matinales',
    'Mi pareja dice que ronco o rechino',
    'Cansancio o somnolencia diurna extrema',
    'Dolor o cansancio en la mandíbula',
    'Tensión cervical y en hombros'
  ];

  return (
    <div id="clapsy-root" className="min-h-screen bg-brand-beige-light flex flex-col md:flex-row font-sans selection:bg-brand-gold/30">
      
      {/* 1. SIDEBAR NAVIGATION FOR DESKTOP (md:flex) */}
      {user && (
        <aside id="desktop-sidebar" className="hidden md:flex flex-col w-64 bg-white border-r border-brand-olive/10 h-screen sticky top-0 shrink-0 z-40 p-5 justify-between">
          <div className="space-y-8">
            {/* App Logo */}
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-9 h-9 rounded-xl bg-brand-olive flex items-center justify-center text-white font-display font-bold text-lg tracking-wider">
                C
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-brand-charcoal tracking-widest leading-none">CLAPSY</span>
                <span className="text-[9px] text-brand-brown font-mono mt-0.5 font-bold uppercase tracking-wider">ATM & SUEÑO</span>
              </div>
            </div>

            {/* Profile Brief */}
            <div className="bg-brand-beige/50 border border-brand-olive/5 rounded-2xl p-4 space-y-1">
              <div className="text-xs font-semibold text-brand-charcoal truncate">{user.name}</div>
              <div className="text-[10px] text-brand-brown truncate">{user.email}</div>
              <div className="pt-2 flex items-center gap-1.5 justify-between">
                <span className={`text-[8px] font-bold font-mono uppercase px-2 py-0.5 rounded ${
                  user.isPremium ? 'bg-brand-gold/20 text-brand-gold-dark' : 'bg-brand-brown/15 text-brand-brown'
                }`}>
                  {user.isPremium ? 'Premium' : 'Básico'}
                </span>
                <span className="text-[10px] text-brand-olive font-mono font-bold flex items-center gap-0.5">
                  🔥 {user.currentStreak} Racha
                </span>
              </div>
            </div>

            {/* Main Tabs List */}
            <nav className="space-y-1 font-sans text-xs font-medium">
              {[
                { id: 'dashboard', label: 'Panel de Control', icon: Home },
                { id: 'tests', label: 'Cribados Clínicos', icon: ClipboardList },
                { id: 'routines', label: 'Rutinas ATM', icon: Activity },
                { id: 'audios', label: 'Audios Delta', icon: Music },
                { id: 'education', label: 'Biblioteca Científica', icon: BookOpen },
                { id: 'stats', label: 'Mis Estadísticas', icon: TrendingUp },
                { id: 'contact', label: 'Directorio Médico', icon: User },
                { id: 'premium', label: 'CLAPSY Premium', icon: Sparkles, highlight: true },
                { id: 'config', label: 'Ajustes', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    id={`sidebar-link-${item.id}`}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all text-left cursor-pointer ${
                      isActive 
                        ? 'bg-brand-olive text-white font-bold shadow-sm' 
                        : item.highlight && !user.isPremium
                        ? 'text-brand-gold-dark hover:bg-brand-gold/10 font-bold bg-brand-gold/5'
                        : 'text-brand-brown hover:text-brand-charcoal hover:bg-brand-beige-light'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Logout Trigger */}
          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-brand-brown hover:text-red-700 hover:bg-red-50 transition-all text-xs font-medium text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Cerrar Sesión</span>
          </button>
        </aside>
      )}

      {/* 2. MOBILE HEADER & NAVIGATION (For Screens < md) */}
      {user && (
        <div id="mobile-navigation-container" className="md:hidden w-full sticky top-0 bg-white border-b border-brand-olive/10 z-50">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-olive flex items-center justify-center text-white font-display font-bold text-base tracking-wider">
                C
              </div>
              <span className="font-display font-bold text-lg text-brand-charcoal tracking-widest">CLAPSY</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="mobile-nav-premium-badge"
                onClick={() => handleNavigation('premium')}
                className={`text-[9px] font-bold font-mono uppercase px-2.5 py-1 rounded-full ${
                  user.isPremium ? 'bg-brand-gold/25 text-brand-gold-dark' : 'bg-brand-gold text-brand-charcoal animate-pulse'
                }`}
              >
                {user.isPremium ? '★ Premium' : '★ Desbloquear'}
              </button>
              
              <button
                id="mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-brand-beige-light hover:bg-brand-beige text-brand-charcoal cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Full Screen Mobile dropdown navigation */}
          {mobileMenuOpen && (
            <div className="bg-white border-t border-brand-olive/5 py-4 px-6 space-y-2 absolute inset-x-0 top-full shadow-premium-lg z-50">
              {[
                { id: 'dashboard', label: 'Panel Principal', icon: Home },
                { id: 'tests', label: 'Cribados Clínicos', icon: ClipboardList },
                { id: 'routines', label: 'Rutinas ATM', icon: Activity },
                { id: 'audios', label: 'Audios Delta', icon: Music },
                { id: 'education', label: 'Biblioteca Científica', icon: BookOpen },
                { id: 'stats', label: 'Evolución de Tensión', icon: TrendingUp },
                { id: 'contact', label: 'Especialistas', icon: User },
                { id: 'premium', label: 'CLAPSY Premium', icon: Sparkles },
                { id: 'config', label: 'Ajustes', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    id={`mobile-link-${item.id}`}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3.5 py-3 px-4 rounded-xl text-left text-xs font-semibold cursor-pointer ${
                      isActive 
                        ? 'bg-brand-olive text-white font-bold' 
                        : 'text-brand-brown hover:bg-brand-beige-light'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-current" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <div className="border-t border-brand-olive/5 pt-3 mt-3">
                <button
                  id="mobile-logout-btn"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3.5 py-3 px-4 text-brand-brown text-xs font-semibold text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. MAIN WORKSPACE CONTENT PANEL */}
      <main id="main-workspace-content" className="flex-grow min-h-screen flex flex-col">
        {activeTab === 'landing' && (
          <Landing 
            onStart={() => {
              setIsLoginFlow(false);
              setShowRegModal(true);
            }} 
            onLoginClick={() => {
              setIsLoginFlow(true);
              setShowRegModal(true);
            }}
          />
        )}

        {/* Dynamic Tab Renderers */}
        {user && (
          <div className="flex-grow">
            {activeTab === 'dashboard' && (
              <Dashboard 
                user={user} 
                completedTests={completedTests} 
                dailyLogs={dailyLogs}
                onNavigate={handleNavigation}
                onSaveDailyLog={handleSaveDailyLog}
                onUnlockPremium={() => handleNavigation('premium')}
              />
            )}

            {activeTab === 'tests' && (
              <Tests 
                activeSubTab={activeSubTab}
                onNavigate={handleNavigation}
                onSaveTestResult={handleSaveTestResult}
              />
            )}

            {activeTab === 'routines' && (
              <Routines 
                user={user} 
                onUnlockPremium={() => handleNavigation('premium')}
                onRoutineCompleted={handleRoutineCompleted}
              />
            )}

            {activeTab === 'audios' && (
              <Audios 
                user={user} 
                onUnlockPremium={() => handleNavigation('premium')}
              />
            )}

            {activeTab === 'education' && (
              <Education 
                user={user} 
                onUnlockPremium={() => handleNavigation('premium')}
              />
            )}

            {activeTab === 'stats' && (
              <Stats 
                dailyLogs={dailyLogs} 
                onClearLogs={handleClearLogs}
              />
            )}

            {activeTab === 'contact' && (
              <Contact />
            )}

            {activeTab === 'premium' && (
              <Premium 
                user={user} 
                onUpgradeSuccess={handleUpgradeToPremium}
              />
            )}

            {activeTab === 'config' && (
              <Config 
                user={user} 
                onResetApp={handleResetApp}
                onTogglePremium={handleTogglePremium}
              />
            )}
          </div>
        )}
      </main>

      {/* 4. REGISTRATION & LOGIN MODAL OVERLAY */}
      {showRegModal && (
        <div id="auth-modal-overlay" className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-brand-olive/15 p-6 sm:p-8 max-w-md w-full shadow-premium-lg space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowRegModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-brand-beige text-brand-brown hover:text-brand-charcoal transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-olive flex items-center justify-center text-white font-display font-bold text-lg mx-auto shadow-premium">
                C
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal">
                {isLoginFlow ? 'Ingresar a CLAPSY' : 'Crea tu Perfil de Cuidado'}
              </h3>
              <p className="text-xs text-brand-brown">
                {isLoginFlow 
                  ? 'Sincroniza tus datos locales con tu clave de acceso.' 
                  : 'Completa este formulario de triaje para personalizar tus rutinas.'}
              </p>
            </div>

            {/* Simulated Auth Form */}
            <form onSubmit={isLoginFlow ? handleLogin : handleRegister} className="space-y-4">
              
              {!isLoginFlow && (
                <div>
                  <label className="block text-[11px] font-medium text-brand-charcoal mb-1">¿Cómo te llamas?</label>
                  <input 
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Ej. Sofía Rodríguez"
                    className="w-full text-xs rounded-xl border border-brand-brown/20 p-2.5 outline-none focus:border-brand-olive bg-brand-beige-light/40"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-brand-charcoal mb-1">Correo Electrónico</label>
                <input 
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="sofia@gmail.com"
                  className="w-full text-xs rounded-xl border border-brand-brown/20 p-2.5 outline-none focus:border-brand-olive bg-brand-beige-light/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-brand-charcoal mb-1">Contraseña</label>
                <input 
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs rounded-xl border border-brand-brown/20 p-2.5 outline-none focus:border-brand-olive bg-brand-beige-light/40"
                />
              </div>

              {/* Interactive triage questionnaire if REGISTER flow */}
              {!isLoginFlow && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-medium text-brand-charcoal">¿Qué síntomas experimentas? (opcional)</label>
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {symptomCheckboxes.map((symptom) => {
                      const isSelected = regSymptoms.includes(symptom);
                      return (
                        <div 
                          key={symptom}
                          onClick={() => {
                            if (isSelected) {
                              setRegSymptoms(regSymptoms.filter(s => s !== symptom));
                            } else {
                              setRegSymptoms([...regSymptoms, symptom]);
                            }
                          }}
                          className={`text-[10px] p-2 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                            isSelected 
                              ? 'bg-brand-olive/10 border-brand-olive text-brand-olive-dark font-semibold' 
                              : 'bg-brand-beige-light/50 border-brand-brown/10 text-brand-brown hover:bg-brand-beige-light'
                          }`}
                        >
                          <span>{symptom}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border border-brand-brown/20 flex items-center justify-center text-[8px] font-bold ${
                            isSelected ? 'bg-brand-olive text-white border-brand-olive' : 'bg-transparent'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                id="auth-submit-btn"
                type="submit"
                className="w-full bg-brand-olive hover:bg-brand-olive-dark text-white text-xs font-semibold py-3.5 rounded-xl shadow-premium transition-colors cursor-pointer"
              >
                {isLoginFlow ? 'Ingresar Ahora' : 'Crear Perfil y Comenzar'}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                id="auth-toggle-flow-btn"
                onClick={() => setIsLoginFlow(!isLoginFlow)}
                className="text-xs text-brand-olive hover:underline font-medium cursor-pointer"
              >
                {isLoginFlow ? '¿No tienes cuenta? Registrate gratis' : '¿Ya tienes una cuenta? Iniciar Sesión'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. FLOATING BOTTOM APP NAV FOR MOBILE (Fixed layout) */}
      {user && (
        <nav id="mobile-bottom-app-nav" className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-brand-olive/10 py-2.5 px-4 flex items-center justify-around z-40 shadow-premium-lg">
          {[
            { id: 'dashboard', label: 'Inicio', icon: Home },
            { id: 'tests', label: 'Cribados', icon: ClipboardList },
            { id: 'routines', label: 'Rutinas', icon: Activity },
            { id: 'audios', label: 'Audios', icon: Music },
            { id: 'stats', label: 'Progreso', icon: TrendingUp },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`bottom-nav-link-${item.id}`}
                onClick={() => handleNavigation(item.id)}
                className={`flex flex-col items-center gap-1 cursor-pointer ${
                  isActive ? 'text-brand-olive font-bold scale-105' : 'text-brand-brown hover:text-brand-charcoal'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-[9px] font-medium leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}

    </div>
  );
}
