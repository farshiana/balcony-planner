<template>
    <div class="d-flex flex-column align-center ma-3">
        <div
            v-for="shape in shapes"
            :key="shape.value"
            :id="shape.value"
            class="shape"
            :class="shape.value"
            draggable
            @dragstart="onDragStart($event, shape.value)"
            @dragend="onDragEnd"
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
        /* eslint-disable no-param-reassign */
        onDragStart(event, shape) {
            event.target.style.opacity = 0.6;

            const { left, top } = event.target.getBoundingClientRect();
            event.dataTransfer.setData('shape', shape);
            event.dataTransfer.setData('shiftX', event.clientX - left);
            event.dataTransfer.setData('shiftY', event.clientY - top);

            event.dataTransfer.dropEffect = 'copy';
            event.dataTransfer.effectAllowed = 'copy';
        },
        onDragEnd(event) {
            event.target.style.opacity = 1;
        },
        /* eslint-enable no-param-reassign */
    },
};
</script>
