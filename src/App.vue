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
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import AppDrawer from '@/components/AppDrawer.vue';
import AppAlert from '@/components/AppAlert.vue';

export default {
    components: {
        AppDrawer,
        AppAlert,
    },
    data() {
        return {
            drawer: true,
        };
    },
    computed: {
        mini() {
            return !!this.$vuetify.breakpoint.smAndDown;
        },
    },
};
</script>
