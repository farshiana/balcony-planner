<template>
    <div
        :id="planter.id"
        class="planter shape"
        :class="planter.shape"
        :style="{
            background: color,
            left: planter.position.left,
            top: planter.position.top,
            width: planter.dimensions.width,
            height: planter.dimensions.height,
            'border-radius': planter.shape === SHAPE_CIRCLE ? '50%' : 0,
        }"
        @mouseover="hover = true;"
        @mouseleave="hover = false;"
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent="onDragEnter"
        @dragleave="onDragLeave"
    >
        <planting
            v-for="planting in planter.plantings"
            :key="planting.id"
            :planting="planting"
            @edit="onEdit(planting)"
        />
        <div
            v-if="hover"
            class="actions"
        >
            <v-btn
                icon
                small
                class="mr-2"
                @click.stop="$emit('edit')"
            >
                <v-icon small color="white">mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                icon
                small
                @click.stop="onDelete"
            >
                <v-icon small color="white">mdi-delete</v-icon>
            </v-btn>
        </div>
        <planting-form
            :visible="dialog"
            :planting="planting"
            @toggle="(visible) => { dialog = visible; }"
        />
    </div>
</template>

<script>
import Vue from 'vue';
import Moveable from 'moveable';
import { mapActions } from 'vuex';
import { SHAPE_RECTANGLE, SHAPE_CIRCLE, colors } from '@/constants';
import PlantingForm from './PlantingForm.vue';
import Planting from './Planting.vue';

export default {
    components: {
        PlantingForm,
        Planting,
    },
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
            dialog: false,
            planting: this.getDefaultPlanting(),
        };
    },
    mounted() {
        /* eslint-disable no-param-reassign */
        const dropZone = document.getElementById('dropZone');
        const frame = { translate: [0, 0] };

        new Moveable(document.body, {
            target: document.getElementById(this.planter.id),
            resizable: true,
            keepRatio: this.planter.shape !== SHAPE_RECTANGLE,
            origin: false,
            snappable: true,
            bounds: dropZone.getClientRects()[0],
            draggable: true,
        }).on('resizeStart', ({ dragStart }) => {
            if (dragStart) dragStart.set(frame.translate);
        }).on('resize', ({
            target, width, height, drag,
        }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;

            const { beforeTranslate } = drag;
            frame.translate = beforeTranslate;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }).on('resizeEnd', ({ target }) => {
            this.planter.dimensions.width = target.style.width;
            this.planter.dimensions.height = target.style.height;
            this.planter.position.left = `${parseInt(this.planter.position.left, 10) + frame.translate[0]}px`;
            this.planter.position.top = `${parseInt(this.planter.position.top, 10) + frame.translate[1]}px`;
            target.style.transform = '';
            this.updatePlanter(this.planter);
        })
            .on('drag', ({ target, left, top }) => {
                target.style.left = `${left}px`;
                target.style.top = `${top}px`;
            })
            .on('dragEnd', ({ target }) => {
                this.planter.position.left = target.style.left;
                this.planter.position.top = target.style.top;
                this.updatePlanter(this.planter);
            });
        /* eslint-enable no-param-reassign */
    },
    computed: {
        color() {
            return colors.find((color) => color.value === this.planter.color).hex;
        },
    },
    methods: {
        ...mapActions('planters', ['updatePlanter']),

        getDefaultPlanting: (props) => ({
            seed: [],
            plant: [],
            harvest: [],
            ...props,
        }),
        isDraggingPlant(event) {
            if (event.target.id !== this.planter.id) return;

            const plantId = event.dataTransfer.getData('plantId');
            return !!plantId; // eslint-disable-line consistent-return
        },
        onDragEnter(event) {
            if (!this.isDraggingPlant(event)) return;

            event.target.classList.add('hover');
        },
        onDragLeave(event) {
            if (!this.isDraggingPlant(event)) return;

            event.target.classList.remove('hover');
        },
        onDrop(event) {
            if (!this.isDraggingPlant(event)) return;

            event.target.classList.remove('hover');

            const { left, top } = event.target.getBoundingClientRect();

            const plantId = event.dataTransfer.getData('plantId');
            this.planting = this.getDefaultPlanting({
                planterId: this.planter.id,
                plantId,
                position: {
                    left: `${parseInt(event.clientX - left, 10)}px`,
                    top: `${parseInt(event.clientY - top, 10)}px`,
                },
            });
            this.dialog = true;
        },
        onDelete() {

        },
        onEdit(planting) {
            this.planting = Vue.util.extend({}, planting);
            this.dialog = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.planter {
    border: thin dashed transparent;
    .plant {
        position: absolute;
    }
    .actions {
        position: absolute;
        top: 4px;
        right: 4px;
    }
    &.hover {
        border: thin dashed #CFD8DC;
        opacity: 0.8;
    }
}
</style>
