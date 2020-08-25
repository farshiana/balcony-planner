<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="plants"
            :items-per-page="12"
            :loading="loadingPlants"
            class="elevation-1"
            dense
        >
            <template
                v-for="(month, index) in months"
                v-slot:[`item.${month}`]="{ item }"
            >
                <planning-month :key="month" :variety="item" :month="index" />
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SHORT_MONTHS } from '@/constants';
import PlanningMonth from './PlanningMonth.vue';

export default {
    components: {
        PlanningMonth,
    },
    data() {
        const months = SHORT_MONTHS.map((month) => month.toLowerCase());
        return {
            months,
            headers: [
                { value: 'name', text: this.$t('plant') },
                ...months.map((month) => ({ value: month, text: month, sortable: false })),
            ],
        };
    },
    created() {
        this.loadPlants();
    },
    computed: {
        ...mapState('plants', ['plants', 'loadingPlants']),
    },
    methods: {
        ...mapActions('plants', ['loadPlants']),
    },
};
</script>
