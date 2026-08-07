
import React from 'react';
import { useTranslation } from 'react-i18next';
import { materialsData } from '../../../data/materials';
import { UNKNOWN_MATERIAL_PREFIX } from '../../lib/materialsCalculator';
import './MaterialProgressCard.css';

const MaterialProgressCard = React.memo(({ materialKey, calculatedAmount, ownedAmount, onOwnedAmountChange }) => {
    const { t } = useTranslation(['materials', 'ui']);

    // Placeholder-категория (см. UNKNOWN_MATERIAL_PREFIX в materialsCalculator.js) —
    // возникает, когда character.ascensionMaterials/weapon.ascensionMaterials
    // не указывают конкретный материал этой категории. Раньше такая
    // потребность просто не доходила до рендера вообще (см. историю в
    // materialsCalculator.js); теперь показываем заглушку с понятным
    // названием, а не молчим и не показываем сырой id.
    const isUnknown = materialKey.startsWith(UNKNOWN_MATERIAL_PREFIX);
    const category = isUnknown ? materialKey.slice(UNKNOWN_MATERIAL_PREFIX.length) : null;

    const materialInfo = isUnknown ? null : materialsData.find(m => m.id === materialKey);

    if (!isUnknown && !materialInfo) {
        return (
            <div className="material-item-error">
                <span className="material-name">{materialKey}</span>
                <span className="material-amount">?</span>
            </div>
        );
    }

    const name = isUnknown
        ? t(`unknown.${category}`, { ns: 'materials', defaultValue: t('unknown.material', { ns: 'materials', defaultValue: 'Неизвестный материал' }) })
        : t(`${materialKey}.name`, { ns: 'materials', defaultValue: materialKey });
    const icon = isUnknown ? 'assets/unknown.png' : materialInfo.icon;
    const neededAmount = Math.max(0, calculatedAmount - ownedAmount);

    const formatNumber = (num) => new Intl.NumberFormat().format(num);

    return (
        <div className={`border color gap-1 p-1 radius-4 material-item${isUnknown ? ' material-item-unknown' : ''}`}>
            <div className="border flex-r wd">
                <img loading="lazy" className={`icon-xl icon border rarity-${materialKey.rarity}`} src={`/${icon}`} alt={name} title={isUnknown ? t('unknown.hint', { ns: 'materials', defaultValue: 'Не указано в данных персонажа/оружия — уточни материал вручную' }) : undefined} />
                <div className="material-total-container">
                    <span className="material-name">{name}</span>
                <span className="material-amount needed-amount">{formatNumber(neededAmount)}</span>
                 
                    <span className="material-total-label">{t('ui:total', 'Всего')}:</span>
                    <span className="material-total-amount">{formatNumber(calculatedAmount)}</span>
                </div>
            </div>
            <div className="material-details border">
                {!isUnknown && (
                    <div className="material-inventory">
                        <label htmlFor={`inventory-${materialKey}`} className="inventory-label">{t('ui:inStock', 'В наличии')}:</label>
                        <input
                            id={`inventory-${materialKey}`}
                            type="number"
                            className="inventory-input wd border radius-3 p-1"
                            value={ownedAmount}
                            onChange={(e) => onOwnedAmountChange(materialKey, parseInt(e.target.value, 10) || 0)}
                            min="0"
                        />
                    </div>
                )}
            </div>
        </div>
    );
});

export default MaterialProgressCard;
