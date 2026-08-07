import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../core/styles/components/modal.css';
import { fishingLocations } from '../../../data/fishing/locations';
import { useBodyScrollLock } from '../../../shared/lib/hooks/useBodyScrollLock';

const rarityStars = { 1: '★', 2: '★★', 3: '★★★', 4: '★★★★', 5: '★★★★★' };
const DEFAULT_LOCATION_ICON = '/assets/locations/default.png';

// We will replace this with actual image tags later.
const getFishIcon = (fish, type) => {
    const rarityValue = type === 'ornamental' ? fish.rarity_ornamental : fish.rarity;
    const stars = rarityStars[rarityValue];
    const icons = {
        '★': '🐟',
        '★★': '🐟',
        '★★★': '🐟',
        '★★★★': '🐠',
        '★★★★★': '👑',
    };
    return icons[stars] || '❓';
};


const FishModal = ({ fish, onClose }) => {
    const { t } = useTranslation(['fishing', 'ui', 'common']);
    const [viewType, setViewType] = useState('regular');

    useEffect(() => {
        setViewType('regular');
    }, [fish]);

    useBodyScrollLock(!!fish);

    if (!fish) {
        return null;
    }

    const hasOrnamental = fish.rarity_ornamental;
    const currentRarity = viewType === 'ornamental' ? fish.rarity_ornamental : fish.rarity;
    const currentIcon = getFishIcon(fish, viewType); 

    const fishName = t([`fishing:${fish.id}.name`, 'common:unknown_fish_name']);
    const fishDescription = t([`fishing:${fish.id}.description`, 'common:unknown_fish_description']);
    const baitName = t([`fishing:bait.${fish.bait.toLowerCase()}`, 'common:unknown_bait']);

    return (
        <div className="modal overlay" onClick={onClose}>
            <div className="content-modal color-pine gap-4 p-2 radius-4 background-bill fish-modal" onClick={e => e.stopPropagation()}>
                <div className="fish-modal-header flex pb-1 gap-1 border">
                    <div className="fish-modal-icon icon-xl border radius-2">{currentIcon}</div>
                    <div className="fish-modal-title">
                        <h2>{fishName}</h2>
                        <span className="fish-rarity-badge">{rarityStars[currentRarity]}</span>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                </div>

                {hasOrnamental && (
                    <div className="view-toggle-buttons border pb-2">
                        <button 
                            className={viewType === 'regular' ? 'active' : ''}
                            onClick={() => setViewType('regular')}
                        >
                            {t('ui:modal.fishing.regular')}
                        </button>
                        <button 
                            className={viewType === 'ornamental' ? 'active' : ''}
                            onClick={() => setViewType('ornamental')}
                        >
                            {t('ui:modal.fishing.ornamental')}
                        </button>
                    </div>
                )}

                <div className="fish-modal-body">
                    <p className="fish-description">{fishDescription}</p>

                    <div className="fish-details-section">
                        <h3>{t('ui:modal.fishing.details_title')}</h3>
                        <div className="fish-details-grid">
                            <div className="detail-item">
                                <span className="detail-label">{t('ui:modal.fishing.bait')}:</span>
                                <span className="detail-value">{baitName}</span>
                            </div>
                             <div className="detail-item">
                                <span className="detail-label">{t('ui:modal.fishing.difficulty')}:</span>
                                <span className="detail-value">{t(`ui:difficulty.${fish.difficulty.toLowerCase()}`)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">{t('ui:modal.fishing.game_time')}:</span>
                                <span className="detail-value">{t(`ui:game_time.${fish.game_time.toLowerCase()}`)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="fish-details-section">
                        <h3>{t('ui:modal.fishing.locations_title')}</h3>
                        <div className="locations-list">
                            {Object.entries(fish.locations).map(([region, locationIds]) => (
                                <div key={region} className="location-region-group">
                                    <p className="location-region-name">{t(`ui:region.${region}`)}</p>
                                    <ul className="location-sublist">
                                        {locationIds.map(locationId => {
                                            const locationData = fishingLocations[locationId];
                                            const locationIcon = locationData?.image || DEFAULT_LOCATION_ICON;
                                            return (
                                                <li key={locationId}>
                                                    <img loading="lazy" src={locationIcon} alt={t([`fishing:location.${locationId}`, 'common:unknown_location'])} className="location-icon" />
                                                    {t([`fishing:location.${locationId}`, 'common:unknown_location'])}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FishModal;
