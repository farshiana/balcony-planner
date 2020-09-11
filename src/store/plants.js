import { get } from '@/utils';

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
            const response = await get('/plants');
            const body = await response.json();
            if (response.ok) {
                commit('setPlants', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
            commit('setLoadingPlants', false);
        },
        // async addVariety({ rootState, commit, dispatch }, variety) {
        //     try {
        //         // await plants.add({
        //         //     ...variety,
        //         //     createdAt: new Date(),
        //         //     createdBy: rootState.auth.user.uid,
        //         // });
        //         dispatch('loadPlants');
        //     } catch (error) {
        //         console.error(error.message);
        //         commit('setAlert', error, { root: true });
        //     }
        // },
    },
};
