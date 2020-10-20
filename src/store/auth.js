import Vue from 'vue';
import router from '@/router/index';
import {
    get, post, put, remove,
} from '@/utils';

export default {
    namespaced: true,
    state: {
        user: null,
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    mutations: {
        setUser: (state, user) => { state.user = user; },
    },
    actions: {
        async getUser({ commit }) {
            const response = await get('/auth/current');
            if (response.ok) {
                const body = await response.json();
                commit('setUser', body);
            } else {
                router.push({ name: 'login', query: { redirect: router.currentRoute.fullPath } });
            }
        },
        async register({ commit }, user) {
            const response = await post('/auth/register', user);
            const body = await response.json();
            if (response.ok) {
                commit('setUser', body);
                router.push(router.currentRoute.query.redirect || { name: 'planning' });
            } else {
                Vue.prototype.$error(body);
            }
        },
        async login({ commit }, user) {
            const response = await put('/auth/login', user);
            const body = await response.json();
            if (response.ok) {
                commit('setUser', body);
                router.push(router.currentRoute.query.redirect || { name: 'planning' });
            } else {
                Vue.prototype.$error(body);
            }
        },
        async logout({ commit }) {
            const response = await remove('/auth/logout');
            const body = await response.json();
            if (response.ok) {
                commit('setUser', null);
                router.push('login');
            } else {
                Vue.prototype.$error(body);
            }
        },
    },
};
