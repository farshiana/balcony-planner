<template>
    <v-row
        align="center"
        justify="center"
    >
        <v-card class="elevation-12">
            <v-card-text>
                <v-form @submit="onLogin">
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
    </v-row>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

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
        ...mapMutations(['setCurrentUser']),
        ...mapActions(['login']),

        async onLogin() {
            try {
                const { user } = await this.login(this.user);
                this.setCurrentUser(user);
                this.$router.push({ name: 'login' });
            } catch (error) {
                console.error(error.message);
            }
        },
    },
};
</script>
