
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { showNotification } from '../../core/utils/notifications';
import { useEnkaProfile } from '../../hooks/useEnkaProfile';
import SaveList from './SaveList';
import allCharacters from '../../data/characters/index';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AvatarSelector from './AvatarSelector';
import SettingsModal from '../../components/SettingsModal';
import './ProfilePage.css';
import CalculatorSaveCard from './CalculatorSaveCard';
import PriorityList from './PriorityList';

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
        <div className="profile-page-container wd">
            <div className="profile-header">
                <h1>{t('pages.profile.title')}</h1>
                <button className="settings-button" onClick={() => setSettingsModalOpen(true)}>⚙️</button>
            </div>

            <div className="profile-user-section b br-4 p-2">
                <div className="profile-avatar-container b">
                    <img loading="lazy" src={avatar} alt="User Avatar" id="user-avatar" className="profile-avatar" />
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

            <section className="profile-functions-section">
                <h2>{t('profile.functions', 'Functions')}</h2>
                <div className="functions-grid">
                     <Link to="/profile/calculator" className="function-card b br-4">
                        <div className="function-icon">🧮</div>
                        <div className="function-info">
                            <h3>{t('profile.calculatorTitle', 'Stats Calculator')}</h3>
                            <p>{t('profile.calculatorDescription', 'Calculate character stats with weapons and artifacts.')}</p>
                        </div>
                    </Link>
                    <Link to="/profile/inventory" className="function-card">
                        <div className="function-icon">📦</div>
                        <div className="function-info">
                            <h3>{t('profile.inventoryTitle', 'Inventory')}</h3>
                            <p>{t('profile.inventoryDescription', 'Manage your in-game items.')}</p>
                        </div>
                    </Link>
                    <Link to="/profile/enka-import" className="function-card">
                        <div className="function-icon">🔗</div>
                        <div className="function-info">
                            <h3>{t('profile.enkaImportTitle', 'Enka.Network Showcase')}</h3>
                            <p>{t('profile.enkaImportDescription', 'View your character showcase from Enka.Network.')}</p>
                        </div>
                    </Link>
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
                                            className="priority-add-btn b br-4"
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
                show={showModal}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                saveName={saveToDelete?.name}
                type={saveToDelete?.type}
            />

            <SettingsModal 
                isOpen={isSettingsModalOpen} 
                onClose={() => setSettingsModalOpen(false)} 
            />
        </div>
    );
};

export default ProfilePage;
