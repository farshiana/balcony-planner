import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import balconies from './balconies';
import genera from './genera';
import varieties from './varieties';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        alert: null,
    },
    mutations: {
        setAlert: (state, alert) => { state.alert = { type: 'error', ...alert }; },
    },
    modules: {
        auth,
        balconies,
        genera,
        varieties,
    },
});
