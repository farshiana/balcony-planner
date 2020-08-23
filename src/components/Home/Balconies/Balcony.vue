<template>
    <Moveable
        class="moveable"
        v-bind="moveable"
    >
        <span>Vue Moveable</span>
    </Moveable>
</template>

<script>
import { mapActions } from 'vuex';
import Moveable from 'vue-moveable';

export default {
    components: {
        Moveable,
    },
    props: {
        balcony: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        moveable: {
            draggable: true,
            throttleDrag: 0,
            resizable: false,
            throttleResize: 1,
            keepRatio: false,
            scalable: true,
            throttleScale: 0,
            rotatable: true,
            throttleRotate: 0,
            pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
            origin: false,
        },
    }),
    created() {
        this.loadPlanters(this.balcony.id);
    },
    methods: {
        ...mapActions('planters', ['loadPlanters']),
    },
};
</script>
