<template>
    <div
        :id="_uid"
        class="shape"
        :class="planter.shape"
        :style="{
            background: color,
            left: `${planter.position.left}px`,
            top: `${planter.position.top}px`,
            width: `${planter.dimensions.width}px`,
            height: `${planter.dimensions.height}px`,
            'border-radius': planter.shape === SHAPE_CIRCLE ? '50%' : 0,
        }"
        @mouseover="hover = true;"
        @mouseleave="hover = false;"
    >
        {{ planter.name }}

        <div
            v-if="hover"
            class="actions"
        >
            <v-icon
                small
                color="white"
                class="mr-2"
                @click.stop="$emit('edit')"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                color="white"
                @click.stop="onDelete"
            >
                mdi-delete
            </v-icon>
        </div>
    </div>
</template>

<script>
import interact from 'interactjs';
import { SHAPE_RECTANGLE, SHAPE_CIRCLE, colors } from '@/constants';

export default {
    props: {
        planter: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            SHAPE_CIRCLE,
            hover: false,
        };
    },
    mounted() {
        const modifiers = this.planter.shape === SHAPE_RECTANGLE
            ? interact.modifiers.restrictEdges({
                outer: 'parent',
            }) : interact.modifiers.aspectRatio({
                ratio: 'preserve',
                modifiers: [
                    interact.modifiers.restrictEdges({
                        outer: 'parent',
                    }),
                ],
            });

        interact(document.getElementById(this._uid))
            .resizable({
                edges: {
                    left: true, right: true, bottom: true, top: true,
                },
                listeners: {
                    move(event) {
                        const { target } = event;
                        let x = (parseFloat(target.getAttribute('data-x')) || 0);
                        let y = (parseFloat(target.getAttribute('data-y')) || 0);

                        // update the element's style
                        target.style.width = `${event.rect.width}px`;
                        target.style.height = `${event.rect.height}px`;

                        // translate when resizing from top or left edges
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        target.style.webkitTransform = target.style.transform = `translate(${x}px,${y}px)`;

                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                    },
                },
                modifiers: [
                    modifiers,
                    interact.modifiers.restrictSize({
                        min: { width: 50, height: 50 },
                    }),
                ],
                inertia: true,
            });
    },
    computed: {
        color() {
            return colors.find((color) => color.value === this.planter.color).hex;
        },
    },
    methods: {
        onDelete() {

        },
    },
};
</script>

<style lang="scss" scoped>
.shape {
    .actions {
        position: absolute;
        top: 4px;
        right: 4px;
    }
}
</style>
