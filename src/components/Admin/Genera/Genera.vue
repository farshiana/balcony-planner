<template>
    <v-card class="ma-3" style="position: initial">
        <v-card-title>
            {{ $t('shared.genera') }}
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
            :items="genera"
            :items-per-page="12"
            :loading="loadingGenera"
            show-group-by
            dense
            :search="search"
            class="genera"
            :item-class="() => 'clickable'"
            @click:row="onSelect"
        >
            <template  v-slot:top>
                <v-row fill-height class="mr-1">
                    <v-spacer />
                    <v-btn class="mt-1" text small color="accent" @click="onAdd">
                        {{ $t('admin.genera.addGenus') }}
                    </v-btn>
                </v-row>
            </template>
            <template v-slot:[`item.name`]="{ item }">
                <div class="text-capitalize-first">{{ item.name }}</div>
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
        <genus-form
            :visible="dialog"
            :genus="genus"
            @toggle="(visible) => { dialog = visible; }"
        />
        <delete-dialog
            :visible.sync="deleteDialog"
            :title="$t('admin.genera.deleteGenus')"
            :name="genus.name"
            :deleting="deleting"
            @delete="onConfirmDelete"
        />
        <router-view />
    </v-card>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import DeleteDialog from '@/components/DeleteDialog.vue';
import GenusForm from './GenusForm.vue';

export default {
    components: {
        GenusForm,
        DeleteDialog,
    },
    data() {
        return {
            search: '',
            dialog: false,
            deleteDialog: false,
            deleting: false,
            genus: this.getDefaultGenus(),
            headers: [
                {
                    value: 'name',
                    text: this.$t('shared.genus'),
                    sortable: true,
                    groupable: false,
                    filterable: true,
                },
                {
                    value: 'category',
                    text: this.$t('admin.genera.category'),
                    sortable: true,
                    groupable: true,
                    filterable: true,
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
        ...mapState('genera', ['genera', 'loadingGenera']),
    },
    created() {
        this.loadGenera();
    },
    methods: {
        ...mapActions('genera', ['loadGenera', 'deleteGenus']),

        getDefaultGenus: () => ({
            name: '',
            category: '',
        }),
        onAdd() {
            this.genus = this.getDefaultGenus();
            this.dialog = true;
        },
        onEdit(genus) {
            this.genus = Vue.util.extend({}, genus);
            this.dialog = true;
        },
        onDelete(genus) {
            this.genus = genus;
            this.deleteDialog = true;
        },
        async onConfirmDelete() {
            this.deleting = true;
            await this.deleteGenus(this.genus);
            this.deleting = false;
            this.deleteDialog = false;
        },
        onSelect(row) {
            this.$router.push({ name: 'genus', params: { genusId: row.id } });
        },
    },
};
</script>
