import i18n from './i18n';

export const API_URL = process.env.API_URL;

// CATEGORIES
export const CATEGORY_FRUITS = 'fruits';
export const CATEGORY_HERBS = 'herbs';
export const CATEGORY_VEGETABLES = 'vegetables';
export const CATEGORIES = [
    CATEGORY_FRUITS,
    CATEGORY_HERBS,
    CATEGORY_VEGETABLES,
];

// EXPOSURES
export const EXPOSURE_SHADE = 'shade';
export const EXPOSURE_SUN = 'sun';
export const EXPOSURE_PARTIAL = 'partial';
export const EXPOSURES = [
    EXPOSURE_PARTIAL,
    EXPOSURE_SHADE,
    EXPOSURE_SUN,
];

// WATERINGS
export const WATERING_LOW = 'low';
export const WATERING_MEDIUM = 'medium';
export const WATERING_HIGH = 'high';
export const WATERINGS = [
    WATERING_LOW,
    WATERING_MEDIUM,
    WATERING_HIGH,
];

// MONTHS
export const SHORT_MONTHS = [i18n.t('jan'), i18n.t('feb'), i18n.t('mar'), i18n.t('apr'), i18n.t('may'), i18n.t('jun'),
    i18n.t('jul'), i18n.t('aug'), i18n.t('sept'), i18n.t('oct'), i18n.t('nov'), i18n.t('dec')];
