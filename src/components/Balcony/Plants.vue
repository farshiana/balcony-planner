<template>
    <div :loading="loadingPlants || loadingGenera" class="pa-2">
        <plant
            v-for="plant in plants"
            :key="plant.id"
            :plant="plant"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Plant from './Plant.vue';

export default {
    components: {
        Plant,
    },
    computed: {
        ...mapState('plants', ['plants', 'loadingPlants']),
        ...mapState('genera', ['loadingGenera']),
    },
    created() {
        this.loadPlants();
        this.loadGenera();
    },
    methods: {
        ...mapActions('plants', ['loadPlants']),
        ...mapActions('genera', ['loadGenera']),
    },
};
</script>
