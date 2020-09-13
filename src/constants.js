import i18n from './i18n';

export const API_URL = process.env.VUE_APP_API_URL;

// MONTHS
export const SHORT_MONTHS = [i18n.t('jan'), i18n.t('feb'), i18n.t('mar'), i18n.t('apr'), i18n.t('may'), i18n.t('jun'),
    i18n.t('jul'), i18n.t('aug'), i18n.t('sept'), i18n.t('oct'), i18n.t('nov'), i18n.t('dec')];

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
