import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import EnkaCharacterAccordion from '../enka/EnkaCharacterAccordion.jsx';
import { extractFullBuild } from '../enka/enkaExtract.js';
import allCharacters, { charactersById } from '../../../data/characters/index.js';
import allWeapons from '../../../data/weapons/index.js';
import allArtifactSets from '../../../data/artifacts/index.js';
import { useEnkaProfile } from '../lib/hooks/useEnkaProfile.js';
import { useCharacterLibrary } from '../lib/hooks/useCharacterLibrary.js';
import { resolveIconUrl } from '../../../shared/lib/cdnIcon.js';
import characterIcons from '../../../data/cdn/characterIcons.generated.json';
import { showNotification } from '../../../shared/lib/notifications.js';
import './EnkaProfile.css';

const EnkaProfile = () => {
    const { t } = useTranslation(['ui', 'notifications']);
    const { enka, link: linkProfile, fullData, fetchFull, isLoading, error } = useEnkaProfile();
    const { library, addOrUpdate, remove: removeFromLibrary, max: libraryMax } = useCharacterLibrary();
    const [uid, setUid] = useState(enka?.uid || '');
    const [localError, setLocalError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    // Отдельно от fullData — чтобы при ОШИБКЕ автозагрузки (например, Enka
    // временно недоступна) не долбить запрос повторно на каждый ре-рендер.
    const [autoLoadedFor, setAutoLoadedFor] = useState(null);

    // ── Единый источник вместо двух независимых запросов ──────────────────
    // Раньше: привязка профиля на ProfilePage и заход сюда каждый раз делали
    // ОТДЕЛЬНЫЙ /api/uid/{uid} запрос, даже для одного и того же uid. Теперь
    // useEnkaProfile.fullData — общий in-memory кэш (см. комментарий в
    // хуке). Если профиль уже привязан и данные для него уже загружены
    // (например, только что привязали на ProfilePage) — здесь их вообще не
    // нужно перезапрашивать, просто читаем fullData. Если профиль привязан,
    // но кэш пуст (Mini App переоткрыли — in-memory кэш не переживает
    // перезапуск) — догружаем один раз сами, без участия пользователя.
    useEffect(() => {
        if (!enka?.uid) return;
        if (fullData?.uid === enka.uid) return;
        if (autoLoadedFor === enka.uid) return;
        setUid(enka.uid);
        setAutoLoadedFor(enka.uid);
        fetchFull(enka.uid);
    }, [enka?.uid, fullData?.uid, autoLoadedFor, fetchFull]);

    // Извлекаем ВСЕХ персонажей витрины разом при получении данных — один
    // проход через enkaExtract.js даёт персонажа, оружие и все 5 артефактов
    // уже сопоставленными с внутренними id проекта, а не только сырые
    // общие статы, как было раньше.
    const builds = useMemo(() => {
        const avatarInfoList = fullData?.data?.avatarInfoList;
        if (!avatarInfoList) return [];
        return avatarInfoList.map(avatarInfo =>
            extractFullBuild(avatarInfo, { allCharacters, allWeapons, allArtifactSets })
        );
    }, [fullData]);

    const handleFetch = () => {
        const trimmedUid = uid.trim();
        setLocalError(null);
        if (!trimmedUid) {
            setLocalError('empty_uid');
            return;
        }
        setActiveIndex(0);
        // forceRefresh: явный клик "Загрузить" — пользователь мог захотеть
        // именно свежие данные (например, только что поменял витрину в игре),
        // а не то, что случайно оказалось в кэше с прошлого раза.
        fetchFull(trimmedUid, { forceRefresh: true });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleFetch();
    };

    const handleUseAsProfile = async () => {
        const trimmedUid = uid.trim();
        const ok = await linkProfile(trimmedUid);
        if (ok) {
            showNotification(t('profile.enkaMode.linkSuccess', { ns: 'ui' }), 'success');
        }
    };

    // Накопительная библиотека — обходит ограничение Enka в 8 персонажей на
    // стенде: пользователь меняет стенд в игре и импортирует снова, новые
    // персонажи добавляются, уже сохранённые (по id) — обновляются свежими
    // данными, остальные не трогаются (см. useCharacterLibrary.js).
    const handleAccumulate = () => {
        const { added, updated, skippedCapped } = addOrUpdate(builds, fullData.uid);
        const parts = [];
        if (added > 0) parts.push(t('profile.enkaMode.libraryAdded', { ns: 'ui', count: added }));
        if (updated > 0) parts.push(t('profile.enkaMode.libraryUpdated', { ns: 'ui', count: updated }));
        if (parts.length > 0) showNotification(parts.join(', '), 'success');
        if (skippedCapped > 0) {
            showNotification(t('profile.enkaMode.libraryFull', { ns: 'ui', max: libraryMax }), 'error', 6000);
        }
    };

    const isCurrentlyLinkedUid = enka?.uid === uid.trim() && uid.trim() !== '';
    // Показываем результаты только если то, что реально загружено (fullData.uid),
    // совпадает с тем, что сейчас в поле ввода — иначе при вводе НОВОГО uid
    // на экране на мгновение мелькнули бы результаты ПРЕДЫДУЩЕГО запроса.
    const hasResults = fullData?.uid === uid.trim() && builds.length > 0;
    const displayError = localError || error;

    return (
        <div className="enka-profile-page wd">
            <h1 className="enka-page-title">{t('profile.enkaImportTitle', { ns: 'ui' })}</h1>

            <div className="enka-uid-row">
                <input
                    type="text"
                    inputMode="numeric"
                    value={uid}
                    onChange={(e) => { setUid(e.target.value); setLocalError(null); }}
                    onKeyDown={handleKeyDown}
                    placeholder={t('profile.enkaMode.uidPlaceholder', { ns: 'ui' })}
                    className="enka-uid-input"
                />
                <button onClick={handleFetch} disabled={isLoading} className="enka-fetch-button">
                    {isLoading ? t('profile.enkaMode.loading', { ns: 'ui' }) : t('profile.enkaMode.fetchButton', { ns: 'ui' })}
                </button>
            </div>

            {displayError && <p className="enka-error">{t(`profile.enkaMode.errors.${displayError}`, { ns: 'ui' })}</p>}

            {hasResults && (
                <div className="enka-results wd">
                    <div className="enka-showcase-header">
                        <h2 className="enka-showcase-title c">
                            {t('profile.enkaMode.showcaseOf', { ns: 'ui' })} {fullData.data.playerInfo?.nickname}
                        </h2>
                        <button
                            type="button"
                            className="enka-use-as-profile-btn"
                            onClick={handleUseAsProfile}
                            disabled={isLoading || isCurrentlyLinkedUid}
                        >
                            {isCurrentlyLinkedUid
                                ? t('profile.enkaMode.alreadyLinked', { ns: 'ui' })
                                : t('profile.enkaMode.useAsProfile', { ns: 'ui' })}
                        </button>
                        <button
                            type="button"
                            className="enka-accumulate-btn"
                            onClick={handleAccumulate}
                            disabled={isLoading}
                            title={t('profile.enkaMode.accumulateHint', { ns: 'ui', max: libraryMax })}
                        >
                            {t('profile.enkaMode.accumulate', { ns: 'ui' })}
                        </button>
                    </div>

                    <EnkaCharacterAccordion
                        items={builds}
                        activeIndex={activeIndex}
                        onSelect={setActiveIndex}
                    />
                </div>
            )}

            {library.length > 0 && (
                <div className="enka-library wd">
                    <h2 className="enka-library-title">
                        {t('profile.enkaMode.libraryTitle', { ns: 'ui' })} ({library.length}/{libraryMax})
                    </h2>
                    <div className="enka-library-grid">
                        {library.map((entry) => {
                            const char = charactersById.get(entry.id);
                            const avatarUrl = resolveIconUrl({ enkaIconMap: characterIcons }, entry.id, char?.avatar_icon ?? char?.avatar);
                            const name = char ? t(`${char.id}.name`, { ns: 'characters' }) : entry.id;
                            return (
                                <div key={entry.id} className="enka-library-item b br-2">
                                    <button
                                        type="button"
                                        className="enka-library-remove"
                                        onClick={() => removeFromLibrary(entry.id)}
                                        title={t('profile.enkaMode.libraryRemove', { ns: 'ui' })}
                                    >
                                        ✕
                                    </button>
                                    {avatarUrl && <img loading="lazy" src={avatarUrl} alt={name} className="enka-library-avatar" />}
                                    <span className="enka-library-name">{name}</span>
                                    <span className="enka-library-level">Ур. {entry.lvl}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnkaProfile;
