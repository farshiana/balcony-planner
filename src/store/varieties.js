import { varieties } from '@/firebase';

export default {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async addVariety({ commit }, variety) {
            try {
                await varieties.add(variety);
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
