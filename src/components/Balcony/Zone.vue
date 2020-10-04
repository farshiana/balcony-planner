<template>
    <div class="zone elevation-2 my-3 mr-3">
        <div
            id="dropZone"
            class="drop-zone ma-3"
            @drop="onDrop"
            @dragover.prevent
            @dragenter.prevent="onDragEnter"
            @dragleave="onDragLeave"
        >
            zone
            <planter
                v-for="planter in planters"
                :key="planter.id"
                :planter="planter"
                @edit="onEdit(planter)"
            />
            <planter-form
                :visible="dialog"
                :planter="planter"
                @toggle="(visible) => { dialog = visible; }"
            />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { COLORS } from '@/constants';
import Planter from './Planter.vue';
import PlanterForm from './PlanterForm.vue';

export default {
    components: {
        Planter,
        PlanterForm,
    },
    data() {
        return {
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
        onEdit(planter) {
            this.planter = Vue.util.extend({}, planter);
            this.dialog = true;
        },
        onDragEnter(event) {
            if (event.target.id !== 'dropZone') return;

            event.target.classList.add('hover');
        },
        onDragLeave(event) {
            if (event.target.id !== 'dropZone') return;

            event.target.classList.remove('hover');
        },
        onDrop(event) {
            if (event.target.id !== 'dropZone') return;

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
        },
    },
};
</script>

<style lang="scss" scoped>
.zone {
    flex: 5 0;
    .drop-zone {
        position: relative;
        height: calc(100% - 24px);
        overflow: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
        .shape {
            position: absolute;
        }
    }
    &.hover {
        background: #ECEFF1;
    }
}
</style>
