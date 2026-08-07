import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import { charactersById } from '../../../../data/characters/index.js';
import { weaponsById } from '../../../../data/weapons/index.js';
import { getStatDisplayName } from '../../../../shared/lib/calculatorUtils.js';
import { StatIcon } from '../../enka/statIcons.jsx';
import { computeSetBonuses } from '../../enka/enkaLibraryCompact.js';
import { resolveIconUrl } from '../../../../shared/lib/cdnIcon.js';
import characterIcons from '../../../../data/cdn/characterIcons.generated.json';
import weaponIcons from '../../../../data/cdn/weaponIcons.generated.json';
import './TeamCardExport.css';

const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7';
const onErrorHide = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = TRANSPARENT_PIXEL;
    e.currentTarget.style.visibility = 'hidden';
};

// Компактный набор статов на карточке — HP/ATK/DEF + криты/восст. энергии.
// Порядок и состав — из макета отряда (HP, CR, CD, ER), ATK/DEF добавлены
// как обычно интересующие при быстром сравнении билдов между собой.
const CARD_STAT_ORDER = ['hp', 'atk', 'def', 'critRate%', 'critDmg%', 'er%'];

const TALENT_ORDER = ['attack', 'skill', 'burst'];

// Нет готовой иконографии слотов артефактов в проекте (проверено) — простые
// эмодзи вместо того, чтобы тащить под это отдельные ассеты ради одного
// варианта карточки.
const ARTIFACT_SLOTS = [
    { key: 'flower', icon: '🌸' },
    { key: 'plume', icon: '🪶' },
    { key: 'sands', icon: '⏳' },
    { key: 'goblet', icon: '🏆' },
    { key: 'circlet', icon: '👑' },
];

export const CARD_VARIANTS = ['compact', 'build', 'detailed'];

const ArtifactRow = ({ slotKey, icon, artifact, t }) => {
    if (!artifact) return null;
    const setName = t(`${artifact.set}.name`, { ns: 'artifacts', defaultValue: artifact.set ?? '—' });
    return (
        <div className="team-artifact-row c">
            <span className="team-artifact-slot-icon" title={slotKey}>{icon}</span>
            <span className="team-artifact-set">{setName} +{artifact.lvl}</span>
            {artifact.ms && (
                <span className="team-artifact-mainstat" title={getStatDisplayName(artifact.ms.t)}>
                    <StatIcon type={artifact.ms.t} className="team-stat-icon c" />
                    {artifact.ms.v}{artifact.ms.t.endsWith('%') ? '%' : ''}
                </span>
            )}
            {artifact.ss?.length > 0 && (
                <div className="team-artifact-substats">
                    {artifact.ss.map((s) => (
                        <span key={s.t} className="team-substat-chip" title={getStatDisplayName(s.t)}>
                            <StatIcon type={s.t} className="team-stat-icon c" />
                            {s.v}{s.t.endsWith('%') ? '%' : ''}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

const CharacterBlock = ({ entry, index, t, variant }) => {
    const character = charactersById.get(entry.id);
    const weapon = entry.w?.id ? weaponsById.get(entry.w.id) : null;
    const name = character ? t(`${character.id}.name`, { ns: 'characters' }) : entry.id;
    const weaponName = weapon ? t(`${weapon.id}.name`, { ns: 'weapons' }) : null;

    const avatarUrl = character
        ? resolveIconUrl({ enkaIconMap: characterIcons }, character.id, character.avatar_icon ?? character.avatar)
        : null;
    const weaponIconUrl = weapon
        ? resolveIconUrl({ enkaIconMap: weaponIcons }, weapon.id, weapon.icon)
        : null;

    const statsByType = Object.fromEntries((entry.stats ?? []).map((s) => [s.type, s.value]));
    const bonuses = computeSetBonuses(entry);

    // Compact — "только персонажи и оружие": ни статов, ни сетов, ни
    // уровня/созвездия (это уже деталь билда, не идентификация персонажа).
    // Build — прежнее поведение карточки (было единственным вариантом).
    // Detailed — Build + таланты + разбивка по слотам артефактов.
    const showBuildInfo = variant !== 'compact';
    const showDetailed = variant === 'detailed';

    return (
        <div className={`team-char-block flex-r border c wd b${index === 0 ? ' team-char-main' : ''}`}>
            {index === 0 && (
                <span className="team-char-main-badge c">{t('profile.teamCards.mainDps', { ns: 'ui', defaultValue: 'Основной ДД' })}</span>
            )}
            <div className="team-char-header border c">
                {avatarUrl && <img loading="lazy" src={avatarUrl} alt={name} className="team-char-avatar" onError={onErrorHide} />}
                <div className="team-char-title">
                    <span className="team-char-name c">{name}</span>
                    {showBuildInfo && (
                        <span className="team-char-meta c">
                            {t('profile.teamCards.level', { ns: 'ui', defaultValue: 'Ур.' })} {entry.lvl} · C{entry.const ?? 0}
                        </span>
                    )}
                </div>
            </div>

            {weapon && (
                <div className="team-char-weapon">
                    {weaponIconUrl && <img loading="lazy" src={weaponIconUrl} alt={weaponName} className="team-weapon-icon" onError={onErrorHide} />}
                    <span className="team-weapon-name c">{weaponName}</span>
                    <span className="team-weapon-refine c ">R{entry.w.r ?? 1}</span>
                </div>
            )}

            {showBuildInfo && (
                <div className="team-char-stats">
                    {CARD_STAT_ORDER.filter((key) => statsByType[key] != null).map((key) => (
                        <span key={key} className="team-stat-chip c" title={getStatDisplayName(key)}>
                            <StatIcon type={key} className="team-stat-icon c" />
                            {statsByType[key]}{key.endsWith('%') ? '%' : ''}
                        </span>
                    ))}
                </div>
            )}

            {showBuildInfo && bonuses.length > 0 && (
                <div className="team-char-sets">
                    {bonuses.map(({ setId, count }) => (
                        <span key={setId} className="team-set-chip">
                            {t(`${setId}.name`, { ns: 'artifacts', defaultValue: setId })} {count}
                        </span>
                    ))}
                </div>
            )}

            {showDetailed && (
                <>
                    <div className="team-char-talents">
                        {TALENT_ORDER.filter((k) => entry.t?.[k] != null).map((k) => (
                            <span key={k} className="team-talent-chip c" title={t(`profile.teamCards.talents.${k}`, { ns: 'ui', defaultValue: k })}>
                                {t(`profile.teamCards.talents.${k}Short`, { ns: 'ui', defaultValue: k[0].toUpperCase() })} {entry.t[k]}
                            </span>
                        ))}
                    </div>
                    <div className="team-char-artifacts">
                        {ARTIFACT_SLOTS.map(({ key, icon }) => (
                            <ArtifactRow key={key} slotKey={key} icon={icon} artifact={entry.a?.[key]} t={t} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

/**
 * @param {import('../../hooks/useTeamCards').TeamCard} team
 * @param {import('../../core/services/telegramSyncManager').CompactLibraryEntry[]} library
 * @param {'compact'|'build'|'detailed'} [variant]
 */
const TeamCardExport = ({ team, library, uidLabel, variant = 'build' }) => {
    const { t } = useTranslation(['ui']);
    const cardRef = useRef(null);

    const byId = new Map(library.map((e) => [e.id, e]));
    const entries = team.characterIds.map((id) => byId.get(id)).filter(Boolean);
    const missingCount = team.characterIds.length - entries.length;

    const handleDownload = () => {
        if (!cardRef.current) return;
        toPng(cardRef.current, { cacheBust: true, quality: 1.0, pixelRatio: 2 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${team.name || 'team'}-${variant}-lumos.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('[TeamCardExport] Не удалось создать изображение отряда:', err);
            });
    };

    return (
        <div className="team-card-export-wrapper">
            <div ref={cardRef} className={`team-card border flex-c team-card-${variant}`}>
                <div className="team-card-header c">
                    <span className="team-card-name c">{team.name || t('profile.teamCards.untitled', { defaultValue: 'Отряд' })}</span>
                    <div className="team-card-logo-row">
                        {uidLabel && <span className="team-card-uid">{uidLabel}</span>}
                        <span className="team-card-logo">Lumos</span>
                    </div>
                </div>

                {missingCount > 0 && (
                    <p className="team-card-missing-note c">
                        {t('profile.teamCards.missingCharacters', { ns: 'ui', count: missingCount, defaultValue: `${missingCount} персонаж(ей) больше нет в библиотеке` })}
                    </p>
                )}

                {entries.map((entry, i) => (
                    <CharacterBlock key={entry.id} entry={entry} index={i} t={t} variant={variant} />
                ))}

                <div className="team-card-footer c ">
                    {new Date(team.createdAt).toLocaleDateString()}
                </div>
            </div>

            <button type="button" className="team-card-download-btn" onClick={handleDownload}>
                {t('profile.teamCards.downloadPng', { ns: 'ui', defaultValue: 'Скачать PNG' })}
            </button>
        </div>
    );
};

export default TeamCardExport;
