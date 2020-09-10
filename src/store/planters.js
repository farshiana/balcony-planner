export default {
    namespaced: true,
    state: {
        planters: [],
        loadingPlanters: false,
    },
    mutations: {
        setPlanters: (state, collection) => { state.planters = collection; },
        setLoadingPlanters: (state, loadingPlanters) => { state.loadingPlanters = loadingPlanters; },
    },
    actions: {
        async loadPlanters({ commit }, balconyId) {
            commit('setLoadingPlanters', true);
            try {
                const snapshot = await planters.where('balconyId', '==', balconyId).get();
                const collection = [];
                snapshot.forEach((doc) => {
                    collection.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                commit('setPlanters', collection);
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
            commit('setLoadingPlanters', false);
        },
        async addPlanter({ rootState, commit }, planter) {
            try {
                await planters.add({
                    ...planter,
                    createdAt: new Date(),
                    createdBy: rootState.auth.user.uid,
                });
            } catch (error) {
                console.error(error.message);
                commit('setAlert', error, { root: true });
            }
        },
    },
};
