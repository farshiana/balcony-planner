import { get, put, post } from '@/utils';

export default {
    namespaced: true,
    state: {
        varieties: [],
        loadingVarieties: false,
    },
    mutations: {
        setVarieties: (state, list) => { state.varieties = list; },
        addVariety: (state, item) => { state.varieties.push(item); },
        updateVariety: (state, item) => {
            const current = state.varieties.find((variety) => variety.id === item.id);
            Object.assign(current, item);
        },
        setLoadingVarieties: (state, loadingVarieties) => { state.loadingVarieties = loadingVarieties; },
    },
    actions: {
        async loadVarieties({ commit }) {
            commit('setLoadingVarieties', true);
            const response = await get('/varieties');
            const body = await response.json();
            if (response.ok) {
                commit('setVarieties', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
            commit('setLoadingVarieties', false);
        },
        async addVariety({ commit }, { variety }) {
            const response = await post('/varieties', variety);
            const body = await response.json();
            if (response.ok) {
                commit('addVariety', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updateVariety({ commit }, variety) {
            const response = await put(`/varieties/${variety.id}`, variety);
            const body = await response.json();
            if (response.ok) {
                commit('updateVariety', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
    },
};
