<template>
    <v-card class="ma-3" style="position: initial">
        <v-card-title>
            {{ $t('shared.plants') }}
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
            :items="plants"
            :items-per-page="12"
            :loading="loadingPlants"
            show-group-by
            dense
            :search="search"
            :item-class="() => 'clickable'"
            @click:row="onSelect"
        >
            <template  v-slot:top>
                <v-row fill-height class="mr-1">
                    <v-spacer />
                    <v-btn class="mt-1" text small color="accent" @click="onAdd">
                        {{ $t('plants.addPlant') }}
                    </v-btn>
                </v-row>
            </template>
            <template v-slot:[`item.variety.name`]="{ item }">
                <div class="d-flex align-center">
                    <div class="mr-1"><v-img :src="item.variety.imageUrl" width="12px" height="12px" /></div>
                    <span class="text-capitalize-first">{{ item.variety.name }}</span>
                </div>
            </template>
            <template v-slot:[`item.variety.exposure`]="{ item }">
                <div class="d-flex align-center">
                    <exposure :exposure="item.variety.exposure" />
                </div>
            </template>
            <template v-slot:[`item.variety.watering`]="{ item }">
                <div class="d-flex align-center">
                    <watering :watering="item.variety.watering" />
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
                    :seed="item.variety.seed"
                    :plant="item.variety.plant"
                    :harvest="item.variety.harvest"
                />
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                    small
                    icon
                    class="mr-2"
                    @click.stop="onEdit(item)"
                >
                    <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                    small
                    icon
                    @click.stop="onDelete(item)"
                >
                    <v-icon small>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <plant-form
            :visible="dialog"
            :plant="plant"
            @toggle="(visible) => { dialog = visible; }"
        />
        <delete-dialog
            :visible.sync="deleteDialog"
            :title="$t('plants.deletePlant')"
            :name="plant.variety && plant.variety.name"
            :deleting="deleting"
            @delete="onConfirmDelete"
        />
        <router-view />
    </v-card>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import PlantForm from '@/components/Plants/PlantForm.vue';
import { shortMonths } from '@/constants';
import Timeline from '@/components/Timeline.vue';
import Exposure from '@/components/Exposure.vue';
import Watering from '@/components/Watering.vue';
import DeleteDialog from '@/components/DeleteDialog.vue';

export default {
    components: {
        PlantForm,
        Timeline,
        Exposure,
        Watering,
        DeleteDialog,
    },
    data() {
        return {
            search: '',
            shortMonths,
            dialog: false,
            deleteDialog: false,
            deleting: false,
            plant: this.getDefaultPlant(),
            headers: [
                {
                    value: 'variety.name',
                    text: this.$t('shared.name'),
                    sortable: true,
                    groupable: false,
                    filterable: true,
                },
                {
                    value: 'variety.exposure',
                    text: this.$t('shared.exposure'),
                    sortable: true,
                    groupable: true,
                    filterable: false,
                },
                {
                    value: 'variety.watering',
                    text: this.$t('shared.watering'),
                    sortable: true,
                    groupable: true,
                    filterable: false,
                },
                {
                    value: 'timeline',
                    text: '',
                    sortable: false,
                    groupable: false,
                    filterable: false,
                },
                {
                    value: 'actions',
                    text: '',
                    sortable: false,
                    groupable: false,
                    filterable: false,
                },
            ],
        };
    },
    computed: {
        ...mapState('plants', ['plants', 'loadingPlants']),
    },
    created() {
        this.loadPlants();
    },
    methods: {
        ...mapActions('plants', ['loadPlants', 'deletePlant']),

        getDefaultPlant: () => ({
            varietyId: null,
            notes: '',
        }),
        onAdd() {
            this.plant = this.getDefaultPlant();
            this.dialog = true;
        },
        onEdit(plant) {
            this.plant = Vue.util.extend({}, plant);
            this.dialog = true;
        },
        onDelete(plant) {
            this.plant = plant;
            this.deleteDialog = true;
        },
        async onConfirmDelete() {
            this.deleting = true;
            await this.deletePlant(this.plant);
            this.deleting = false;
            this.deleteDialog = false;
        },
        onSelect(row) {
            this.$router.push({ name: 'plant', params: { plantId: row.id } });
        },
    },
};
</script>
