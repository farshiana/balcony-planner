<template>
    <div class="timeline d-flex flex-column">
        <div
            v-for="line in lines"
            :key="line.key"
            class="line d-flex flex-row"
        >
            <v-tooltip
                v-for="(month, index) in 12"
                :key="index"
                :disabled="!line.months.includes(index)"
                top
            >
                <template v-slot:activator="{ on, attrs }">
                    <div
                        class="month flex-grow-1"
                        :class="{ [line.key]: line.months.includes(index) }"
                        v-bind="attrs"
                        v-on="on"
                    />
                </template>
                <span>{{ SHORT_MONTHS[index] }} {{ line.tooltip.toLowerCase() }}</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script>
import { SHORT_MONTHS } from '@/constants';

export default {
    props: {
        seed: {
            type: Array,
            required: true,
        },
        plant: {
            type: Array,
            required: true,
        },
        harvest: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            SHORT_MONTHS,
        };
    },
    computed: {
        lines() {
            return [
                { key: 'seed', months: this.seed, tooltip: this.$t('shared.seed') },
                { key: 'plant', months: this.plant, tooltip: this.$t('shared.plant') },
                { key: 'harvest', months: this.harvest, tooltip: this.$t('shared.harvest') },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
.timeline {
    .line {
        width: 100%;
        .month {
            height: 6px;
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
    }
}
</style>
