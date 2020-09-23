<template>
    <v-container class="varieties">
        <v-data-table
            :headers="headers"
            :items="genus.varieties"
            :items-per-page="12"
            :loading="loading"
            dense
            class="elevation-1"
        >
            <template  v-slot:top>
                <v-row fill-height class="mr-1">
                    <v-spacer />
                    <v-btn class="mt-1" text small color="accent" @click="onAdd">
                        {{ $t('admin.varieties.addVariety') }}
                    </v-btn>
                </v-row>
            </template>
            <template v-slot:[`header.timeline`]="">
                <div class="d-flex flex-row justify-space-around">
                    <div
                        v-for="month in months"
                        :key="month"
                    >
                        {{ month }}
                    </div>
                </div>
            </template>
            <template v-slot:[`item.timeline`]="{ item }">
                <timeline
                    :seed="item.seed"
                    :plant="item.plant"
                    :harvest="item.harvest"
                />
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click.stop="onEdit(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click.stop="onDelete(item)"
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
import Vue from 'vue';
import { mapActions } from 'vuex';
import { SHORT_MONTHS } from '@/constants';
import Timeline from '../Timeline.vue';
import VarietyForm from './VarietyForm.vue';

export default {
    components: {
        Timeline,
        VarietyForm,
    },
    props: {
        genus: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            months: SHORT_MONTHS,
            loading: false,
            dialog: false,
            deleteDialog: false,
            deleting: false,
            variety: this.getDefaultVariety(),
            headers: [
                { value: 'name', text: this.$t('shared.name') },
                { value: 'exposure', text: this.$t('shared.exposure') },
                { value: 'watering', text: this.$t('shared.watering') },
                { value: 'timeline', text: '', sortable: false },
                { value: 'actions', text: '', sortable: false },
            ],
        };
    },
    async created() {
        this.loading = true;
        await this.loadVarieties(this.genus);
        this.loading = false;
    },
    methods: {
        ...mapActions('genera', ['loadVarieties', 'deleteVariety']),

        getDefaultVariety() {
            return {
                genusId: this.genus.id,
                name: '',
                exposure: '',
                watering: '',
                seed: [],
                plant: [],
                harvest: [],
            };
        },
        onAdd() {
            this.variety = this.getDefaultVariety();
            this.dialog = true;
        },
        onEdit(variety) {
            this.variety = Vue.util.extend({}, variety);
            this.dialog = true;
        },
        onDelete(variety) {
            this.variety = variety;
            this.deleteDialog = true;
        },
        async onConfirmDelete() {
            this.deleting = true;
            await this.deleteVariety(this.variety.id);
            this.deleting = false;
            this.deleteDialog = false;
        },
    },
};
</script>
