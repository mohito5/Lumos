
import React from 'react';
import '../../../core/styles/components/card.css'

const ItemCard = ({
  item,
  onClick,
  name,
  icon,
  baseClass,
  rarity,
  additionalClasses = [],
  children
}) => {
  const placeholderAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==';

  const cardClasses = [
    baseClass,
    'card border radius-4 ov-h p-1',
    
    ...additionalClasses
  ].filter(Boolean).join(' ');

  const handleCardClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <article className={cardClasses} data-name={item.id}>
      <a href="#" className={`link-to-${baseClass.replace('card-','')} wd gap-1 flex-c hd`} onClick={handleCardClick}>
        <div className={`card-avatar radius-3 rarity-${rarity}`}>
          <img loading="lazy" className={`wd hd rarity-${rarity}`}
            src={icon || placeholderAvatar}
            alt={name}
          />
        </div>
        <span className="name flex-c bg-r color-r radius-3 p-1">
          {name}
        </span>
      </a>
      {children}
    </article>
  );
};

export default ItemCard;
