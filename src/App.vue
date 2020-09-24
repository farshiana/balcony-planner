<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>{{ $t('shared.title') }}</v-toolbar-title>
            <v-spacer />
            <template v-if="isAuthenticated">
                <v-tooltip
                    v-for="item in items"
                    :key="item.to"
                    bottom
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            icon
                            :to="{ name: item.to }"
                        >
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ item.tooltip }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            icon
                            @click="logout"
                        >
                            <v-icon>mdi-logout</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ $t('auth.logout') }}</span>
                </v-tooltip>
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
                { to: 'planning', icon: 'mdi-calendar-month', tooltip: this.$t('shared.planning') },
                { to: 'plants', icon: 'mdi-sprout', tooltip: this.$t('shared.plants') },
                { to: 'balcony', icon: 'mdi-window-open-variant', tooltip: this.$t('shared.balcony') },
                { to: 'genera', icon: 'mdi-application-cog', tooltip: this.$t('shared.admin') },
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

<style lang="scss">
.clickable {
    cursor: pointer;
}
.disable-events {
    pointer-events: none
}
</style>
