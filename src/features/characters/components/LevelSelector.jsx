
import React from 'react';
import { LEVEL_MILESTONES, TALENT_LEVELS } from '../../../app/constants';

const LevelSelector = React.memo(({ type, from, to, onChange, t }) => {
    const isLevelType = type === 'level';
    const options = isLevelType ? LEVEL_MILESTONES : TALENT_LEVELS;
    
    const fromLabel = isLevelType ? options[from]?.label : from;
    const toLabel = isLevelType ? options[to]?.label : to;

    const handleFromChange = (increment) => {
        const value = from + increment;
        const newValue = isLevelType 
            ? Math.max(0, Math.min(options.length - 1, value))
            : Math.max(1, Math.min(options.length, value));
        if (newValue !== from) {
            onChange(type, 'from', newValue);
        }
    };

    const handleToChange = (increment) => {
        const value = to + increment;
        const newValue = isLevelType
            ? Math.max(0, Math.min(options.length - 1, value))
            : Math.max(1, Math.min(options.length, value));
        if (newValue !== to) {
            onChange(type, 'to', newValue);
        }
    };

    return (
        <div className="level-selector">
            <span className="selector-label">{t(`character.materials_page.${type}`)}</span>
            <div className="level-control-wrapper">
                 <div className="level-control">
                    <button onClick={() => handleFromChange(-1)} disabled={(isLevelType && from <= 0) || (!isLevelType && from <= 1)}>
                        ‹
                    </button>
                    <span className="level-display">{fromLabel}</span>
                    <button 
                        onClick={() => handleFromChange(1)} 
                        disabled={(isLevelType && from >= options.length - 1) || (!isLevelType && from >= options.length) || from >= to}>
                            ›
                    </button>
                </div>
                <span className="arrow">→</span>
                <div className="level-control">
                    <button 
                        onClick={() => handleToChange(-1)} 
                        disabled={(isLevelType && to <= 0) || (!isLevelType && to <= 1) || to <= from}>
                            ‹
                    </button>
                    <span className="level-display">{toLabel}</span>
                    <button 
                        onClick={() => handleToChange(1)} 
                        disabled={(isLevelType && to >= options.length - 1) || (!isLevelType && to >= options.length)}>
                            ›
                    </button>
                </div>
            </div>
        </div>
    );
});

export default LevelSelector;
