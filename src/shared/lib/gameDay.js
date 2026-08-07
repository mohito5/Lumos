import { DAYS } from '../config/constants';

/**
 * Игровой день в Genshin Impact переключается не в календарную полночь, а в
 * момент ежедневного сброса сервера — 04:00 по времени сервера (см. также
 * ServerTimer.jsx: resetHour = 4 для всех трёх серверов). Ротация доменов
 * («книги талантов открыты по понедельникам») тоже завязана именно на этот
 * сброс, а не на 00:00.
 *
 * Приложение нигде не спрашивает пользователя, на каком он сервере, поэтому
 * здесь используется разумное приближение: локальное время устройства,
 * сдвинутое на GAME_DAY_RESET_HOUR назад. Всё, что раньше 04:00, считается
 * ещё «вчерашним» игровым днём. Это не идеально для игроков, чей часовой
 * пояс сильно отличается от пояса их сервера (тогда сброс приходится не
 * ровно на 4 утра по их часам) — но кардинально точнее, чем календарная
 * полночь, которой раньше пользовался DailyFarmableMaterialsBlock.
 */
export const GAME_DAY_RESET_HOUR = 4;

// Порядок совпадает с индексами Date.getDay() (0 = воскресенье).
export const GAME_DAY_ORDER = [
    DAYS.SUNDAY,
    DAYS.MONDAY,
    DAYS.TUESDAY,
    DAYS.WEDNESDAY,
    DAYS.THURSDAY,
    DAYS.FRIDAY,
    DAYS.SATURDAY,
];

/**
 * Возвращает «игровой день» (одно из значений DAYS.*) для переданной даты
 * (по умолчанию — текущий момент), с учётом сдвига на GAME_DAY_RESET_HOUR.
 */
export function getGameDay(date = new Date()) {
    const shifted = new Date(date.getTime() - GAME_DAY_RESET_HOUR * 60 * 60 * 1000);
    return GAME_DAY_ORDER[shifted.getDay()];
}
