import { API_URL } from '@/constants';
import i18n from './i18n';

export const shortMonths = [i18n.t('jan'), i18n.t('feb'), i18n.t('mar'), i18n.t('apr'), i18n.t('may'), i18n.t('jun'),
    i18n.t('jul'), i18n.t('aug'), i18n.t('sept'), i18n.t('oct'), i18n.t('nov'), i18n.t('dec')];

export const getShortMonth = (month) => shortMonths[month];

export const sortBy = (key) => (a, b) => {
    if (a[key] > b[key]) return 1;

    return b[key] > a[key] ? -1 : 0;
};

export const post = (route, body) => fetch(`${API_URL}${route}`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
});

export const put = (route, body) => fetch(`${API_URL}${route}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
});
