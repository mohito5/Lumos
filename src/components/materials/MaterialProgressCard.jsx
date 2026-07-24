
import React from 'react';
import { useTranslation } from 'react-i18next';
import { materialsData } from '../../data/materials';
import './MaterialProgressCard.css';

const MaterialProgressCard = React.memo(({ materialKey, calculatedAmount, ownedAmount, onOwnedAmountChange }) => {
    const { t } = useTranslation(['materials', 'ui']);

    const materialInfo = materialsData.find(m => m.id === materialKey);

    if (!materialInfo) {
        return (
            <div className="material-item-error">
                <span className="material-name">{materialKey}</span>
                <span className="material-amount">?</span>
            </div>
        );
    }

    const name = t(`${materialKey}.name`, { ns: 'materials', defaultValue: materialKey });
    const icon = materialInfo.icon;
    const neededAmount = Math.max(0, calculatedAmount - ownedAmount);

    const formatNumber = (num) => new Intl.NumberFormat().format(num);

    return (
        <div className="material-item">
            <div className="material-icon">
                <img loading="lazy" className="wd" src={`/${icon}`} alt={name} />
                <span className="material-amount needed-amount">{formatNumber(neededAmount)}</span>
                 <div className="material-total-container">
                    <span className="material-total-label">{t('ui:total', 'Всего')}:</span>
                    <span className="material-total-amount">{formatNumber(calculatedAmount)}</span>
                </div>
            </div>
            <div className="material-details">
                <span className="material-name">{name}</span>
                <div className="material-inventory">
                    <label htmlFor={`inventory-${materialKey}`} className="inventory-label">{t('ui:inStock', 'В наличии')}:</label>
                    <input
                        id={`inventory-${materialKey}`}
                        type="number"
                        className="inventory-input wd"
                        value={ownedAmount}
                        onChange={(e) => onOwnedAmountChange(materialKey, parseInt(e.target.value, 10) || 0)}
                        min="0"
                    />
                </div>
            </div>
        </div>
    );
});

export default MaterialProgressCard;
