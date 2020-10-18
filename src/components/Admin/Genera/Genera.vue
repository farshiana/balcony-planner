<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="genera"
            :items-per-page="12"
            :loading="loadingGenera"
            show-group-by
            dense
            class="genera elevation-1"
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
                <div class="d-flex align-center">
                    <div class="mr-1"><v-img :src="item.imageUrl" width="12px" height="12px" /></div>
                    <span>{{ item.name }}</span>
                </div>
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
        <v-dialog v-model="deleteDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">{{ $t('admin.genera.deleteGenus') }}</v-card-title>
                <v-card-text>{{ $t('shared.deleteConfirmation', { name: genus.name }) }}</v-card-text>
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
import GenusForm from './GenusForm.vue';

export default {
    components: {
        GenusForm,
    },
    data() {
        return {
            dialog: false,
            deleteDialog: false,
            deleting: false,
            genus: this.getDefaultGenus(),
            headers: [
                {
                    value: 'name', text: this.$t('shared.genus'), sortable: true, groupable: false,
                },
                {
                    value: 'category', text: this.$t('admin.genera.category'), sortable: true, groupable: true,
                },
                {
                    value: 'actions', text: '', sortable: false, groupable: false,
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
            imageUrl: '',
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
            await this.deleteGenus(this.genus.id); // TODO: implement action
            this.deleting = false;
            this.deleteDialog = false;
        },
        onSelect(row) {
            this.$router.push({ name: 'genus', params: { genusId: row.id } });
        },
    },
};
</script>
