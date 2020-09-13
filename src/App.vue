<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
            <v-spacer />
            <template v-if="isAuthenticated">
                <v-btn icon
                    v-for="item in items"
                    :key="item.to"
                    :to="item.to"
                >
                    <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
                <v-btn icon @click="logout">
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </template>
        </v-app-bar>
        <v-main>
            <app-alert />
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64" />
            </v-overlay>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import AppAlert from '@/components/AppAlert.vue';

export default {
    components: {
        AppAlert,
    },
    data() {
        return {
            items: [
                { to: 'planning', icon: 'mdi-calendar-month' },
                { to: 'plants', icon: 'mdi-sprout' },
                { to: 'balcony', icon: 'mdi-window-open-variant' },
                { to: 'admin', icon: 'mdi-application-cog' },
            ],
        };
    },
    computed: {
        ...mapState(['overlay']),
        ...mapGetters('auth', ['isAuthenticated']),
    },
    methods: {
        ...mapActions('auth', ['logout']),
    },
};
</script>
