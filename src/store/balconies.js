import { balconies } from '@/firebase';

export default {
    namespaced: true,
    state: {
        balconies: [],
    },
    getters: {
    },
    mutations: {
        setBalconies: (state, collection) => { state.balconies = collection; },
    },
    actions: {
        async loadBalconies({ commit }) {
            try {
                const snapshot = await balconies.get();
                const collection = [];
                snapshot.forEach((doc) => {
                    collection.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                commit('setBalconies', collection);
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
        async addBalcony({ commit }, balcony) {
            try {
                await balconies.add(balcony);
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
