
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DitheredLandscape from '../../../components/DitheredLandscape';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';

const WeaponModal = ({ weapon, onClose, onMaterialsClick }) => {
    const { t } = useTranslation('weapons');
    const navigate = useNavigate();
    useBodyScrollLock(!!weapon);

    if (!weapon) return null;

    const handleInfoClick = () => {
        navigate(`/weapons/${weapon.id}/info`);
        onClose();
    };

    const handleGuideClick = () => {
        navigate(`/weapons/${weapon.id}/guide`);
        onClose();
    };

    const weaponName = t(`${weapon.id}.name`);

    return (
        <div className="overlay modal" onClick={onClose}>
            <div className="modal-content f-c p-2 br-4 bg-dr c-p g-2 out-d" onClick={(e) => e.stopPropagation()}>
                <div className="weapon-avatar-container f-c bg-p p-2 br-2 c-bl">
                    <div className="f-c charImg br-1 bg-d" style={{ position: 'relative', overflow: 'hidden' }}>
                        <button className="close-butt c p-1 br-2 bg-p b" onClick={onClose}>
                            <svg className='i-reg f'><use href='#icon-close'></use></svg>
                        </button>
                        <DitheredLandscape />
                        <img loading="lazy" 
                            src={weapon.icon || '/images/weapons/default.png'} 
                            alt={weaponName} 
                            style={{ position: 'relative', zIndex: 1 , aspectRatio: '16/9'}}
                        />
                    </div>
                    <h2 className='m-1-0'>{weaponName}</h2>
                    <div className="character-modal-rarity c">
                        {Array.from({ length: weapon.rarity || 1 }).map((_, index) => (
                            <svg className="i c" style={{ width: '4vh',color:'black' }} key={index}><use href="#icon-close"></use></svg>
                        ))}
                    </div>
                </div>
                <div className="modal-buttons-container f-c g-2">
                    <button className="section-btn br-2 f-r c-b ai-c g-2 jc-c b" onClick={() => onMaterialsClick(weapon)}>
                        <svg className='i-reg c-bl'><use href='#icon-inventory'></use></svg>
                        <p className='m-1-0'>{t('weapon.allMaterials', { ns: 'ui' })}</p>
                    </button>
                    <button className="section-btn br-2 f-r c-b ai-c g-2 jc-c b" onClick={handleInfoClick}>
                        ℹ️ {t('weapon.info', { ns: 'ui' })}
                    </button>
                    <button className="section-btn" onClick={handleGuideClick}>
                        📚 {t('weapon.guide', { ns: 'ui' })}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeaponModal;
