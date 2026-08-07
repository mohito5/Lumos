import React from 'react';
import { withTranslation } from 'react-i18next';
import { captureError } from '../../../core/services/errorTracking';

// Класс-компонент: хук useTranslation() (как в NotFoundPage.jsx) здесь
// использовать нельзя, поэтому берём HOC-эквивалент — withTranslation()
// пробрасывает t()/i18n тем же способом, что и хук, тот же namespace 'ui'.
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
        // captureError — no-op без VITE_SENTRY_DSN (см. errorTracking.ts).
        // Это САМАЯ верхняя граница отлова во всём приложении — если сюда
        // дошло, значит компонент упал так, что React больше не смог
        // отрендерить дерево ниже; знать об этом раньше жалобы пользователя
        // важнее всего именно здесь.
        captureError(error, { componentStack: info.componentStack });
    }

    handleGoHome = () => {
        this.setState({ hasError: false, error: null });
        window.location.hash = '/';
    };

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        const { t } = this.props;

        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    gap: '16px',
                    textAlign: 'center',
                    padding: '24px',
                }}>
                    <div style={{ fontSize: '3rem', lineHeight: 1 }}>⚠️</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, opacity: 0.8 }}>
                        {t('errors.somethingWentWrong', 'Что-то пошло не так')}
                    </div>
                    <div style={{
                        opacity: 0.5,
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        maxWidth: '400px',
                        wordBreak: 'break-word',
                    }}>
                        {this.state.error?.message}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button
                            onClick={this.handleRetry}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '8px',
                                border: '1px solid currentColor',
                                cursor: 'pointer',
                                background: 'transparent',
                                fontSize: '0.9rem',
                            }}
                        >
                            {t('errors.tryAgain', 'Попробовать снова')}
                        </button>
                        <button
                            onClick={this.handleGoHome}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                background: 'var(--color-accent, #5c7aad)',
                                color: '#fff',
                                fontSize: '0.9rem',
                            }}
                        >
                            {t('errors.goHome', '← На главную')}
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default withTranslation('ui')(ErrorBoundary);
