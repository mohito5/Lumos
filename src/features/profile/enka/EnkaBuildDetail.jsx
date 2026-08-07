import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import { getStatDisplayName } from '../../../shared/lib/calculatorUtils.js';
import { StatIcon } from './statIcons.jsx';
import { resolveIconUrl } from '../../../shared/lib/cdnIcon.js';
import characterIcons from '../../../data/cdn/characterIcons.generated.json';
import './EnkaBuildDetail.css';

import './css/EnkaCard.css';

// ⚠️ public/assets/avatar/ и public/assets/avatar-icon/ НЕ СУЩЕСТВУЮТ в
// проекте вообще (0 файлов) — character.avatar/avatar_icon ("assets/avatar/
// ayato.png" и т.п.) ссылаются на файлы, которых физически нет, ни у одного
// персонажа кроме 2 (anemo.js/electro.js — там есть avatar_enka, у
// остальных 70+ его нет). Отсюда и падение toPng() ниже: html-to-image не
// может захватить DOM с <img> в состоянии error. onErrorHide ниже прячет
// такую картинку ДО захвата вместо краша всего экспорта — временная мера,
// пока не заполнен src/data/cdn/characterIcons.generated.json (см. README
// там же и scripts/fetch-enka-icon-map.js).
const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7';
const onErrorHide = (e) => {
    e.currentTarget.onerror = null; // защита от зацикливания, если и data: URI вдруг не отрисуется
    e.currentTarget.src = TRANSPARENT_PIXEL;
    e.currentTarget.style.visibility = 'hidden';
};

// Подпись слота нужна только для ПУСТОГО слота ("не экипировано") — у
// заполненного артефакта она скрыта по просьбе, см. ArtifactCard ниже.
const SLOT_LABELS = {
    flower: 'Цветок',
    plume: 'Перо',
    sands: 'Часы',
    goblet: 'Кубок',
    circlet: 'Корона',
};

const TALENT_KEYS = ['attack', 'skill', 'burst'];

const StatRow = ({ type, value, isPercent }) => (
    <div className="enka-stat-row b p-1">
        <StatIcon type={type} className="enka-stat-icon" title={getStatDisplayName(type)} />
        <span className="enka-stat-value">{value}{isPercent ? '%' : ''}</span>
    </div>
);

const isPercentStat = (statKey) => typeof statKey === 'string' && statKey.endsWith('%');

const WeaponBlock = ({ weaponInfo }) => {
    if (!weaponInfo) return null;
    const { weapon, level, ascension, refinement, rarity, baseAtk, subStat, enkaItemId, icon } = weaponInfo;
    const iconSrc = (icon ? `https://enka.network/ui/${icon}.png` : null) ?? weapon?.icon;

    return (
        <div className="enka-detail-block c">
            <div className="enka-detail-card c">
                <div className="enka-detail-card-body">
                    <h2 className="enka-detail-name weapon-name c-r bg-r">
                        {weapon?.id ?? `не сопоставлено (enkaId ${enkaItemId})`}
                    </h2>
                    <div className="enka-detail-meta c">
                        <span className="enka-refine-badge c">Р{refinement + 1}</span>
                        Ур. {level} · Возвышение {ascension} · {'★'.repeat(rarity || 0)}
                    </div>
                    {baseAtk && <StatRow type="atk" value={baseAtk.value} />}
                    {subStat && <StatRow type={subStat.type} value={subStat.value} isPercent={isPercentStat(subStat.type)} />}
                </div>
                <div className='weapon-icon ov-h bg-r'>
                    {iconSrc && <img loading="lazy" src={iconSrc} alt={weapon?.id ?? 'weapon'} className="enka-detail-icon" onError={onErrorHide} />}
                </div>
            </div>
        </div>
    );
};

const ArtifactCard = ({ slot, artifact }) => {
    if (!artifact) {
        return (
            <div className="enka-artifact-card enka-artifact-empty">
                <span className="enka-slot-label">{SLOT_LABELS[slot]}</span>
                <span className="enka-empty-text">не экипировано</span>
            </div>
        );
    }

    const { rarity, level, mainStat, mainStatValue, substats } = artifact;
    // artifact.set / artifact.setName / artifact.enkaSetId намеренно не
    // деструктурируем и не выводим — см. комментарий у названия сета ниже.

    return (
        <div className="enka-artifact-card b">
            <div className="enka-artifact-header">
                {/* Подпись слота ("Цветок"/"Перо"/...) скрыта по просьбе — тип
                    и так понятен по позиции в сетке и иконке набора. */}
                <span className="enka-artifact-level">+{level}</span>
            </div>
            <div className="enka-artifact-set-name">
                {artifact.icon && <img loading="lazy" src={`https://enka.network/ui/${artifact.icon}.png`} alt={slot} className='i bg-bl' onError={onErrorHide} />}
                {/* Название сета скрыто по просьбе — сюда добавляется
                    сопоставление enkaSetId -> нужный id сета в свои данные.
                    artifact.enkaSetId доступен в объекте, просто не выводится:
                    {set ?? (setName ? `${setName} (не сопоставлено, enkaId ${enkaSetId})` : `не сопоставлено (enkaId ${enkaSetId})`)} */}
            </div>
            <div className="enka-artifact-rarity b bg-bl p-1 f-c">
                {Array.from({ length: artifact?.rarity || 0 }).map((_, i) => (
                                <svg key={i} className=" rarity-star"><use href="#icon-star-small"></use></svg>
                            ))}
            </div>
            {mainStat && (
                <div className="enka-stat-row enka-stat-main">
                    <StatIcon type={mainStat} className="enka-stat-icon" title={getStatDisplayName(mainStat)} />
                    <span className="enka-stat-value">{mainStatValue}{isPercentStat(mainStat) ? '%' : ''}</span>
                </div>
            )}
            <div className="enka-substats">
                {substats.map((s, i) => (
                    <StatRow key={i} type={s.type} value={s.value} isPercent={isPercentStat(s.type)} />
                ))}
            </div>
        </div>
    );
};

/**
 * Полная детальная панель выбранного персонажа — оружие + все 5 слотов
 * артефактов, в уже сопоставленном (enkaId -> внутренний id) и разобранном
 * (mainStat/substats как type+value) виде. Это готовые к использованию
 * калькулятором данные, не просто "общие значения характеристик".
 *
 * Карточка (top) + кнопка "Скачать PNG" (bottom) — единый блок, который
 * рендерится внутри EnkaCharacterAccordion для активной панели.
 */
const EnkaBuildDetail = ({ build }) => {
    const { t } = useTranslation('characters');
    const cardRef = useRef(null);
    if (!build) return null;

    const {
        character, level, ascension, constellationCount, friendshipLevel,
        weapon, artifacts, enkaAvatarId, talents, constIcons, finalStats,
    } = build;
    const charName = character ? t(`${character.id}.name`) : `не сопоставлено (enkaId ${enkaAvatarId})`;
    const portraitLocal = character?.avatar_enka ?? character?.avatar;
    const portrait = character ? resolveIconUrl({ enkaIconMap: characterIcons }, character.id, portraitLocal) : null;

    const handleDownload = () => {
        if (!cardRef.current) return;
        toPng(cardRef.current, { cacheBust: true, quality: 1.0, pixelRatio: 2 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${character?.id ?? enkaAvatarId}-build.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('Не удалось создать изображение билда', err);
            });
    };

    return (
        <div className="enka-build-detail-wrapper">
            <div ref={cardRef} className="enka-build-detail enka-card b br-4">
                <div className={`background background-${character.element}`}></div>
                <svg className='star '><use href='#icon-star-big'></use></svg>
                <svg className={`star2 background-${character.element}`}><use href='#icon-star-big'></use></svg>
                <article className='left'>
                    <div className='banner'>
                        <div className='character-banner wd ov-h'>
                            <img src={portrait} className="character-img" loading="lazy" onError={onErrorHide} />
                            <img src={portrait} className="character-back" loading="lazy" onError={onErrorHide} />
                            <div className={`char-back vision-${character.element}`}></div>
                        </div>
                        <div className='p-1 bg-bl f-c c-r rarity'>
                            {Array.from({ length: character?.rarity || 0 }).map((_, i) => (
                                <svg key={i} className="rarity-star"><use href="#icon-star-mini"></use></svg>
                            ))}
                        </div>
                        <div className='const b p-1'>
                            {/* созвездия: 6 блоков, иконка + is-active если созвездие открыто */}
                            {[0, 1, 2, 3, 4, 5].map((i) => {
                                const iconName = constIcons?.[i];
                                const isActive = i < constellationCount;
                                return (
                                    <div key={i} className={`const-item${isActive ? ' is-active' : ''}`}>
                                        {iconName ? (
                                            <img
                                                src={`https://enka.network/ui/${iconName}.png`}
                                                alt={`C${i + 1}`}
                                                className="const-icon"
                                                loading="lazy"
                                                onError={onErrorHide}
                                            />
                                        ) : (
                                            <span className="const-fallback">{i + 1}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className='talent b'>{/* таланты: иконка + уровень, порядок атака/навык/взрыв */}
                            {TALENT_KEYS.map((key) => {
                                const talentIcon = character?.talents?.[key]?.icon;
                                const talentLevel = talents?.[key];
                                return (
                                    <div key={key} className="talent-item">
                                        {talentIcon ? (
                                            <img src={talentIcon} alt={key} className="talent-icon" loading="lazy" onError={onErrorHide} />
                                        ) : (
                                            <div className="talent-icon talent-icon-empty">?</div>
                                        )}
                                        <div className="talent-level">{talentLevel ?? '–'}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="enka-detail-block artifacts b">
                        <h4 className="enka-detail-title">Артефакты</h4>
                        <div className="enka-artifacts-grid">
                            {['flower', 'plume', 'sands', 'goblet', 'circlet'].map(slot => (
                                <ArtifactCard key={slot} slot={slot} artifact={artifacts[slot]} />
                            ))}
                        </div>
                    </div>
                </article>
                <article className='right b'>
                    <article className='character-info'>
                        <div className="enka-char-summary f-c">
                            <h1 className="enka-char-name c-p bg-bl">{charName}</h1>
                            <div className="enka-char-meta c-p f">
                                <p className='bg-bl m-0 p-1'>[Ур. {level}]</p>
                                <p className='bg-bl m-0 p-1'>[Дружба {friendshipLevel}]</p>
                                
                            </div>
                        </div>
                        
                    </article>
                    <WeaponBlock weaponInfo={weapon} />
                    <div className="enka-detail-block b">
                        <h4 className="enka-detail-title">Статы</h4>
                        <div className="enka-final-stats">
                            {finalStats.map((s) => (
                                <StatRow key={s.type} type={s.type} value={s.value} isPercent={isPercentStat(s.type)} />
                            ))}
                        </div>
                    </div>
                </article>
            </div>
            <button type="button" className="enka-download-button b" onClick={handleDownload}>
                Скачать PNG
            </button>
        </div>
    );
};

export default EnkaBuildDetail;
