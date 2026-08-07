import React from 'react';

/**
 * Небольшой информационный баннер с крестиком закрытия. Не полноценный
 * onboarding-тур — просто одна строка "вот что нового", которую можно
 * закрыть и больше не видеть (запоминание — забота вызывающего компонента,
 * см. ProfilePage.jsx: appData.settings.dismissedBanners).
 */
function InfoBanner({ icon, children, onDismiss, dismissLabel }) {
    return (
        <div className="info-banner b br-4 p-2 f-r">
            {icon && <span className="info-banner-icon" aria-hidden="true">{icon}</span>}
            <p className="info-banner-text">{children}</p>
            <button
                type="button"
                className="info-banner-dismiss"
                onClick={onDismiss}
                aria-label={dismissLabel}
                title={dismissLabel}
            >
                ×
            </button>
        </div>
    );
}

export default InfoBanner;
