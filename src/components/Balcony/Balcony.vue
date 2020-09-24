<template>
    <div class="d-flex" :style="{ height: '100%' }">
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
