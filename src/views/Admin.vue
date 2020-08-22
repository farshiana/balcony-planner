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
import Produces from '@/components/Admin/Produces/Produces.vue';
import Users from '@/components/Admin/Users/Users.vue';

export default {
    components: {
        Produces,
        Users,
    },
    data() {
        const tabs = [
            { label: 'Produces', component: 'produces', icon: 'mdi-database-edit' },
            { label: 'Uers', component: 'users', icon: 'mdi-account-group' },
        ];
        return {
            tabs,
            currentTab: tabs[0].components,
        };
    },
};
</script>
