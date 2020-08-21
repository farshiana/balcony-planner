<template>
    <v-app>
        <v-navigation-drawer app>
        </v-navigation-drawer>

        <v-app-bar app color="primary">
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>
