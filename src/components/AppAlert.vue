<template>
    <v-alert
        class="app-alert text-center"
        :value="!!alert"
        :type="alert && alert.type"
        dismissible
        @input="setAlert(null)"
    >
        {{ alert && alert.message }}
    </v-alert>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['alert']),
    },
    methods: {
        ...mapMutations(['setAlert']),
    },
};
</script>

<style lang="scss" scoped>
.app-alert {
    position: fixed;
    z-index: 100;
    width: 100%;
}
</style>
