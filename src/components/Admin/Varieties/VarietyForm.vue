<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="secondary"
                fab
                fixed
                dark
                bottom
                right
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
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
                            <v-col cols="12">
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
                                    :items="exposures"
                                    :label="$t('admin.varieties.exposure')"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="watering"
                                    :items="waterings"
                                    :label="$t('admin.varieties.watering')"
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="info" text @click="dialog = false;">{{ $t('cancel') }}</v-btn>
                    <v-btn color="primary" text type="submit">{{ $t('save') }}</v-btn>
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
} from '@/constants';

export default {
    mixins: [validationMixin],
    validations: {
        category: { required },
        genusId: { required },
        name: { required, maxLength: maxLength(30) },
    },
    data() {
        const categories = [
            { value: CATEGORY_FRUITS, text: this.$t('fruits') },
            { value: CATEGORY_HERBS, text: this.$t('herbs') },
            { value: CATEGORY_VEGETABLES, text: this.$t('vegetables') },
        ];
        return {
            dialog: false,
            categories,
            exposures: [],
            waterings: [],
            category: '',
            genusId: '',
            name: '',
            exposure: '',
            watering: '',
        };
    },
    computed: {
        ...mapState('genera', ['genera']),
        ...mapGetters('genera', ['getGenusById', 'getGeneraByCategory']),

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
            if (!this.$v.category.required) errors.push(this.$t('categoryRequired'));
            return errors;
        },
        genusErrors() {
            const errors = [];
            if (!this.$v.genusId.$dirty) return errors;
            if (!this.$v.genusId.required) errors.push(this.$t('genusRequired'));
            return errors;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            if (!this.$v.name.maxLength) errors.push(this.$t('nameMaxLength'));
            if (!this.$v.name.required) errors.push(this.$t('nameRequired'));
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
            if (this.$v.$invalid) return;

            const data = { name: this.name, category: this.category, genusId: this.genusId };
            await this.addVariety(data);
            this.dialog = false;
        },
    },
};
</script>
