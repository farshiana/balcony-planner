import router from '@/router/index';
import { get, post, put } from '@/utils';

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
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async login({ commit }, user) {
            const response = await put('/auth/login', user);
            const body = await response.json();
            if (response.ok) {
                commit('setUser', body);
                router.push(router.currentRoute.query.redirect || { name: 'planning' });
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async logout({ commit }) {
            try {
                // await auth.signOut();
                commit('setUser', null);
                router.push('login');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
