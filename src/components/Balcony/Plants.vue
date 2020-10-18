<template>
    <div class="pa-2">
        <div
            v-for="plant in plants"
            :key="plant.id"
            :loading="loadingPlants"
            class="d-flex align-center justify-center pa-2"
            @click="selectPlant"
        >

            <div class="mr-1"><v-img :src="getImageUrl(plant)" width="12px" height="12px" /></div>
            <span>{{ plant.variety.name }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapState('plants', ['plants', 'loadingPlants']),
        ...mapState('genera', ['loadingGenera']),
        ...mapGetters('genera', ['getGenusById']),
    },
    created() {
        this.loadPlants();
        this.loadGenera();
    },
    methods: {
        ...mapActions('plants', ['loadPlants', 'deletePlant']),
        ...mapActions('genera', ['loadGenera']),

        selectPlant() {
            // TODO: implement
        },
        getImageUrl(row) {
            const genus = this.getGenusById(row.variety.genusId);
            return genus && genus.imageUrl;
        },
    },
};
</script>
