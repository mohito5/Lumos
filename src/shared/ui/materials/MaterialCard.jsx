
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UNKNOWN_MATERIAL_PREFIX } from '../../lib/materialsCalculator.js';
import '../../../core/styles/components/card.css';

const MaterialCardPlaceholder = () => {
    const placeholderIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==';
    const cardClasses = 'card-material card border radius-2 ov-h p-1 card-placeholder';

    return (
        <article className={cardClasses} data-name="placeholder">
            <div className="link-to-material wd br-3 g-1 f-c hd">
                <div className="card-avatar br-3">
                    <img loading="lazy"
                        className="wd hd rarity-1"
                        src={placeholderIcon}
                        alt="Material not found"
                    />
                </div>
                <span className="name f-c bg-r c-r br-3 p-1">
                    <p className='m-0'>???</p>
                </span>
            </div>
        </article>
    );
};

const MaterialCard = ({
  material,
  onClick,
  additionalClasses = [],
  children
}) => {
  const { t } = useTranslation(['materials']);

  if (!material) {
    return <MaterialCardPlaceholder />;
  }

  const isUnknownMaterial = material.id?.startsWith(UNKNOWN_MATERIAL_PREFIX);
  const name = isUnknownMaterial
    ? t(`unknown.${material.id.slice(UNKNOWN_MATERIAL_PREFIX.length)}`, {
        ns: 'materials',
        defaultValue: t('unknown.material', { ns: 'materials', defaultValue: 'Неизвестный материал' }),
      })
    : t(`${material.id}.name`, { ns: 'materials', defaultValue: material.id });
  const placeholderIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==';

  const cardClasses = [
    'card-material',
    'card border radius-2 ov-h p-1',
    ...additionalClasses
  ].filter(Boolean).join(' ');

  const handleCardClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(material);
    }
  };

  return (
    <article className={cardClasses} data-name={material.id}>
      <a href="#" className="link-to-material wd gap-1 flex-c hd" onClick={handleCardClick}>
        <div className={`card-avatar position-r radius-1 rarity-${material.rarity}`}>
          <img loading="lazy"
            className={`wd hd rarity-${material.rarity}`}
            src={material.icon || placeholderIcon}
            alt={name}
          />
          <span className='amount border background-r color-r radius-1'>
            {children}
          </span>
        </div>
        <span className="name flex-c background-r color-r radius-1 p-1">
          {name}
        </span>
      </a>
    </article>
  );
};

export default MaterialCard;
