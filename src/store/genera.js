import { genera } from '@/firebase';

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
                const snapshot = await genera.get();
                const collection = [];
                snapshot.forEach((doc) => {
                    collection.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                commit('setGenera', collection);
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
