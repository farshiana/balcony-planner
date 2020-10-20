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
            <planter
                v-for="planter in planters"
                :key="planter.id"
                :planter="planter"
                @edit="onEdit(planter)"
                @delete="onDelete(planter)"
            />
        </div>
        <planter-form
            :visible="dialog"
            :planter="planter"
            @toggle="(visible) => { dialog = visible; }"
        />
        <delete-dialog
            :visible.sync="deleteDialog"
            :title="$t('planters.deletePlanter')"
            :name="planter.name"
            :deleting="deleting"
            @delete="onConfirmDelete"
        />
    </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { COLORS } from '@/constants';
import DeleteDialog from '@/components/DeleteDialog.vue';
import Planter from './Planter/Planter.vue';
import PlanterForm from './Planter/PlanterForm.vue';

export default {
    components: {
        Planter,
        PlanterForm,
        DeleteDialog,
    },
    data() {
        return {
            dialog: false,
            deleteDialog: false,
            deleting: false,
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
        ...mapActions('planters', ['loadPlanters', 'deletePlanter']),

        getDefaultPlanter: (props) => ({
            name: '',
            color: COLORS[0],
            ...props,
        }),
        onEdit(planter) {
            this.planter = Vue.util.extend({}, planter);
            this.dialog = true;
        },
        onDelete(planter) {
            this.planter = planter;
            this.deleteDialog = true;
        },
        async onConfirmDelete() {
            this.deleting = true;
            await this.deletePlanter(this.planter);
            this.deleting = false;
            this.deleteDialog = false;
        },
        isDraggingPlanter(event) {
            if (event.target.id !== 'dropZone') return;

            const shape = event.dataTransfer.getData('shape');
            return !!shape; // eslint-disable-line consistent-return
        },
        onDragEnter(event) {
            if (!this.isDraggingPlanter(event)) return;

            event.target.classList.add('hover');
        },
        onDragLeave(event) {
            if (!this.isDraggingPlanter(event)) return;

            event.target.classList.remove('hover');
        },
        onDrop(event) {
            if (!this.isDraggingPlanter(event)) return;

            event.target.classList.remove('hover');

            const shape = event.dataTransfer.getData('shape');
            const { width, height } = document.getElementById(shape).getBoundingClientRect();
            const { left, top } = event.target.getBoundingClientRect();

            this.planter = this.getDefaultPlanter({
                shape,
                position: {
                    left: `${parseInt(event.clientX - left, 10)}px`,
                    top: `${parseInt(event.clientY - top, 10)}px`,
                },
                dimensions: { width: `${width}`, height: `${height}px` },
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
        border: thin dashed transparent;
        &::-webkit-scrollbar {
            display: none;
        }
        .shape {
            position: absolute;
        }
        &.hover {
            border: thin dashed #CFD8DC;
        }
    }
}
</style>
