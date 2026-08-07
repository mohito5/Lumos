
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavigationHighlight from './NavigationHighlight';

import './header.css';


const Header = () => {
  const { t, i18n } = useTranslation();
  const navLinksRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <nav className="main-nav gap-1">
        <div className="nav-top-bar jc-sb gap-1">
          <div className="nav-left-area gap-1"></div>
          <section className="language-switcher bg-bl border radius-4 p-1 color-pine">
            <button onClick={() => changeLanguage('ru')} className={`lang-btn bg-bl radius-3 p-1 ${i18n.language === 'ru' ? 'active' : ''}`}>RU</button>
            <button onClick={() => changeLanguage('en')} className={`lang-btn bg-bl color-pine radius-3 p-1 ${i18n.language === 'en' ? 'active' : ''}`}>EN</button>
          
          </section>
          <button
            className={`nav-toggle bg-bl radius-4 p-2 border c-p ${collapsed ? "active" : ""}`}
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle navigation"
          >
            <svg className="icon-mini">
              <use href="#icon-arrow-left"></use>
            </svg>
          </button>
        </div>
        <section className={`nav-links bg-bl border p-1 radius-4 gap-4 ${collapsed ? "collapsed" : ""}`} ref={navLinksRef} style={{ position: 'relative' }}>
          <div className='logo flex-r c-p gap-2 ai-c py-2 px-2 border-b mb-2'>
            <svg className='icon mb-2'><use href='#icon-logo'></use></svg>
            <h5>Lumos</h5>
          </div>
          <NavigationHighlight navLinksRef={navLinksRef} />
          <NavLink to="/home" data-page="home" className="nav-item c-bl gap-2" end>
            <svg className="nav-icon icon" alt={t('navigation.home')}><use href="#icon-home"></use></svg>
            <span className="nav-label">{t('navigation.home')}</span>
          </NavLink>
          <NavLink to="/characters" data-page="characters" className="nav-item gap-2 c-bl gap-2">
            <svg className="nav-icon icon" alt={t('navigation.characters')}><use href="#character"></use></svg>
            <span className="nav-label m-0">{t('navigation.characters')}</span>
          </NavLink>
          <NavLink to="/weapons" data-page="weapons" className="nav-item c-bl gap-2">
            <svg className="nav-icon icon" alt={t('navigation.weapon')}><use href="#icon-weapon"></use></svg>
            <span className="nav-label">{t('navigation.weapon')}</span>
          </NavLink>
          <NavLink to="/date" data-page="date" className="nav-item c-bl gap-2">
            <svg className="nav-icon icon" alt={t('navigation.date')}><use href="#icon-folder"></use></svg>
            <span className="nav-label">{t('navigation.date')}</span>
          </NavLink>
          <NavLink to="/profile" data-page="profile" className="nav-item c-bl gap-2">
            <svg className="nav-icon icon" alt={t('navigation.profile')}><use href="#icon-profile"></use></svg>
            <span className="nav-label">{t('navigation.profile')}</span>
          </NavLink>
        </section>
      </nav>
    </header>
  );
};

export default Header;
