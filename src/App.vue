<template>
    <v-app>
        <v-navigation-drawer v-if="isAuthenticated" app>
        </v-navigation-drawer>

        <v-app-bar app color="primary">
        </v-app-bar>

        <v-main>
            <v-container class="fill-height" fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
};
</script>
