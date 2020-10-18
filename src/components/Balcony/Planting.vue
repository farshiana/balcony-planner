<template>
    <div>
        <v-img :src="plant.variety.imageUrl" width="12px" height="12px" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        planting: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters('plants', ['getPlantById']),

        plant() {
            return this.getPlantById(this.planting.plantId);
        },
    },
};
</script>
