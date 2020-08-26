import { balconies } from '@/firebase';

export default {
    namespaced: true,
    state: {
        balconies: [],
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
        async addBalcony({ rootState, commit, dispatch }, balcony) {
            try {
                await balconies.add({
                    ...balcony,
                    createdAt: new Date(),
                    createdBy: rootState.auth.user.uid,
                });
                dispatch('loadBalconies');
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
