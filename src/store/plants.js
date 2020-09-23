import { get, put, post } from '@/utils';

const getPlantById = (state) => (id) => state.plants.find((plant) => plant.id === id);

export default {
    namespaced: true,
    state: {
        plants: [],
        loadingPlants: false,
    },
    getters: {
        getPlantById,
    },
    mutations: {
        setPlants: (state, list) => { state.plants = list; },
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
        async addPlant({ commit, dispatch }, plant) {
            const response = await post('/plants', plant);
            const body = await response.json();
            if (response.ok) {
                dispatch('loadPlants'); // will fetch associated variety
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updatePlant({ commit, dispatch }, plant) {
            const response = await put(`/plants/${plant.id}`, plant);
            const body = await response.json();
            if (response.ok) {
                dispatch('loadPlants'); // will fetch associated variety
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
    },
};
