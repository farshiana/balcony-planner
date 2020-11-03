<template>
    <div>
        <v-tabs v-model="activeTab">
            <v-tab
                v-for="tab in tabs"
                :key="tab.to"
                :to="{ name: tab.to }"
            >
                <v-icon left>{{ tab.icon }}</v-icon>
                {{ tab.label }}
            </v-tab>
        </v-tabs>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        const tabs = [
            { label: this.$t('shared.genera'), icon: 'mdi-barn', to: 'genera' },
        ];
        return {
            tabs,
            activeTab: tabs[0].component,
        };
    },
};
</script>
