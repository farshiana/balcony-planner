<template>
    <v-container fill-height justify-center fluid>
        <v-col md="4" align="center">
            <v-card :elevation="12">
                <v-toolbar
                    color="primary"
                    dark
                    flat
                >
                    <v-toolbar-title>
                        {{ isRegister ? $t('auth.registerForm') : $t('auth.loginForm') }}
                    </v-toolbar-title>
                </v-toolbar>
                <v-form lazy-validation @submit.prevent="onSubmit">
                    <v-card-text>
                        <v-text-field
                            v-model="username"
                            prepend-icon="mdi-account"
                            :error-messages="usernameErrors"
                            :label="$t('auth.username')"
                            required
                            @blur="$v.username.$touch()"
                        />
                        <v-text-field
                            v-model="password"
                            prepend-icon="mdi-lock"
                            :error-messages="passwordErrors"
                            :label="$t('auth.password')"
                            type="password"
                            :counter="isRegister ? 12 : false"
                            password
                            required
                            @blur="$v.password.$touch()"
                        />
                        <v-text-field
                            v-if="isRegister"
                            v-model="repeatPassword"
                            prepend-icon="mdi-lock"
                            :error-messages="repeatPasswordErrors"
                            :label="$t('auth.repeatPassword')"
                            type="password"
                            password
                            required
                            @blur="$v.repeatPassword.$touch()"
                        />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn data-testid="submit" color="primary" type="submit" :loading="isSaving" >
                            {{ isRegister ? $t('auth.register') : $t('auth.login') }}
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
            <div class="my-3">
                {{ isRegister ? $t('auth.withAccount') : $t('auth.withoutAccount')  }}
                <v-btn data-testid="mode-switch" text @click="onSwitch">
                    {{ isRegister ? $t('auth.login') : $t('auth.register') }}
                </v-btn>
            </div>
        </v-col>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
    required, maxLength, minLength, sameAs,
} from 'vuelidate/lib/validators';

export default {
    mixins: [validationMixin],
    validations() {
        const validations = {
            password: { required, minLength: minLength(12) },
            username: { required, maxLength: maxLength(30) },
        };
        if (this.isRegister) {
            validations.repeatPassword = { required, sameAsPassword: sameAs('password') };
        }
        return validations;
    },
    computed: {
        usernameErrors() {
            const errors = [];
            if (!this.$v.username.$dirty) return errors;
            if (!this.$v.username.maxLength) errors.push(this.$t('auth.usernameMaxLength'));
            if (!this.$v.username.required) errors.push(this.$t('auth.usernameRequired'));
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            if (!this.$v.password.required) errors.push(this.$t('auth.passwordRequired'));
            if (!this.$v.password.minLength) errors.push(this.$t('auth.passwordMinLength'));
            return errors;
        },
        repeatPasswordErrors() {
            const errors = [];
            if (!this.$v.repeatPassword.$dirty) return errors;
            if (!this.$v.repeatPassword.required) errors.push(this.$t('auth.repeatPasswordRequired'));
            if (!this.$v.repeatPassword.sameAsPassword) errors.push(this.$t('auth.repeatPasswordSameAs'));
            return errors;
        },
    },
    data: () => ({
        isSaving: false,
        isRegister: false,
        username: '',
        password: '',
        repeatPassword: '',
    }),
    methods: {
        ...mapActions('auth', ['login', 'register']),

        async onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid || this.isSaving) return;

            this.isSaving = true;
            const data = { username: this.username, password: this.password };
            if (this.isRegister) {
                await this.register(data);
            } else {
                await this.login(data);
            }
            this.isSaving = false;
        },
        onSwitch() {
            this.$v.$reset();
            this.isRegister = !this.isRegister;
        },
    },
};
</script>
