<template>
    <v-card :elevation="6">
        <v-card-title>{{ balcony.name }}</v-card-title>
        <v-card-text v-if="!planters.length">
            {{ $t('home.balconies.planterHelp') }}
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="onAdd">{{ $t('home.balconies.addPlanter') }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        balcony: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.loadPlanters(this.balcony.id);
    },
    computed: {
        ...mapState('planters', ['planters']),
    },
    methods: {
        ...mapActions('planters', ['loadPlanters']),

        onAdd() {

        },
    },
};
</script>
