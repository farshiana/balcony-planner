<template>
    <v-dialog v-model="dialog" persistent max-width="600px" @click:outside="dialog = false;">
        <v-card>
            <v-card-title>
                <span class="headline">{{ $t('balconies.newBalcony') }}</span>
            </v-card-title>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="name"
                                    :error-messages="nameErrors"
                                    :label="$t('name')"
                                    required
                                    @blur="$v.name.$touch()"
                                />
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
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

const defaultData = {
    name: '',
};

export default {
    mixins: [validationMixin],
    validations: {
        name: { required, maxLength: maxLength(30) },
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data: () => ({
        isSaving: false,
        ...defaultData,
    }),
    computed: {
        dialog: {
            get() {
                return this.visible;
            },
            set(visible) {
                this.$emit('toggle', visible);
            },
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
        ...mapActions('balconies', ['addBalcony']),

        async onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid || this.isSaving) return;

            this.isSaving = true;
            const data = { name: this.name };
            await this.addBalcony(data);
            this.isSaving = false;

            this.dialog = false;
            this.$v.$reset();
            Object.assign(this.$data, defaultData);
        },
    },
};
</script>
