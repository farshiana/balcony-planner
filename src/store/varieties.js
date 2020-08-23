import { varieties } from '@/firebase';

export default {
    namespaced: true,
    state: {
        varieties: [],
        loadingVarieties: false,
    },
    getters: {
    },
    mutations: {
        setVarieties: (state, collection) => { state.varieties = collection; },
        loadingVarieties: (state, loadingVarieties) => { state.loadingVarieties = loadingVarieties; },
    },
    actions: {
        async loadVarieties({ commit }) {
            commit('loadingVarieties', true);
            try {
                const snapshot = await varieties.get();
                const collection = [];
                snapshot.forEach((doc) => {
                    collection.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                commit('setVarieties', collection);
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
            commit('loadingVarieties', false);
        },
        async addVariety({ commit, dispatch }, variety) {
            try {
                await varieties.add(variety);
                dispatch('loadVarieties');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
