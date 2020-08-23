<template>
    <v-app>
        <app-drawer :drawer="drawer" :mini="mini" @toggle="(show) => { drawer = show; }" />
        <v-app-bar app color="primary" dark>
            <v-spacer />
            <v-toolbar-title>{{ $t('app.title') }}</v-toolbar-title>
            <v-app-bar-nav-icon v-if="mini" @click.stop="drawer = !drawer;" />
        </v-app-bar>
        <v-main>
            <app-alert />
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64" />
            </v-overlay>
            <router-view class="fill-height" />
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import AppDrawer from '@/components/AppDrawer.vue';
import AppAlert from '@/components/AppAlert.vue';

export default {
    components: {
        AppDrawer,
        AppAlert,
    },
    data: () => ({
        drawer: true,
    }),
    computed: {
        ...mapState(['overlay']),

        mini() {
            return !!this.$vuetify.breakpoint.smAndDown;
        },
    },
};
</script>
