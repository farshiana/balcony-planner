<template>
    <v-container fluid>
        <v-data-table
            :headers="headers"
            :items="plants"
            :items-per-page="12"
            :loading="loadingPlants"
            class="elevation-1"
            dense
        />
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            headers: [
                { value: 'name', text: this.$t('plant') },
                { text: this.$t('jan') },
                { text: this.$t('feb') },
                { text: this.$t('mar') },
                { text: this.$t('apr') },
                { text: this.$t('may') },
                { text: this.$t('jun') },
                { text: this.$t('jul') },
                { text: this.$t('aug') },
                { text: this.$t('sept') },
                { text: this.$t('oct') },
                { text: this.$t('nov') },
                { text: this.$t('dec') },
            ],
        };
    },
    created() {
        this.loadPlants();
    },
    computed: {
        ...mapState('plants', ['plants', 'loadingPlants']),
    },
    methods: {
        ...mapActions('plants', ['loadPlants']),
    },
};
</script>
