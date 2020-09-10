<template>
    <div class="d-flex flex-column" :style="{ height: '100%' }">
        <div>
            <v-tabs v-model="currentTab">
                <v-tab
                    v-for="tab in tabs"
                    :key="tab.icon"
                >
                    <v-icon dense left>{{ tab.icon }}</v-icon>
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="currentTab">
                <v-tab-item
                    v-for="tab in tabs"
                    :key="tab.icon"
                    height="50px"
                >
                    <component :is="tab.component" />
                </v-tab-item>
            </v-tabs-items>
        </div>
        <balcony-area :balcony="balcony" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Plants from './Plants.vue';
import Planters from './Planters.vue';
import BalconyArea from './BalconyArea.vue';

export default {
    components: {
        Plants,
        Planters,
        BalconyArea,
    },
    props: {
        balcony: {
            type: Object,
            required: true,
        },
    },
    data() {
        const tabs = [
            { label: this.$t('plants'), component: Plants, icon: 'mdi-sprout' },
            { label: this.$t('planters'), component: Planters, icon: 'mdi-package' },
        ];
        return {
            tabs,
            currentTab: tabs[0].component,
        };
    },
    created() {
        this.loadPlanters(this.balcony.id);
    },
    computed: {
        ...mapState('planters', ['planters']),
    },
    methods: {
        ...mapActions('planters', ['loadPlanters']),
    },
};
</script>
