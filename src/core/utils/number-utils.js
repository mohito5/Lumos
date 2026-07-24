export function formatNumber(number, lang = 'ru') {
    if (typeof number !== 'number') {
        number = parseInt(number) || 0;
    }

    if (number >= 1000000) {
        const formatted = (number / 1000000).toFixed(1).replace('.0', '');
        const suffix = getTranslation('format.million', lang) || (lang === 'ru' ? 'млн' : 'M');
        return `${formatted}${suffix}`;
    } else if (number >= 1000) {
        const formatted = (number / 1000).toFixed(1).replace('.0', '');
        const suffix = getTranslation('format.thousand', lang) || (lang === 'ru' ? 'к' : 'K');
        return `${formatted}${suffix}`;
    }

    return number.toLocaleString(lang);
}

export function parseFormattedNumber(formattedString, lang = 'ru') {
    if (!formattedString) return 0;

    const millionSuffix = getTranslation('format.million', lang) || (lang === 'ru' ? 'млн' : 'M');
    const thousandSuffix = getTranslation('format.thousand', lang) || (lang === 'ru' ? 'к' : 'K');

    let str = formattedString.toString().trim().toLowerCase();
    str = str.replace(/\s/g, '');

    if (str.includes(millionSuffix.toLowerCase()) || str.includes('m') || str.includes('млн')) {
        const num = parseFloat(str.replace(/[^0-9.]/g, ''));
        return Math.round(num * 1000000);
    }

    if (str.includes(thousandSuffix.toLowerCase()) || str.includes('k') || str.includes('к')) {
        const num = parseFloat(str.replace(/[^0-9.]/g, ''));
        return Math.round(num * 1000);
    }

    return parseInt(str.replace(/[^0-9]/g, '')) || 0;
}
