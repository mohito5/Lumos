
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../../../shared/lib/hooks/useDebounce.js';
import { useNavChrome, useFilterPanel } from '../../../../shared/lib/context/ButtonManagerContext.jsx';

import WeaponListPageView from './WeaponListPageView.jsx';
import  weaponsData  from '../../../../data/weapons/index.js';
import { useNavigate } from 'react-router-dom';
import GenericFilterPanel from '../../../../shared/ui/common/FilterPanel.jsx';
import { RARITY, WEAPON_TYPE } from '../../../../shared/config/constants.js';
import WeaponModal from './WeaponModal.jsx';

/** @type {import('../../../../data/types.js').Weapon[]} */
const weaponArray = weaponsData;

const weaponFilterConfig = [
    { title: 'filters.rarity', group: 'rarity', options: Object.values(RARITY), optionsNamespace: 'ui' },
    { title: 'filters.type', group: 'type', options: Object.values(WEAPON_TYPE), optionsNamespace: 'ui' },
];

const WeaponListPage = () => {
    const { t, i18n } = useTranslation();
    const { setButtonType } = useNavChrome();
    const { isFilterPanelVisible, toggleFilterPanel, closeFilterPanel, setHasActiveFilters, registerFiltersReset } = useFilterPanel();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const [filters, setFilters] = useState({ rarity: [], type: [] });
    const [selectedWeapon, setSelectedWeapon] = useState(null);

    useEffect(() => {
        setButtonType(['filter']);
        return () => {
            setButtonType(null);
            // См. комментарий к такому же эффекту в CharacterListPage.jsx —
            // closeFilterPanel() вместо if(isFilterPanelVisible) toggleFilterPanel(),
            // который из-за замыкания эффекта на deps=[setButtonType] никогда не
            // видел актуальное значение isFilterPanelVisible.
            closeFilterPanel();
            setHasActiveFilters(false);
            registerFiltersReset(null);
        };
    }, [setButtonType, closeFilterPanel, setHasActiveFilters, registerFiltersReset]);

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

    const filteredWeapons = useMemo(() => {
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();
    
        return weaponArray.filter(weapon => {
            const rarityMatch = filters.rarity.length === 0 || filters.rarity.includes(weapon.rarity);
            const typeMatch = filters.type.length === 0 || filters.type.includes(weapon.type);
            const name = t(`${weapon.id}.name`, { ns: 'weapons' });
            const searchMatch = !lowercasedSearchTerm || (name && name.toLowerCase().includes(lowercasedSearchTerm));
    
            return rarityMatch && typeMatch && searchMatch;
        });
    }, [weaponArray, filters, debouncedSearchTerm, t, i18n.language]);
    
    const handleFiltersApply = (newFilters) => {
        setFilters(newFilters);
    };

    const handleCardClick = useCallback((weapon) => {
        setSelectedWeapon(weapon);
    }, []);

    const handleCloseModal = () => {
        setSelectedWeapon(null);
    };

    const handleMaterialsClick = (weapon) => {
        navigate(`/weapons/${weapon.id}/mat`);
        handleCloseModal();
    };

    return (
        <>
            <GenericFilterPanel
                initialFilters={filters}
                onApply={handleFiltersApply}
                isVisible={isFilterPanelVisible}
                onClose={toggleFilterPanel}
                filterConfig={weaponFilterConfig}
                translationNamespaces={['ui']}
            />
            <WeaponListPageView
                t={t}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredWeapons={filteredWeapons}
                onCardClick={handleCardClick}
            />
            {selectedWeapon && (
                <WeaponModal
                    weapon={selectedWeapon}
                    onClose={handleCloseModal}
                    onMaterialsClick={handleMaterialsClick}
                />
            )}
        </>
    );
};

export default WeaponListPage;
