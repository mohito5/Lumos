
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/card.css';

const MaterialCardPlaceholder = () => {
    const placeholderIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==';
    const cardClasses = 'card-material card b br-4 ov-h p-1 card-placeholder';

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

  const name = t(`${material.id}.name`, { ns: 'materials', defaultValue: material.id });
  const placeholderIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==';

  const cardClasses = [
    'card-material',
    'card b br-4 ov-h p-1',
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
      <a href="#" className="link-to-material wd br-3 g-1 f-c hd" onClick={handleCardClick}>
        <div className={`card-avatar br-3 rarity-${material.rarity}`}>
          <img loading="lazy"
            className={`wd hd b rarity-${material.rarity}`}
            src={material.icon || placeholderIcon}
            alt={name}
          />
        </div>
        <span className="name f-c bg-r c-r br-3 p-1 ">
          <p className='m-0'>{name}</p>
        </span>
        {children}
      </a>
    </article>
  );
};

export default MaterialCard;
