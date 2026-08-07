import React, { useEffect, useState } from 'react';
import allCharacters from '../../../data/characters/index.js';
import { useTranslation } from 'react-i18next';
import DitheredLandscape from '../../../shared/ui/DitheredLandscape.jsx';

const MiniCalendar = ({ date, birthdaysThisMonth, onNavClick }) => {
    const { t, ready } = useTranslation(['ui']);

    if (!ready) {
        return null;
    }

    const showMonth = date.getMonth();
    const showYear = date.getFullYear();

    const months = t('ui:home.birthdays.calendar.months', { returnObjects: true });
    const weekdays = t('ui:home.birthdays.calendar.weekdays', { returnObjects: true });

    if (!Array.isArray(months) || !Array.isArray(weekdays) || months.length === 0 || weekdays.length === 0) {
        console.error("Calendar translations are missing or not in the correct format.");
        return <div>{t('pages.home.birthdays.calendarError')}</div>;
    }
    
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const daysInMonth = new Date(showYear, showMonth + 1, 0).getDate();
    const firstDayWeekday = new Date(showYear, showMonth, 1).getDay();
    const offset = (firstDayWeekday === 0) ? 6 : firstDayWeekday - 1;

    const days = [];
    for (let i = 0; i < offset; i++) {
        days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = (day === currentDay && showMonth === currentMonth && showYear === currentYear);
        const hasBirthday = birthdaysThisMonth[day];
        days.push(
            <div key={day} className={`day radius-1 ${isToday ? 'today background-r color-r' : ''} ${hasBirthday ? 'has-birthday border color-cherry' : ''}`}>
                <span>{day}</span>
                {hasBirthday && <span className="birthday-icon color-cherry border"></span>}
            </div>
        );
    }

    return (
        <div className="mini-calendar border radius-1 p-1 gap-1 f-c">
            <div className="mini-calendar-nav f-r jc-sb">
                <button className="nav-btn flex p-1 border prev background-r color-r radius-1" onClick={() => onNavClick('prev')}>
                    <svg className='icon-mini'><use href='#icon-arrow-left'></use></svg>
                </button>
                <div className="mini-calendar-month"><p>{months[showMonth]} {showYear}</p></div>
                <button className="nav-btn next" onClick={() => onNavClick('next')}>&gt;</button>
            </div>
            <div className="mini-calendar-weekdays border radius-1 background-r color-r">
                {weekdays.map(day => <div key={day} className="weekday"><p>{day}</p></div>)}
            </div>
            <div className="mini-calendar-days">
                {days}
            </div>
        </div>
    );
};


const BirthdayBanner = () => {
  const { t } = useTranslation(['ui', 'characters']);
  const [birthdayChars, setBirthdayChars] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const todayStr = `${today.getMonth() + 1}-${today.getDate()}`;
    const charsWithBirthday = allCharacters.filter(char => char.birthday === todayStr);
    setBirthdayChars(charsWithBirthday);
  }, []);

  const birthdaysThisMonth = {};
  allCharacters.forEach(char => {
      if (char.birthday) {
          const [m, d] = char.birthday.split('-').map(Number);
          if (m - 1 === calendarDate.getMonth()) {
              birthdaysThisMonth[d] = t(char.id, { ns: 'characters' });
          }
      }
  });

  const handleNavClick = (direction) => {
    setCalendarDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
        return newDate;
    });
  };

  const characterNames = birthdayChars.map(c => t(c.id, { ns: 'characters' })).join(', ');

  const birthdayAnnouncement = birthdayChars.length > 0
    ? t('pages.home.birthdays.announcementFormat', { name: characterNames })
    : t('pages.home.birthdays.noBirthdayToday');

  const birthdayImage = birthdayChars.length > 0 ? birthdayChars[0].avatar : t('pages.home.birthdays.noBirthdayToday');
  const imageAlt = birthdayChars.length > 0 ? t('pages.home.birthdays.imageAlt', { name: characterNames }) : t('pages.home.birthdays.noBirthdayToday');

  return (
    <div className="birthday-banner border radius-4 p-3 gap-4">
        <div className='border position-r radius-1 banner overflow-h'>
            <img loading="lazy" src={birthdayImage} alt={imageAlt} className="banner-image radius-1" />
            <DitheredLandscape className='dither-banner'/>
        </div>
      <div className="calendar-wrapper jc-sb">
        <div id="birthday-announcement"><h3>{birthdayAnnouncement}</h3></div>
        <MiniCalendar date={calendarDate} birthdaysThisMonth={birthdaysThisMonth} onNavClick={handleNavClick} />
      </div>
    </div>
  );
};

export default BirthdayBanner;
