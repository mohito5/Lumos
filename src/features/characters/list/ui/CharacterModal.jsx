
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DitheredLandscape from '../../../../shared/ui/DitheredLandscape';
import { useBodyScrollLock } from '../../../../shared/lib/hooks/useBodyScrollLock';

const CharacterModal = ({ character, onClose, onMaterialsClick }) => {
    const { t } = useTranslation('characters');
    const navigate = useNavigate();
    useBodyScrollLock(!!character);

    if (!character) return null;

    const handleInfoClick = () => {
        navigate(`/characters/${character.id}/info`);
        onClose();
    };

    const handleGuideClick = () => {
        navigate(`/characters/${character.id}/guide`);
        onClose();
    };

    const charName = t(`${character.id}.name`);
    const cardClasses = [
        'character-avatar-container flex-c bg-p p-1 radius-3 c-bl gap-4',
        character.element ? `element-${character.element.toLowerCase()}` : ''
    ].filter(Boolean).join(' ');

    const charImgRef = useRef(null);

    return (
        <div className="overlay modal" onClick={onClose}>
            <div className="content-modal flex-c p-3 radius-6 background-bill color-pine gap-2" onClick={(e) => e.stopPropagation()}>
                
                <div className={cardClasses}>
                    <div ref={charImgRef} 
                        className={`flex-c charImg radius-2 vision-${character.element}`} 
                        style={{ position: 'relative', overflow: 'hidden' }}
                        >
                        <button className="close-butt flex color-r p-1 radius-1 bg-p border" onClick={onClose}>
                            <svg className='icon-mini'><use href='#icon-close-mini'></use></svg>
                        </button>
                        
                        <DitheredLandscape />
                        <img loading="lazy" 
                            src={character.avatar || '/images/characters/default.png'} 
                            alt={charName} 
                            style={{ position: 'relative', zIndex: 1 }}
                        />
                    </div>
                    <h2>{charName}</h2>
                    <div className="character-modal-rarity c g-2 f">
                        {Array.from({ length: character.rarity || 1 }).map((_, index) => (
                            <svg className="icon-sm c" style={{ width: '4vh',color:'black' }} key={index}><use href="#icon-star"></use></svg>
                        ))}
                    </div>
                </div>
                <div className="modal-buttons-container flex-c gap-2">
                    <button className="section-btn radius-2 p-1 px-8 f-r c-b ai-c g-2 jc-c b" onClick={() => onMaterialsClick(character)}>
                        <svg className='icon c-bl'><use href='#icon-inventory'></use></svg>
                        <p>{t('character.allMaterials', { ns: 'ui' })}</p>
                    </button>
                    <button className="section-btn br-2 p-1 px-4 f-r c-b ai-c g-2 jc-c b" onClick={handleInfoClick}>
                        ℹ️ {t('character.info', { ns: 'ui' })}
                    </button>
                    <button className="section-btn p-1" onClick={handleGuideClick}>
                        📚 {t('character.guide', { ns: 'ui' })}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterModal;
