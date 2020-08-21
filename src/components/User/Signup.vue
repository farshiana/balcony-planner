<template>
    <v-card class="elevation-12">
        <v-card-text>
            <v-form @submit="signup">
                <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                />
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
            <v-btn color="primary">Signup</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import firebase from 'firebase/auth';

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
            },
        };
    },
    methods: {
        async signup() {
            try {
                const res = await firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password);
                try {
                    res.user.updateProfile({ displayName: this.user.name });
                    this.$router.push('/login');
                } catch (error) {
                    console.error(error.message);
                }
            } catch (error) {
                console.error(error.message);
            }
        },
    },
};
</script>
