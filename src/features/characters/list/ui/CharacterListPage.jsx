
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../../../shared/lib/hooks/useDebounce.js';
import { useNavChrome, useFilterPanel } from '../../../../shared/lib/context/ButtonManagerContext.jsx';

import CharacterListPageView from './CharacterListPageView.jsx';
import allCharacters from '../../../../data/characters/index';
import { useNavigate } from 'react-router-dom';
import GenericFilterPanel from '../../../../shared/ui/common/FilterPanel.jsx';
import { RARITY, VISION, WEAPON_TYPE } from '../../../../shared/config/constants.js';
import CharacterModal from './CharacterModal.jsx';

/** @type {import('../../../../data/types.js').Character[]} */
const characterArray = allCharacters;

const characterFilterConfig = [
    { title: 'filters.rarity', group: 'rarity', options: Object.values(RARITY), optionsNamespace: 'ui' },
    { title: 'filters.element', group: 'element', options: Object.values(VISION), optionsNamespace: 'ui' },
    { title: 'filters.weapon', group: 'weapon', options: Object.values(WEAPON_TYPE), optionsNamespace: 'ui' },
];

const CharacterListPage = () => {
    const { t, i18n } = useTranslation();
    const { setButtonType } = useNavChrome();
    const { isFilterPanelVisible, toggleFilterPanel, closeFilterPanel, setHasActiveFilters, registerFiltersReset } = useFilterPanel();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const [filters, setFilters] = useState({ rarity: [], element: [], weapon: [] });
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        setButtonType(['filter']);
        return () => {
            setButtonType(null);
            // closeFilterPanel(), а не "if (isFilterPanelVisible) toggleFilterPanel()":
            // тот if держал isFilterPanelVisible из замыкания эффекта, а эффект с
            // deps=[setButtonType] выполняется только один раз при монтировании —
            // значение оставалось равным исходному (false) даже если пользователь
            // успел открыть панель, и переключение в cleanup-функции никогда
            // фактически не срабатывало. closeFilterPanel всегда ставит false
            // напрямую, без обращения к текущему значению — работает независимо
            // от того, когда был создан эффект.
            closeFilterPanel();
            // Уходим со страницы — снимаем и индикатор активных фильтров, и
            // функцию сброса, иначе кнопка в шапке ещё кадр-другой (а на
            // медленном устройстве и дольше) показывала бы значок сброса для
            // уже отсутствующей на экране страницы.
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
        // Форма пуста, но с теми же ключами, что и текущие filters — так один
        // и тот же сброс работает независимо от конкретного набора групп
        // фильтра (rarity/element/weapon у персонажей, другое у оружия и т.д.).
        registerFiltersReset(() => {
            setFilters(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: [] }), {}));
        });
    }, [registerFiltersReset]);

    const filteredCharacters = useMemo(() => {
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

        return characterArray.filter(character => {
            const rarityMatch = filters.rarity.length === 0 || filters.rarity.includes(character.rarity);
            const elementMatch = filters.element.length === 0 || filters.element.includes(character.element);
            const weaponMatch = filters.weapon.length === 0 || filters.weapon.includes(character.weapon);
            const name = t(`${character.id}.name`, { ns: 'characters' });
            const searchMatch = !lowercasedSearchTerm || (name && name.toLowerCase().includes(lowercasedSearchTerm));

            return rarityMatch && elementMatch && weaponMatch && searchMatch;
        });
    }, [characterArray, filters, debouncedSearchTerm, t, i18n.language]);

    const handleFiltersApply = (newFilters) => {
        setFilters(newFilters);
    };

    const handleCardClick = useCallback((character) => {
        setSelectedCharacter(character);
    }, []);

    const handleCloseModal = () => {
        setSelectedCharacter(null);
    };

    const handleMaterialsClick = (character) => {
        navigate(`/characters/${character.id}/mat`);
        handleCloseModal();
    };

    return (
        <>
            <GenericFilterPanel
                initialFilters={filters}
                onApply={handleFiltersApply}
                isVisible={isFilterPanelVisible}
                onClose={toggleFilterPanel}
                filterConfig={characterFilterConfig}
                translationNamespaces={['ui']}
            />
            <CharacterListPageView
                t={t}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredCharacters={filteredCharacters}
                onCardClick={handleCardClick}
            />
            {selectedCharacter && (
                <CharacterModal
                    character={selectedCharacter}
                    onClose={handleCloseModal}
                    onMaterialsClick={handleMaterialsClick}
                />
            )}
        </>
    );
};

export default CharacterListPage;
