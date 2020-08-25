<template>
    <div>
        <span>{{ variety.seed }}</span>
        <span>{{ variety.plant }}</span>
        <span>{{ variety.harvest }}</span>
    </div>
</template>

<script>
export default {
    props: {
        variety: {
            type: Object,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
    },
};
</script>
