import React from 'react';
import SaveCard from './SaveCard';
import { useTranslation } from 'react-i18next';

const SaveList = ({ saves, type, onDelete, CardComponent = SaveCard }) => {
    const { t } = useTranslation();

    if (!saves || saves.length === 0) {
        return (
            <div className="no-saves-message">
                <p>{t(`profile.noSaves.${type}`)}</p>
            </div>
        );
    }

    return (
        <div className="saves-grid">
            {saves.map((save, index) => (
                <CardComponent key={`${save.i || save.ci}-${index}`} save={save} type={type} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default SaveList;
