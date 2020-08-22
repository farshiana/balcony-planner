<template>
    <v-app>
        <v-navigation-drawer v-if="isAuthenticated" app>
        </v-navigation-drawer>

        <v-app-bar app color="primary">
            <template v-if="isAuthenticated">
                <v-spacer />
                <v-btn icon @click="logout"><v-icon color="white">mdi-logout</v-icon></v-btn>
            </template>
        </v-app-bar>

        <v-main>
            <app-alert />
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppAlert from '@/components/AppAlert.vue';

export default {
    components: { AppAlert },
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
    methods: {
        ...mapActions(['logout']),
    },
};
</script>
