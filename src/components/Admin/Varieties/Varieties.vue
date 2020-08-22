<template>
    <v-container fluid>
        <variety-form />
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import VarietyForm from './VarietyForm.vue';

export default {
    components: {
        VarietyForm,
    },
    created() {
        this.loadGenera();
    },
    methods: {
        ...mapActions('genera', ['loadGenera']),
    },
};
</script>
