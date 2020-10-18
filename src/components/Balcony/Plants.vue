<template>
    <div :loading="loadingPlants || loadingGenera" class="plants pa-2">
        <div
            v-for="plant in plants"
            :key="plant.id"
            :id="plant.id"
            class="plant d-flex flex-column align-center pa-2"
            draggable
            @dragstart="onDragStart($event, plant.variety.id)"
            @dragend="onDragEnd"
        >
            <div class="mr-1"><v-img :src="getImageUrl(plant)" width="12px" height="12px" /></div>
            <span>{{ plant.variety.name }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
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
        ...mapActions('plants', ['loadPlants']),
        ...mapActions('genera', ['loadGenera']),

        getImageUrl(row) {
            const genus = this.getGenusById(row.variety.genusId);
            return genus && genus.imageUrl;
        },
        /* eslint-disable no-param-reassign */
        onDragStart(event, varietyId) {
            event.target.style.opacity = 0.6;

            event.dataTransfer.setData('varietyId', varietyId);
            event.dataTransfer.dropEffect = 'copy';
            event.dataTransfer.effectAllowed = 'copy';
        },
        onDragEnd(event) {
            event.target.style.opacity = 1;
        },
        /* eslint-enable no-param-reassign */
    },
};
</script>

<style lang="scss" scoped>
.plants {
    .plant {
        cursor: move;
    }
}
</style>
