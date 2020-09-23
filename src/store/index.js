import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import genera from './genera';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        alert: null,
        overlay: false,
    },
    mutations: {
        setAlert: (state, alert) => { state.alert = { type: 'error', ...alert }; },
        setOverlay: (state, overlay) => { state.overlay = overlay; },
    },
    modules: {
        auth,
        genera,
    },
});
