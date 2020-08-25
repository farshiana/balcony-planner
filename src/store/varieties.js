import { varieties } from '@/firebase';

export default {
    namespaced: true,
    state: {
        varieties: [],
        loadingVarieties: false,
    },
    mutations: {
        setVarieties: (state, collection) => { state.varieties = collection; },
        setLoadingVarieties: (state, loadingVarieties) => { state.loadingVarieties = loadingVarieties; },
    },
    actions: {
        async loadVarieties({ commit }) {
            commit('setLoadingVarieties', true);
            try {
                const snapshot = await varieties.orderBy('name', 'asc').get();
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
            commit('setLoadingVarieties', false);
        },
        async addVariety({ rootState, commit, dispatch }, variety) {
            try {
                await varieties.add({
                    ...variety,
                    createdAt: new Date(),
                    createdBy: rootState.auth.user.uid,
                });
                dispatch('loadVarieties');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
        async updateVariety({ rootState, commit, dispatch }, { id, ...variety }) {
            try {
                await varieties.doc(id).update({
                    ...variety,
                    updatedAt: new Date(),
                    updatedBy: rootState.auth.user.uid,
                });
                dispatch('loadVarieties');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
        async deleteVariety({ commit, dispatch }, varietyId) {
            try {
                await varieties.doc(varietyId).delete();
                dispatch('loadVarieties');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
