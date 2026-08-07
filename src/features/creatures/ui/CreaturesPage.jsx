import React, { useState, useEffect, useMemo } from 'react';
import creaturesData from '../../../data/creatures/index.js';
import CreatureModal from './CreatureModal.jsx';
import GenericFilterPanel from '../../../shared/ui/common/FilterPanel.jsx';
import ItemCard from '../../../shared/ui/common/ItemCard.jsx';
import { useNavChrome, useFilterPanel } from '../../../shared/lib/context/ButtonManagerContext.jsx';
import { useDebounce } from '../../../shared/lib/hooks/useDebounce.js';
import { useTranslation } from 'react-i18next';
import { ENEMIES_TYPE, ELEMENT, FAMILY } from '../../../shared/config/creatures.js';
import '../../archive/ui/date.css';

const creatureFilterConfig = [
    { title: 'filters.type', group: 'type', options: Object.values(ENEMIES_TYPE), optionsNamespace: 'ui' },
    { title: 'filters.type_damage', group: 'type_damage', options: Object.values(ELEMENT), optionsNamespace: 'ui' },
    { title: 'filters.family', group: 'family', options: Object.values(FAMILY), optionsNamespace: 'creatures' },
];

const CreaturesPage = () => {
    const { setButtonType, setBackPath } = useNavChrome();
    const { isFilterPanelVisible, toggleFilterPanel, closeFilterPanel, setHasActiveFilters, registerFiltersReset } = useFilterPanel();
    const { i18n, t } = useTranslation(['creatures', 'ui']);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [filters, setFilters] = useState({ type: [], type_damage: [], family: [] });
    const [selectedCreature, setSelectedCreature] = useState(null);

    useEffect(() => {
        setButtonType(['back', 'filter']);
        setBackPath('/date');
        
        return () => {
            setButtonType(null);
            setBackPath(null);
            // Раньше тут панель фильтров не пряталась при уходе со страницы —
            // isFilterPanelVisible общий на всё приложение (один провайдер на
            // всё дерево), так что открытая тут и не закрытая явно панель
            // оставалась открытой и на следующей странице.
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

    const filteredCreatures = useMemo(() => {
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

        return creaturesData.filter(creature => {
            const typeMatch = filters.type.length === 0 || filters.type.includes(creature.type);
            const typeDamageMatch = filters.type_damage.length === 0 || filters.type_damage.includes(creature.type_damage);
            const familyMatch = filters.family.length === 0 || filters.family.includes(creature.family);
            const name = t(`${creature.id}.name`, { ns: 'creatures' });
            const searchMatch = !lowercasedSearchTerm || (name && name.toLowerCase().includes(lowercasedSearchTerm));

            return typeMatch && typeDamageMatch && familyMatch && searchMatch;
        });
    }, [creaturesData, filters, debouncedSearchTerm, t, i18n.language]);

    const handleSelectCreature = (creature) => {
        setSelectedCreature(creature);
    };

    const handleCloseModal = () => {
        setSelectedCreature(null);
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="page date-subpage flex-c gap-4">
            <div className="flex-c gap-4">
                <h1>{t('archive.creatures.title', { ns: 'ui' })}</h1>
                <p>{t('archive.creatures.desc', { ns: 'ui' })}</p>
                <div className="search-bar">
                  <input className="p-1 border radius-4 background"
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
                filterConfig={creatureFilterConfig}
                translationNamespaces={['ui', 'creatures']}
            />

            <div className="cards-container gap-2">
                {filteredCreatures.map(creature => (
                    <ItemCard
                        key={creature.id}
                        item={creature}
                        icon={creature.icon}
                        onClick={() => handleSelectCreature(creature)}
                        name={t(`${creature.id}.name`, { ns: 'creatures' })}
                        rarity={creature.type}
                        baseClass="card"
                    />
                ))}
            </div>

            <CreatureModal
                creature={selectedCreature}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default CreaturesPage;
