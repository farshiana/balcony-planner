<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="12"
            :loading="loadingVarieties"
            class="elevation-1"
            show-group-by
            dense
        >
            <template  v-slot:top>
                <v-row fill-height class="mr-1">
                    <v-spacer />
                    <v-btn class="mt-1" text small color="accent" @click="onAdd">
                        {{ $t('admin.varieties.addVariety') }}
                    </v-btn>
                </v-row>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="onEdit(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="onDelete(item)"
                >
                    mdi-delete
                </v-icon>
                </template>
        </v-data-table>
        <variety-form
            :visible="dialog"
            :variety="variety"
            @toggle="(visible) => { dialog = visible; }"
        />
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
            dialog: false,
            variety: this.getDefaultVariety(),
            headers: [
                { value: 'name', text: this.$t('name'), groupable: false },
                { value: 'category', text: this.$t('category'), groupable: true },
                { value: 'genus', text: this.$t('genus'), groupable: true },
                { value: 'exposure', text: this.$t('exposure'), groupable: false },
                { value: 'watering', text: this.$t('watering'), groupable: false },
                {
                    value: 'actions', text: this.$t('actions'), groupable: false, sortable: false,
                },
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

        getDefaultVariety: () => ({
            category: '',
            genusId: '',
            name: '',
            exposure: '',
            watering: '',
            seed: [1, 2, 3, 4],
            plant: [3, 4, 5, 6],
            harvest: [5, 6, 7, 8, 9],
        }),
        onAdd() {
            this.variety = this.getDefaultVariety();
            this.dialog = true;
        },
        onEdit(variety) {
            this.variety = this.util.extend({}, variety);
            this.dialog = true;
        },
        onDelete(variety) {
            console.log(variety);
        },
    },
};
</script>
