import React from 'react';
import { useTranslation } from 'react-i18next';

// Паритет с CharacterGuidePage.jsx: тот же паттерн (useTranslation + t(),
// section/guide-icon/guide-name), реальные i18n-ключи weapon.guide/builds
// вместо хардкода "Weapon Guide"/"This section is under construction." и
// нерабочего data-i18n-key (тот атрибут ни на что не влиял — i18next его не
// читает, реального перевода за ним не стояло).
const WeaponGuidePage = ({ weapon }) => {
    const { t } = useTranslation();

    const weaponName = weapon ? t(weapon.name) : '???';

    return (
        <div className="weapon-guide-page">
            <h1>{t('weapon.guide')}</h1>
            <div id="guide-content">
                <section className="weapons">
                    <div id="guide-icon">{/* Icon will be here */}</div>
                    <h1 id="guide-name">{weaponName}</h1>
                </section>
                <section className="guide-section">
                    <h2>{t('weapon.builds')}</h2>
                    <p>{t('common.comingSoon')}</p>
                </section>
            </div>
        </div>
    );
};

export default WeaponGuidePage;
