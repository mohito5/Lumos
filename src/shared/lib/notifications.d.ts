export type NotifType = 'success' | 'error' | 'info' | 'loading';

/** Показать уведомление. Возвращает id. duration=null — не закрывать автоматически. */
export declare function showNotification(
    message: string,
    type?: NotifType,
    duration?: number | null
): number;

/** Закрыть уведомление по id. */
export declare function dismissNotification(id: number): void;

/** Обновить текст и тип уже показанного уведомления. */
export declare function updateNotification(
    id: number,
    newMessage: string,
    newType?: NotifType,
    duration?: number | null
): void;

/** @deprecated Используй showNotification */
export declare function showSaveNotification(message: string, type?: string): void;
