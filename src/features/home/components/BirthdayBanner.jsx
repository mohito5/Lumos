import React, { useEffect, useState } from 'react';
import allCharacters from '../../../data/characters/index.js';
import { useTranslation } from 'react-i18next';

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
            <div key={day} className={`day ${isToday ? 'today' : ''} ${hasBirthday ? 'has-birthday' : ''}`}>
                <p>{day}</p>
                {hasBirthday && <span className="birthday-icon border"></span>}
            </div>
        );
    }

    return (
        <div className="mini-calendar border radius-5 g-1 f-c">
            <div className="mini-calendar-nav f-r jc-sb">
                <button className="nav-btn prev" onClick={() => onNavClick('prev')}>&lt;</button>
                <div className="mini-calendar-month"><p className='m-0'>{months[showMonth]} {showYear}</p></div>
                <button className="nav-btn next" onClick={() => onNavClick('next')}>&gt;</button>
            </div>
            <div className="mini-calendar-weekdays border p-1 radius-4">
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

  const birthdayImage = birthdayChars.length > 0 ? birthdayChars[0].avatar : `data:image/svg+xml,${encodeURIComponent('<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="#f8f9fa"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="#666" text-anchor="middle" dy=".3em">No birthdays today</text></svg>')}`;
  const imageAlt = birthdayChars.length > 0 ? t('pages.home.birthdays.imageAlt', { name: characterNames }) : t('pages.home.birthdays.noBirthdayToday');

  return (
    <div className="birthday-banner border radius-7 p-2 gap-4">
      <img loading="lazy" src={birthdayImage} alt={imageAlt} className="banner-image radius-5" />
      <div className="calendar-wrapper jc-sb">
        <div id="birthday-announcement"><h3 className='m-0'>{birthdayAnnouncement}</h3></div>
        <MiniCalendar date={calendarDate} birthdaysThisMonth={birthdaysThisMonth} onNavClick={handleNavClick} />
      </div>
    </div>
  );
};

export default BirthdayBanner;
