<template>
    <v-card class="panel ma-3">
        <v-bottom-navigation v-model="nav" color="primary" class="nav elevation-0">
            <v-btn value="plants">
                {{ $t('shared.plants') }}
                <v-icon>mdi-sprout</v-icon>
            </v-btn>
            <v-btn value="shapes">
                {{ $t('shared.planters') }}
                <v-icon>mdi-square-circle</v-icon>
            </v-btn>
        </v-bottom-navigation>
        <plants v-if="nav === 'plants'" />
        <shapes v-else />
    </v-card>
</template>

<script>
import Plants from './Plants.vue';
import Shapes from './Shapes.vue';

export default {
    components: {
        Plants,
        Shapes,
    },
    data() {
        return {
            nav: 'shapes', // TODO: put plants first
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
