import { get, put, post } from '@/utils';

export default {
    namespaced: true,
    state: {
        genera: [],
        loadingGenera: false,
    },
    getters: {
        getGenusById: (state) => (id) => state.genera.find((genus) => genus.id === id),
    },
    mutations: {
        setGenera: (state, list) => { state.genera = list; },
        addGenus: (state, item) => { state.genera.push(item); },
        updateGenus: (state, item) => {
            const current = state.genera.find((genus) => genus.id === item.id);
            Object.assign(current, item);
        },
        setLoadingGenera: (state, loadingGenera) => { state.loadingGenera = loadingGenera; },
    },
    actions: {
        async loadGenera({ commit }) {
            commit('setLoadingGenera', true);
            const response = await get('/genera');
            const body = await response.json();
            if (response.ok) {
                commit('setGenera', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
            commit('setLoadingGenera', false);
        },
        async addGenus({ commit }, genus) {
            const response = await post('/genera', genus);
            const body = await response.json();
            if (response.ok) {
                commit('addGenus', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updateGenus({ commit }, genus) {
            const response = await put(`/genera/${genus.id}`, genus);
            const body = await response.json();
            if (response.ok) {
                commit('updateGenus', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
    },
};
