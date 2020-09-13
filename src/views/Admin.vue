<template>
    <div>
        <v-tabs v-model="currentTab">
            <v-tab
                v-for="tab in tabs"
                :key="tab.icon"
            >
                <v-icon left>{{ tab.icon }}</v-icon>
                {{ tab.label }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentTab">
            <v-tab-item
                v-for="tab in tabs"
                :key="tab.icon"
            >
                <component :is="tab.component" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import Genera from '@/components/Admin/Genera/Genera.vue';
import Varieties from '@/components/Admin/Varieties/Varieties.vue';

export default {
    components: {
        Varieties,
    },
    data() {
        const tabs = [
            { label: this.$t('genera'), component: Genera, icon: 'mdi-barn' },
            { label: this.$t('varieties'), component: Varieties, icon: 'mdi-sprout' },
        ];
        return {
            tabs,
            currentTab: tabs[0].component,
        };
    },
};
</script>
