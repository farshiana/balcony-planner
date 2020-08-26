<template>
    <v-dialog v-model="dialog" persistent max-width="600px" @click:outside="dialog = false;">
        <v-card>
            <v-card-title>
                <span class="headline">{{ $t('newVariety') }}</span>
            </v-card-title>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="variety.category"
                                    :items="categories"
                                    :error-messages="categoryErrors"
                                    :label="$t('category')"
                                    clearable
                                    required
                                    @blur="$v.variety.category.$touch()"
                                    @input="onCategorySelect"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete
                                    v-model="variety.genusId"
                                    :items="generaList"
                                    :error-messages="genusErrors"
                                    item-value="id"
                                    item-text="name"
                                    :label="$t('genus')"
                                    clearable
                                    required
                                    @blur="$v.variety.genusId.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="variety.name"
                                    :error-messages="nameErrors"
                                    :label="$t('name')"
                                    required
                                    @blur="$v.variety.name.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="variety.exposure"
                                    :error-messages="exposureErrors"
                                    :items="exposures"
                                    :label="$t('exposure')"
                                    required
                                    @blur="$v.variety.exposure.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="variety.watering"
                                    :error-messages="wateringErrors"
                                    :items="waterings"
                                    :label="$t('watering')"
                                    required
                                    @blur="$v.variety.watering.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" class="overflow-auto">
                                <p>{{ $t('seed') }}</p>
                                <v-btn-toggle
                                    v-model="variety.seed"
                                    dense
                                    multiple
                                    rounded
                                    mandatory
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
                                <p>{{ $t('plant') }}</p>
                                <v-btn-toggle
                                    v-model="variety.plant"
                                    dense
                                    multiple
                                    rounded
                                    mandatory
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
                                <p>{{ $t('harvest') }}</p>
                                <v-btn-toggle
                                    v-model="variety.harvest"
                                    dense
                                    multiple
                                    rounded
                                    mandatory
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
                    <v-spacer />
                    <v-btn color="info" text @click="dialog = false;">{{ $t('cancel') }}</v-btn>
                    <v-btn color="primary" text type="submit" :loading="saving">{{ $t('save') }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import {
    CATEGORY_FRUITS,
    CATEGORY_HERBS,
    CATEGORY_VEGETABLES,
    EXPOSURES,
    WATERINGS,
} from '@/constants';
import { shortMonths } from '@/utils';

export default {
    mixins: [validationMixin],
    validations: {
        variety: {
            category: { required },
            genusId: { required },
            name: { required, maxLength: maxLength(30) },
            exposure: { required },
            watering: { required },
        },
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        variety: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            saving: false,
            shortMonths,
            categories: [
                { value: CATEGORY_FRUITS, text: this.$t('fruits') },
                { value: CATEGORY_HERBS, text: this.$t('herbs') },
                { value: CATEGORY_VEGETABLES, text: this.$t('vegetables') },
            ],
            exposures: EXPOSURES.map((exposure) => ({ value: exposure, text: this.$t(exposure) })),
            waterings: WATERINGS.map((watering) => ({ value: watering, text: this.$t(watering) })),
        };
    },
    computed: {
        ...mapState('genera', ['genera']),
        ...mapGetters('genera', ['getGenusById', 'getGeneraByCategory']),

        dialog: {
            get() {
                return this.visible;
            },
            set(visible) {
                this.$emit('toggle', visible);
            },
        },
        /*
            Either show the genera of the selected category
            Or all genera grouped by category
        */
        generaList() {
            if (this.variety.category) return this.getGeneraByCategory(this.variety.category);

            return [
                { header: this.$t('fruits') },
                ...this.getGeneraByCategory(CATEGORY_FRUITS),
                { divider: true },
                { header: this.$t('herbs') },
                ...this.getGeneraByCategory(CATEGORY_HERBS),
                { divider: true },
                { header: this.$t('vegetables') },
                ...this.getGeneraByCategory(CATEGORY_VEGETABLES),
            ];
        },
        categoryErrors() {
            const errors = [];
            if (!this.$v.variety.category.$dirty) return errors;
            if (!this.$v.variety.category.required) errors.push(this.$t('categoryRequired'));
            return errors;
        },
        genusErrors() {
            const errors = [];
            if (!this.$v.variety.genusId.$dirty) return errors;
            if (!this.$v.variety.genusId.required) errors.push(this.$t('genusRequired'));
            return errors;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.variety.name.$dirty) return errors;
            if (!this.$v.variety.name.maxLength) errors.push(this.$t('nameMaxLength'));
            if (!this.$v.variety.name.required) errors.push(this.$t('nameRequired'));
            return errors;
        },
        exposureErrors() {
            const errors = [];
            if (!this.$v.variety.exposure.$dirty) return errors;
            if (!this.$v.variety.exposure.required) errors.push(this.$t('exposureRequired'));
            return errors;
        },
        wateringErrors() {
            const errors = [];
            if (!this.$v.variety.watering.$dirty) return errors;
            if (!this.$v.variety.watering.required) errors.push(this.$t('wateringRequired'));
            return errors;
        },
    },
    methods: {
        ...mapActions('varieties', ['addVariety', 'updateVariety']),

        /*
            When one clears a category and puts another one,
            the selected genius has to be removed
        */
        onCategorySelect(category) {
            if (!category || !this.variety.genusId) return;

            const genus = this.getGenusById(this.variety.genusId);
            if (genus.category !== category) {
                this.variety.genusId = '';
            }
        },
        async onSubmit() {
            this.$v.variety.$touch();
            if (this.$v.variety.$invalid || this.saving) return;

            this.saving = true;
            if (this.variety.id) {
                await this.updateVariety(this.variety);
            } else {
                await this.addVariety(this.variety);
            }
            this.saving = false;

            this.dialog = false;
            this.$v.variety.$reset();
        },
    },
};
</script>
