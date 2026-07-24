// js-r/src/features/home/components/DailyWeaponMaterialsBlock.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { materialsData } from '../../../data/materials';
import { DAYS, MATERIAL_TYPE } from '../../../app/constants';
import './DailyBooksBlock.css'; // Reusing the same CSS for styling

const DailyWeaponMaterialsBlock = () => {
  const { t } = useTranslation(['ui', 'materials']);
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dayIndex = currentTime.getDay();
    const daysOfWeek = [DAYS.SUNDAY, DAYS.MONDAY, DAYS.TUESDAY, DAYS.WEDNESDAY, DAYS.THURSDAY, DAYS.FRIDAY, DAYS.SATURDAY];
    setCurrentDay(daysOfWeek[dayIndex]);
  }, [currentTime]);

  const materialsByRegionAndFamily = useMemo(() => {
    if (!currentDay) return {};

    const weaponMaterials = materialsData.filter(m => m.type === MATERIAL_TYPE.WEAPON_ENHANCEMENT_MATERIALS && m.farmDays);
    const materialsForDay = weaponMaterials.filter(material => material.farmDays.includes(currentDay));

    return materialsForDay.reduce((acc, material) => {
        const region = material.region;
        const familyGroup = material.group;

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
  }, [currentDay]);

  const getMaterialIcon = (material) => {
    return material.icon;
  };

  const translateGroupName = (groupKey) => {
    return t(`materials:groups.${groupKey}.name`);
  };

  const translateRegionName = (regionKey) => {
    return t(`ui:regions.${regionKey}`);
  };

  return (
    <div className="daily-books-block br-4 b p-2 g-2 f-c"> {/* Reusing CSS class */}
      <div className="daily-books-header"> {/* Reusing CSS class */}
        <p className="current-day c m-0">{t('ui:pages.home.weaponMaterials.todayWeekdays')} : {t(`common.days.${currentDay}`)}</p>
      </div>
      
      <div className="daily-books-content"> {/* Reusing CSS class */}
        {Object.entries(materialsByRegionAndFamily).map(([regionKey, families]) => (
            <div key={regionKey} className="region-container b p-2 br-4">
                <h3 className="region-title m-0 p-1">{translateRegionName(regionKey)}</h3>
                <div className="families-grid">
                    {Object.entries(families).map(([familyKey, materials]) => (
                        <div key={familyKey} className="family-card">
                             <div className="family-name">{translateGroupName(familyKey)}</div>
                             <div className="book-content"> {/* Reusing CSS class */}
                                {materials.map(material => (
                                    <div key={material.id} className="book-item"> {/* Reusing CSS class */}
                                        {material.icon && (
                                            <img loading="lazy" 
                                            src={getMaterialIcon(material)} 
                                            alt={material.id} 
                                            className="book-icon" /* Reusing CSS class */
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
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
        <p className="info-text">
          🎯 {t('ui:weapon_materials.description')}
        </p>
        <p className="info-text">
          ⏰ {t('ui:weapon_materials.reset_time')}
        </p>
      </div>
    </div>
  );
};

export default DailyWeaponMaterialsBlock;
