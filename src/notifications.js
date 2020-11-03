import Vue from 'vue';
import Notifications from 'vue-notification';
import i18n from './i18n';

Vue.use(Notifications);

Vue.prototype.$error = (body) => {
    console.error(body);
    Vue.notify({
        type: 'error',
        title: i18n.t('shared.errorOccurred'),
        text: body.message,
    });
};
