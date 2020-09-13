<template>
    <v-dialog v-model="dialog" persistent max-width="600px" @click:outside="dialog = false;">
        <v-card>
            <v-card-title>
                <span class="headline">{{ $t('newGenus') }}</span>
            </v-card-title>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="genus.category"
                                    :items="categories"
                                    :error-messages="categoryErrors"
                                    :label="$t('category')"
                                    clearable
                                    required
                                    @blur="$v.genus.category.$touch()"
                                />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="genus.name"
                                    :error-messages="nameErrors"
                                    :label="$t('name')"
                                    required
                                    @blur="$v.genus.name.$touch()"
                                />
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
import { mapActions } from 'vuex';
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
        genus: {
            category: { required },
            name: { required, maxLength: maxLength(30) },
        },
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        genus: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            saving: false,
            categories: [
                { value: CATEGORY_FRUITS, text: this.$t('fruits') },
                { value: CATEGORY_HERBS, text: this.$t('herbs') },
                { value: CATEGORY_VEGETABLES, text: this.$t('vegetables') },
            ],
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
        categoryErrors() {
            const errors = [];
            if (!this.$v.genus.category.$dirty) return errors;
            if (!this.$v.genus.category.required) errors.push(this.$t('categoryRequired'));
            return errors;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.genus.name.$dirty) return errors;
            if (!this.$v.genus.name.maxLength) errors.push(this.$t('nameMaxLength'));
            if (!this.$v.genus.name.required) errors.push(this.$t('nameRequired'));
            return errors;
        },
    },
    methods: {
        ...mapActions('genera', ['addGenus', 'updateGenus']),

        async onSubmit() {
            this.$v.genus.$touch();
            if (this.$v.genus.$invalid || this.saving) return;

            this.saving = true;
            if (this.genus.id) {
                await this.updateGenus(this.genus);
            } else {
                await this.addGenus(this.genus);
            }
            this.saving = false;

            this.dialog = false;
            this.$v.genus.$reset();
        },
    },
};
</script>