import Vue from 'vue';
import {
    get, put, post, remove,
} from '@/utils';

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
        removePlant: (state, plant) => {
            const index = state.plants.findIndex((item) => item.id === plant.id);
            state.plants.splice(index, 1);
        },
    },
    actions: {
        async loadPlants({ commit }) {
            commit('setLoadingPlants', true);
            const response = await get('/plants');
            const body = await response.json();
            if (response.ok) {
                commit('setPlants', body);
            } else {
                Vue.prototype.$error(body);
            }
            commit('setLoadingPlants', false);
        },
        async addPlant({ dispatch }, plant) {
            const response = await post('/plants', plant);
            const body = await response.json();
            if (response.ok) {
                dispatch('loadPlants'); // TODO: will fetch associated variety
            } else {
                Vue.prototype.$error(body);
            }
        },
        async updatePlant({ dispatch }, plant) {
            const response = await put(`/plants/${plant.id}`, plant);
            const body = await response.json();
            if (response.ok) {
                dispatch('loadPlants'); // TODO: will fetch associated variety
            } else {
                Vue.prototype.$error(body);
            }
        },
        async deletePlant({ commit }, plant) {
            const response = await remove(`/plants/${plant.id}`, plant);
            const body = await response.json();
            if (response.ok) {
                commit('removePlant', body);
            } else {
                Vue.prototype.$error(body);
            }
        },
    },
};
