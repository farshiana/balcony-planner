<template>
    <div :loading="loadingPlants" class="plants pa-2">
        <div
            v-for="plant in plants"
            :key="plant.id"
            class="d-flex flex-column align-center pa-2"
        >
            <div
                :id="plant.id"
                draggable
                @dragstart="onDragStart($event, plant.id)"
                @dragend="onDragEnd"
                class="plant mr-1"
            >
                <v-img :src="plant.variety.imageUrl" width="24px" height="24px" />
            </div>
            <span>{{ plant.variety.name }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState('plants', ['plants', 'loadingPlants']),
    },
    created() {
        this.loadPlants();
    },
    methods: {
        ...mapActions('plants', ['loadPlants']),

        /* eslint-disable no-param-reassign */
        onDragStart(event, plantId) {
            event.target.style.opacity = 0.6;

            event.dataTransfer.setData('plantId', plantId);
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
