<template>
    <div class="d-flex flex-column align-center ma-3">
        <div
            v-for="shape in shapes"
            :key="shape.value"
            :id="shape.value"
            class="shape d-flex align-center justify-center"
            :class="shape.value"
            draggable
            @dragstart="onDragStart($event, shape.value)"
        >
            {{ shape.text }}
        </div>
    </div>
</template>

<script>
import { shapes } from '@/constants';

export default {
    data() {
        return {
            shapes,
        };
    },
    methods: {
        onDragStart(event, shape) {
            /* eslint-disable no-param-reassign */
            event.dataTransfer.setData('shape', shape);
            event.dataTransfer.dropEffect = 'copy';
            event.dataTransfer.effectAllowed = 'copy';
            /* eslint-enable no-param-reassign */
        },
    },
};
</script>
