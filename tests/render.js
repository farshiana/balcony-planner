import Vue from 'vue';
import { render as r } from '@testing-library/vue';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import { routes } from '@/router/index';
import messages from '@/locales/en.json';
import { getDefaultStore } from '@/store/index';

Vue.use(Vuetify);

export default (ui, { store: storeOverrides = {} } = {}) => r(
    ui,
    {
        routes: routes.slice(0, -1),
        store: { ...getDefaultStore(), ...storeOverrides },
    },
    (vue, store, router) => {
        vue.use(VueI18n);

        const i18n = new VueI18n({ locale: 'en', messages: { en: messages }, silentTranslationWarn: true });
        return { i18n, router, vuetify: new Vuetify() };
    },
);
