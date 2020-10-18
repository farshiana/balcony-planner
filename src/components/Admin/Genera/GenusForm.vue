<template>
    <v-dialog v-model="dialog" max-width="600px" content-class="genus-form">
        <v-card>
            <v-card-title>
                <span class="headline">
                    {{ genus.id ? $t('admin.genera.editGenus') : $t('admin.genera.newGenus') }}
                </span>
            </v-card-title>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-row v-if="genus.imageUrl">
                            <v-col class="image-col" cols="12" sm="6" md="6">
                                <v-img :src="genus.imageUrl" />
                                <v-btn
                                    icon
                                    small
                                    @click="genus.imageUrl = '';"
                                >
                                    <v-icon small>mdi-pencil</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                    v-model="genus.category"
                                    :items="categories"
                                    :error-messages="categoryErrors"
                                    :label="$t('admin.genera.category')"
                                    clearable
                                    required
                                    @blur="$v.genus.category.$touch()"
                                />
                                <v-text-field
                                    v-model="genus.name"
                                    :error-messages="nameErrors"
                                    :label="$t('shared.name')"
                                    required
                                    @blur="$v.genus.name.$touch()"
                                />
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <image-uploader ref="imageUploader" />
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
import { mapMutations, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import {
    CATEGORY_FRUITS,
    CATEGORY_HERBS,
    CATEGORY_VEGETABLES,
    API_URL,
} from '@/constants';
import { post } from '@/utils';
import ImageUploader from './ImageUploader.vue';

export default {
    components: {
        ImageUploader,
    },
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
            API_URL,
            saving: false,
            categories: [
                { value: CATEGORY_FRUITS, text: this.$t('shared.fruits') },
                { value: CATEGORY_HERBS, text: this.$t('shared.herbs') },
                { value: CATEGORY_VEGETABLES, text: this.$t('shared.vegetables') },
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
            if (!this.$v.genus.category.required) errors.push(this.$t('admin.genera.categoryRequired'));
            return errors;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.genus.name.$dirty) return errors;
            if (!this.$v.genus.name.maxLength) errors.push(this.$t('shared.nameMaxLength'));
            if (!this.$v.genus.name.required) errors.push(this.$t('shared.nameRequired'));
            return errors;
        },
    },
    methods: {
        ...mapMutations(['setAlert']),
        ...mapActions('genera', ['addGenus', 'updateGenus']),

        async onUpload() {
            const file = await this.$refs.imageUploader.getResult();

            this.saving = true;
            const response = await post('/images', { file });
            const body = await response.json();
            if (response.ok) {
                this.genus.imageUrl = body.url;
            } else {
                this.setAlert(body);
            }
            this.saving = false;
        },

        /* eslint-disable consistent-return */
        async onSubmit() {
            if (!this.genus.imageUrl) return this.onUpload();

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
        /* eslint-enable consistent-return */
    },
};
</script>

<style lang="scss" scoped>
.genus-form {
    .image-col {
        position: relative;
        button {
            position: absolute;
            right: 24px;
            bottom: 24px;
        }
        &:not(:hover) {
            button {
                display: none;
            }
        }
    }
}
</style>
