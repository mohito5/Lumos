import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { useAppStore } from './shared/lib/store/useAppStore.ts';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import useTheme from './shared/lib/hooks/useTheme.js';

// Import context provider
import { ButtonManagerProvider } from './shared/lib/context/ButtonManagerContext.jsx';
import { CvLoaderProvider } from './shared/lib/context/CvLoaderContext.jsx';

// HomePage — единственная "тяжёлая" страница, оставленная eager: это почти
// всегда первый экран, который видит пользователь, и ленивая загрузка
// добавила бы лишний network waterfall (сначала общий бандл, потом ЕЩЁ
// один запрос за чанком HomePage) без реальной экономии, раз он всё равно
// нужен немедленно. Тонкие layout-обёртки (CharacterSubPageLayout/
// WeaponSubPageLayout — просто Outlet + вкладки) тоже eager: сами по себе
// они маленькие, а лениво грузить пустую обёртку ради контента, который
// сам по себе уже лениво грузится ниже — двойная Suspense-граница без пользы.
import HomePage from './features/home/ui/HomePage.jsx';
import CharacterSubPageLayout from './features/characters/ui/CharacterSubPageLayout.jsx';
import WeaponSubPageLayout from './features/weapons/ui/WeaponSubPageLayout.jsx';

// Остальные страницы — код-сплиттинг через React.lazy(). Раньше все они (и
// CalculatorPage, и InventoryPage, и dev-only DigitCalibrationPage) попадали
// в один общий бандл для всех пользователей независимо от того, какой
// страницей те реально пользуются — см. Performance-раздел аудита.
const CharacterListPage = lazy(() => import('./features/characters/list/ui/CharacterListPage.jsx'));
const CharacterInfoPage = lazy(() => import('./features/characters/info/ui/CharacterInfoPage.jsx'));
const CharacterGuidePage = lazy(() => import('./features/characters/guide/CharacterGuidePage.jsx'));
const CharacterMaterialsPage = lazy(() => import('./features/characters/materials/ui/CharacterMaterialsPage.jsx'));
const WeaponListPage = lazy(() => import('./features/weapons/list/ui/WeaponListPage.jsx'));
const WeaponInfoPage = lazy(() => import('./features/weapons/info/ui/WeaponInfoPage.jsx'));
const WeaponGuidePage = lazy(() => import('./features/weapons/guide/ui/WeaponGuidePage.jsx'));
const WeaponMaterialsPage = lazy(() => import('./features/weapons/materials/ui/WeaponMaterialsPage.jsx'));
const DatePage = lazy(() => import('./features/archive/DatePage.jsx'));
const FishingPage = lazy(() => import('./features/fishing/ui/FishingPage.jsx'));
const CreaturesPage = lazy(() => import('./features/creatures/ui/CreaturesPage.jsx'));
const ArtifactsPage = lazy(() => import('./features/artifacts/ui/ArtifactsPage.jsx'));
const ProfilePage = lazy(() => import('./features/profile/ui/ProfilePage.jsx'));
const CalculatorPage = lazy(() => import('./features/profile/calculator/ui/CalculatorPage.jsx'));
const InventoryPage = lazy(() => import('./features/profile/inventory/InventoryPage.tsx'));
const EnkaProfile = lazy(() => import('./features/profile/ui/EnkaProfile.jsx'));
const TeamCardsPage = lazy(() => import('./features/profile/enkaTeam/ui/TeamCardsPage.jsx'));
// Dev-инструмент — самый важный кандидат: обычный пользователь никогда не
// заходит на #/dev/digit-calibration, но раньше всё равно скачивал его код.
const DigitCalibrationPage = lazy(() => import('./features/profile/digitCalibration/ui/DigitCalibrationPage.tsx'));

// Import utility components
import Header from './shared/ui/Header/Header.jsx';
import HeaderActions from './shared/ui/Header/HeaderActions.jsx';
import NotFoundPage from './shared/ui/errors/NotFoundPage.jsx';
import ErrorBoundary from './shared/ui/errors/ErrorBoundary.jsx';
import RouteLoadingFallback from './shared/ui/loading/RouteLoadingFallback.jsx';

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
                <Suspense fallback={<RouteLoadingFallback />}>
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
                    <Route path="/profile/team-cards" element={<TeamCardsPage />} />
                    {/* Dev-инструмент, не в основной навигации — только по прямой ссылке #/dev/digit-calibration */}
                    <Route path="/dev/digit-calibration" element={<DigitCalibrationPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                </Suspense>
                </ErrorBoundary>
            </ButtonManagerProvider>
        </HashRouter>
        </CvLoaderProvider>
    );
}

export default App;
