import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './date.css';
import './styles/accordion.css';

const DatePage = () => {
    const { t } = useTranslation('ui');
    return (
        <div className="page info flex-c gap-4">
            <h1>{t('archive.title', {ns: 'ui'})}</h1>
            
            <section className="archive-cards-container gap-4">
                
                <label className='accordion accordion-main c flex-c gap-2 hover' for='open-1'>
                    <input className='accordion__open' id='open-1' type='radio' name='acoordion-1'/>
                    <input className='accordion__close' id='close-1' type='radio' name='acoordion-1'/>
                    <div className='flex folder-header justify-between'>
                        <div className='border p-4 folder_tab'>
                            <h6>{t('archive.fishing.title')}</h6>
                        </div>
                        <label for="close-1" className='accordion__button border c radius-7 pad-2 flex justify-center items-center'>
                            <svg className='icon'><use href='#icon-close'></use></svg>
                        </label>
                    </div>
                    <div className='accordion__wrapper border p-4 gap-4 flex-c wd'>
                        <div className='flex-c gap-2 wd'>
                            <div className='flex-r gap-6 wd'>
                                <div className='icon-page flex'>
                                    <svg className='i'><use href='#icon-folder'></use></svg>
                                </div>
                                <h3 className='folder_text'>{t('archive.fishing.folder')}</h3>
                            </div>
                            <p className='accordion__text'>Artifacts page with list filter modal info</p>
                        </div>   
                        <Link to="/date/fish">
                            <button className='button radius-4 border px-4'>go</button>
                        </Link> 
                    </div>
                </label>
                
                <label className='accordion accordion-main c f-c g-1 hover' for='open-2'>
                    <input className='accordion__open' id='open-2' type='radio' name='acoordion-2'/>
                    <input className='accordion__close' id='close-2' type='radio' name='acoordion-2'/>
                    <div className='flex folder-header justify-between'>
                        <div className='border p-4 folder_tab'>
                            <h6>{t('archive.creatures.title')}</h6>
                        </div>
                        <label for="close-2" className='accordion__button b c br-4 pad-2 flex justify-center items-center'>
                            <svg className='i'><use href='#icon-close'></use></svg>
                        </label>
                    </div>
                            <div className='accordion__wrapper border p-4 gap-4 flex-c wd'>
                                <div className='flex-c gap-2 wd'>
                                    <div className=' flex-r gap-6 wd'>
                                                    <div className='icon-page flex'>
                                                        <svg className='i'><use href='#icon-folder'></use></svg>
                                                    </div>
                                                    <h3 className='folder_text'>{t('archive.creatures.folder')}</h3>
                                                </div>
                                                <p className='accordion__text'>Artifacts page with list filter modal info</p>
                                </div>
                                
                            <Link to="/date/creatures">
                                <button className='button radius-4 border px-4'>go</button>
                            </Link>
                            
                        </div>
                </label>

                <label className='accordion accordion-main c f-c g-1 hover' for='open-3'>
                        <input className='accordion__open' id='open-3' type='radio' name='acoordion-3'/>
                        <input className='accordion__close' id='close-3' type='radio' name='acoordion-3'/>
                        <div className='flex folder-header justify-between'>
                            <div className='border p-4 folder_tab'>
                                <h6>{t('archive.artifacts.title')}</h6>
                            </div>
                            <label for="close-3" className='accordion__button b c br-4 pad-2 flex justify-center items-center'>
                            
                            <svg className='icon'><use href='#icon-close'></use></svg>
                            </label>
                        </div>
                            <div className='accordion__wrapper border p-4 gap-4 flex-c'>
                                <div className='flex-c gap-2'>
                                    <div className=' flex-r gap-6'>
                                                    <div className='icon-page flex'>
                                                        <svg className='i'><use href='#icon-folder'></use></svg>
                                                    </div>
                                                    <h3>{t('archive.artifacts.folder')}</h3>
                                                </div>
                                                <p className='accordion__text'>Artifacts page with list filter modal info</p>
                                </div>
                                
                            <Link to="/date/artifacts">
                                <button className='button radius-4 border px-4'>go</button>
                            </Link>
                            
                        </div>
                    </label>
            </section>
        </div>
    );
};

export default DatePage;
