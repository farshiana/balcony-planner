import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/firebase';
import router from '@/router/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        alert: null,
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
        setAlert(state, alert) {
            state.alert = {
                type: 'error',
                ...alert,
            };
        },
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const { user } = await auth.signInWithEmailAndPassword(email, password);
                commit('setUser', user);
                router.push(router.currentRoute.query.redirect || { name: 'home' });
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error);
            }
        },
        async register({ commit }, { name, email, password }) {
            try {
                const { user } = await auth.createUserWithEmailAndPassword(email, password);
                await user.updateProfile({ displayName: name });
                commit('setUser', user);
                router.push(router.currentRoute.query.redirect || { name: 'home' });
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error);
            }
        },
        async logout({ commit }) {
            try {
                await auth.signOut();
                commit('setUser', null);
                router.push('login');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error);
            }
        },
    },
    modules: {
    },
});
