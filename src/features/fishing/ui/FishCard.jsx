
import React from 'react';
import { useTranslation } from 'react-i18next';
import ItemCard from '../../../shared/ui/common/ItemCard';

const FishCard = ({ fish, onClick }) => {
  const { t } = useTranslation('fishing');

  const fishName = t(`fishing:${fish.id}.name`);

  const additionalClasses = [
    fish.difficulty ? `difficulty-${fish.difficulty}` : ''
  ];

  return (
    <ItemCard
        key={fish.id}
      item={fish}
      onClick={onClick}
      name={fishName}
      icon={null} // No icon for fish yet, so placeholder will be used
      baseClass="card-fish b"
      rarity={fish.rarity}
      additionalClasses={additionalClasses}
    />
  );
};

export default FishCard;
