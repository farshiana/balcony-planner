import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { auth } from './firebase';

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged((user) => {
    if (app) return;

    app = new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
        created() {
            store.commit('setUser', user);
        },
    }).$mount('#app');
});
