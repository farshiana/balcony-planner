import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        login({ email, password }) {
            return auth.signInWithEmailAndPassword(email, password);
        },
        signup({ email, password }) {
            return auth.createUserWithEmailAndPassword(email, password);
        },
    },
    modules: {
    },
});
