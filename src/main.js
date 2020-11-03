import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import './notifications';

Sentry.init({
    dsn: 'https://59f880f1e62b48228ba3a57592aaa5eb@o466598.ingest.sentry.io/5481588',
    integrations: [
        new VueIntegration({ Vue, tracing: true }),
        new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const { user } = store.state.auth;

    if (requiresAuth && !user) {
        next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});

const init = async () => {
    await store.dispatch('auth/getUser');

    new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
        i18n,
    }).$mount('#app');
};

init();
