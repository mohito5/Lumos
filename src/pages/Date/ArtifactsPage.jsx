
import React, { useState, useEffect, useMemo } from 'react';
import allArtifactSets from '../../data/artifacts';
import ArtifactModal from './ArtifactModal';
import GenericFilterPanel from '../../components/common/FilterPanel';
import ItemCard from '../../components/common/ItemCard';
import { useNavChrome, useFilterPanel } from '../../context/ButtonManagerContext';
import { useDebounce } from '../../hooks/useDebounce';
import { useTranslation } from 'react-i18next';
import { REGION } from '../../app/constants';
import './date.css';

const artifactRarities = [...new Set(allArtifactSets.flatMap(s => s.rarity))].sort((a, b) => a - b).map(String);

const artifactFilterConfig = [
    { title: 'filters.rarity', group: 'rarity', options: artifactRarities },
    { title: 'filters.region', group: 'region', options: Object.values(REGION), optionsNamespace: 'ui' },
];

const ArtifactsPage = () => {
    const { setButtonType, setBackPath } = useNavChrome();
    const { isFilterPanelVisible, toggleFilterPanel, closeFilterPanel, setHasActiveFilters, registerFiltersReset } = useFilterPanel();
    const { t, i18n } = useTranslation(['artifacts', 'ui']);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [filters, setFilters] = useState({ rarity: [], region: [] });
    const [selectedArtifactSet, setSelectedArtifactSet] = useState(null);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);

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

    const filteredSets = useMemo(() => {
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();
        return allArtifactSets.filter(artifactSet => {
            const rarityMatch = filters.rarity.length === 0 || artifactSet.rarity.some(r => filters.rarity.includes(String(r)));
            const regionMatch = filters.region.length === 0 || (Array.isArray(artifactSet.region) ? artifactSet.region.some(r => filters.region.includes(r)) : filters.region.includes(artifactSet.region));
            const name = t(`${artifactSet.id}.name`, { ns: 'artifacts' });
            const searchMatch = !lowercasedSearchTerm || (name && name.toLowerCase().includes(lowercasedSearchTerm));
            return rarityMatch && regionMatch && searchMatch;
        });
    }, [filters, debouncedSearchTerm, t, i18n.language]);

    const handleSelectArtifactSet = (artifactSet) => {
        const index = filteredSets.findIndex(set => set.id === artifactSet.id);
        setSelectedArtifactSet(artifactSet);
        setCurrentSetIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedArtifactSet(null);
    };
    
    const handleNavigate = (direction) => {
        const newIndex = (currentSetIndex + direction + filteredSets.length) % filteredSets.length;
        setCurrentSetIndex(newIndex);
        setSelectedArtifactSet(filteredSets[newIndex]);
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };
    
    const renderRarity = (rarity) => {
        return '★'.repeat(rarity);
    }

    return (
        <div className="page date-subpage flex-c gap-4">
            <div className="date-subpage-header flex-c gap-4">
                <h1>{t('archive.artifacts.title', { ns: 'ui' })}</h1>
                <p>{t('artifacts.description', { ns: 'ui' })}</p>
                <div className="search-bar">
                  <input className="p-1 b-d br-4 bg-l"
                    type="text"
                    placeholder={t('search.placeholder', { ns: 'ui' })}
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
                filterConfig={artifactFilterConfig}
                translationNamespaces={['artifacts', 'ui']}
            />

            <div className="cards-container gap-4">
                {filteredSets.map(artifactSet => (
                    <ItemCard
                        key={artifactSet.id}
                        item={artifactSet}
                        onClick={() => handleSelectArtifactSet(artifactSet)}
                        name={t(`${artifactSet.id}.name`, { ns: 'artifacts' })}
                        rarity={Math.max(...artifactSet.rarity)}
                        baseClass="artifact-set-card"
                        renderRarity={renderRarity}
                    />
                ))}
            </div>

            {selectedArtifactSet && <ArtifactModal
                artifactSet={selectedArtifactSet}
                onClose={handleCloseModal}
                onNavigate={handleNavigate}
            />}
        </div>
    );
};

export default ArtifactsPage;
