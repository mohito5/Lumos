import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavChrome } from '../../context/ButtonManagerContext';

const BackButton = () => {
    const navigate = useNavigate();
    const { backPath } = useNavChrome();
    const { t } = useTranslation();

    const handleBack = () => {
        if (backPath) {
            navigate(backPath);
        } else {
            navigate(-1); // Fallback to go to the previous page in history
        }
    };

    return (
        <button className='tooltip back-button p-2 b br-4 bg-bl' onClick={handleBack} aria-label={t('buttons.go_back')}>
            <svg className='i-reg c-p'><use href="#icon-back"></use></svg>
            <span className='tooltip-text bg-bl br-4 p-1'><p className='m-0 c-p'>{t('ui:buttons.backTooltip')}</p></span>
        </button>
    );
};

export default BackButton;
