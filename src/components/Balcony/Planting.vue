<template>
    <div>
        <v-img :src="imageUrl" width="12px" height="12px" />
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

        imageUrl() {
            const plant = this.getPlantById(this.planting.plantId);
            return plant && plant.variety.imageUrl;
        },
    },
};
</script>
