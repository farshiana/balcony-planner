<template>
    <v-img
        class="planting plant"
        :style="{
            left: planting.position.left,
            top: planting.position.top,
        }"
        :src="imageUrl"
        width="24px"
        height="24px"
        @click="$emit('edit')"
    />
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

<style lang="scss" scoped>
.planting {
    cursor: pointer;
}
</style>
