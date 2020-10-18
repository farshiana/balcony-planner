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
export const SHAPE_RECTANGLE = 'rectangle';
export const SHAPE_CIRCLE = 'circle';
export const SHAPE_SQUARE = 'square';
export const SHAPES = [
    SHAPE_RECTANGLE,
    SHAPE_CIRCLE,
    SHAPE_SQUARE,
];
export const shapes = SHAPES.map((shape) => ({ value: shape, text: i18n.t(shape) }));

// COLORS
export const COLOR_BLUE = 'blue';
export const COLOR_BROWN = 'brown';
export const COLOR_CYAN = 'cyan';
export const COLOR_GREEN = 'green';
export const COLOR_GREY = 'grey';
export const COLOR_INDIGO = 'indigo';
export const COLOR_ORANGE = 'orange';
export const COLOR_PINK = 'pink';
export const COLOR_PURPLE = 'purple';
export const COLOR_RED = 'red';
export const COLOR_TEAL = 'teal';
export const COLOR_YELLOW = 'yellow';
export const COLORS = [
    COLOR_BLUE,
    COLOR_BROWN,
    COLOR_CYAN,
    COLOR_GREEN,
    COLOR_GREY,
    COLOR_INDIGO,
    COLOR_ORANGE,
    COLOR_PINK,
    COLOR_PURPLE,
    COLOR_RED,
    COLOR_TEAL,
    COLOR_YELLOW,
];
export const colors = [
    { value: COLOR_BLUE, text: i18n.t(COLOR_BLUE), hex: '#2196F3' },
    { value: COLOR_BROWN, text: i18n.t(COLOR_BROWN), hex: '#795548' },
    { value: COLOR_CYAN, text: i18n.t(COLOR_CYAN), hex: '#00BCD4' },
    { value: COLOR_GREEN, text: i18n.t(COLOR_GREEN), hex: '#4CAF50' },
    { value: COLOR_GREY, text: i18n.t(COLOR_GREY), hex: '#607D8B' },
    { value: COLOR_INDIGO, text: i18n.t(COLOR_INDIGO), hex: '#3F51B5' },
    { value: COLOR_ORANGE, text: i18n.t(COLOR_ORANGE), hex: '#FF9800' },
    { value: COLOR_PINK, text: i18n.t(COLOR_PINK), hex: '#E91E63' },
    { value: COLOR_PURPLE, text: i18n.t(COLOR_PURPLE), hex: '#673AB7' },
    { value: COLOR_RED, text: i18n.t(COLOR_RED), hex: '#F44336' },
    { value: COLOR_TEAL, text: i18n.t(COLOR_TEAL), hex: '#009688' },
    { value: COLOR_YELLOW, text: i18n.t(COLOR_YELLOW), hex: '#FFEB3B' },
];
