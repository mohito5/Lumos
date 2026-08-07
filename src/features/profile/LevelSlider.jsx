
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LEVEL_MILESTONES } from '../../shared/config/constants';

const LevelSlider = ({ selectedLevel, onLevelChange }) => {
    const { t } = useTranslation();

    const selectedIndex = LEVEL_MILESTONES.findIndex(l => l.label === selectedLevel.label);

    const handleSliderChange = (e) => {
        const newIndex = parseInt(e.target.value, 10);
        const newLevel = LEVEL_MILESTONES[newIndex];
        onLevelChange(newLevel, newIndex);
    };

    return (
        <div className="level-slider-container">
            <label htmlFor="level-slider">{t('calculator.level')}: {selectedLevel.label}</label>
            <input
                type="range"
                id="level-slider"
                min="0"
                max={LEVEL_MILESTONES.length - 1}
                value={selectedIndex}
                onChange={handleSliderChange}
                className="level-slider"
            />
        </div>
    );
};

export default LevelSlider;
