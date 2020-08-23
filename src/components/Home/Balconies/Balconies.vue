<template>
    <v-container v-if="!overlay" :style="{ height: '100%' }">
        <v-card v-if="balconies.length" :elevation="6" height="100%">
            <!-- Card takes all space -->
            <v-card-title>{{ balcony.name }}</v-card-title>
            <balcony :balcony="balcony" />
        </v-card>
        <v-container v-else d-flex justify-center>
            <!-- Card is centered vertically -->
            <v-col md="6">
                <v-card>
                    <v-card-title>
                        <v-icon class="mr-1">mdi-shovel-off</v-icon>
                        {{ $t('home.balconies.noBalcony') }}
                    </v-card-title>
                    <v-card-text>
                        {{ $t('home.balconies.balconyHelp') }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" @click="visible = true;">{{ $t('home.balconies.addBalcony') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-container>
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

        balcony() {
            return this.balconies[0];
        },
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
