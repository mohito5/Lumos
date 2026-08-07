import { useEffect, useMemo } from 'react';
import { useAppStore } from '../../../../shared/lib/store/useAppStore';
import { useFarmingSchedulePins } from './useFarmingSchedulePins';
import { useInventory } from '../../../profile/hooks/useInventory';
import { charactersById } from '../../../../data/characters/index';
import { weaponsById } from '../../../../data/weapons/index';
import { calculateCharacterMaterials, calculateWeaponMaterials, expandBuildData } from '../../../../shared/lib/materialsCalculator';
import { buildFarmingSchedule } from '../../../../shared/lib/farmingSchedule';
import { LEVEL_MILESTONES } from '../../../../shared/config/constants';
import i18n from '../../../../core/i18n/i18n-config';

const DEFAULT_CHAR_BUILD = {
    levelRange: { from: 0, to: LEVEL_MILESTONES.length - 1 },
    attackRange: { from: 1, to: 10 },
    skillRange: { from: 1, to: 10 },
    burstRange: { from: 1, to: 10 },
};
const DEFAULT_WEAPON_BUILD = {
    levelRange: { from: 0, to: LEVEL_MILESTONES.length - 1 },
};

/**
 * Живой расчёт расписаний фарма для всех закреплённых на главной
 * персонажей/оружия. Пин хранит только { type, itemId } — сам snapshot
 * расписания больше не сохраняется нигде, поэтому здесь он каждый раз
 * считается заново из ТЕКУЩЕГО appData.savedChars/savedWeaps +
 * appData.inventory (через ту же calculateCharacterMaterials/
 * calculateWeaponMaterials, которыми пользуются сами страницы материалов —
 * см. core/utils/materialsCalculator.js).
 *
 * За счёт этого:
 *  - виджет никогда не показывает застывшие цифры — поменяли инвентарь на
 *    любой другой странице, тут же пересчитается и здесь;
 *  - удаление персонажа/оружия само собой «убирает» и виджет: если по
 *    itemId нет ни сохранённой сборки, ни самого персонажа/оружия в
 *    статичных данных — такой пин просто не попадает в результат и
 *    подчищается из хранилища (см. эффект ниже). Отдельно связывать эти
 *    два места кода (страницу удаления и виджет) не нужно.
 */
export function usePinnedFarmingSchedules() {
    const { pins, prunePins } = useFarmingSchedulePins();
    const appData = useAppStore((state) => state.appData);
    const { inventory } = useInventory();

    const entries = useMemo(() => {
        const result = [];

        for (const pin of pins) {
            if (pin.type === 'character') {
                const savedEntry = (appData?.savedChars || []).find((c) => c.i === pin.itemId);
                const character = charactersById.get(pin.itemId);
                if (!savedEntry || !character) continue;

                const buildData = expandBuildData(savedEntry, DEFAULT_CHAR_BUILD);
                const allMaterials = calculateCharacterMaterials(character, buildData);
                result.push({
                    type: 'character',
                    itemId: pin.itemId,
                    itemName: i18n.t(`${pin.itemId}.name`, { ns: 'characters', defaultValue: pin.itemId }),
                    itemIcon: character.icon,
                    schedule: buildFarmingSchedule(allMaterials, inventory),
                });
            } else if (pin.type === 'weapon') {
                const savedEntry = (appData?.savedWeaps || []).find((w) => w.i === pin.itemId);
                const weapon = weaponsById.get(pin.itemId);
                if (!savedEntry || !weapon) continue;

                const buildData = expandBuildData(savedEntry, DEFAULT_WEAPON_BUILD);
                const allMaterials = calculateWeaponMaterials(weapon, buildData);
                result.push({
                    type: 'weapon',
                    itemId: pin.itemId,
                    itemName: i18n.t(`${pin.itemId}.name`, { ns: 'weapons', defaultValue: pin.itemId }),
                    itemIcon: weapon.icon,
                    schedule: buildFarmingSchedule(allMaterials, inventory),
                });
            }
        }

        return result;
    }, [pins, appData?.savedChars, appData?.savedWeaps, inventory]);

    useEffect(() => {
        const validKeys = new Set(entries.map((e) => `${e.type}:${e.itemId}`));
        prunePins((p) => validKeys.has(`${p.type}:${p.itemId}`));
        // prunePins/pins меняются вместе с entries, добавлять их в deps не
        // нужно — иначе лишний повторный проход на каждый чужой ре-рендер стора.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entries]);

    return entries;
}
