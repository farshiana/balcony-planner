<template>
    <v-card class="panel ma-3">
        <v-bottom-navigation v-model="nav" class="nav elevation-0">
            <v-btn value="plants">
                {{ $t('shared.plants') }}
                <v-icon>mdi-sprout</v-icon>
            </v-btn>
            <v-btn value="planters">
                {{ $t('shared.planters') }}
                <v-icon>mdi-square-circle</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            nav: 'plants',
        };
    },
};
</script>

<style lang="scss" scoped>
.panel {
    flex: 1 0;
    .nav {
        border-bottom: thin solid #CFD8DC;
        border-radius: 0;
    }
}
</style>
