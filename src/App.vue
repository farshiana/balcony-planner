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
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'isAdmin']),

        items() {
            const items = [
                { to: 'planning', icon: 'mdi-calendar-month', tooltip: this.$t('shared.planning') },
                { to: 'plants', icon: 'mdi-sprout', tooltip: this.$t('shared.plants') },
                { to: 'balcony', icon: 'mdi-window-open-variant', tooltip: this.$t('shared.balcony') },
            ];

            if (this.isAdmin) {
                items.push({ to: 'genera', icon: 'mdi-application-cog', tooltip: this.$t('shared.admin') });
            }
            return items;
        },
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
.moveable-control, .moveable-line {
    background: transparent !important;
    border: transparent !important;
}
.text-capitalize-first {
    &:first-letter {
        text-transform: uppercase;
    }
}
</style>
