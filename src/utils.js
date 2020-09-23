import { API_URL } from '@/constants';
import i18n from './i18n';

export const shortMonths = [i18n.t('jan'), i18n.t('feb'), i18n.t('mar'), i18n.t('apr'), i18n.t('may'), i18n.t('jun'),
    i18n.t('jul'), i18n.t('aug'), i18n.t('sept'), i18n.t('oct'), i18n.t('nov'), i18n.t('dec')];

export const getShortMonth = (month) => shortMonths[month];

export const get = (route) => fetch(`${API_URL}${route}`, {
    // headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    // },
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

// export const getColors = (months, color) => {
//     const monthsCount = 12;
//     let colors = '';

//     const addColor = (color, month) => {
//         colors += `, ${color} ${month / monthsCount* 100}%`;
//     };

//     months.forEach((month, index) => {
//         if (index === 0) {
//             addColor(month === 0 ? color : 'transparent', 0);
//         } else if (month !== months[index - 1] + 1) {
//             addColor(color, months[index - 1] + 1);
//             addColor('transparent', months[index - 1] + 1);
//             addColor('transparent', month);
//             addColor(color, month);
//         }
//         if (index === months.length - 1) {
//             addColor(color, month + 1);
//             if (month !== monthsCount - 1) {
//                 addColor('transparent', month + 1);
//                 addColor('transparent', monthsCount);
//             }
//         }
//     });
//     return colors;
// };
