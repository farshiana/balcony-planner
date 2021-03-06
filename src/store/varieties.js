import Vue from 'vue';
import { get } from '@/utils';

export default {
    namespaced: true,
    state: {
        varieties: [],
        loadingVarieties: false,
    },
    mutations: {
        setVarieties: (state, list) => { state.varieties = list; },
        setLoadingVarieties: (state, loadingVarieties) => { state.loadingVarieties = loadingVarieties; },
    },
    actions: {
        async loadVarieties({ commit }, query) {
            commit('setLoadingVarieties', true);
            const response = await get(`/varieties?query=${query}`);
            const body = await response.json();
            if (response.ok) {
                commit('setVarieties', body);
            } else {
                Vue.prototype.$error(body);
            }
            commit('setLoadingVarieties', false);
        },
    },
};
