import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './i18n';

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
