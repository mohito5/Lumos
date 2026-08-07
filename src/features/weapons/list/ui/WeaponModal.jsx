
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DitheredLandscape from '../../../../shared/ui/DitheredLandscape';
import { useBodyScrollLock } from '../../../../shared/lib/hooks/useBodyScrollLock';

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
            <div className="content-modal flex-c p-3 radius-6 background-bill c-p gap-2 out-d" onClick={(e) => e.stopPropagation()}>
                <div className="weapon-avatar-container flex-c bg-p p-1 radius-3 c-bl gap-2">
                    <div className={`flex-c charImg radius-2 position-r overflow-h rarity-${weapon.rarity}`}>
                        <button className="close-butt c p-1 br-2 bg-p b" onClick={onClose}>
                            <svg className='icon-sm f'><use href='#icon-close-mini'></use></svg>
                        </button>
                        <DitheredLandscape />
                        <img loading="lazy" 
                            src={weapon.icon || '/images/weapons/default.png'} 
                            alt={weaponName} 
                            style={{ position: 'relative', zIndex: 1 , aspectRatio: '16/9'}}
                        />
                    </div>
                    <h2>{weaponName}</h2>
                    <div className="character-modal-rarity flex gap-1 c">
                        {Array.from({ length: weapon.rarity || 1 }).map((_, index) => (
                            <svg className="icon-sm c" key={index}><use href="#icon-star-small"></use></svg>
                        ))}
                    </div>
                </div>
                <div className="modal-buttons-container flex-c gap-2">
                    <button className="section-btn radius-3 f-r c-b ai-c g-2 jc-c border p-1" onClick={() => onMaterialsClick(weapon)}>
                        <svg className='icon-sm c-bl'><use href='#icon-inventory'></use></svg>
                        <p>{t('weapon.allMaterials', { ns: 'ui' })}</p>
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
