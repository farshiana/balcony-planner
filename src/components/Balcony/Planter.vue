<template>
    <div
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
import { SHAPE_CIRCLE, colors } from '@/constants';

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
