
import React from 'react';
import '../../assets/styles/card.css'

const ItemCard = ({
  item,
  onClick,
  name,
  icon,
  baseClass,
  rarity,
  additionalClasses = [],
  children,
  avatarUrl
}) => {
  const placeholderAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==';

  const cardClasses = [
    baseClass,
    'card border radius-7 ov-h p-2',
    
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
      <a href="#" className={`link-to-${baseClass.replace('card-','')} wd radius-5 gap-2 f-c hd`} onClick={handleCardClick}>
        <div className={`card-avatar radius-6 rarity-${rarity}`}>
          <img loading="lazy" className={`wd hd rarity-${rarity}`}
            src={avatarUrl || icon}
            alt={name}
          />
        </div>
        <span className="name f-c background-r color-r radius-6 p-1">
          <p className='m-0'>{name}</p>
        </span>
      </a>
      {children}
    </article>
  );
};

export default ItemCard;
