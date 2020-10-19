<template>
    <v-container fluid class="planning">
        <v-data-table
            :headers="headers"
            :items="plants"
            :items-per-page="12"
            :loading="loadingPlants"
            dense
            class="elevation-1"
        >
            <template v-slot:[`item.variety.name`]="{ item }">
                <div class="d-flex align-center">
                    <div class="mr-1"><v-img :src="item.variety.imageUrl" width="12px" height="12px" /></div>
                    <span class="text-capitalize-first">{{ item.variety.name }}</span>
                </div>
            </template>
            <template
                v-for="(month, index) in shortMonths"
                v-slot:[`item.${month}`]="{ item }"
            >
                <div :key="month" style="height: 100%">
                    <v-tooltip
                        v-for="step in steps"
                        :key="step.value"
                        bottom
                        :disabled="!item.variety[step.value].includes(index)"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <div
                                class="month flex-grow-1"
                                :class="{
                                    [step.value]: item.variety[step.value].includes(index),
                                    selected: index === currentMonth,
                                }"
                                v-bind="attrs"
                                v-on="on"
                            />
                        </template>
                        <span>{{ month }} {{ step.text.toLowerCase() }} </span>
                    </v-tooltip>
                </div>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { shortMonths } from '@/constants';

export default {
    data() {
        const currentMonth = (new Date()).getMonth();
        return {
            shortMonths,
            steps: [
                { value: 'seed', text: this.$t('shared.seed') },
                { value: 'plant', text: this.$t('shared.plant') },
                { value: 'harvest', text: this.$t('shared.harvest') },
            ],
            headers: [
                { value: 'variety.name', text: this.$t('shared.name'), sortable: true },
                ...shortMonths.map((month, index) => ({
                    value: month,
                    text: month,
                    sortable: false,
                    class: index === currentMonth ? 'selected' : '',
                })),
            ],
            currentMonth,
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

<style lang="scss" scoped>
.planning {
    .month {
        height: 33.3%;
        &.selected {
            background: #E8EAF6;
        }
        &.seed {
            background: #6D4C41;
        }
        &.plant {
            background: #FFB300;
        }
        &.harvest {
            background: #43A047;
        }
    }
    ::v-deep .text-start {
        &.selected {
            background: #E8EAF6;
        }
        &:not(:first-child) {
            padding: 0px;
            text-align: center !important;
        }
    }
}
</style>
