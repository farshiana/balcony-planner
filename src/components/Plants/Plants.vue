<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="plants"
            :items-per-page="12"
            :loading="loadingPlants"
            show-group-by
            dense
            class="elevation-1"
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
        <plant-form
            :visible="dialog"
            :plant="plant"
            @toggle="(visible) => { dialog = visible; }"
        />
        <v-dialog v-model="deleteDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">{{ $t('plants.deletePlant') }}</v-card-title>
                <v-card-text>
                    {{ $t('shared.deleteConfirmation', { name: plant.variety && plant.variety.name }) }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="deleteDialog = false;">{{ $t('shared.cancel') }}</v-btn>
                    <v-btn
                        color="error"
                        text
                        :loading="deleting"
                        @click="onConfirmDelete"
                    >
                        {{ $t('shared.confirm') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <router-view />
    </v-container>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import PlantForm from '@/components/Plants/PlantForm.vue';
import { shortMonths } from '@/constants';
import Timeline from '@/components/Timeline.vue';

export default {
    components: {
        PlantForm,
        Timeline,
    },
    data() {
        return {
            shortMonths,
            dialog: false,
            deleteDialog: false,
            deleting: false,
            plant: this.getDefaultPlant(),
            headers: [
                { value: 'variety.name', text: this.$t('shared.name'), groupable: false },
                { value: 'variety.exposure', text: this.$t('shared.exposure') },
                { value: 'variety.watering', text: this.$t('shared.watering') },
                { value: 'timeline', text: '', sortable: false },
                { value: 'actions', text: '', sortable: false },
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
            await this.deletePlant(this.plant.id); // TODO: implement action
            this.deleting = false;
            this.deleteDialog = false;
        },
        onSelect(row) {
            this.$router.push({ name: 'plant', params: { plantId: row.id } });
        },
    },
};
</script>