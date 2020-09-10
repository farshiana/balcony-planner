import { sortBy } from '@/utils';
import { API_URL } from '@/constants';

export default {
    namespaced: true,
    state: {
        genera: [],
    },
    getters: {
        getGenusById: (state) => (id) => state.genera.find((genus) => genus.id === id),
        getGeneraByCategory: (state) => (category) => (
            state.genera.filter((genus) => genus.category === category)
        ),
    },
    mutations: {
        setGenera: (state, collection) => { state.genera = collection; },
    },
    actions: {
        async loadGenera({ commit }) {
            try {
                const { data } = await fetch(`${API_URL}/genera`);
                data.sort(sortBy('name'));
                commit('setGenera', data);
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
