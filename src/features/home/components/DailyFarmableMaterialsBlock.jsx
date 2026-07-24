// js-r/src/features/home/components/DailyFarmableMaterialsBlock.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { materialsData } from '../../../data/materials';
import { MATERIAL_GROUP, MATERIAL_TYPE } from '../../../app/constants';
import { getGameDay } from '../../../core/utils/gameDay';
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

  return (
    <div className="daily-materials-block br-4 b p-2 g-2 f-c">
        <div className="daily-materials-header">
            <p className="current-day c m-0">{t(titleKey)} : {t(`days.${currentDay}`)}</p>
            <div className="view-switcher">
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
      
      <div className="daily-materials-content">
        {Object.entries(materialsByRegionAndFamily).map(([regionKey, families]) => (
            <div key={regionKey} className="region-container b p-2 br-4">
                <h3 className="region-title m-0 p-1">{translateRegionName(regionKey)}</h3>
                <div className="families-grid">
                    {Object.entries(families).map(([familyKey, materials]) => (
                        <div key={familyKey} className="family-card">
                             <div className="family-name">{translateGroupName(familyKey)}</div>
                             <div className="materials-content f">
                                {materials.map(material => (
                                    <div key={material.id} className="material-item">
                                        {material.icon && (
                                            <img loading="lazy" 
                                            src={getMaterialIcon(material)} 
                                            alt={material.id} 
                                            className="material-icon"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                    </div>
                                ))}
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>

      <div className="additional-info">
        <p className="info-text">🎯 {t(descriptionKey)}</p>
        <p className="info-text">⏰ {t(resetTimeKey)}</p>
      </div>
    </div>
  );
};

export default DailyFarmableMaterialsBlock;
