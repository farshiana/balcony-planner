<template>
    <div>
        <v-tabs v-model="currentTab">
            <v-tab
                v-for="tab in tabs"
                :key="tab.component"
            >
                <v-icon left>{{ tab.icon }}</v-icon>
                {{ tab.label }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentTab">
            <v-tab-item
                v-for="tab in tabs"
                :key="tab.component"
            >
                <component :is="tab.component" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import Varieties from '@/components/Admin/Varieties/Varieties.vue';

export default {
    components: {
        Varieties,
    },
    data() {
        const tabs = [{ label: this.$t('admin.varieties'), component: 'Varieties', icon: 'mdi-sprout' }];
        return {
            tabs,
            currentTab: tabs[0].component,
        };
    },
};
</script>
