<template>
    <v-container v-if="!overlay">
        <template v-if="balconies.length">
            <balcony
                v-for="balcony in balconies"
                :key="balcony.id"
                :balcony="balcony"
            />
        </template>
        <v-container v-else d-flex justify-center>
            <v-col md="6">
                <v-card>
                    <v-card-title>
                        <v-icon class="mr-1">mdi-shovel-off</v-icon>
                        {{ $t('noBalcony') }}
                    </v-card-title>
                    <v-card-text>
                        {{ $t('balconyHelp') }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" @click="dialog = true;">{{ $t('addBalcony') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-container>
        <balcony-form :visible="dialog" @toggle="(visible) => { dialog = visible; }" />
    </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import BalconyForm from '@/components/Balconies/BalconyForm.vue';
import Balcony from '@/components/Balconies/Balcony.vue';

export default {
    components: {
        BalconyForm,
        Balcony,
    },
    data: () => ({
        dialog: false,
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
