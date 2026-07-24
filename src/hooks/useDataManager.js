import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { isEqual } from 'lodash-es';
import { expandBuildData, compactBuildData } from '../core/utils/materialsCalculator';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { showSaveNotification } from '../core/utils/notifications';

const ENTITY_TYPE_TO_KEY_MAP = {
    character: 'savedChars',
    weapon: 'savedWeaps',
    calculate: 'savedCalculate',
};

const ENTITY_ID_KEY_MAP = {
    character: 'i',
    weapon: 'i',
    calculate: 'ci', 
};

export const useDataManager = (entityId, entityType, localBuildData, defaultBuildData, isDirty, setIsDirty) => {
    const { t } = useTranslation(['notifications']);

    const dataKey = useMemo(() => ENTITY_TYPE_TO_KEY_MAP[entityType], [entityType]);
    const idKey = useMemo(() => ENTITY_ID_KEY_MAP[entityType], [entityType]);
    const { appData, setData, isLoading: isStoreLoading } = useAppStore();

    const [saveExists, setSaveExists] = useState(false);
    const [comparisonState, setComparisonState] = useState(null);

    const savedDataForEntity = useMemo(() => {
        if (!appData || !dataKey || !idKey || !entityId) return null;
        return appData[dataKey]?.find(b => b[idKey] === entityId) || null;
    }, [appData, dataKey, idKey, entityId]);

    const initialBuildState = useMemo(() => {
        if (!savedDataForEntity) return defaultBuildData;
        return expandBuildData(savedDataForEntity, defaultBuildData);
    }, [savedDataForEntity, defaultBuildData]);

    // comparisonState устанавливается только при первой загрузке данных для этого entityId.
    // После сохранения (saveData сам ставит comparisonState) — НЕ перезаписываем,
    // чтобы не сбросить изменения пользователя.
    const initialisedForRef = useRef(null);
    useEffect(() => {
        // Запускаем только если ещё не инициализировано для текущего entityId
        if (initialisedForRef.current !== entityId) {
            initialisedForRef.current = entityId;
            setComparisonState(initialBuildState);
        }
    }, [entityId, initialBuildState]);
    
    useEffect(() => {
        setSaveExists(!!savedDataForEntity);
    }, [savedDataForEntity]);

    useEffect(() => {
        if (!comparisonState) return;
        // Исключаем поле `materials` из сравнения — оно пересчитывается автоматически
        // при каждом рендере и не является «ручным» изменением пользователя.
        const omitMaterials = (obj) => {
            const { materials: _m, ...rest } = obj || {};
            return rest;
        };
        // Было JSON.stringify(a) !== JSON.stringify(b) — ненадёжно при разном
        // порядке ключей: те же по значению объекты, собранные разными путями
        // (например, spread в другом порядке), давали разные строки и ложный
        // isDirty=true на ровном месте. isEqual сравнивает по значению, а не
        // по сериализованному тексту.
        const isChanged = !isEqual(omitMaterials(localBuildData), omitMaterials(comparisonState));
        setIsDirty(isChanged);
    }, [localBuildData, comparisonState, setIsDirty]);

    const saveData = useCallback(() => { // No more arguments
        if (!entityId || !dataKey || !idKey) return;

        // appData ещё не загружен (или инициализация упала, см. useAppStore.initialize).
        // Раньше `appData?.[dataKey] || []` в этом случае просто подставлял [] и
        // шёл дальше — а setData внутри при current==null мёржит патч с ПУСТЫМИ
        // дефолтами по всем остальным ключам (savedChars/inventory/priority/...),
        // не только с dataKey. То есть это не "тихо ничего не делает", а в
        // худшем случае тихо перетирает всё остальное сохранённое пустыми
        // значениями. На практике App.jsx блокирует роутинг полноэкранным
        // экраном ошибки, пока appData не готов, так что кнопка сюда обычно
        // недостижима — но полагаться только на это косвенно и не в этом хуке.
        if (appData == null) {
            showSaveNotification(t('dataNotReady', { ns: 'notifications' }), 'error');
            return;
        }

        const allBuilds = appData[dataKey] || [];

        // Маппинг verbose-полей buildData → компактный формат хранения —
        // вынесен в compactBuildData() (materialsCalculator.js), симметрично
        // expandBuildData(). Сам по себе покрыт unit-тестами отдельно от
        // этого хука (см. tests/materialsCalculator.test.js).
        const compact = compactBuildData(localBuildData);
        const newSaveData = { ...compact, [idKey]: entityId, ts: Date.now() };

        const existingIndex = allBuilds.findIndex(b => b[idKey] === entityId);
        const newBuildsArray = [...allBuilds];

        if (existingIndex > -1) {
            newBuildsArray[existingIndex] = newSaveData;
        } else {
            newBuildsArray.push(newSaveData);
        }

        // immediate:true — явное действие пользователя (клик "Сохранить/Обновить"),
        // debounce здесь недопустим: закрыл Mini App сразу после клика — и без
        // этого потерял бы изменения (см. комментарий в useAppStore.setData).
        setData({ [dataKey]: newBuildsArray }, { immediate: true });

        showSaveNotification(t(saveExists ? 'updateSuccess' : 'saveSuccess', { ns: 'notifications' }), 'success');
        
        // После сохранения — устанавливаем текущий verbose-buildData как чистое состояние.
        // Используем localBuildData (verbose), а не compact — потому что isDirty
        // сравнивает с localBuildData в том же формате.
        setComparisonState({ ...localBuildData });
        setIsDirty(false);
    }, [entityId, dataKey, idKey, localBuildData, appData, setData, t, saveExists, setIsDirty]);

    const deleteData = useCallback(() => {
        if (!entityId || !dataKey || !idKey) return;

        if (appData == null) {
            showSaveNotification(t('dataNotReady', { ns: 'notifications' }), 'error');
            return;
        }

        const newBuildsArray = (appData[dataKey] || []).filter(b => b[idKey] !== entityId);
        setData({ [dataKey]: newBuildsArray }, { immediate: true });
        showSaveNotification(t('deleteSuccess', { ns: 'notifications' }), 'success');
        
        setComparisonState(defaultBuildData);
        setIsDirty(true);
    }, [entityId, dataKey, idKey, appData, setData, t, defaultBuildData, setIsDirty]);

    return {
        saveExists,
        savedData: initialBuildState,
        isLoading: isStoreLoading,
        saveData,
        deleteData,
    };
};