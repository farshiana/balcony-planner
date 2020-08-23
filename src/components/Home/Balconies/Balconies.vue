<template>
    <v-container class="fill-height justify-center" fluid>
        <v-col md="5">
            <v-card :loading="loadingBalconies">
                <template v-if="!balconies.length">
                    <v-card-title>
                        {{ $t('home.balconies.empty') }}
                    </v-card-title>
                    <v-card-text>
                        {{ $t('home.balconies.help') }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" @click="visible = true;">{{ $t('home.balconies.create') }}</v-btn>
                    </v-card-actions>
                </template>
            </v-card>
        </v-col>
        <balcony-form :visible="visible" @toggle="(dialog) => { visible = dialog; }" />
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BalconyForm from './BalconyForm.vue';

export default {
    components: {
        BalconyForm,
    },
    data() {
        return {
            visible: false,
        };
    },
    computed: {
        ...mapState('balconies', ['balconies', 'loadingBalconies']),
    },

    async created() {
        await this.loadBalconies();
        if (!this.balconies.length) return;

        this.loadPlanters(this.balconies[0].id);
    },
    methods: {
        ...mapActions('balconies', ['loadBalconies']),
        ...mapActions('planters', ['loadPlanters']),
    },
};
</script>
