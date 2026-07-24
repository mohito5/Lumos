import React, { useEffect, useRef } from 'react';
import { useAppStore } from './store/useAppStore';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import useTheme from './hooks/useTheme.js';

// Import context provider
import { ButtonManagerProvider } from './context/ButtonManagerContext';
import { CvLoaderProvider } from './context/CvLoaderContext';

// Import page components
import HomePage from './features/home/HomePage.jsx';
import CharacterListPage from './features/characters/CharacterListPage.jsx';
import CharacterSubPageLayout from './features/characters/CharacterSubPageLayout.jsx';
import CharacterInfoPage from './features/characters/CharacterInfoPage.jsx';
import CharacterGuidePage from './features/characters/CharacterGuidePage.jsx';
import CharacterMaterialsPage from './features/characters/CharacterMaterialsPage.jsx';
import WeaponListPage from './features/weapons/WeaponListPage.jsx';
import WeaponSubPageLayout from './features/weapons/WeaponSubPageLayout.jsx';
import WeaponInfoPage from './features/weapons/WeaponInfoPage.jsx';
import WeaponGuidePage from './features/weapons/WeaponGuidePage.jsx';
import WeaponMaterialsPage from './features/weapons/WeaponMaterialsPage.jsx';
import DatePage from './pages/Date/DatePage.jsx';
import FishingPage from './pages/Date/FishingPage.jsx';
import CreaturesPage from './pages/Date/CreaturesPage.jsx';
import ArtifactsPage from './pages/Date/ArtifactsPage.jsx';
import ProfilePage from './features/profile/ProfilePage.jsx';
import CalculatorPage from './features/profile/CalculatorPage.jsx';
import InventoryPage from './features/profile/InventoryPage.tsx';
import EnkaProfile from './features/profile/EnkaProfile.jsx';
import DigitCalibrationPage from './features/profile/DigitCalibrationPage.tsx';

// Import utility components
import Header from './components/Header.jsx';
import HeaderActions from './components/HeaderActions.jsx';
import NotFoundPage from './pages/Error/NotFoundPage.jsx';
import ErrorBoundary from './pages/Error/ErrorBoundary.jsx';

const MaterialsPage = () => (
    <div className='page-placeholder'>
        <h2 data-i18n-key="sidebar.materials">Materials</h2>
        <p>This section is under construction.</p>
    </div>
);

function App() {
    const { isLoading, error } = useAppStore();
    useTheme();

    // Вызываем initialize ровно один раз — через ref чтобы не зависеть
    // от стабильности ссылки на функцию из zustand
    const initCalledRef = useRef(false);
    useEffect(() => {
        if (initCalledRef.current) return;
        initCalledRef.current = true;
        useAppStore.getState().initialize();
    }, []);

    if (isLoading) {
        return null; // Уведомление-спиннер уже показывается через notifications.js
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: '12px',
                padding: '20px',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: '2rem' }}>⚠️</div>
                <div style={{ fontWeight: 600 }}>Ошибка инициализации</div>
                <div style={{ opacity: 0.6, fontSize: '0.85rem' }}>{error}</div>
                <button
                    onClick={() => {
                        initCalledRef.current = false;
                        useAppStore.getState().initialize();
                    }}
                    style={{
                        marginTop: '8px',
                        padding: '8px 20px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        background: 'var(--color-accent, #5c7aad)',
                        color: '#fff',
                    }}
                >
                    Попробовать снова
                </button>
            </div>
        );
    }

    return (
        <CvLoaderProvider>
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ButtonManagerProvider>
                <Header />
                <HeaderActions />

                <ErrorBoundary>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/characters" element={<CharacterListPage />} />

                    <Route path="/characters/:characterId" element={<CharacterSubPageLayout />}>
                        <Route path="info" element={<CharacterInfoPage />} />
                        <Route path="guide" element={<CharacterGuidePage />} />
                        <Route path="mat" element={<CharacterMaterialsPage />} />
                    </Route>

                    <Route path="/weapons" element={<WeaponListPage />} />
                    <Route path="/weapons/:id" element={<WeaponSubPageLayout />}>
                        <Route path="info" element={<WeaponInfoPage />} />
                        <Route path="guide" element={<WeaponGuidePage />} />
                        <Route path="mat" element={<WeaponMaterialsPage />} />
                    </Route>

                    <Route path="/materials" element={<MaterialsPage />} />
                    <Route path="/date" element={<DatePage />} />
                    <Route path="/date/fish" element={<FishingPage />} />
                    <Route path="/date/creatures" element={<CreaturesPage />} />
                    <Route path="/date/artifacts" element={<ArtifactsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/calculator/:buildId?" element={<CalculatorPage />} />
                    <Route path="/profile/inventory" element={<InventoryPage />} />
                    <Route path="/profile/enka-import" element={<EnkaProfile />} />
                    {/* Dev-инструмент, не в основной навигации — только по прямой ссылке #/dev/digit-calibration */}
                    <Route path="/dev/digit-calibration" element={<DigitCalibrationPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                </ErrorBoundary>
            </ButtonManagerProvider>
        </HashRouter>
        </CvLoaderProvider>
    );
}

export default App;
