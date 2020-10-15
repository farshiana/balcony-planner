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
            width: 100px;
            height: 75px;
        }
        &.circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        &.square {
            width: 100px;
            height: 100px;
        }
        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }
}
</style>
