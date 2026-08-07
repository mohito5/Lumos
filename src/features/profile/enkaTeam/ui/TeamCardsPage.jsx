import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTeamCards, TEAM_SIZE } from '../lib/hooks/useTeamCards.js';
import { useCharacterLibrary } from '../../lib/hooks/useCharacterLibrary.js';
import { useEnkaProfile } from '../../lib/hooks/useEnkaProfile.js';
import { charactersById } from '../../../../data/characters/index.js';
import { resolveIconUrl } from '../../../../shared/lib/cdnIcon.js';
import characterIcons from '../../../../data/cdn/characterIcons.generated.json';
import DeleteConfirmationModal from '../../../../shared/ui/common/DeleteConfirmationModal';
import TeamCardExport, { CARD_VARIANTS } from './TeamCardExport';
import './TeamCardsPage.css';

// Отдельная страница (не модалка) — по той же логике, что и импорт Enka:
// достаточно самостоятельный флоу (список + редактор + пикер персонажей),
// чтобы не пытаться втиснуть его в модалку поверх профиля.
//
// РАНЬШЕ каждая карточка отряда рендерилась целиком прямо в списке
// (TeamCardExport — тяжёлая карточка с аватарками/статами/сетами) — при
// нескольких отрядах страница превращалась в длинную простыню. ТЕПЕРЬ
// список — компактные блоки (имя + маленький ряд аватарок), по клику
// открывается модалка с полной карточкой и выбором варианта экспорта.
const TeamCardsPage = () => {
    const { t } = useTranslation(['ui']);
    const { library } = useCharacterLibrary();
    const { teams, create, remove, max } = useTeamCards();
    const { enka } = useEnkaProfile();

    const [isEditing, setIsEditing] = useState(false);
    const [slots, setSlots] = useState([null, null, null, null]);
    const [name, setName] = useState('');
    const [pickerSlot, setPickerSlot] = useState(null);

    const [viewingTeamId, setViewingTeamId] = useState(null);
    const [cardVariant, setCardVariant] = useState('build');
    const [teamPendingDelete, setTeamPendingDelete] = useState(null);

    const startNew = () => {
        setSlots([null, null, null, null]);
        setName('');
        setIsEditing(true);
    };

    const handlePick = (charId) => {
        setSlots((prev) => {
            const next = [...prev];
            next[pickerSlot] = charId;
            return next;
        });
        setPickerSlot(null);
    };

    const handleSave = () => {
        const characterIds = slots.filter(Boolean);
        if (characterIds.length !== TEAM_SIZE) return;
        create(name, characterIds);
        setIsEditing(false);
    };

    const confirmDelete = () => {
        if (!teamPendingDelete) return;
        remove(teamPendingDelete.id);
        if (viewingTeamId === teamPendingDelete.id) setViewingTeamId(null);
        setTeamPendingDelete(null);
    };

    const canCreate = teams.length < max;
    const hasEnoughCharacters = library.length >= TEAM_SIZE;
    const filledSlots = slots.filter(Boolean).length;
    const viewingTeam = teams.find((tm) => tm.id === viewingTeamId) ?? null;

    return (
        <div className="team-cards-page wd gap-4 flex-c">
            <h1 className="team-cards-title">{t('profile.teamCards.title', { defaultValue: 'Карточки отряда' })}</h1>
            <p className="team-cards-hint">
                {t('profile.teamCards.hint', { defaultValue: 'Собери отряд из 4 персонажей библиотеки и экспортируй PNG-карточку для отправки друзьям.' })}
            </p>

            {!isEditing && (
                <>
                    {/* Кнопка добавления — сразу под заголовком/подсказкой, не в конце списка */}
                    <button
                        type="button"
                        className="team-cards-create-btn"
                        onClick={startNew}
                        disabled={!canCreate || !hasEnoughCharacters}
                        title={
                            !canCreate
                                ? t('profile.teamCards.maxReached', { max, defaultValue: `Достигнут лимит: ${max} карточек` })
                                : (!hasEnoughCharacters
                                    ? t('profile.teamCards.needMoreCharacters', { needed: TEAM_SIZE, defaultValue: `В библиотеке должно быть минимум ${TEAM_SIZE} персонажа` })
                                    : undefined)
                        }
                    >
                        + {t('profile.teamCards.createNew', { defaultValue: 'Новый отряд' })} ({teams.length}/{max})
                    </button>

                    {teams.length === 0 && (
                        <p className="team-cards-empty border">{t('profile.teamCards.empty', { defaultValue: 'Пока нет ни одной сохранённой карточки.' })}</p>
                    )}

                    <div className="team-cards-list">
                        {teams.map((team) => {
                            const avatars = team.characterIds.map((id) => {
                                const char = charactersById.get(id);
                                return char
                                    ? resolveIconUrl({ enkaIconMap: characterIcons }, char.id, char.avatar_icon ?? char.avatar)
                                    : null;
                            });
                            return (
                                <button
                                    key={team.id}
                                    type="button"
                                    className="team-cards-compact-block b br-4"
                                    onClick={() => { setViewingTeamId(team.id); setCardVariant('build'); }}
                                >
                                    <span className="team-cards-compact-avatars">
                                        {avatars.map((url, i) => (
                                            url
                                                ? <img key={i} loading="lazy" src={url} alt="" className="team-cards-compact-avatar" />
                                                : <span key={i} className="team-cards-compact-avatar team-cards-compact-avatar-empty" />
                                        ))}
                                    </span>
                                    <span className="team-cards-compact-name">
                                        {team.name || t('profile.teamCards.untitled', { defaultValue: 'Отряд' })}
                                    </span>
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        className="team-cards-compact-delete"
                                        title={t('buttons.delete')}
                                        onClick={(e) => { e.stopPropagation(); setTeamPendingDelete(team); }}
                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setTeamPendingDelete(team); } }}
                                    >
                                        ×
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}

            {isEditing && (
                <div className="team-cards-editor border">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('profile.teamCards.namePlaceholder', { defaultValue: 'Название отряда (необязательно)' })}
                        className="team-cards-name-input"
                    />

                    <div className="team-cards-slots">
                        {slots.map((charId, i) => {
                            const char = charId ? charactersById.get(charId) : null;
                            const avatarUrl = char
                                ? resolveIconUrl({ enkaIconMap: characterIcons }, char.id, char.avatar_icon ?? char.avatar)
                                : null;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    className={`team-cards-slot b${i === 0 ? ' team-cards-slot-main' : ''}`}
                                    onClick={() => setPickerSlot(i)}
                                >
                                    {i === 0 && (
                                        <span className="team-cards-slot-hint">
                                            {t('profile.teamCards.mainDpsHint', { defaultValue: 'Обычно основной ДД — первый слот на карточке крупнее остальных' })}
                                        </span>
                                    )}
                                    {char ? (
                                        <>
                                            {avatarUrl && <img loading="lazy" src={avatarUrl} alt="" className="team-cards-slot-avatar" />}
                                            <span>{t(`${char.id}.name`, { ns: 'characters' })}</span>
                                        </>
                                    ) : (
                                        <span className="team-cards-slot-empty">+ {t('profile.teamCards.pickCharacter', { defaultValue: 'Выбрать персонажа' })}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="team-cards-editor-actions">
                        <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
                            {t('buttons.cancel')}
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={filledSlots !== TEAM_SIZE}
                            className="confirm-button"
                        >
                            {t('buttons.save', { defaultValue: 'Сохранить' })} ({filledSlots}/{TEAM_SIZE})
                        </button>
                    </div>
                </div>
            )}

            {pickerSlot !== null && (
                <div className="modal-overlay" onClick={() => setPickerSlot(null)}>
                    <div className="modal-content team-cards-picker" onClick={(e) => e.stopPropagation()}>
                        <h2>{t('profile.teamCards.pickCharacter', { defaultValue: 'Выбрать персонажа' })}</h2>
                        <div className="team-cards-picker-grid">
                            {library.map((entry) => {
                                const char = charactersById.get(entry.id);
                                const avatarUrl = char
                                    ? resolveIconUrl({ enkaIconMap: characterIcons }, char.id, char.avatar_icon ?? char.avatar)
                                    : null;
                                const alreadyPicked = slots.includes(entry.id);
                                return (
                                    <button
                                        key={entry.id}
                                        type="button"
                                        className="team-cards-picker-item"
                                        onClick={() => handlePick(entry.id)}
                                        disabled={alreadyPicked}
                                    >
                                        {avatarUrl && <img loading="lazy" src={avatarUrl} alt="" className="team-cards-picker-avatar" />}
                                        <span>{char ? t(`${char.id}.name`, { ns: 'characters' }) : entry.id}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <button type="button" className="cancel-button" onClick={() => setPickerSlot(null)}>
                            {t('buttons.cancel')}
                        </button>
                    </div>
                </div>
            )}

            {/* Модалка с полной карточкой отряда + выбором варианта для скачивания */}
            {viewingTeam && (
                <div className="modal-overlay" onClick={() => setViewingTeamId(null)}>
                    <div className="modal-content team-cards-view-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="team-cards-view-header">
                            <h2>{viewingTeam.name || t('profile.teamCards.untitled', { defaultValue: 'Отряд' })}</h2>
                            <button type="button" className="close-button" onClick={() => setViewingTeamId(null)} aria-label={t('common.close', 'Закрыть')}>×</button>
                        </div>

                        <div className="team-cards-variant-picker" role="tablist">
                            {CARD_VARIANTS.map((v) => (
                                <button
                                    key={v}
                                    type="button"
                                    role="tab"
                                    aria-selected={cardVariant === v}
                                    className={`team-cards-variant-btn${cardVariant === v ? ' active' : ''}`}
                                    onClick={() => setCardVariant(v)}
                                >
                                    {t(`profile.teamCards.variants.${v}`, { defaultValue: v })}
                                </button>
                            ))}
                        </div>
                        <p className="team-cards-variant-hint">
                            {t(`profile.teamCards.variantHints.${cardVariant}`, { defaultValue: '' })}
                        </p>

                        <TeamCardExport team={viewingTeam} library={library} uidLabel={enka?.nickname} variant={cardVariant} />

                        <button type="button" className="team-cards-delete-btn" onClick={() => setTeamPendingDelete(viewingTeam)}>
                            {t('buttons.delete')}
                        </button>
                    </div>
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={teamPendingDelete !== null}
                onClose={() => setTeamPendingDelete(null)}
                onConfirm={confirmDelete}
                itemName={teamPendingDelete?.name || t('profile.teamCards.untitled', { defaultValue: 'Отряд' })}
                type="team"
            />
        </div>
    );
};

export default TeamCardsPage;
