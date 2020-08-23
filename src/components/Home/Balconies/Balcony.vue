<template>
    <div>toto</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        balcony: {
            type: Object,
            required: true,
        },
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
