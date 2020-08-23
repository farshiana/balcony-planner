<template>
    <v-navigation-drawer v-if="isAuthenticated" v-model="show" app :permanent="!mini" :mini-variant="mini">
        <v-divider />
        <v-list dense>
            <v-list-item
                v-for="item in items"
                :key="item.to"
                :to="item.to"
                link
            >
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <template v-slot:append v-if="isAuthenticated">
            <v-list dense>
                <v-list-item button @click="logout">
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('auth.logout') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        drawer: {
            type: Boolean,
            required: true,
        },
        mini: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            items: [
                { to: 'home', icon: 'mdi-home', title: this.$t('app.home') },
                { to: 'admin', icon: 'mdi-application-cog', title: this.$t('app.admin') },
            ],
        };
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),

        show: {
            get() {
                return this.drawer;
            },
            set(drawer) {
                this.$emit('toggle', drawer);
            },
        },
    },
    methods: {
        ...mapActions('auth', ['logout']),
    },
};
</script>
