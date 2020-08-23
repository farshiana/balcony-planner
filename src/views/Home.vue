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
import Balcony from '@/components/Home/Balcony/Balcony.vue';

export default {
    name: 'Home',
    components: {
        Balcony,
    },
    data() {
        const tabs = [
            { label: this.$t('home.balcony'), component: 'Balcony', icon: 'mdi-window-open-variant' },
        ];
        return {
            tabs,
            currentTab: tabs[0].components,
        };
    },
};
</script>
