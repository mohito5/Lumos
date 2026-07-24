
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavigationHighlight from './NavigationHighlight';

import '../assets/styles/header.css'

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
        <div className="nav-top-bar jc-sb">
          <div className="nav-left-area gap-1"></div>
          <section className="language-switcher bg-bl border radius-7 p-1 color-pine">
            <button onClick={() => changeLanguage('ru')} className={`lang-btn bg-bl radius-6 ${i18n.language === 'ru' ? 'active' : ''}`}><p className='m-0'>RU</p></button>
            <button onClick={() => changeLanguage('en')} className={`lang-btn bg-bl radius-6 ${i18n.language === 'en' ? 'active' : ''}`}><p className='m-0'>EN</p></button>
          </section>
          <button
            className={`nav-toggle bg-bl radius-7 p-4 border c-p ${collapsed ? "active" : ""}`}
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle navigation"
          >
            <svg className="icon-mini">
              <use href="#icon-arrow-left"></use>
            </svg>
          </button>
        </div>
        <section className={`nav-links bg-bl border p-1 radius-7 gap-4 ${collapsed ? "collapsed" : ""}`} ref={navLinksRef} style={{ position: 'relative' }}>
          <div className='logo flex pb-6 c-p g-2 ai-c py-4 px-4'>
            <svg className='icon'><use href='#icon-logo'></use></svg>
            <h4>Lumos</h4>
          </div>
          <NavigationHighlight navLinksRef={navLinksRef} />
          <NavLink to="/home" data-page="home" className="nav-item c-bl gap-2 px-4 py-2 flex-r items-center" end>
            <svg className="nav-icon icon" alt={t('navigation.home')}><use href="#icon-home"></use></svg>
            <h6 className="nav-label">{t('navigation.home')}</h6>
          </NavLink>
          <NavLink to="/characters" data-page="characters" className="nav-item c-bl gap-2 px-4 py-2 flex-r items-center">
            <svg className="nav-icon icon m-0" alt={t('navigation.characters')}><use href="#character"></use></svg>
            <h6 className="nav-label m-0">{t('navigation.characters')}</h6>
          </NavLink>
          <NavLink to="/weapons" data-page="weapons" className="nav-item c-bl gap-2 px-4 py-2 flex-r items-center">
            <svg className="nav-icon icon m-0" alt={t('navigation.weapon')}><use href="#icon-weapon"></use></svg>
            <h6 className="nav-label m-0">{t('navigation.weapon')}</h6>
          </NavLink>
          <NavLink to="/date" data-page="date" className="nav-item c-bl gap-2 px-4 py-2 flex-r items-center">
            <svg className="nav-icon icon m-0" alt={t('navigation.date')}><use href="#icon-folder"></use></svg>
            <h6 className="nav-label m-0">{t('navigation.date')}</h6>
          </NavLink>
          <NavLink to="/profile" data-page="profile" className="nav-item profile c-bl gap-2 px-4 py-2 flex-r items-center">
            <svg className="nav-icon icon m-0" alt={t('navigation.profile')}><use href="#icon-profile"></use></svg>
            <h6 className="nav-label m-0">{t('navigation.profile')}</h6>
          </NavLink>
        </section>
      </nav>
    </header>
  );
};

export default Header;
