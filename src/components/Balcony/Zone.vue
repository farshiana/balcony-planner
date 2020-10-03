<template>
    <div
        class="zone elevation-2 my-3 mr-3"
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent="onDragEnter"
        @dragleave="onDragLeave"
    >
        zone
        <div
            v-for="planter in planters"
            :key="planter.id"
            class="shape"
            :class="planter.shape"
            :style="{
                left: `${planter.position.left}px`,
                top: `${planter.position.top}px`,
                width: `${planter.dimensions.width}px`,
                height: `${planter.dimensions.height}px`,
                'border-radius': planter.shape === SHAPE_CIRCLE ? '50%' : 0,
            }"
        >
            {{ planter.name }}
        </div>
        <planter-form
            :visible="dialog"
            :planter="planter"
            @toggle="(visible) => { dialog = visible; }"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SHAPE_CIRCLE, COLORS } from '@/constants';
import PlanterForm from './PlanterForm.vue';

export default {
    components: {
        PlanterForm,
    },
    data() {
        return {
            SHAPE_CIRCLE,
            dialog: false,
            planter: this.getDefaultPlanter(),
        };
    },
    computed: {
        ...mapState('planters', ['planters', 'loadingPlanters']),
    },
    async created() {
        this.loading = true;
        await this.loadPlanters();
        this.loading = false;
    },
    methods: {
        ...mapActions('planters', ['loadPlanters']),

        getDefaultPlanter: (props) => ({
            name: '',
            color: COLORS[0],
            ...props,
        }),
        onDragEnter(event) {
            event.target.classList.add('hover');
        },
        onDragLeave(event) {
            event.target.classList.remove('hover');
        },
        onDrop(event) {
            const shape = event.dataTransfer.getData('shape');
            const source = document.getElementById(shape);

            const {
                left, top, width, height,
            } = source.getBoundingClientRect();
            this.planter = this.getDefaultPlanter({
                shape,
                position: { left, top },
                dimensions: { width, height },
            });
            this.dialog = true;

            // const clone =  source.cloneNode(true);
            // clone.setAttribute('draggable', false);
            // clone.style.opacity = 1;
            // clone.style.position = 'absolute';

            // // Use offset since the structure is not nested, otherwise:
            // // const rect = event.target.getBoundingClientRect();
            // // clone.style.left = `${event.clientX - rect.left}px`;
            // // clone.style.top = `${event.clientY - rect.top}px`;

            // clone.style.left = `${event.offsetX}px`;
            // clone.style.top = `${event.offsetY}px`;

            // event.target.appendChild(clone);
            // event.target.classList.remove('hover');
        },
    },
};
</script>

<style lang="scss" scoped>
.zone {
    flex: 5 0;
    position: relative;
    &.hover {
        background: #ECEFF1;
    }
}
</style>
