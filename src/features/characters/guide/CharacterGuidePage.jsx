
import React from 'react';
import { useTranslation } from 'react-i18next';

const CharacterGuidePage = ({ character }) => {
    const { t } = useTranslation();

    const charName = character ? t(character.name) : '???';

    return (
        <div className="character-guide-page">
            <h1>{t('character.guide')}</h1>
            <div id="guide-content">
                <section className="characters">
                    <div id="guide-icon">{/* Icon will be here */}</div>
                    <h1 id="guide-name">{charName}</h1>
                </section>
                <section className="guide-section">
                    <h2>{t('character.builds')}</h2>
                    <p>{t('common.comingSoon')}</p>
                </section>
            </div>
        </div>
    );
};

export default CharacterGuidePage;
