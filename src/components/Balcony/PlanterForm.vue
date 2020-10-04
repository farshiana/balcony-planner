<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">
                    {{ planter.id ? $t('planters.editPlanter') : $t('planters.newPlanter') }}
                </span>
            </v-card-title>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    v-model="planter.name"
                                    :error-messages="nameErrors"
                                    :label="$t('shared.name')"
                                    required
                                    @blur="$v.planter.name.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                    v-model="planter.shape"
                                    :items="shapes"
                                    :error-messages="shapeErrors"
                                    :label="$t('planters.shape')"
                                    required
                                    :disabled="!!planter.id"
                                    @blur="$v.planter.shape.$touch()"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                    v-model="planter.exposure"
                                    :error-messages="exposureErrors"
                                    :items="exposures"
                                    :label="$t('shared.exposure')"
                                    required
                                    @blur="$v.planter.exposure.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                    v-model="planter.color"
                                    :items="colors"
                                    :error-messages="colorErrors"
                                    :label="$t('planters.color')"
                                    clearable
                                    required
                                    @blur="$v.planter.color.$touch()"
                                />
                            </v-col>
                        </v-row>
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
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import { shapes, colors, exposures } from '@/constants';

export default {
    mixins: [validationMixin],
    validations: {
        planter: {
            shape: { required },
            name: { required, maxLength: maxLength(30) },
            color: { required },
            exposure: { required },
        },
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        planter: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            saving: false,
            shapes,
            colors,
            exposures,
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
        shapeErrors() {
            const errors = [];
            if (!this.$v.planter.shape.$dirty) return errors;
            if (!this.$v.planter.shape.required) errors.push(this.$t('planters.shapeRequired'));
            return errors;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.planter.name.$dirty) return errors;
            if (!this.$v.planter.name.maxLength) errors.push(this.$t('shared.nameMaxLength'));
            if (!this.$v.planter.name.required) errors.push(this.$t('shared.nameRequired'));
            return errors;
        },
        colorErrors() {
            const errors = [];
            if (!this.$v.planter.color.$dirty) return errors;
            if (!this.$v.planter.color.required) errors.push(this.$t('planters.colorRequired'));
            return errors;
        },
        exposureErrors() {
            const errors = [];
            if (!this.$v.planter.exposure.$dirty) return errors;
            if (!this.$v.planter.exposure.required) errors.push(this.$t('shared.exposureRequired'));
            return errors;
        },
    },
    methods: {
        ...mapActions('planters', ['addPlanter', 'updatePlanter']),

        async onSubmit() {
            this.$v.planter.$touch();
            if (this.$v.planter.$invalid || this.saving) return;

            this.saving = true;
            if (this.planter.id) {
                await this.updatePlanter(this.planter);
            } else {
                await this.addPlanter(this.planter);
            }
            this.saving = false;

            this.dialog = false;
            this.$v.planter.$reset();
        },
    },
};
</script>
