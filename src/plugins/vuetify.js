import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#009688',
                secondary: '#e91e63',
                accent: '#2196f3',
                error: '#f44336',
                warning: '#ff5722',
                info: '#607d8b',
                success: '#4caf50',
            },
        },
    },
});
