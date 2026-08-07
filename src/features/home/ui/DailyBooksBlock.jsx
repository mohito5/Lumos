// js-r/src/features/home/components/DailyBooksBlock.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { materialsData } from '../../../data/materials';
import { DAYS, MATERIAL_GROUP } from '../../../shared/config/constants';
import './DailyBooksBlock.css';

const DailyBooksBlock = () => {
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

  const booksByRegionAndFamily = useMemo(() => {
    if (!currentDay) return {};

    const books = materialsData.filter(m => m.group && m.group.includes(MATERIAL_GROUP.TALENT_BOOKS) && m.farmDays);
    const booksForDay = books.filter(book => book.farmDays.includes(currentDay));

    return booksForDay.reduce((acc, book) => {
        const region = book.region;
        const familyGroup = book.group.find(g => g.startsWith('books_'));

        if (region && familyGroup) {
            if (!acc[region]) {
                acc[region] = {};
            }
            if (!acc[region][familyGroup]) {
                acc[region][familyGroup] = [];
            }
            acc[region][familyGroup].push(book);
        }

        return acc;
    }, {});
  }, [currentDay]);

  const getBookIcon = (book) => {
    return book.icon;
  };

  const translateGroupName = (groupKey) => {
    return t(`materials:groups.${groupKey}.name`);
  };

  const translateRegionName = (regionKey) => {
    return t(`ui:regions.${regionKey}`);
  };

  return (
    <div className="daily-books-block br-4 b p-2 g-2 f-c">
      <div className="daily-books-header">
        <p className="current-day c m-0">{t('ui:pages.home.talentBooks.todayWeekdays')} : {t(`common.days.${currentDay}`)}</p>
      </div>
      
      <div className="daily-books-content">
        {Object.entries(booksByRegionAndFamily).map(([regionKey, families]) => (
            <div key={regionKey} className="region-container b p-2 br-4">
                <h3 className="region-title m-0 p-1">{translateRegionName(regionKey)}</h3>
                <div className="families-grid">
                    {Object.entries(families).map(([familyKey, books]) => (
                        <div key={familyKey} className="family-card">
                             <div className="family-name">{translateGroupName(familyKey)}</div>
                             <div className="book-content">
                                {books.map(book => (
                                    <div key={book.id} className="book-item">
                                        {book.icon && (
                                            <img loading="lazy" 
                                            src={getBookIcon(book)} 
                                            alt={book.id} 
                                            className="book-icon"
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
          🎯 {t('ui:talent_books.description')}
        </p>
        <p className="info-text">
          ⏰ {t('ui:talent_books.reset_time')}
        </p>
      </div>
    </div>
  );
};

export default DailyBooksBlock;
