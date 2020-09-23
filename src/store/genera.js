import { get, put, post } from '@/utils';

const getGenusById = (state) => (id) => state.genera.find((genus) => genus.id === id);

export default {
    namespaced: true,
    state: {
        genera: [],
        loadingGenera: false,
    },
    getters: {
        getGenusById,
    },
    mutations: {
        setGenera: (state, list) => { state.genera = list; },
        setLoadingGenera: (state, loadingGenera) => { state.loadingGenera = loadingGenera; },
        setGenus: (state, genus) => {
            const current = getGenusById(state)(genus.id);
            if (current) {
                Object.assign(current, genus);
            } else {
                state.genera.push(genus);
            }
        },
        setVariety: (state, variety) => {
            const genus = getGenusById(state)(variety.genusId);
            const current = genus.varieties.find((item) => item.id === variety.id);
            if (current) {
                Object.assign(current, variety);
            } else {
                genus.varieties = [...genus.varieties, variety];
            }
        },
        setVarieties: (state, { genus, varieties }) => {
            const current = getGenusById(state)(genus.id);
            current.varieties = varieties;
        },
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
                commit('setGenus', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updateGenus({ commit }, genus) {
            const response = await put(`/genera/${genus.id}`, genus);
            const body = await response.json();
            if (response.ok) {
                commit('setGenus', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async loadVarieties({ commit }, genus) {
            const response = await get(`/varieties?genusId=${genus.id}`);
            const body = await response.json();
            if (response.ok) {
                commit('setVarieties', { genus, varieties: body });
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async addVariety({ commit }, variety) {
            const response = await post('/varieties', variety);
            const body = await response.json();
            if (response.ok) {
                commit('setVariety', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updateVariety({ commit }, variety) {
            const response = await put(`/varieties/${variety.id}`, variety);
            const body = await response.json();
            if (response.ok) {
                commit('setVariety', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
    },
};
