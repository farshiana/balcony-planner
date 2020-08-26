import { auth } from '@/firebase';
import router from '@/router/index';

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
        async login({ commit }, { email, password }) {
            try {
                const { user } = await auth.signInWithEmailAndPassword(email, password);
                commit('setUser', user);
                router.push(router.currentRoute.query.redirect || { name: 'planning' });
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
        async register({ commit }, { name, email, password }) {
            try {
                const { user } = await auth.createUserWithEmailAndPassword(email, password);
                await user.updateProfile({ displayName: name });
                commit('setUser', user);
                router.push(router.currentRoute.query.redirect || { name: 'planning' });
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
        async logout({ commit }) {
            try {
                await auth.signOut();
                commit('setUser', null);
                router.push('login');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
