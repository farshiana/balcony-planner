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
import Moveable from 'moveable';
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
        /* eslint-disable no-param-reassign */
        const dropZone = document.getElementById('dropZone');
        const frame = { translate: [0, 0] };

        new Moveable(document.body, {
            target: document.getElementById(this._uid), // eslint-disable-line no-underscore-dangle
            resizable: true,
            keepRatio: this.planter.shape !== SHAPE_RECTANGLE,
            origin: false,
            snappable: true,
            bounds: dropZone.getClientRects()[0],
        }).on('resizeStart', ({ dragStart }) => {
            if (dragStart) dragStart.set(frame.translate);
        }).on('resize', ({
            target, width, height, drag,
        }) => {
            const { beforeTranslate } = drag;
            frame.translate = beforeTranslate;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        });
        /* eslint-enable no-param-reassign */
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
