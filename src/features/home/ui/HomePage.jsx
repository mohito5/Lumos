import React from 'react';
import ServerTimer from './ServerTimer';
import BirthdayBanner from './BirthdayBanner';
import DailyBooksBlock from './DailyBooksBlock';
import DailyWeaponMaterialsBlock from './DailyWeaponMaterialsBlock';
import DailyFarmableMaterialsBlock from './DailyFarmableMaterialsBlock';
import { useTranslation } from 'react-i18next';
import MasonryGrid from '../../../shared/ui/Masonry';
import FarmingScheduleWidget from './FarmingScheduleWidget';

import './home.css';

const HomePage = () => {
  const { t } = useTranslation('ui');

  return (
    <section>
      <MasonryGrid>
        <article className="grid-item">
          <div className="title flex-c gap-4">
            <h1>{t('ui:home.title')}</h1>
            <p>{t('ui:home.description')}</p>
          </div>
        </article>
        <article className="grid-item flex-c gap-4">
          <h2>{t('ui:home.birthdays.title')}</h2>
          <BirthdayBanner />
        </article>
        <article className="grid-item" column={2}>
          < ServerTimer />
        </article>
      
        {/* Добавляем блок с книгами талантов */}
        <article className='grid-item'>
          <DailyFarmableMaterialsBlock/>
        </article>

        <article className="grid-item" column={2}>
            <FarmingScheduleWidget />
        </article>
      </MasonryGrid>
    </section>
  );
};

export default HomePage;