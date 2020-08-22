import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { auth } from './firebase';
import i18n from './i18n';

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged((user) => {
    if (app) return;

    app = new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
        i18n,
        created() {
            store.commit('auth/setUser', user);
        },
    }).$mount('#app');
});
