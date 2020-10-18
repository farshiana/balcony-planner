<template>
    <div class="d-flex align-center justify-center pa-2">
        <div class="mr-1"><v-img :src="getImageUrl(plant)" width="12px" height="12px" /></div>
        <span>{{ plant.variety.name }}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        plant: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters('genera', ['getGenusById']),
    },
    methods: {
        getImageUrl(row) {
            const genus = this.getGenusById(row.variety.genusId);
            return genus && genus.imageUrl;
        },
    },
};
</script>
