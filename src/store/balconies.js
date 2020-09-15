import { get, put, post } from '@/utils';

export default {
    namespaced: true,
    state: {
        balconies: [],
    },
    mutations: {
        setBalconies: (state, list) => { state.balconies = list; },
        addBalcony: (state, item) => { state.balconies.push(item); },
        updateBalcony: (state, item) => {
            const current = state.balconies.find((balcony) => balcony.id === item.id);
            Object.assign(current, item);
        },
    },
    actions: {
        async loadBalconies({ commit }) {
            const response = await get('/balconies');
            const body = await response.json();
            if (response.ok) {
                commit('setBalconies', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async addBalcony({ commit }, balcony) {
            const response = await post('/balconies', balcony);
            const body = await response.json();
            if (response.ok) {
                commit('addBalcony', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updateBalcony({ commit }, balcony) {
            const response = await put(`/balconies/${balcony.id}`, balcony);
            const body = await response.json();
            if (response.ok) {
                commit('updateBalcony', body);
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
    },
};
