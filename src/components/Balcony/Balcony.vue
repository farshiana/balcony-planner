<template>
    <div class="balcony d-flex" :style="{ height: '100%' }">
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
        background: #3f51b5;
        color: white;
        cursor: move;
        &.rectangle {
            width: 75px;
            height: 40px;
        }
        &.circle {
            width: 75px;
            height: 75px;
            border-radius: 50%;
        }
        &.square {
            width: 75px;
            height: 75px;
        }
        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }
}
</style>
