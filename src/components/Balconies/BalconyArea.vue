<template>
    <div class="dropTarget" :style="{ flex: '1 0', background: 'red' }">
        Drop target
    </div>
</template>

<script>
export default {
    props: {
        balcony: {
            type: Object,
            required: true,
        },
    },
};
</script>
