import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CrisisBanner } from './components/CrisisBanner';
import { AuthModal } from './pages/AuthModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MoodCheckinPage } from './pages/MoodCheckinPage';
import { WellnessToolkitPage } from './pages/WellnessToolkitPage';
import { BreathingPage } from './pages/BreathingPage';
import { GroundingPage } from './pages/GroundingPage';
import { JournalPage } from './pages/JournalPage';
import { AiCompanionPage } from './pages/AiCompanionPage';
import { ProfessionalsPage } from './pages/ProfessionalsPage';
import { VideoConsultationPage } from './pages/VideoConsultationPage';
import { ProgressPage } from './pages/ProgressPage';
import { RemindersPage } from './pages/RemindersPage';
import { TelemedicineRecordsPage } from './pages/TelemedicineRecordsPage';
import { DoctorPortalPage } from './pages/DoctorPortalPage';
import { AdminOverviewPage } from './pages/AdminOverviewPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

import { RefreshCw } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentScreen, setCurrentScreen, user, resetAllDemoData } = useApp();

  // Support ?autostart=1 query param as requested in Ultra Mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setCurrentScreen('dashboard');
    }
  }, [setCurrentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'mood-checkin':
        return <MoodCheckinPage />;
      case 'wellness':
        return <WellnessToolkitPage />;
      case 'breathing':
        return <BreathingPage />;
      case 'grounding':
        return <GroundingPage />;
      case 'journal':
        return <JournalPage />;
      case 'ai-companion':
        return <AiCompanionPage />;
      case 'professionals':
      case 'appointments':
        return <ProfessionalsPage />;
      case 'video-consultation':
        return <VideoConsultationPage />;
      case 'progress':
        return <ProgressPage />;
      case 'reminders':
        return <RemindersPage />;
      case 'records':
        return <TelemedicineRecordsPage />;
      case 'doctor-portal':
        return <DoctorPortalPage />;
      case 'admin-overview':
        return <AdminOverviewPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <LegalPage type="privacy" />;
      case 'terms':
        return <LegalPage type="terms" />;
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">User Profile & Demo Controls</h1>
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 shadow-xs">
              <div className="flex items-center space-x-3.5 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-lg">
                  {user.displayName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{user.displayName}</h2>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="font-semibold text-slate-500">Active Persona Role:</span>
                  <span className="font-bold text-brand-800 uppercase">{user.role}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="font-semibold text-slate-500 block">Personalized Focus Areas:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {user.selectedFocus.map((f, i) => (
                      <span key={i} className="bg-teal-50 text-teal-800 font-medium px-2 py-0.5 rounded text-[11px] border border-teal-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="font-semibold text-slate-500 block">Configured Wellness Habits:</span>
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-slate-600 pt-1">
                    {user.wellnessGoals.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    resetAllDemoData();
                    alert('Demo data has been reset to default state.');
                  }}
                  className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Wipe & Reset Demo Data</span>
                </button>
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className="py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Return to Sanctuary
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-calm-bg text-slate-800">
      <CrisisBanner />
      <Navbar />
      <main className="flex-1">{renderScreen()}</main>
      <Footer />
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
