import { balconies } from '@/firebase';

export default {
    namespaced: true,
    state: {
        balconies: [],
        loadingBalconies: false,
    },
    mutations: {
        setBalconies: (state, collection) => { state.balconies = collection; },
        setLoadingBalconies: (state, loadingBalconies) => { state.loadingBalconies = loadingBalconies; },
    },
    actions: {
        async loadBalconies({ commit }) {
            commit('setLoadingBalconies', true);
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
            commit('setLoadingBalconies', false);
        },
        async addBalcony({ rootState, commit }, balcony) {
            try {
                await balconies.add({
                    ...balcony,
                    createdAt: new Date(),
                    createdBy: rootState.auth.user.uuid,
                });
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
