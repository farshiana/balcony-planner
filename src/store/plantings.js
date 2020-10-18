import { put, post } from '@/utils';

export default {
    namespaced: true,
    actions: {
        async addPlanting({ commit }, planting) {
            const response = await post('/plantings', planting);
            const body = await response.json();
            if (!response.ok) {
                // TODO: add to planter
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
        async updatePlanting({ commit }, planting) {
            const response = await put(`/plantings/${planting.id}`, planting);
            const body = await response.json();
            if (response.ok) {
                // TODO: add to planter
            } else {
                console.error(response, body);
                commit('setAlert', body, { root: true });
            }
        },
    },
};
