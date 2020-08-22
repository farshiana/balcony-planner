<template>
    <v-app>
        <app-drawer />
        <v-app-bar app color="primary" />
        <v-main>
            <app-alert />
            <router-view></router-view>
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
};
</script>
