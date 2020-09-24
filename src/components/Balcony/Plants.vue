<template>
    <v-list>
        <v-list-item
            v-for="plant in plants"
            :key="plant.id"
            :loading="loadingPlants"
            @click="selectPlant"
        >
            <v-list-item-content>
                <v-list-item-title v-text="plant.variety.name" />
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapState('plants', ['plants', 'loadingPlants']),
    },
    created() {
        this.loadPlants();
    },
    methods: {
        ...mapActions('plants', ['loadPlants']),

        selectPlant() {
            // TODO: implement
        },
    },
};
</script>
