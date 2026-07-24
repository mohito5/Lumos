import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import EnkaCharacterAccordion from './enka/EnkaCharacterAccordion.jsx';
import { extractFullBuild } from './enka/enkaExtract.js';
import allCharacters from '../../data/characters/index.js';
import allWeapons from '../../data/weapons/index.js';
import allArtifactSets from '../../data/artifacts/index.js';
import { useEnkaProfile } from '../../hooks/useEnkaProfile.js';
import { showSaveNotification } from '../../core/utils/notifications.js';
import './EnkaProfile.css';

const EnkaProfile = () => {
    const { t } = useTranslation(['ui', 'notifications']);
    const { enka, link: linkProfile, fullData, fetchFull, isLoading, error } = useEnkaProfile();
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
            showSaveNotification(t('profile.enkaMode.linkSuccess', { ns: 'ui' }), 'success');
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
                    </div>

                    <EnkaCharacterAccordion
                        items={builds}
                        activeIndex={activeIndex}
                        onSelect={setActiveIndex}
                    />
                </div>
            )}
        </div>
    );
};

export default EnkaProfile;
