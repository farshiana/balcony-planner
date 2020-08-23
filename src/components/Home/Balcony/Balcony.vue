<template>
    <v-container class="fill-height justify-center" fluid>
        <v-col md="5">
            <v-card  :loading="loading">
                <v-card-title>
                    {{ $t('home.balconies.empty') }}
                </v-card-title>
                <v-card-text>
                    {{ $t('home.balconies.help') }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary">{{ $t('home.balconies.create') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapState('balconies', ['balconies']),
    },

    async created() {
        this.loading = true;
        await this.loadBalconies();
        this.loading = false;
    },
    methods: {
        ...mapActions('balconies', ['loadBalconies']),
    },
};
</script>
