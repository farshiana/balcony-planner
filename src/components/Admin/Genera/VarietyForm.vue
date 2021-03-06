<template>
    <v-dialog v-model="dialog" max-width="600px" content-class="variety-form">
        <v-card>
            <v-card-title>
                <span class="headline">
                    {{ variety.id ? $t('admin.varieties.editVariety') : $t('admin.varieties.newVariety') }}
                </span>
            </v-card-title>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-row v-if="variety.imageUrl">
                            <v-col class="image-col" cols="12" sm="6" md="6">
                                <v-img :src="variety.imageUrl" />
                                <v-btn
                                    icon
                                    small
                                    @click="variety.imageUrl = '';"
                                >
                                    <v-icon small>mdi-pencil</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete
                                    v-model="variety.genusId"
                                    :items="genera"
                                    :error-messages="genusErrors"
                                    item-value="id"
                                    item-text="name"
                                    :label="$t('shared.genus')"
                                    clearable
                                    required
                                    @blur="$v.variety.genusId.$touch()"
                                />
                                <v-text-field
                                    v-model="variety.name"
                                    :error-messages="nameErrors"
                                    :label="$t('shared.name')"
                                    required
                                    @blur="$v.variety.name.$touch()"
                                />
                                <v-select
                                    v-model="variety.exposure"
                                    :error-messages="exposureErrors"
                                    :items="exposures"
                                    :label="$t('shared.exposure')"
                                    required
                                    @blur="$v.variety.exposure.$touch()"
                                >
                                    <template v-slot:selection="{ item }">
                                        <exposure :exposure="item.value" class="mr-1" />
                                        <span>{{ item.text }}</span>
                                    </template>
                                    <template v-slot:item="{ item }">
                                        <exposure :exposure="item.value" class="mr-1" />
                                        <span>{{ item.text }}</span>
                                    </template>
                                </v-select>
                                <v-select
                                    v-model="variety.watering"
                                    :error-messages="wateringErrors"
                                    :items="waterings"
                                    :label="$t('shared.watering')"
                                    required
                                    @blur="$v.variety.watering.$touch()"
                                >
                                    <template v-slot:selection="{ item }">
                                        <watering :watering="item.value" class="mr-1" />
                                        <span>{{ item.text }}</span>
                                    </template>
                                    <template v-slot:item="{ item }">
                                        <watering :watering="item.value" class="mr-1" />
                                        <span>{{ item.text }}</span>
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col cols="12" class="overflow-auto">
                                <p>{{ $t('shared.seed') }}</p>
                                <v-btn-toggle
                                    v-model="variety.seed"
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
                                    v-model="variety.plant"
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
                                    v-model="variety.harvest"
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
import {
    mapState, mapGetters, mapActions,
} from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import { exposures, waterings } from '@/constants';
import { shortMonths, post } from '@/utils';
import Exposure from '@/components/Exposure.vue';
import Watering from '@/components/Watering.vue';
import ImageUploader from './ImageUploader.vue';

export default {
    components: {
        ImageUploader,
        Exposure,
        Watering,
    },
    mixins: [validationMixin],
    validations: {
        variety: {
            name: { required, maxLength: maxLength(30) },
            genusId: { required },
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
            shortMonths,
            exposures,
            waterings,
            saving: false,
        };
    },
    computed: {
        ...mapState('genera', ['genera']),
        ...mapGetters('genera', ['getGenusById']),

        dialog: {
            get() {
                return this.visible;
            },
            set(visible) {
                this.$emit('toggle', visible);
            },
        },
        genusErrors() {
            const errors = [];
            if (!this.$v.variety.genusId.$dirty) return errors;
            if (!this.$v.variety.genusId.required) errors.push(this.$t('admin.varieties.genusRequired'));
            return errors;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.variety.name.$dirty) return errors;
            if (!this.$v.variety.name.maxLength) errors.push(this.$t('shared.nameMaxLength'));
            if (!this.$v.variety.name.required) errors.push(this.$t('shared.nameRequired'));
            return errors;
        },
        exposureErrors() {
            const errors = [];
            if (!this.$v.variety.exposure.$dirty) return errors;
            if (!this.$v.variety.exposure.required) errors.push(this.$t('shared.exposureRequired'));
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
        ...mapActions('genera', ['addVariety', 'updateVariety']),

        async onUpload() {
            const file = await this.$refs.imageUploader.getResult();

            this.saving = true;
            const response = await post('/images', { file });
            const body = await response.json();
            if (response.ok) {
                this.variety.imageUrl = body.url;
            } else {
                this.$error(body);
            }
            this.saving = false;
        },
        /* eslint-disable consistent-return */
        async onSubmit() {
            if (!this.variety.imageUrl) return this.onUpload();

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
        /* eslint-enable consistent-return */
    },
};
</script>

<style lang="scss" scoped>
.variety-form {
    .image-col {
        position: relative;
        button {
            position: absolute;
            top: 24px;
            right: 24px;
        }
        &:not(:hover) {
            button {
                display: none;
            }
        }
    }
}
</style>
