import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ui/date.css';
import '../../core/styles/components/accordion.css';

const DatePage = () => {
    const { t } = useTranslation('ui');
    return (
        <div className="page info flex-c gap-2">
            <h1>{t('ui:archive.title')}</h1>
            
            <section className="info-card-container gap-2 flex">
                <label className='accordion accordion-main color flex-c gap-1 hover' htmlFor='open-1'>
                    <input className='accordion__open border' id='open-1' type='radio' name='acoordion-1'/>
                    <input className='accordion__close border' id='close-1' type='radio' name='acoordion-1'/>
                    <div className='justify-between flex folder_tab'>
                        <h6 className='border p-1 px-2'>{t('ui:archive.fishing.title')}</h6>
                        <label htmlFor="close-1" className='accordion__button border items-center color radius-4 p-1 px-2 gap-1 flex-r'>
                            <span className='accordion__buttonText'>{t('ui:button.close')}</span>
                            <svg className='icon-sm'><use href='#icon-close-mini'></use></svg>
                        </label>
                    </div>
                    <div className='accordion__wrapper border p-2'>
                        <dl className='accordion__box'>
                            <div className='flex-r gap-2'>
                                <div className='icon-page flex'>
                                    <svg className='icon'><use href='#icon-folder'></use></svg>
                                </div>
                                <h3>{t('ui:archive.fishing.sub')}</h3>
                            </div>
                            <p className='accordion__text'>{t('ui:archive.fishing.desc')}</p>
                        </dl>
                        <Link to="/date/fish" className="date-card-link">
                        <button className='radius-2 p-1 px-4 border'>{t('ui:button.open')}</button>
                    </Link>
                    </div>
                </label>
                
                
                <label className='accordion accordion-main color flex-c gap-1 hover' htmlFor='open-2'>
                    <input className='accordion__open border' id='open-2' type='radio' name='acoordion-2'/>
                    <input className='accordion__close border' id='close-2' type='radio' name='acoordion-2'/>
                    <div className='justify-between flex folder_tab'>
                        <h6 className='border p-1 px-2'>{t('ui:archive.creatures.title')}</h6>
                        <label htmlFor="close-2" className='accordion__button border items-center color radius-4 p-1 px-2 gap-1 flex-r'>
                            <span className='accordion__buttonText'>{t('ui:button.close')}</span>
                            <svg className='icon-sm'><use href='#icon-close-mini'></use></svg>
                        </label>
                    </div>
                    <div className='accordion__wrapper border p-2'>
                        <dl className='accordion__box'>
                            <div className='flex-r gap-2'>
                                <div className='icon-page flex'>
                                    <svg className='icon'><use href='#icon-folder'></use></svg>
                                </div>
                                <h3>{t('ui:archive.creatures.sub')}</h3>
                            </div>
                            <p className='accordion__text'>{t('ui:archive.creatures.desc')}</p>
                        </dl>
                        <Link to="/date/creatures" className="date-card-link">
                        <button className='radius-2 p-1 px-4 border'>{t('ui:button.open')}</button>
                    </Link>
                    </div>
                </label>

                <label className='accordion accordion-main color flex-c gap-1 hover' htmlFor='open-3'>
                    <input className='accordion__open border' id='open-3' type='radio' name='acoordion-3'/>
                    <input className='accordion__close border' id='close-3' type='radio' name='acoordion-3'/>
                    <div className='justify-between flex folder_tab'>
                        <h6 className='border p-1 px-2'>{t('ui:archive.artifacts.title')}</h6>
                        <label htmlFor="close-3" className='accordion__button border items-center color radius-4 p-1 px-2 gap-1 flex-r'>
                            <span className='accordion__buttonText'>{t('ui:button.close')}</span>
                            <svg className='icon-sm'><use href='#icon-close-mini'></use></svg>
                        </label>
                    </div>
                    <div className='accordion__wrapper border p-2'>
                        <dl className='accordion__box'>
                            <div className='flex-r gap-2'>
                                <div className='icon-page flex'>
                                    <svg className='icon'><use href='#icon-folder'></use></svg>
                                </div>
                                <h3>{t('ui:archive.artifacts.sub')}</h3>
                            </div>
                            <p className='accordion__text'>{t('ui:archive.artifacts.desc')}</p>
                        </dl>
                        <Link to="/date/artifacts" className="date-card-link">
                        <button className='radius-2 p-1 px-4 border'>{t('ui:button.open')}</button>
                    </Link>
                    </div>
                </label>
            </section>
        </div>
    );
};

export default DatePage;
