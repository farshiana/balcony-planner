import { get, put, post } from '@/utils';

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
        setPlanting: (state, planting) => {
            const planter = getPlanterById(state)(planting.planterId);
            const current = planter.plantings.find((item) => item.id === planting.id);

            if (current) {
                Object.assign(current, planting);
            } else {
                planter.plantings.push(planting);
            }
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
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
            commit('setLoadingPlanters', false);
        },
        async addPlanter({ commit }, planter) {
            const response = await post('/planters', planter);
            const body = await response.json();
            if (response.ok) {
                commit('setPlanter', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updatePlanter({ commit }, planter) {
            const response = await put(`/planters/${planter.id}`, planter);
            const body = await response.json();
            if (response.ok) {
                commit('setPlanter', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
    },
};
