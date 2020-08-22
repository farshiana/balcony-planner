<template>
    <v-row
        align="center"
        justify="center"
    >
        <v-card class="elevation-12">
            <v-toolbar
                color="primary"
                dark
                flat
            >
                <v-toolbar-title>{{ isSignup ? 'Signup' : 'Login' }} form</v-toolbar-title>
            </v-toolbar>
            <v-form lazy-validation @submit.prevent="onSubmit">
                <v-card-text>
                    <v-text-field
                        v-if="isSignup"
                        v-model="name"
                        prepend-icon="mdi-account"
                        :error-messages="nameErrors"
                        label="Name"
                        required
                        @blur="$v.name.$touch()"
                    />
                    <v-text-field
                        v-model="email"
                        prepend-icon="mdi-email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        @blur="$v.email.$touch()"
                    />
                    <v-text-field
                        v-model="password"
                        prepend-icon="mdi-lock"
                        :error-messages="passwordErrors"
                        label="Password"
                        type="password"
                        :counter="isSignup ? 12 : false"
                        password
                        required
                        @blur="$v.password.$touch()"
                    />
                    <v-text-field
                        v-if="isSignup"
                        v-model="repeatPassword"
                        prepend-icon="mdi-lock"
                        :error-messages="repeatPasswordErrors"
                        label="Repeat password"
                        type="password"
                        password
                        required
                        @input="$v.repeatPassword.$touch()"
                        @blur="$v.repeatPassword.$touch()"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="onSwitch">{{ isSignup ? 'Login' : 'Signup' }}</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">{{ isSignup ? 'Signup' : 'Login' }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
    required, maxLength, email, minLength, sameAs,
} from 'vuelidate/lib/validators';

export default {
    mixins: [validationMixin],
    validations() {
        const validations = {
            email: { required, email },
            password: { required, minLength: minLength(12) },
        };
        if (this.isSignup) {
            validations.name = { required, maxLength: maxLength(10) };
            validations.repeatPassword = { sameAsPassword: sameAs('password') };
        }
        return validations;
    },
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            if (!this.$v.name.maxLength) errors.push('Name must be at most 10 characters long');
            if (!this.$v.name.required) errors.push('Name is required');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            if (!this.$v.email.required) errors.push('Email is required');
            if (!this.$v.email.email) errors.push('Email must be valid');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            if (!this.$v.password.required) errors.push('Password is required');
            if (!this.$v.password.minLength) errors.push('Password must be at least 12 characters long');
            return errors;
        },
        repeatPasswordErrors() {
            const errors = [];
            if (!this.$v.repeatPassword.$dirty) return errors;
            if (!this.$v.repeatPassword.sameAsPassword) errors.push('Passwords must match');
            return errors;
        },
    },
    data() {
        return {
            isSignup: false,
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
        };
    },
    methods: {
        ...mapActions(['login', 'signup']),

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) return;

            const data = { name: this.name, email: this.email, password: this.password };
            if (this.isSignup) {
                this.signup(data);
            } else {
                this.login(data);
            }
        },
        reset() {
            this.$v.$reset();
        },
        onSwitch() {
            this.reset();
            this.isSignup = !this.isSignup;
        },
    },
};
</script>
