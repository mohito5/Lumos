
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../../shared/lib/store/useAppStore';
import { showNotification } from '../../../shared/lib/notifications';
import { useEnkaProfile } from '../lib/hooks/useEnkaProfile';
import SaveList from '../SaveList';
import allCharacters from '../../../data/characters/index';
import DeleteConfirmationModal from '../../../shared/ui/common/DeleteConfirmationModal';
import InfoBanner from '../../../shared/ui/common/InfoBanner';
import AvatarSelector from '../AvatarSelector';
import SettingsModal from '../../../shared/ui/SettingsModal/SettingsModal';
import './ProfilePage.css';
import CalculatorSaveCard from '../CalculatorSaveCard';
import PriorityList from '../PriorityList';
import MasonryGrid from '../../../shared/ui/Masonry.jsx';

// Минимальный onboarding — не тур, а короткие "вот что нового" баннеры,
// каждый закрывается независимо и не показывается повторно (id пишется в
// appData.settings.dismissedBanners — общий settings-бэг уже синкается в
// CloudStorage, отдельная инфраструктура под это не нужна). Добавление
// новой подсказки в будущем — просто ещё один элемент этого массива.
const ONBOARDING_BANNERS = [
    { id: 'ocr-scan-2026-07', icon: '📷', key: 'profile.onboarding.ocrScan' },
    { id: 'priority-list-2026-07', icon: '⭐', key: 'profile.onboarding.priorityList' },
];

const ProfilePage = () => {
    const { t } = useTranslation();
    const { appData, setData } = useAppStore();
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('assets/avatar-icon/default-user.png');
    const [isAvatarSelectorOpen, setAvatarSelectorOpen] = useState(false);
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [saveToDelete, setSaveToDelete] = useState(null);
    const [enkaUidInput, setEnkaUidInput] = useState('');
    const { enka, isLoading: enkaLoading, error: enkaError, canRefresh: canRefreshEnka, link: linkEnka, refresh: refreshEnka, unlink: unlinkEnka } = useEnkaProfile();

    const dismissedBanners = appData?.settings?.dismissedBanners || [];
    const visibleBanners = ONBOARDING_BANNERS.filter((b) => !dismissedBanners.includes(b.id));
    const handleDismissBanner = useCallback((id) => {
        setData({
            settings: {
                ...(appData?.settings || {}),
                dismissedBanners: [...dismissedBanners, id],
            },
        });
    }, [appData?.settings, dismissedBanners, setData]);

    useEffect(() => {
        if (appData && appData.userProfile) {
            setUsername(appData.userProfile.username || '');
            setAvatar(appData.userProfile.avatar || 'assets/avatar-icon/default-user.png');
        }
    }, [appData.userProfile]);

    const handleUsernameChange = (e) => setUsername(e.target.value);

    const saveProfile = () => {
        const userProfile = {
            ...(appData?.userProfile || {}),
            username: username || t('profile.defaultUsername'),
            avatar: avatar
        };
        setData({ userProfile });
        showNotification(t('profile.profileSaved'), 'success');
    };

    const handleDeleteRequest = (id, type, name) => {
        setSaveToDelete({ id, type, name });
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (!saveToDelete) return;

        const keyMap = { character: 'savedChars', weapon: 'savedWeaps', calculate: 'savedCalculate' };
        const key = keyMap[saveToDelete.type];
        
        const idKey = saveToDelete.type === 'calculate' ? 'ci' : 'i';
        const updatedSaves = (appData[key] || []).filter(save => save[idKey] !== saveToDelete.id);
        setData({ [key]: updatedSaves }, { immediate: true });

        setShowModal(false);
        setSaveToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setSaveToDelete(null);
    };

    const handleAvatarSelect = (selectedAvatar) => {
        setAvatar(selectedAvatar);
        setAvatarSelectorOpen(false);
        const userProfile = {
            ...(appData?.userProfile || {}),
            username: username || t('profile.defaultUsername'),
            avatar: selectedAvatar
        };
        setData({ userProfile });
    };

    const handleEnkaLink = async () => {
        const ok = await linkEnka(enkaUidInput);
        if (ok) {
            setEnkaUidInput('');
            showNotification(t('profile.enkaMode.linkSuccess'), 'success');
        }
    };

    const handleEnkaRefresh = async () => {
        await refreshEnka();
    };

    const handleEnkaUnlink = () => {
        unlinkEnka();
        showNotification(t('profile.enkaMode.unlinkSuccess'), 'success');
    };

    // Все сохранённые сборки (персонажи + оружие) — источник для приоритетов.
    // В блок приоритета должны попадать только сборки с useInventory=true —
    // только они реально конкурируют за общий инвентарь (ui===false работает
    // с локальными материалами и в распределении ресурсов не участвует).
    const allSaves = React.useMemo(() => {
        const chars = (appData?.savedChars || []).filter(s => s.ui !== false).map(s => ({ ...s, _type: 'character' }));
        const weaps = (appData?.savedWeaps || []).filter(s => s.ui !== false).map(s => ({ ...s, _type: 'weapon' }));
        const priority = appData?.priority || [];
        const all = [...chars, ...weaps];
        // Сортируем по порядку priority, остальные в конец
        return [
            ...priority.map(id => all.find(s => (s.i ?? s.ci) === id)).filter(Boolean),
            ...all.filter(s => !priority.includes(s.i ?? s.ci)),
        ];
    }, [appData]);

    // Сборки которые уже в приоритете
    const prioritySaves = React.useMemo(() => {
        const priority = appData?.priority || [];
        return allSaves.filter(s => priority.includes(s.i ?? s.ci));
    }, [allSaves, appData]);

    const handlePriorityReorder = (newOrderedSaves) => {
        setData({ priority: newOrderedSaves.map(s => s.i ?? s.ci) }, { immediate: true });
    };

    const handleRemoveFromPriority = (id) => {
        const priority = appData?.priority || [];
        setData({ priority: priority.filter(p => p !== id) }, { immediate: true });
    };

    const handleAddToPriority = (id) => {
        const priority = appData?.priority || [];
        if (!priority.includes(id)) {
            setData({ priority: [...priority, id] }, { immediate: true });
        }
    };
    
    const characterSaves = appData.savedChars || [];
    const weaponSaves = appData.savedWeaps || [];
    const calculatorSaves = appData.savedCalculate || [];

    return (
        <div className="profile-page-container border wd">
            <MasonryGrid>
                <div className="profile-header">
                    <h1>{t('pages.profile.title')}</h1>
                    <button className="settings-button border p-1 radius-2" onClick={() => setSettingsModalOpen(true)}>⚙️</button>
                </div>

                {visibleBanners.length > 0 && (
                    <div className="onboarding-banners">
                        {visibleBanners.map(({ id, icon, key }) => (
                            <InfoBanner
                                key={id}
                                icon={icon}
                                onDismiss={() => handleDismissBanner(id)}
                                dismissLabel={t('common.close', 'Закрыть')}
                            >
                                {t(key, key)}
                            </InfoBanner>
                        ))}
                    </div>
                )  }

                <div className="profile-user-section border radius-4 p-3 flex">
                    <div className="profile-avatar-container border">
                        <img loading="lazy" src={avatar} alt="User Avatar" id="user-avatar" className="profile-avatar icon-2xl radius-1 border" />
                        <button id="change-avatar-btn" className="change-avatar-button" onClick={() => setAvatarSelectorOpen(true)}>✏️</button>
                    </div>
                    <div className="profile-info">
                        {enka ? (
                            <div className="enka-linked-info">
                                <div className="enka-nickname-row">
                                    <span className="enka-nickname">{enka.nickname}</span>
                                    <span className="enka-uid-badge">UID {enka.uid}</span>
                                </div>
                                <div className="enka-stats-row">
                                    {enka.adventureRank != null && (
                                        <span className="enka-stat">{t('profile.enkaMode.ar')} {enka.adventureRank}</span>
                                    )}
                                    {enka.worldLevel != null && (
                                        <span className="enka-stat">{t('profile.enkaMode.wl')} {enka.worldLevel}</span>
                                    )}
                                    {enka.abyssFloor && (
                                        <span className="enka-stat">{t('profile.enkaMode.abyss')} {enka.abyssFloor}</span>
                                    )}
                                </div>
                                <div className="enka-actions-row">
                                    <button type="button" onClick={handleEnkaRefresh} disabled={enkaLoading || !canRefreshEnka}>
                                        {enkaLoading ? t('profile.enkaMode.refreshing') : t('profile.enkaMode.refresh')}
                                    </button>
                                    <button type="button" onClick={handleEnkaUnlink} className="enka-unlink-btn">
                                        {t('profile.enkaMode.unlink')}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>{t('profile.description')}</p>
                                <div className="username-container">
                                    <input
                                        type="text"
                                        id="username-input"
                                        placeholder={t('profile.usernamePlaceholder')}
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                    <button id="save-username-btn" onClick={saveProfile}>{t('buttons.save')}</button>
                                </div>
                                <div className="enka-link-row">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder={t('profile.enkaMode.uidPlaceholder')}
                                        value={enkaUidInput}
                                        onChange={(e) => setEnkaUidInput(e.target.value)}
                                    />
                                    <button type="button" onClick={handleEnkaLink} disabled={enkaLoading}>
                                        {enkaLoading ? t('profile.enkaMode.linking') : t('profile.enkaMode.linkButton')}
                                    </button>
                                </div>
                                {enkaError && <p className="enka-error-text">{t(`profile.enkaMode.errors.${enkaError}`)}</p>}
                            </>
                        )}
                    </div>
                </div>

            <section className="profile-functions-section" column={2}>
                <h2>{t('profile.functions', 'Functions')}</h2>
                <div className="functions-grid">
                    <label className='accordion accordion-main color flex-c gap-1 hover' htmlFor='open-1'>
                        <input className='accordion__open border' id='open-1' type='radio' name='acoordion-1'/>
                        <input className='accordion__close border' id='close-1' type='radio' name='acoordion-1'/>
                        <div className='justify-between flex folder_tab'>
                            <h6 className='border p-1 px-2'>{t('profile.calculatorTitle', 'Stats Calculator')}</h6>
                            <label htmlFor="close-1" className='accordion__button border items-center color radius-4 p-1 px-2 gap-1 flex-r'>
                                <span className='accordion__buttonText'>{t('ui:button.close')}</span>
                                <svg className='icon-sm'><use href='#icon-close-mini'></use></svg>
                            </label>
                        </div>
                        <div className='accordion__wrapper border p-2'>
                            <dl className='accordion__box'>
                                <div className='flex-r gap-2'>
                                    <div className='icon-page flex'>
                                        <svg className='icon'><use href='#icon-folder'></use></svg>
                                    </div>
                                    <h3>{t('profile.calculatorTitle', 'Stats Calculator')}</h3>
                                </div>
                                <p className='accordion__text'>{t('profile.calculatorDescription', 'Calculate character stats with weapons and artifacts.')}</p>
                            </dl>
                            <Link to="/profile/calculator" className="date-card-link">
                            <button className='radius-2 p-1 px-4 border'>{t('ui:button.open')}</button>
                        </Link>
                        </div>
                    </label>
                    
                    <label className='accordion accordion-main color flex-c gap-1 hover' htmlFor='open-2'>
                        <input className='accordion__open border' id='open-2' type='radio' name='acoordion-2'/>
                        <input className='accordion__close border' id='close-2' type='radio' name='acoordion-2'/>
                        <div className='justify-between flex folder_tab'>
                            <h6 className='border p-1 px-2'>{t('profile.inventoryTitle', 'Inventory')}</h6>
                            <label htmlFor="close-2" className='accordion__button border items-center color radius-4 p-1 px-2 gap-1 flex-r'>
                                <span className='accordion__buttonText'>{t('ui:button.close')}</span>
                                <svg className='icon-sm'><use href='#icon-close-mini'></use></svg>
                            </label>
                        </div>
                        <div className='accordion__wrapper border p-2'>
                            <dl className='accordion__box'>
                                <div className='flex-r gap-2'>
                                    <div className='icon-page flex'>
                                        <svg className='icon'><use href='#icon-folder'></use></svg>
                                    </div>
                                    <h3>{t('profile.inventoryTitle', 'Inventory')}</h3>
                                </div>
                                <p className='accordion__text'>{t('profile.inventoryDescription', 'Manage your in-game items.')}</p>
                            </dl>
                            <Link to="/profile/inventory" className="date-card-link">
                            <button className='radius-2 p-1 px-4 border'>{t('ui:button.open')}</button>
                        </Link>
                        </div>
                    </label>
                
                    <label className='accordion accordion-main color flex-c gap-1 hover' htmlFor='open-3'>
                        <input className='accordion__open border' id='open-3' type='radio' name='acoordion-3'/>
                        <input className='accordion__close border' id='close-3' type='radio' name='acoordion-3'/>
                        <div className='justify-between flex folder_tab'>
                            <h6 className='border p-1 px-2'>{t('profile.enkaImportTitle', 'Enka.Network Showcase')}</h6>
                            <label htmlFor="close-3" className='accordion__button border items-center color radius-4 p-1 px-2 gap-1 flex-r'>
                                <span className='accordion__buttonText'>{t('ui:button.close')}</span>
                                <svg className='icon-sm'><use href='#icon-close-mini'></use></svg>
                            </label>
                        </div>
                        <div className='accordion__wrapper border p-2'>
                            <dl className='accordion__box'>
                                <div className='flex-r gap-2'>
                                    <div className='icon-page flex'>
                                        <svg className='icon'><use href='#icon-folder'></use></svg>
                                    </div>
                                    <h3>{t('profile.enkaImportTitle', 'Enka.Network Showcase')}</h3>
                                </div>
                                <p className='accordion__text'>{t('profile.enkaImportDescription', 'View your character showcase from Enka.Network.')}</p>
                            </dl>
                            <Link to="/profile/enka-import" className="date-card-link">
                            <button className='radius-2 p-1 px-4 border'>{t('ui:button.open')}</button>
                        </Link>
                        </div>
                    </label>

                    <label className='accordion accordion-main color flex-c gap-1 hover' htmlFor='open-4'>
                        <input className='accordion__open border' id='open-4' type='radio' name='acoordion-4'/>
                        <input className='accordion__close border' id='close-4' type='radio' name='acoordion-4'/>
                        <div className='justify-between flex folder_tab'>
                            <h6 className='border p-1 px-2'>{t('profile.teamCardsTitle', 'Team Cards')}</h6>
                            <label htmlFor="close-4" className='accordion__button border items-center color radius-4 p-1 px-2 gap-1 flex-r'>
                                <span className='accordion__buttonText'>{t('ui:button.close')}</span>
                                <svg className='icon-sm'><use href='#icon-close-mini'></use></svg>
                            </label>
                        </div>
                        <div className='accordion__wrapper border p-2'>
                            <dl className='accordion__box'>
                                <div className='flex-r gap-2'>
                                    <div className='icon-page flex'>
                                        <svg className='icon'><use href='#icon-folder'></use></svg>
                                    </div>
                                    <h3>{t('profile.teamCardsTitle', 'Team Cards')}</h3>
                                </div>
                                <p className='accordion__text'>{t('profile.teamCardsDescription', 'Build and export shareable team cards.')}</p>
                            </dl>
                            <Link to="/profile/team-cards" className="date-card-link">
                            <button className='radius-2 p-1 px-4 border'>{t('ui:button.open')}</button>
                        </Link>
                        </div>
                    </label>
                </div>
            </section>
            
            <section className="priority-section">
                <div className="priority-section-header">
                    <h2>{t('profile.priorityTitle')}</h2>
                    <p>{t('profile.priorityDescription')}</p>
                </div>

                {/* Список сборок вне приоритета — можно добавить */}
                {allSaves.filter(s => !(appData?.priority || []).includes(s.i ?? s.ci)).length > 0 && (
                    <div className="priority-available">
                        <h4 style={{ opacity: 0.6, marginBottom: 8 }}>
                            {t('profile.addToPriority', 'Добавить в приоритет:')}
                        </h4>
                        <div className="priority-available-list">
                            {allSaves
                                .filter(s => !(appData?.priority || []).includes(s.i ?? s.ci))
                                .map(s => {
                                    const id = s.i ?? s.ci;
                                    const type = s._type;
                                    const ns = type === 'character' ? 'characters' : 'weapons';
                                    const name = t(`${id}.name`, { ns, defaultValue: id });
                                    const icon = type === 'character' ? '👤' : '⚔️';
                                    return (
                                        <button
                                            key={id}
                                            className="p-1 flex gap-1 border color radius-4"
                                            onClick={() => handleAddToPriority(id)}
                                        >
                                            <span>{icon} {name}</span>
                                            <span style={{ opacity: 0.5 }}>+</span>
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                )}

                <div id="priority-materials-container">
                    <PriorityList
                        saves={prioritySaves}
                        onReorder={handlePriorityReorder}
                        onRemove={handleRemoveFromPriority}
                    />
                </div>
            </section>

            <div className="saved-content-section">
                 <div className="saved-content-header">
                    <h2>{t('profile.savedTitle')}</h2>
                    <p>{t('profile.savedDescription')}</p>
                </div>
                <div id="saved-materials-container">
                    <div className="saves-section">
                        <h3>{t('profile.characters')} ({characterSaves.length})</h3>
                        <SaveList saves={characterSaves} type="character" onDelete={handleDeleteRequest} />
                    </div>
                    <div className="saves-section">
                        <h3>{t('profile.weapons')} ({weaponSaves.length})</h3>
                        <SaveList saves={weaponSaves} type="weapon" onDelete={handleDeleteRequest} />
                    </div>
                    <div className="saves-section">
                        <h3>{t('profile.calculator')} ({calculatorSaves.length})</h3>
                        <SaveList saves={calculatorSaves} type="calculate" onDelete={handleDeleteRequest} CardComponent={CalculatorSaveCard} />
                    </div>
                </div>
            </div>

                <AvatarSelector 
                    isOpen={isAvatarSelectorOpen} 
                    onClose={() => setAvatarSelectorOpen(false)} 
                    onSelect={handleAvatarSelect}
                    charsData={allCharacters}
                />

                <DeleteConfirmationModal
                    isOpen={showModal}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    itemName={saveToDelete?.name}
                    type={saveToDelete?.type}
                />

                <SettingsModal 
                    isOpen={isSettingsModalOpen} 
                    onClose={() => setSettingsModalOpen(false)} 
                />
            </MasonryGrid>
        </div>
    );
};

export default ProfilePage;
