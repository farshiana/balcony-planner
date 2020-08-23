<template>
    <Moveable v-bind="moveable">
        <span>Vue Moveable</span>
    </Moveable>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
            // snappable: true,
            bounds: {
                left: 40,
                top: 40,
                right: 600,
                bottom: 430,
            },
            // throttleDrag: 0,
            // resizable: false,
            // throttleResize: 1,
            // keepRatio: false,
            // scalable: true,
            // throttleScale: 0,
            // rotatable: true,
            // throttleRotate: 0,
            // pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
            // origin: false,
        },
    }),
    created() {
        this.loadPlanters(this.balcony.id);
    },
    computed: {
        ...mapState('planters', ['planters']),
    },
    methods: {
        ...mapActions('planters', ['loadPlanters']),

        // onDrag({ target, transform }) {
        //     console.log('onDrag', transform);
        //     target.style.transform = transform;
        // },
    },
};
</script>
