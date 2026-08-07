
import React, { useState, useMemo, useEffect } from 'react';
import fishingData from '../../../data/fishing';
import FishModal from './FishModal';
import GenericFilterPanel from '../../../shared/ui/common/FilterPanel';
import ItemCard from '../../../shared/ui/common/ItemCard';
import { useNavChrome, useFilterPanel } from '../../../shared/lib/context/ButtonManagerContext';
import { useDebounce } from '../../../shared/lib/hooks/useDebounce';
import { useTranslation } from 'react-i18next';
import { REGION } from '../../../shared/config/constants';
import { BAIT_TYPE, DIFFICULTY, GAME_TIME } from '../../../shared/config/fish';

const fishFilterConfig = [
    { title: 'filters.region', group: 'region', options: Object.values(REGION), optionsNamespace: 'ui' },
    { title: 'filters.bait', group: 'bait', options: Object.values(BAIT_TYPE), optionsNamespace: 'fishing' },
    { title: 'filters.difficulty', group: 'difficulty', options: Object.values(DIFFICULTY), optionsNamespace: 'ui' },
    { title: 'filters.game_time', group: 'game_time', options: Object.values(GAME_TIME), optionsNamespace: 'ui' },
];

const FishingPage = () => {
    const { setButtonType, setBackPath } = useNavChrome();
    const { isFilterPanelVisible, toggleFilterPanel, closeFilterPanel, setHasActiveFilters, registerFiltersReset } = useFilterPanel();
    const { i18n, t } = useTranslation(['fishing', 'ui']);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [selectedFish, setSelectedFish] = useState(null);
    const [filters, setFilters] = useState({ region: [], bait: [], difficulty: [], game_time: [] });

    useEffect(() => {
        setButtonType(['back', 'filter']);
        setBackPath('/date');
        return () => {
            setButtonType(null);
            setBackPath(null);
            closeFilterPanel();
            setHasActiveFilters(false);
            registerFiltersReset(null);
        };
    }, [setButtonType, setBackPath, closeFilterPanel, setHasActiveFilters, registerFiltersReset]);

    const hasActiveFilters = useMemo(
        () => Object.values(filters).some(group => group.length > 0),
        [filters]
    );

    useEffect(() => {
        setHasActiveFilters(hasActiveFilters);
    }, [hasActiveFilters, setHasActiveFilters]);

    useEffect(() => {
        registerFiltersReset(() => {
            setFilters(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: [] }), {}));
        });
    }, [registerFiltersReset]);

    const handleApplyFilters = (newFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    const filteredFish = useMemo(() => {
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

        return fishingData.filter(fish => {
            const name = t(`${fish.id}.name`, { ns: 'fishing' });
            const nameMatches = name.toLowerCase().includes(lowercasedSearchTerm);

            const regionMatches = filters.region.length === 0 || (Array.isArray(fish.region) ? fish.region.some(r => filters.region.includes(r)) : filters.region.includes(fish.region));
            const baitMatches = filters.bait.length === 0 || filters.bait.includes(fish.bait);
            const difficultyMatches = filters.difficulty.length === 0 || filters.difficulty.includes(fish.difficulty);
            const gameTimeMatches = filters.game_time.length === 0 || filters.game_time.includes(fish.game_time);

            return nameMatches && regionMatches && baitMatches && difficultyMatches && gameTimeMatches;
        });
    }, [fishingData, debouncedSearchTerm, t, filters, i18n.language]);

    const handleSelectFish = (fish) => setSelectedFish(fish);
    const handleCloseModal = () => setSelectedFish(null);

    return (
        <div className="page date-subpage gap-4 flex-c">
            <div className="flex-c gap-2">
                <h1>{t('ui:archive.fishing.title')}</h1>
                <p>{t('ui:pages.fishing.description')}</p>
                <div className="search-bar">
                    <input className="p-1 border radius-4"
                           type="text"
                           placeholder={t('ui:search.placeholder')}
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <GenericFilterPanel
                initialFilters={filters}
                onApply={handleApplyFilters}
                isVisible={isFilterPanelVisible}
                onClose={toggleFilterPanel}
                filterConfig={fishFilterConfig}
                translationNamespaces={['ui', 'fishing']}
            />

            <div className="cards-container gap-2">
                {filteredFish.map(fish => (
                    <ItemCard
                        key={fish.id}
                        item={fish}
                        onClick={() => handleSelectFish(fish)}
                        name={t(`${fish.id}.name`, { ns: 'fishing' })}
                        rarity={fish.rarity}
                        baseClass=""
                    />
                ))}
            </div>

            <FishModal fish={selectedFish} onClose={handleCloseModal} />
        </div>
    );
};

export default FishingPage;
