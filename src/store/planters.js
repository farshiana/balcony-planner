import Vue from 'vue';
import {
    get, put, post, remove,
} from '@/utils';

const getPlanterById = (state) => (id) => state.planters.find((planter) => planter.id === id);

export default {
    namespaced: true,
    state: {
        planters: [],
        loadingPlanters: false,
    },
    mutations: {
        setPlanters: (state, list) => { state.planters = list; },
        setLoadingPlanters: (state, loadingPlanters) => { state.loadingPlanters = loadingPlanters; },
        setPlanter: (state, planter) => {
            const current = getPlanterById(state)(planter.id);
            if (current) {
                Object.assign(current, planter);
            } else {
                state.planters.push(planter);
            }
        },
        removePlanter: (state, planter) => {
            const index = state.planters.findIndex((item) => item.id === planter.id);
            state.planters.splice(index, 1);
        },
        setPlanting: (state, planting) => {
            const planter = getPlanterById(state)(planting.planterId);
            const current = planter.plantings.find((item) => item.id === planting.id);

            if (current) {
                Object.assign(current, planting);
            } else {
                planter.plantings.push(planting);
            }
        },
        removePlanting: (state, planting) => {
            const planter = getPlanterById(state)(planting.planterId);
            planter.plantings = planter.plantings.filter((item) => item.id !== planting.id);
        },
    },
    actions: {
        async loadPlanters({ commit }) {
            commit('setLoadingPlanters', true);
            const response = await get('/planters');
            const body = await response.json();
            if (response.ok) {
                commit('setPlanters', body);
            } else {
                Vue.prototype.$error(body);
            }
            commit('setLoadingPlanters', false);
        },
        async addPlanter({ commit }, planter) {
            const response = await post('/planters', planter);
            const body = await response.json();
            if (response.ok) {
                commit('setPlanter', body);
            } else {
                Vue.prototype.$error(body);
            }
        },
        async updatePlanter({ commit }, planter) {
            const response = await put(`/planters/${planter.id}`, planter);
            const body = await response.json();
            if (response.ok) {
                commit('setPlanter', body);
            } else {
                Vue.prototype.$error(body);
            }
        },
        async deletePlanter({ commit }, planter) {
            const response = await remove(`/planters/${planter.id}`, planter);
            const body = await response.json();
            if (response.ok) {
                commit('removePlanter', planter);
            } else {
                Vue.prototype.$error(body);
            }
        },
    },
};
