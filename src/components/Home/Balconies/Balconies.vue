<template>
    <v-container fill-height justify-center fluid>
        <template v-if="!overlay">
            <balcony v-if="balconies.length" :balcony="balconies[0]" />
            <v-col v-else md="5">
                <v-card>
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
                </v-card>
            </v-col>
            </template>
        <balcony-form :visible="visible" @toggle="(dialog) => { visible = dialog; }" />
    </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import BalconyForm from './BalconyForm.vue';
import Balcony from './Balcony.vue';

export default {
    components: {
        BalconyForm,
        Balcony,
    },
    data: () => ({
        visible: false,
    }),
    computed: {
        ...mapState(['overlay']),
        ...mapState('balconies', ['balconies']),
    },
    async created() {
        this.setOverlay(true);
        await this.loadBalconies();
        this.setOverlay(false);
    },
    methods: {
        ...mapMutations(['setOverlay']),
        ...mapActions('balconies', ['loadBalconies']),
    },
};
</script>
