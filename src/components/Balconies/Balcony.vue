<template>
    <div class="d-flex flex-row">
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
                >
                    <component :is="tab.component" />
                </v-tab-item>
            </v-tabs-items>
        </div>
        <div>DD</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import interact from 'interactjs';
import Plants from './Plants.vue';
import Planters from './Planters.vue';

export default {
    components: {
        Plants,
        Planters,
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
    mounted() {
        interact('.dropTarget').dropzone({
            ondrop(event) {
                alert(`${event.relatedTarget.id
                } was dropped into ${
                    event.target.id}`);
            },
        }).on('dropactivate', (event) => {
            event.target.classList.add('drop-activated');
        });
    },
    computed: {
        ...mapState('planters', ['planters']),
    },
    methods: {
        ...mapActions('planters', ['loadPlanters']),
    },
};
</script>
