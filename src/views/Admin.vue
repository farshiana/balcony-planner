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
import Genera from '@/components/Admin/Genera/Genera.vue';
import Users from '@/components/Admin/Users/Users.vue';

export default {
    components: {
        Genera,
        Users,
    },
    data() {
        const tabs = [
            { label: this.$t('admin.genera'), component: 'genera', icon: 'mdi-sprout' },
            { label: this.$t('admin.users'), component: 'users', icon: 'mdi-account-group' },
        ];
        return {
            tabs,
            currentTab: tabs[0].components,
        };
    },
};
</script>
