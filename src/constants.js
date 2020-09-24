import i18n from './i18n';

export const API_URL = process.env.VUE_APP_API_URL;

// MONTHS
export const shortMonths = [
    i18n.t('shared.jan'), i18n.t('shared.feb'), i18n.t('shared.mar'),
    i18n.t('shared.apr'), i18n.t('shared.may'), i18n.t('shared.jun'),
    i18n.t('shared.jul'), i18n.t('shared.aug'), i18n.t('shared.sept'),
    i18n.t('shared.oct'), i18n.t('shared.nov'), i18n.t('shared.dec'),
];

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
export const exposures = EXPOSURES.map((exposure) => ({ value: exposure, text: i18n.t(exposure) }));

// WATERINGS
export const WATERING_LOW = 'low';
export const WATERING_MEDIUM = 'medium';
export const WATERING_HIGH = 'high';
export const WATERINGS = [
    WATERING_LOW,
    WATERING_MEDIUM,
    WATERING_HIGH,
];
export const waterings = WATERINGS.map((watering) => ({ value: watering, text: i18n.t(watering) }));

// SHAPES
export const SHAPE_CIRCLE = 'circle';
export const SHAPE_SQUARE = 'square';
export const SHAPE_RECTANGLE = 'rectangle';
export const SHAPES = [
    SHAPE_CIRCLE,
    SHAPE_SQUARE,
    SHAPE_RECTANGLE,
];

// COLORS
export const COLOR_RED = 'red';
export const COLOR_PINK = 'pink';
export const COLOR_PURPLE = 'purple';
export const COLOR_INDIGO = 'indigo';
export const COLOR_BLUE = 'blue';
export const COLOR_CYAN = 'cyan';
export const COLOR_TEAL = 'teal';
export const COLOR_GREEN = 'green';
export const COLOR_YELLOW = 'yellow';
export const COLOR_ORANGE = 'orange';
export const COLOR_BROWN = 'brown';
export const COLOR_GREY = 'grey';
export const COLORS = [
    COLOR_RED,
    COLOR_PINK,
    COLOR_PURPLE,
    COLOR_INDIGO,
    COLOR_BLUE,
    COLOR_CYAN,
    COLOR_TEAL,
    COLOR_GREEN,
    COLOR_YELLOW,
    COLOR_ORANGE,
    COLOR_BROWN,
    COLOR_GREY,
];
