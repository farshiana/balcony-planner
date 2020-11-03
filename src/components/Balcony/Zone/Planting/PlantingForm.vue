<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">
                    {{ planting.id ? $t('plantings.editPlanting') : $t('plantings.newPlanting') }}
                </span>
            </v-card-title>
            <v-form @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" class="overflow-auto">
                                <p>{{ $t('shared.seed') }}</p>
                                <v-btn-toggle
                                    v-model="planting.seed"
                                    dense
                                    multiple
                                    rounded
                                >
                                    <v-btn
                                        v-for="(month, index) in shortMonths"
                                        :key="index"
                                        active-class="brown white--text"
                                        x-small
                                    >
                                        {{ month }}
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                            <v-col cols="12" class="overflow-auto">
                                <p>{{ $t('shared.plant') }}</p>
                                <v-btn-toggle
                                    v-model="planting.plant"
                                    dense
                                    multiple
                                    rounded
                                >
                                    <v-btn
                                        v-for="(month, index) in shortMonths"
                                        :key="index"
                                        active-class="orange white--text"
                                        x-small
                                    >
                                        {{ month }}
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                            <v-col cols="12" class="overflow-auto">
                                <p>{{ $t('shared.harvest') }}</p>
                                <v-btn-toggle
                                    v-model="planting.harvest"
                                    dense
                                    multiple
                                    rounded
                                >
                                    <v-btn
                                        v-for="(month, index) in shortMonths"
                                        :key="index"
                                        active-class="green white--text"
                                        x-small
                                    >
                                        {{ month }}
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-if="planting.id" icon color="info" text @click="deleteDialog = true;">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn color="info" text @click="dialog = false;">{{ $t('shared.cancel') }}</v-btn>
                    <v-btn color="primary" text type="submit" :loading="saving">{{ $t('shared.save') }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        <delete-dialog
            :visible.sync="deleteDialog"
            :title="$t('plantings.deletePlanting')"
            :name="planting.name"
            :deleting="deleting"
            @delete="onConfirmDelete"
        />
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { shortMonths } from '@/utils';
import DeleteDialog from '@/components/DeleteDialog.vue';

export default {
    components: {
        DeleteDialog,
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        planting: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            saving: false,
            deleteDialog: false,
            deleting: false,
            shortMonths,
        };
    },
    computed: {
        dialog: {
            get() {
                return this.visible;
            },
            set(visible) {
                this.$emit('toggle', visible);
            },
        },
    },
    methods: {
        ...mapActions('plantings', ['addPlanting', 'updatePlanting', 'deletePlanting']),

        async onSubmit() {
            this.saving = true;
            if (this.planting.id) {
                await this.updatePlanting(this.planting);
            } else {
                await this.addPlanting(this.planting);
            }
            this.saving = false;

            this.dialog = false;
        },
        async onConfirmDelete() {
            this.deleting = true;
            await this.deletePlanting(this.planting);
            this.deleting = false;
            this.deleteDialog = false;
            this.dialog = false;
        },
    },
};
</script>
