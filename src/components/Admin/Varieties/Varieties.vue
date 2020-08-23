<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            show-group-by
            class="elevation-1"
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
        const headers = [
            { value: 'name', text: this.$t('name') },
            { value: 'category', text: this.$t('category'), groupable: true },
            { value: 'genus', text: this.$t('genus'), groupable: true },
        ];
        return {
            headers,
        };
    },
    computed: {
        ...mapState('varieties', ['varieties']),
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
        this.loadVarieties();
    },
    methods: {
        ...mapActions('varieties', ['loadVarieties']),
        ...mapActions('genera', ['loadGenera']),
    },
};
</script>
