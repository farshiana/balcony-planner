import { get, put, post } from '@/utils';

export default {
    namespaced: true,
    state: {
        planters: [],
        loadingPlanters: false,
    },
    mutations: {
        setPlanters: (state, list) => { state.planters = list; },
        addPlanter: (state, item) => { state.planters.push(item); },
        updatePlanter: (state, item) => {
            const current = state.planters.find((planter) => planter.id === item.id);
            Object.assign(current, item);
        },
        setLoadingPlanters: (state, loadingPlanters) => { state.loadingPlanters = loadingPlanters; },
    },
    actions: {
        async loadPlanters({ commit }) {
            commit('setLoadingPlanters', true);
            const response = await get('/planters');
            const body = await response.json();
            if (response.ok) {
                commit('setPlanters', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
            commit('setLoadingPlanters', false);
        },
        async addPlanter({ commit }, planter) {
            const response = await post('/planters', planter);
            const body = await response.json();
            if (response.ok) {
                commit('addPlanter', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updatePlanter({ commit }, planter) {
            const response = await put(`/planters/${planter.id}`, planter);
            const body = await response.json();
            if (response.ok) {
                commit('updatePlanter', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
    },
};
