<template>
    <div class="balcony d-flex" style="height: 100%">
        <panel />
        <zone />
    </div>
</template>

<script>
import Panel from './Panel.vue';
import Zone from './Zone.vue';

export default {
    components: {
        Panel,
        Zone,
    },
};
</script>

<style lang="scss" scoped>
.balcony {
    ::v-deep .shape {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #2196F3;
        color: white;
        cursor: move;
        &.rectangle {
            width: 125px;
            height: 90px;
        }
        &.circle {
            width: 125px;
            height: 125px;
            border-radius: 50%;
        }
        &.square {
            width: 125px;
            height: 125px;
        }
        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }
}
</style>
