import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import genera from './genera';
import plants from './plants';
import varieties from './varieties';
import planters from './planters';
import plantings from './plantings';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        genera,
        plants,
        varieties,
        planters,
        plantings,
    },
});
