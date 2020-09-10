import router from '@/router/index';
import { API_URL } from '@/constants';

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
            const response = await fetch(`${API_URL}/users/current`);
            if (response.ok) {
                const body = await response.json();
                commit('setUser', body);
            } else {
                router.push({ name: 'login', query: { redirect: router.currentRoute.fullPath } });
            }
        },
        async login({ commit }, { email, password }) {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'PUT',
                body: JSON.stringify({ email, password }),
            });
            const body = await response.json();
            if (response.ok) {
                commit('setUser', body);
                router.push(router.currentRoute.query.redirect || { name: 'planning' });
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async register({ commit }, { username, email, password }) {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
            });
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
