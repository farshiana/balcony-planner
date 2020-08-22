<template>
    <v-card class="elevation-12">
        <v-card-text>
            <v-form @submit="onSignup">
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
import { mapMutations, mapActions } from 'vuex';

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
        ...mapMutations(['setCurrentUser']),
        ...mapActions(['signup']),

        async onSignup() {
            try {
                const { user } = await this.signup(this.user);
                try {
                    await user.updateProfile({ displayName: this.user.name });
                    this.setCurrentUser(user);
                    this.$router.push({ name: 'login' });
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
