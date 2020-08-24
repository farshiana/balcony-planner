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
        <v-tabs-items v-model="currentTab" :style="{ height: 'calc(100% - 48px)' }">
            <v-tab-item
                v-for="tab in tabs"
                :key="tab.icon"
                class="fill-height"
            >
                <component :is="tab.component" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import Planning from '@/components/Home/Planning/Planning.vue';
import Balconies from '@/components/Home/Balconies/Balconies.vue';

export default {
    name: 'Home',
    components: {
        Planning,
        Balconies,
    },
    data() {
        const tabs = [
            { label: this.$t('home.planning'), component: Planning, icon: 'mdi-calendar-month' },
            { label: this.$t('home.balcony'), component: Balconies, icon: 'mdi-window-open-variant' },
        ];
        return {
            tabs,
            currentTab: tabs[0].component,
        };
    },
};
</script>
