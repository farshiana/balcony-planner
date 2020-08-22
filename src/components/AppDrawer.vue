<template>
    <v-navigation-drawer v-if="isAuthenticated" app bottom :mobile-breakpoint="960">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Balcony Planner
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
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
            <div class="pa-2">
                <v-btn block @click="logout">Logout</v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            items: [
                { to: 'home', icon: 'mdi-home', title: 'Home' },
                { to: 'admin', icon: 'mdi-application-cog', title: 'Admin' },
            ],
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
    methods: {
        ...mapActions(['logout']),
    },
};
</script>
