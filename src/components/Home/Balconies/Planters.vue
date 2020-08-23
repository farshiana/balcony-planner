<template>
    <v-card>
        <v-chip
            v-for="planter in planters"
            :key="planter.value"
            class="ma-2"
            color="accent elevation-3"
            dark
            small
            draggable
        >
            <v-avatar left>
                <v-icon small>{{ planter.icon }}</v-icon>
            </v-avatar>
            {{ planter.label }}
        </v-chip>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            planters: [
                { value: 'circle', icon: 'mdi-circle', label: this.$t('home.balconies.rounded') },
                { value: 'square', icon: 'mdi-square', label: this.$t('home.balconies.square') },
            ],
        };
    },
};
</script>
