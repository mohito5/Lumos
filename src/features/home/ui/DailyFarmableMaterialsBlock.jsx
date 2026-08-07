// js-r/src/features/home/components/DailyFarmableMaterialsBlock.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { materialsData } from '../../../data/materials';
import { MATERIAL_GROUP, MATERIAL_TYPE, RARITY } from '../../../shared/config/constants';
import { getGameDay } from '../../../shared/lib/gameDay';
import './DailyFarmableMaterialsBlock.css';

const VIEW_TYPE = {
    BOOKS: 'books',
    WEAPONS: 'weapons'
};

const DailyFarmableMaterialsBlock = () => {
  const { t } = useTranslation(['ui', 'materials']);
  const [currentDay, setCurrentDay] = useState(() => getGameDay());
  const [selectedView, setSelectedView] = useState(VIEW_TYPE.BOOKS);

  useEffect(() => {
    // Игровой день переключается в 04:00 (сброс сервера), а не в
    // календарную полночь — см. core/utils/gameDay.js. Раньше здесь
    // использовался currentTime.getDay() напрямую, поэтому с 00:00 до
    // 04:00 блок уже показывал материалы «следующего» дня недели, хотя
    // в игре ещё не наступил сброс. 30-секундный опрос (а не только
    // разовый расчёт при монтировании) оставлен специально: чтобы блок
    // сам обновился, если его держат открытым через момент сброса.
    const timer = setInterval(() => {
      setCurrentDay(getGameDay());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const materialsByRegionAndFamily = useMemo(() => {
    if (!currentDay) return {};

    const isBooksView = selectedView === VIEW_TYPE.BOOKS;

    const filteredMaterials = materialsData.filter(m => {
        const typeMatch = isBooksView
            ? m.group && m.group.includes(MATERIAL_GROUP.TALENT_BOOKS)
            : m.type === MATERIAL_TYPE.WEAPON_ENHANCEMENT_MATERIALS;
        return typeMatch && m.farmDays && m.farmDays.includes(currentDay);
    });

    return filteredMaterials.reduce((acc, material) => {
        const region = material.region;
        const familyGroup = isBooksView
            ? material.group.find(g => g.startsWith('books_'))
            : material.group;

        if (region && familyGroup) {
            if (!acc[region]) {
                acc[region] = {};
            }
            if (!acc[region][familyGroup]) {
                acc[region][familyGroup] = [];
            }
            acc[region][familyGroup].push(material);
        }

        return acc;
    }, {});
  }, [currentDay, selectedView]);

  const materialsByTypeGroup = (material) => {
    const rarity = material.rarity;
    const teaching = rarity === RARITY.UNCOMMON && material.group.includes(MATERIAL_GROUP.TALENT_BOOKS);
    const guide = rarity === RARITY.RARE && material.group.includes(MATERIAL_GROUP.TALENT_BOOKS); 
    const philosophies = rarity === RARITY.EPIC && material.group.includes(MATERIAL_GROUP.TALENT_BOOKS);  
    if ( teaching === true){
        const teachingName = 'ui:talent_books.teaching';
    } else if ( guide === true ) {
        const guideName = 'ui:talent_books.guide';
    } else if ( philosophies === true ) {
        const philosophiesName = 'ui:talent_books.philosophies';
    };
  };

  const getMaterialIcon = (material) => material.icon;
  // ПРИМЕЧАНИЕ: namespace 'materials' (src/i18n/materials/**) хранит переводы
  // по id материала и не содержит ветку groups.* вообще — то есть человекочитаемых
  // названий доменов/семей («Свобода», «Стойкость» и т.д.) сейчас просто нет
  // ни на одном языке. Это отдельный пробел с контентом, а не связанный с
  // расчётом дня баг, поэтому здесь только graceful fallback на сырой ключ
  // группы, чтобы вместо пустой строки было видно хоть что-то осмысленное.
  const translateGroupName = (groupKey) => t(`materials:groups.${groupKey}.name`, { defaultValue: groupKey });
  const translateRegionName = (regionKey) => t(`ui:region.${regionKey}`);

  const titleKey = selectedView === VIEW_TYPE.BOOKS ? 'ui:pages.home.talentBooks.todayWeekdays' : 'ui:pages.home.weaponMaterials.todayWeekdays';
  const descriptionKey = selectedView === VIEW_TYPE.BOOKS ? 'ui:talent_books.description' : 'ui:weapon_materials.description';
  const resetTimeKey = selectedView === VIEW_TYPE.BOOKS ? 'ui:talent_books.reset_time' : 'ui:talent_books.reset_time';

  const titleHeadline = selectedView === VIEW_TYPE.BOOKS ? 'ui:home.talentBooks.title' : 'ui:home.dailyFarmableMaterials.weaponMaterials';

  return (
    <section className='flex-c gap-4'>
        <h2>{t(titleHeadline)}</h2>
        <div className="daily-materials-block radius-4 border p-3 gap-2 flex-c">
            <div className=" gap-2 flec-c">
                <p className="current-day">{t(titleKey)} : {t(`days.${currentDay}`)}</p>
                <div className="view-switcher gap-2 flex">
                    <label>
                        <input type="radio" name="material-type" value={VIEW_TYPE.BOOKS} checked={selectedView === VIEW_TYPE.BOOKS} onChange={() => setSelectedView(VIEW_TYPE.BOOKS)} />
                        {t('ui:pages.home.common.talentBooks')}
                    </label>
                    <label>
                        <input type="radio" name="material-type" value={VIEW_TYPE.WEAPONS} checked={selectedView === VIEW_TYPE.WEAPONS} onChange={() => setSelectedView(VIEW_TYPE.WEAPONS)} />
                        {t('ui:pages.home.common.weaponMaterials')}
                    </label>
                </div>
            </div>
      
      <div className="daily-materials-content flex-c gap-2">
        {Object.entries(materialsByRegionAndFamily).map(([regionKey, families]) => (
            <div key={regionKey} className="region-container gap-2 flex-c">
                <h3 className="region-title background-r color-r p-1 radius-1">{translateRegionName(regionKey)}</h3>
                <div className="families-grid">
                    {Object.entries(families).map(([familyKey, materials]) => (
                        <div key={familyKey} className="family-card flex-c gap-2">
                            <h4 className="family-name">{translateGroupName(familyKey)}</h4>
                            <div className="cards-container flex gap-1">
                                {materials.map(material => (
                                    <div key={material.id} className="material-item p-1 gap-1 flex-c border radius-4">
                                        {material.icon && (
                                            <img loading="lazy" 
                                            src={getMaterialIcon(material)} 
                                            alt={material.id} 
                                            className={`material-icon radius-3 rarity-${material.rarity}`}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                        <span className='border background-r color-r radius-3 p-1'>{t(`${material.id}.name`,{ ns: 'materials', defaultValue: t('common:unknown_talent_name')} )}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>

      <div className="additional-info border radius-md">
        <p className="info-text">🎯 {t(descriptionKey)}</p>
        <p className="info-text">⏰ {t(resetTimeKey)}</p>
      </div>
    </div>
    </section>
  );
};

export default DailyFarmableMaterialsBlock;
