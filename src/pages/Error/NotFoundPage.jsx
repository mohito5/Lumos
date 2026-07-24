import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('ui');

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
            <div style={{ fontSize: '4rem', lineHeight: 1 }}>404</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, opacity: 0.8 }}>
                {t('errors.pageNotFound', 'Страница не найдена')}
            </div>
            <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>
                {t('errors.pageNotFoundDesc', 'Возможно, страница была удалена или вы перешли по неверной ссылке')}
            </div>
            <button
                onClick={() => navigate('/')}
                style={{
                    marginTop: '8px',
                    padding: '10px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'var(--color-accent, #5c7aad)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                }}
            >
                {t('errors.goHome', '← На главную')}
            </button>
        </div>
    );
};

export default NotFoundPage;
