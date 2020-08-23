import { varieties } from '@/firebase';

export default {
    namespaced: true,
    state: {
        varieties: [],
    },
    getters: {
    },
    mutations: {
        setVarieties: (state, collection) => { state.varieties = collection; },
    },
    actions: {
        async loadVarieties({ commit }) {
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
        },
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
