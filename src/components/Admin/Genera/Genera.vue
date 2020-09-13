<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="genera"
            :items-per-page="12"
            :loading="loadingGenera"
            class="elevation-1"
            show-group-by
            dense
        >
            <template  v-slot:top>
                <v-row fill-height class="mr-1">
                    <v-spacer />
                    <v-btn class="mt-1" text small color="accent" @click="onAdd">
                        {{ $t('addGenus') }}
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
        <genus-form
            :visible="dialog"
            :genus="genus"
            @toggle="(visible) => { dialog = visible; }"
        />
        <v-dialog v-model="deleteDialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">{{ genus.name }}</v-card-title>
                <v-card-text>{{ $t('deleteConfirmation') }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="deleteDialog = false;">{{ $t('cancel') }}</v-btn>
                    <v-btn color="primary" text :loading="deleting" @click="onDeleteConfirm">{{ $t('confirm') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                { value: 'name', text: this.$t('name'), groupable: false },
                { value: 'category', text: this.$t('category'), groupable: true },
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
        ...mapActions('genera', ['loadGenera']),

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
        async onDeleteConfirm() {
            this.deleting = true;
            await this.deleteGenus(this.genus.id);
            this.deleting = false;
            this.deleteDialog = false;
        },
    },
};
</script>
