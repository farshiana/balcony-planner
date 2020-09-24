<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">
                    {{ plant.id ? $t('plants.editPlant') : $t('plants.newPlant') }}
                </span>
            </v-card-title>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-autocomplete
                            v-if="!plant.id"
                            v-model="plant.varietyId"
                            :loading="loadingVarieties"
                            :search-input.sync="query"
                            :items="varieties"
                            :error-messages="varietyIdErrors"
                            :label="$t('shared.variety')"
                            :placeholder="$t('shared.searchPlaceholder')"
                            hide-no-data
                            item-value="id"
                            item-text="name"
                            clearable
                            required
                            prepend-icon="mdi-database-search"
                            @blur="$v.plant.varietyId.$touch()"
                        />
                        <v-textarea
                            v-model="plant.notes"
                            :error-messages="notesErrors"
                            :label="$t('plants.notes')"
                            prepend-icon="mdi-notebook"
                            @blur="$v.plant.notes.$touch()"
                        />
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="info" text @click="dialog = false;">{{ $t('shared.cancel') }}</v-btn>
                    <v-btn color="primary" text type="submit" :loading="saving">{{ $t('shared.save') }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
    mixins: [validationMixin],
    validations: {
        plant: {
            varietyId: { required },
            notes: { maxLength: maxLength(100) },
        },
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        plant: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            saving: false,
            query: '',
        };
    },
    computed: {
        ...mapState('varieties', ['varieties', 'loadingVarieties']),

        dialog: {
            get() {
                return this.visible;
            },
            set(visible) {
                this.$emit('toggle', visible);
            },
        },
        varietyIdErrors() {
            const errors = [];
            if (!this.$v.plant.varietyId.$dirty) return errors;
            if (!this.$v.plant.varietyId.required) errors.push(this.$t('plants.varietyRequired'));
            return errors;
        },
        notesErrors() {
            const errors = [];
            if (!this.$v.plant.notes.$dirty) return errors;
            if (!this.$v.plant.notes.maxLength) errors.push(this.$t('plants.notesMaxLength'));
            return errors;
        },
    },
    watch: {
        query(query) {
            if (this.loadingVarieties) return;

            this.loadVarieties(query);
        },
    },
    methods: {
        ...mapActions('varieties', ['loadVarieties']),
        ...mapActions('plants', ['addPlant', 'updatePlant']),

        async onSubmit() {
            this.$v.plant.$touch();
            if (this.$v.plant.$invalid || this.saving) return;

            this.saving = true;
            if (this.plant.id) {
                await this.updatePlant(this.plant);
            } else {
                await this.addPlant(this.plant);
            }
            this.saving = false;

            this.dialog = false;
            this.$v.plant.$reset();
        },
    },
};
</script>
