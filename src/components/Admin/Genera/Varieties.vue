<template>
    <v-card class="varieties ma-3">
        <v-card-title>
            {{ $t('shared.varieties') }}
            <v-spacer />
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="$t('shared.searchPlaceholder')"
                single-line
                hide-details
            />
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="genus.varieties"
            :items-per-page="12"
            :loading="loading"
            dense
            :search="search"
        >
            <template  v-slot:top>
                <v-row fill-height class="mr-1">
                    <v-spacer />
                    <v-btn class="mt-1" text small color="accent" @click="onAdd">
                        {{ $t('admin.varieties.addVariety') }}
                    </v-btn>
                </v-row>
            </template>
            <template v-slot:[`item.name`]="{ item }">
                <div class="d-flex align-center">
                    <div class="mr-1"><v-img :src="item.imageUrl" width="12px" height="12px" /></div>
                    <span class="text-capitalize-first">{{ item.name }}</span>
                </div>
            </template>
            <template v-slot:[`item.exposure`]="{ item }">
                <div class="d-flex align-center">
                    <exposure :exposure="item.exposure" />
                </div>
            </template>
            <template v-slot:[`item.watering`]="{ item }">
                <div class="d-flex align-center">
                    <watering :watering="item.watering" />
                </div>
            </template>
            <template v-slot:[`header.timeline`]="">
                <div class="d-flex flex-row justify-space-around">
                    <div
                        v-for="month in shortMonths"
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
                <v-btn
                    icon
                    small
                    class="mr-2"
                    @click.stop="onEdit(item)"
                >
                    <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                    icon
                    small
                    @click.stop="onDelete(item)"
                >
                    <v-icon small>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <variety-form
            v-if="dialog"
            :visible="dialog"
            :variety="variety"
            @toggle="(visible) => { dialog = visible; }"
        />
        <delete-dialog
            :visible.sync="deleteDialog"
            :title="$t('admin.varieties.deleteVariety')"
            :name="variety.name"
            :deleting="deleting"
            @delete="onConfirmDelete"
        />
    </v-card>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import { shortMonths } from '@/constants';
import Timeline from '@/components/Timeline.vue';
import Exposure from '@/components/Exposure.vue';
import Watering from '@/components/Watering.vue';
import DeleteDialog from '@/components/DeleteDialog.vue';
import VarietyForm from './VarietyForm.vue';

export default {
    components: {
        Timeline,
        VarietyForm,
        Exposure,
        Watering,
        DeleteDialog,
    },
    props: {
        genus: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            search: '',
            shortMonths,
            loading: false,
            dialog: false,
            deleteDialog: false,
            deleting: false,
            variety: this.getDefaultVariety(),
            headers: [
                {
                    value: 'name', text: this.$t('shared.name'), sortable: true, filterable: true,
                },
                {
                    value: 'exposure', text: this.$t('shared.exposure'), sortable: true, filterable: false,
                },
                {
                    value: 'watering', text: this.$t('shared.watering'), sortable: true, filterable: false,
                },
                {
                    value: 'timeline', text: '', sortable: false, filterable: false,
                },
                {
                    value: 'actions', text: '', sortable: false, filterable: false,
                },
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
                imageUrl: '',
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
            await this.deleteVariety(this.variety);
            this.deleting = false;
            this.deleteDialog = false;
        },
    },
};
</script>
