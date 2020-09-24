<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="plants"
            :items-per-page="12"
            :loading="loadingPlants"
            dense
            class="elevation-1"
        >
            <template v-slot:[`header.timeline`]="">
                <div class="d-flex flex-row justify-space-around">
                    <div
                        v-for="month in shortMonths"
                        :key="month"
                        :class="{ current: month === currentMonth }"
                    >
                        {{ month }}
                    </div>
                </div>
            </template>
            <template v-slot:[`item.timeline`]="{ item }">
                <timeline
                    :seed="item.variety.seed"
                    :plant="item.variety.plant"
                    :harvest="item.variety.harvest"
                />
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { shortMonths } from '@/constants';
import Timeline from '@/components/Timeline.vue';

export default {
    components: {
        Timeline,
    },
    data() {
        return {
            shortMonths,
            headers: [
                { value: 'variety.name', text: this.$t('shared.name') },
                { value: 'timeline', text: '', sortable: false },
            ],
            currentMonth: (new Date()).getMonth(),
        };
    },
    computed: {
        ...mapState('plants', ['plants', 'loadingPlants']),
    },
    created() {
        this.loadPlants();
    },
    methods: {
        ...mapActions('plants', ['loadPlants']),
    },
};
</script>
