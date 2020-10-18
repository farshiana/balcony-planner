<template>
    <div>
        {{ planting }}
    </div>
</template>

<script>
export default {
    props: {
        planting: {
            type: Object,
            required: true,
        },
    },
};
</script>
