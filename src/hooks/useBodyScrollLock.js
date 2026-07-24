import { useEffect } from 'react';

// Модалок в проекте много (17+) и общего компонента-обёртки Modal нет —
// каждая рисует свой overlay сама. Вместо того чтобы дублировать
// document.body.style.overflow в каждой, один хук, который вызывается
// с булевым "открыто ли сейчас". Счётчик на уровне модуля — если вдруг
// открыты две модалки одновременно (например, подтверждение удаления
// поверх другой модалки), скролл разблокируется только когда закроется
// ПОСЛЕДНЯЯ из них, а не любая.
let lockCount = 0;
let previousOverflow = null;

export function useBodyScrollLock(isLocked) {
    useEffect(() => {
        if (!isLocked) return undefined;

        if (lockCount === 0) {
            previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
        lockCount += 1;

        return () => {
            lockCount = Math.max(0, lockCount - 1);
            if (lockCount === 0) {
                document.body.style.overflow = previousOverflow || '';
                previousOverflow = null;
            }
        };
    }, [isLocked]);
}
