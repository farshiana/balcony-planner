<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            :loading="loadingVarieties"
            class="elevation-1"
            show-group-by
        />
        <variety-form />
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import VarietyForm from './VarietyForm.vue';

export default {
    components: {
        VarietyForm,
    },
    data() {
        return {
            headers: [
                { value: 'name', text: this.$t('name') },
                { value: 'category', text: this.$t('category'), groupable: true },
                { value: 'genus', text: this.$t('genus'), groupable: true },
                { value: 'exposure', text: this.$t('exposure') },
                { value: 'watering', text: this.$t('watering') },
            ],
        };
    },
    computed: {
        ...mapState('varieties', ['varieties', 'loadingVarieties']),
        ...mapGetters('genera', ['getGenusById']),

        items() {
            return this.varieties.map((variety) => ({
                ...variety,
                genus: this.getGenusById(variety.genusId).name,
            }));
        },
    },
    async created() {
        await this.loadGenera();
        await this.loadVarieties();
    },
    methods: {
        ...mapActions('varieties', ['loadVarieties']),
        ...mapActions('genera', ['loadGenera']),
    },
};
</script>
