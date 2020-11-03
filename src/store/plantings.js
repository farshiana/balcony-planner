import Vue from 'vue';
import { put, post, remove } from '@/utils';

export default {
    namespaced: true,
    actions: {
        async addPlanting({ commit }, planting) {
            const response = await post('/plantings', planting);
            const body = await response.json();
            if (response.ok) {
                commit('planters/setPlanting', body, { root: true });
            } else {
                Vue.prototype.$error(body);
            }
        },
        async updatePlanting({ commit }, planting) {
            const response = await put(`/plantings/${planting.id}`, planting);
            const body = await response.json();
            if (response.ok) {
                commit('planters/setPlanting', body, { root: true });
            } else {
                Vue.prototype.$error(body);
            }
        },
        async deletePlanting({ commit }, planting) {
            const response = await remove(`/plantings/${planting.id}`, planting);
            const body = await response.json();
            if (response.ok) {
                commit('planters/removePlanting', planting, { root: true });
            } else {
                Vue.prototype.$error(body);
            }
        },
    },
};
