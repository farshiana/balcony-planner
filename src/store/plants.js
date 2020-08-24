import { plants } from '@/firebase';

export default {
    namespaced: true,
    state: {
        plants: [],
        loadingPlants: false,
    },
    mutations: {
        setPlants: (state, collection) => { state.plants = collection; },
        setLoadingPlants: (state, loadingPlants) => { state.loadingPlants = loadingPlants; },
    },
    actions: {
        async loadPlants({ commit }) {
            commit('setLoadingPlants', true);
            try {
                const snapshot = await plants.orderBy('name', 'asc').get();
                const collection = [];
                snapshot.forEach((doc) => {
                    collection.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                commit('setPlants', collection);
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
            commit('setLoadingPlants', false);
        },
        async addVariety({ rootState, commit, dispatch }, variety) {
            try {
                await plants.add({
                    ...variety,
                    createdAt: new Date(),
                    createdBy: rootState.auth.user.uid,
                });
                dispatch('loadPlants');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
