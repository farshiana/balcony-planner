<template>
    <v-dialog v-model="dialog" persistent max-width="600px" @click:outside="dialog = false;">
        <v-card>
            <v-card-title>
                <span class="headline">{{ $t('admin.varieties.newVariety') }}</span>
            </v-card-title>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="category"
                                    :items="categories"
                                    :error-messages="categoryErrors"
                                    :label="$t('category')"
                                    clearable
                                    required
                                    @blur="$v.category.$touch()"
                                    @input="onCategorySelect"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete
                                    v-model="genusId"
                                    :items="generaList"
                                    :error-messages="genusErrors"
                                    item-value="id"
                                    item-text="name"
                                    :label="$t('genus')"
                                    clearable
                                    required
                                    @blur="$v.genusId.$touch()"
                                    @input="onGenusSelect"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="name"
                                    :error-messages="nameErrors"
                                    :label="$t('name')"
                                    required
                                    @blur="$v.name.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="exposure"
                                    :error-messages="exposureErrors"
                                    :items="exposures"
                                    :label="$t('exposure')"
                                    required
                                    @blur="$v.exposure.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="watering"
                                    :error-messages="wateringErrors"
                                    :items="waterings"
                                    :label="$t('watering')"
                                    required
                                    @blur="$v.watering.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" class="overflow-auto">
                                <p>{{ $t('seed') }}</p>
                                <v-btn-toggle
                                    v-model="seed"
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
                                <p>{{ $t('plant') }}</p>
                                <v-btn-toggle
                                    v-model="plant"
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
                                <p>{{ $t('harvest') }}</p>
                                <v-btn-toggle
                                    v-model="harvest"
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
                    <v-spacer />
                    <v-btn color="info" text @click="dialog = false;">{{ $t('cancel') }}</v-btn>
                    <v-btn color="primary" text type="submit" :loading="isSaving">{{ $t('save') }}</v-btn>
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

const defaultData = {
    category: '',
    genusId: '',
    name: '',
    exposure: '',
    watering: '',
    seed: [1, 2, 3, 4],
    plant: [3, 4, 5, 6],
    harvest: [5, 6, 7, 8, 9],
};

export default {
    mixins: [validationMixin],
    validations: {
        category: { required },
        genusId: { required },
        name: { required, maxLength: maxLength(30) },
        exposure: { required },
        watering: { required },
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            isSaving: false,
            shortMonths,
            categories: [
                { value: CATEGORY_FRUITS, text: this.$t('fruits') },
                { value: CATEGORY_HERBS, text: this.$t('herbs') },
                { value: CATEGORY_VEGETABLES, text: this.$t('vegetables') },
            ],
            exposures: EXPOSURES.map((exposure) => ({ value: exposure, text: this.$t(exposure) })),
            waterings: WATERINGS.map((watering) => ({ value: watering, text: this.$t(watering) })),
            ...defaultData,
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
        generaList() {
            if (this.category) return this.getGeneraByCategory(this.category);

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
            if (!this.$v.category.$dirty) return errors;
            if (!this.$v.category.required) errors.push(this.$t('admin.varieties.categoryRequired'));
            return errors;
        },
        genusErrors() {
            const errors = [];
            if (!this.$v.genusId.$dirty) return errors;
            if (!this.$v.genusId.required) errors.push(this.$t('admin.varieties.genusRequired'));
            return errors;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            if (!this.$v.name.maxLength) errors.push(this.$t('nameMaxLength'));
            if (!this.$v.name.required) errors.push(this.$t('nameRequired'));
            return errors;
        },
        exposureErrors() {
            const errors = [];
            if (!this.$v.exposure.$dirty) return errors;
            if (!this.$v.exposure.required) errors.push(this.$t('admin.varieties.exposureRequired'));
            return errors;
        },
        wateringErrors() {
            const errors = [];
            if (!this.$v.watering.$dirty) return errors;
            if (!this.$v.watering.required) errors.push(this.$t('admin.varieties.wateringRequired'));
            return errors;
        },
    },
    methods: {
        ...mapActions('varieties', ['addVariety']),

        onCategorySelect(category) {
            if (!category || !this.genusId) return;

            const genus = this.getGenusById(this.genusId);
            if (genus.category !== category) {
                this.genus = ';';
            }
        },
        onGenusSelect(genusId) {
            if (!genusId || this.category) return;

            this.category = this.genera.find((genus) => genus.id === genusId).category;
        },
        async onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid || this.isSaving) return;

            this.isSaving = true;
            const data = { name: this.name, category: this.category, genusId: this.genusId };
            await this.addVariety(data);
            this.isSaving = false;

            this.dialog = false;
            this.$v.$reset();
            Object.assign(this.$data, defaultData);
        },
    },
};
</script>
