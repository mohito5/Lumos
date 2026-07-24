import { materialsById } from '../../data/materials/index';
import { DAYS, MATERIAL_GROUP, MATERIAL_TYPE, MATERIAL_TIER } from '../../app/constants';
import { getMaterialDisplayName, getGroupDisplayName } from './materialDisplay';

export const ALL_DAYS = [
    DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY,
    DAYS.FRIDAY, DAYS.SATURDAY, DAYS.SUNDAY,
];

/**
 * План распределения фарма по неделе (не витрина «что вообще можно
 * фармить» — таким был первый, ошибочный вариант этого файла).
 *
 *   - Материалы, которые фармятся за смолу (книги талантов/оружия, обычный
 *     боссовый дроп, книги уровня, мора) конкурируют за ОДИН слот в день:
 *       · если сегодня открыт домен (по farmDays) — слот достаётся ему,
 *         т.к. у домена есть жёсткое окно (день пройдёт — и его не будет
 *         ещё 3 дня), а босса/мору/опыт можно fармить в любой день;
 *       · если домена сегодня нет — слот достаётся ротации по обычным
 *         боссам/книгам уровня/море, с весом по количеству нужного
 *         (см. ticketsFor) — то есть то, чего нужно больше, попадает в
 *         план недели чаще.
 *   - Еженедельный босс — смолы на него уходит немного, ограничение не в
 *     смоле, а в том, что забег доступен раз в неделю. Поэтому он не
 *     участвует в ежедневной ротации вообще, а показывается ровно один раз
 *     за неделю, в фиксированный день (WEEKLY_BOSS_DAY).
 *   - Диковины — свой собственный цикл на ~3 дня (те же паттерны, что и у
 *     доменов книг), не связан со слотом смолы — это не смола, а личный
 *     респавн предмета.
 *   - Дроп с мобов/руда — ничем не ограничено, показывается каждый день.
 *   - Самоцветы возвышения и Корона Прозрения — не попадают в расписание
 *     вообще (см. SCHEDULE_CATEGORY.EXCLUDED).
 *
 * Материалы одного домена (например все 3 уровня книг «Поэзии») сведены в
 * ОДНУ строку с названием группы, а не показаны отдельными строками — по
 * отдельности сумма «сколько надо» всё равно не даёт единого осмысленного
 * числа, а «сходить в домен Х» — одно действие.
 */

export const DOMAIN_DAILY_LIMIT = 2;
const WEEKLY_BOSS_DAY = DAYS.MONDAY;

export const SCHEDULE_CATEGORY = {
    DOMAIN: 'domain',
    RESIN_POOL: 'resinPool',
    WEEKLY_BOSS: 'weeklyBoss',
    SPECIALTY: 'specialty',
    ENEMY: 'enemy',
    EXCLUDED: 'excluded',
};

const RESIN_POOL_GROUP = {
    MORA: 'mora',
    EXP: 'exp',
    NORMAL_BOSS: 'normalBoss',
};

// Циклы дней для диковин — те же паттерны, что у книг талантов (шаг ~3 дня).
const SPECIALTY_PATTERNS = [
    [DAYS.MONDAY, DAYS.THURSDAY, DAYS.SUNDAY],
    [DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SUNDAY],
    [DAYS.WEDNESDAY, DAYS.SATURDAY, DAYS.SUNDAY],
];

// group у материалов бывает то массивом, то строкой — приводим к массиву.
function groupsOf(material) {
    if (!material.group) return [];
    return Array.isArray(material.group) ? material.group : [material.group];
}

/** Определяет категорию расписания для одного материала. */
export function categorizeMaterial(material) {
    const groups = groupsOf(material);
    const hasFarmDays = Array.isArray(material.farmDays) && material.farmDays.length > 0;

    if (
        groups.includes(MATERIAL_GROUP.CROWN_OF_INSIGHT)
        || groups.includes(MATERIAL_GROUP.ASCENSION_GEMS)
        || groups.includes(MATERIAL_GROUP.COMMON_ASCENSION_GEMS)
    ) {
        return SCHEDULE_CATEGORY.EXCLUDED;
    }
    if (groups.includes(MATERIAL_GROUP.ENHANCEMENT_ORE)) {
        return SCHEDULE_CATEGORY.ENEMY;
    }
    if (groups.includes(MATERIAL_GROUP.TALENT_BOOKS) && hasFarmDays) {
        return SCHEDULE_CATEGORY.DOMAIN;
    }
    if (material.type === MATERIAL_TYPE.WEAPON_ENHANCEMENT_MATERIALS && hasFarmDays) {
        return SCHEDULE_CATEGORY.DOMAIN;
    }
    if (
        groups.includes(MATERIAL_GROUP.LOCAL_SPECIALTIES)
        || material.type === MATERIAL_TYPE.LOCAL_SPECIALTY
        || material.tier === MATERIAL_TIER.LOCAL_SPECIALTY
    ) {
        return SCHEDULE_CATEGORY.SPECIALTY;
    }
    if (groups.includes(MATERIAL_GROUP.WEEKLY_BOSS_DROPS)) {
        return SCHEDULE_CATEGORY.WEEKLY_BOSS;
    }
    if (groups.includes(MATERIAL_GROUP.NORMAL_BOSS_DROPS)) {
        return SCHEDULE_CATEGORY.RESIN_POOL;
    }
    if (groups.includes(MATERIAL_GROUP.COMMON_ENEMY_DROPS) || groups.includes(MATERIAL_GROUP.ELITE_ENEMY_DROPS)) {
        return SCHEDULE_CATEGORY.ENEMY;
    }
    if (material.type === MATERIAL_TYPE.COMMON_CURRENCIES || material.type === MATERIAL_TYPE.CHARACTER_EXP) {
        return SCHEDULE_CATEGORY.RESIN_POOL;
    }

    // Материал без чёткой группы — лучше показать как «доступно всегда»,
    // чем молча потерять из расписания.
    return SCHEDULE_CATEGORY.ENEMY;
}

/** К какой под-группе resin-пула относится материал (для ротации/веса). */
function resinPoolGroupOf(material) {
    if (material.type === MATERIAL_TYPE.COMMON_CURRENCIES) return RESIN_POOL_GROUP.MORA;
    if (material.type === MATERIAL_TYPE.CHARACTER_EXP) return RESIN_POOL_GROUP.EXP;
    return RESIN_POOL_GROUP.NORMAL_BOSS;
}

/**
 * Сколько «билетов» получает группа resin-пула в ротации по неделе — чем
 * больше нужно материала, тем чаще он должен попадать в план (адаптация
 * расписания под количество нужных материалов). Шкала логарифмическая,
 * т.к. мора (сотни тысяч) и штучный боссовый дроп (единицы-десятки)
 * отличаются на порядки, а нам нужна лишь относительная частота появления
 * в рамках 7 дней, а не точная пропорция.
 */
function ticketsFor(neededTotal) {
    if (neededTotal <= 0) return 0;
    return Math.min(4, Math.floor(Math.log10(neededTotal)) + 1);
}

/** Раунд-робин с весами: группа с весом N встречается в очереди N раз. */
function interleaveByWeight(groups) {
    const pool = groups.map((g) => ({ key: g.key, left: g.tickets }));
    const sequence = [];
    let progress = true;
    while (progress) {
        progress = false;
        for (const p of pool) {
            if (p.left > 0) {
                sequence.push(p.key);
                p.left -= 1;
                progress = true;
            }
        }
    }
    return sequence;
}

/** Сводит несколько материалов одного домена (тиры книги/оружия) в одну строку. */
function consolidateDomainGroup(groupKey, items) {
    const iconItem = items[0];
    return {
        id: groupKey,
        name: getGroupDisplayName(groupKey, iconItem),
        icon: iconItem.icon,
        needed: null, // у группы нет единого «сколько нужно» — это набор из разных тиров
        category: SCHEDULE_CATEGORY.DOMAIN,
        tiers: items, // на случай, если UI всё же захочет показать разбивку
    };
}

/**
 * Строит расписание фарма на 7 дней недели.
 *
 * @param {Object} allMaterials — { [materialId]: totalNeeded }
 * @param {Object} inventory    — { [materialId]: owned }
 * @returns {{ [day: string]: { domain: Array, weeklyBoss: Array, specialty: Array, enemy: Array } }}
 *
 * Результат не зависит от текущего момента времени, поэтому безопасно
 * кешировать через useMemo только по [allMaterials, inventory].
 */
export function buildFarmingSchedule(allMaterials = {}, inventory = {}) {
    const byDomainGroup = new Map();   // groupKey -> { farmDays, items: [] }
    const byResinGroup = new Map();    // poolGroupKey -> { items: [], neededTotal }
    const weeklyBossItems = [];
    const specialtyGroups = [];        // [{ items: [] }] — по одной записи на отдельный материал
    const specialtyIndexById = new Map();
    const enemyItems = [];

    for (const id in allMaterials) {
        const needed = (allMaterials[id] || 0) - (inventory[id] || 0);
        if (needed <= 0) continue;

        const material = materialsById.get(id);
        if (!material) continue;

        const category = categorizeMaterial(material);
        if (category === SCHEDULE_CATEGORY.EXCLUDED) continue;

        const entry = {
            id,
            name: getMaterialDisplayName(material),
            icon: material.icon,
            needed,
            category,
        };

        if (category === SCHEDULE_CATEGORY.DOMAIN) {
            const groups = groupsOf(material);
            // Ключ конкретного домена — самая специфичная группа (не общий
            // TALENT_BOOKS, а, например, BOOKS_BALLAD).
            const groupKey = groups.find((g) => g !== MATERIAL_GROUP.TALENT_BOOKS) || groups[0] || material.id;
            if (!byDomainGroup.has(groupKey)) {
                byDomainGroup.set(groupKey, { farmDays: material.farmDays || [], items: [] });
            }
            byDomainGroup.get(groupKey).items.push(entry);
        } else if (category === SCHEDULE_CATEGORY.WEEKLY_BOSS) {
            weeklyBossItems.push(entry);
        } else if (category === SCHEDULE_CATEGORY.RESIN_POOL) {
            const poolKey = resinPoolGroupOf(material);
            if (!byResinGroup.has(poolKey)) {
                byResinGroup.set(poolKey, { items: [], neededTotal: 0 });
            }
            const g = byResinGroup.get(poolKey);
            g.items.push(entry);
            g.neededTotal += needed;
        } else if (category === SCHEDULE_CATEGORY.SPECIALTY) {
            if (!specialtyIndexById.has(id)) {
                specialtyIndexById.set(id, specialtyGroups.length);
                specialtyGroups.push({ items: [entry] });
            } else {
                specialtyGroups[specialtyIndexById.get(id)].items.push(entry);
            }
        } else {
            enemyItems.push(entry);
        }
    }

    const domainGroups = Array.from(byDomainGroup.entries()).map(([key, g]) => ({
        key,
        farmDays: g.farmDays,
        consolidated: consolidateDomainGroup(key, g.items),
    }));

    const resinGroups = Array.from(byResinGroup.entries()).map(([key, g]) => ({
        key,
        items: g.items,
        tickets: ticketsFor(g.neededTotal),
    }));
    const resinSequence = interleaveByWeight(resinGroups);
    const resinItemsByKey = new Map(resinGroups.map((g) => [g.key, g.items]));

    const schedule = {};
    let resinSlotCounter = 0; // отдельно от dayIndex — см. комментарий ниже
    ALL_DAYS.forEach((day) => {
        const isSunday = day === DAYS.SUNDAY;
        const openDomains = domainGroups.filter((g) => isSunday || g.farmDays.includes(day));
        const cappedDomains = openDomains.slice(0, DOMAIN_DAILY_LIMIT);

        // Домен есть — он и занимает сегодняшний «слот смолы». Домена нет —
        // слот достаётся взвешенной ротации боссов/книг уровня/моры.
        //
        // Важно: индекс в resinSequence двигает ОТДЕЛЬНЫЙ resinSlotCounter,
        // а не календарный индекс дня недели. Если бы использовался
        // календарный индекс, конкретный материал мог бы систематически
        // попадать ровно на те позиции очереди, что приходятся на дни с
        // открытым доменом (а значит — на дни, где слот вообще не
        // расходуется), и просто никогда не показывался бы, независимо от
        // веса. Ровно так когда-то не появлялась мора: её билеты в очереди
        // стояли на позициях 0/3/6, а домен «Свобода» как раз открыт в дни
        // с календарным индексом 0/3/6 (пн/чт/вс) — эти позиции просто
        // никогда не запрашивались.
        let resinPool = [];
        if (cappedDomains.length === 0 && resinSequence.length > 0) {
            const todaysResinKey = resinSequence[resinSlotCounter % resinSequence.length];
            resinPool = resinItemsByKey.get(todaysResinKey) || [];
            resinSlotCounter += 1;
        }

        const todaysSpecialty = specialtyGroups
            .filter((_, i) => SPECIALTY_PATTERNS[i % SPECIALTY_PATTERNS.length].includes(day))
            .flatMap((g) => g.items);

        schedule[day] = {
            domain: cappedDomains.map((g) => g.consolidated),
            domainGroupsOpenCount: openDomains.length,
            resinPool,
            weeklyBoss: day === WEEKLY_BOSS_DAY ? weeklyBossItems : [],
            specialty: todaysSpecialty,
            enemy: enemyItems,
        };
    });

    return schedule;
}

/**
 * Единый плоский список материалов на день — без подзаголовков по
 * категориям (домен идёт одной строкой на группу, дальше — всё остальное
 * запланированное на этот день). Вынесено из компонента, чтобы раскладка
 * дня считалась одинаково everywhere, где отрисовывается расписание.
 */
export function getDayItems(dayData) {
    const d = dayData || {};
    return [
        ...(d.domain || []),
        ...(d.weeklyBoss || []),
        ...(d.resinPool || []),
        ...(d.specialty || []),
        ...(d.enemy || []),
    ];
}

/** Есть ли хоть один нужный материал во всём расписании (для пустого состояния). */
export function isScheduleEmpty(schedule) {
    const day = schedule[DAYS.MONDAY];
    if (!day) return true;
    return day.domain.length === 0
        && day.resinPool.length === 0
        && day.weeklyBoss.length === 0
        && day.specialty.length === 0
        && day.enemy.length === 0;
}
