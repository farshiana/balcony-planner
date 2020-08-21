<template>
    <v-card class="elevation-12">
        <v-card-text>
            <v-form @submit="login">
                <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="email"
                />
                <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import firebase from 'firebase/auth';

export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        async login() {
            try {
                await firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password);
                this.$router.push('/login');
            } catch (error) {
                console.error(error.message);
            }
        },
    },
};
</script>
