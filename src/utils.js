import { API_URL } from '@/constants';
import i18n from './i18n';

export const shortMonths = [i18n.t('shared.jan'), i18n.t('shared.feb'), i18n.t('shared.mar'),
    i18n.t('shared.apr'), i18n.t('shared.may'), i18n.t('shared.jun'),
    i18n.t('shared.jul'), i18n.t('shared.aug'), i18n.t('shared.sept'),
    i18n.t('shared.oct'), i18n.t('shared.nov'), i18n.t('shared.dec'),
];

export const getShortMonth = (month) => shortMonths[month];

export const get = (route) => fetch(`${API_URL}${route}`, {
    credentials: 'include',
});

export const post = (route, body) => fetch(`${API_URL}${route}`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
});

export const put = (route, body) => fetch(`${API_URL}${route}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
});
