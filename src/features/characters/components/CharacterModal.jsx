
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import DitheredLandscape from '../../../components/DitheredLandscape';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';

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
        'character-avatar-container f-c bg-p p-2 br-2 c-bl',
        character.element ? `element-${character.element.toLowerCase()}` : ''
    ].filter(Boolean).join(' ');

    const charImgRef = useRef(null);

    return (
        <div className="overlay modal" onClick={onClose}>
            <div className="modal-content f-c p-2 br-4 bg-dr c-p g-2 out-d" onClick={(e) => e.stopPropagation()}>
                
                <div className={cardClasses}>
                    <div ref={charImgRef} 
                    className="f-c charImg br-1 bg-d" 
                    style={{ position: 'relative', overflow: 'hidden' }}>
                        <button className="close-butt c p-1 br-2 bg-p b" onClick={onClose}>
                    <svg className='i-reg f'><use href='#icon-close'></use></svg>
                </button>
                        
                    <DitheredLandscape />
                        <img loading="lazy" 
                            src={character.avatar || '/images/characters/default.png'} 
                            alt={charName} 
                            style={{ position: 'relative', zIndex: 1 }}
                        />
                    </div>
                    <h2 className='m-1-0'>{charName}</h2>
                    <div className="character-modal-rarity c g-2 f">
                        {Array.from({ length: character.rarity || 1 }).map((_, index) => (
                            <svg className="i c" style={{ width: '4vh',color:'black' }} key={index}><use href="#icon-star"></use></svg>
                        ))}
                    </div>
                </div>
                <div className="modal-buttons-container f-c g-2">
                    <button className="section-btn br-2 f-r c-b ai-c g-2 jc-c b" onClick={() => onMaterialsClick(character)}>
                        <svg className='i-reg c-bl'><use href='#icon-inventory'></use></svg>
                        <p className='m-1-0'>{t('character.allMaterials', { ns: 'ui' })}</p>
                    </button>
                    <button className="section-btn br-2 f-r c-b ai-c g-2 jc-c b" onClick={handleInfoClick}>
                        ℹ️ {t('character.info', { ns: 'ui' })}
                    </button>
                    <button className="section-btn" onClick={handleGuideClick}>
                        📚 {t('character.guide', { ns: 'ui' })}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterModal;
