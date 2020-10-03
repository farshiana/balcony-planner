<template>
    <div
        class="zone elevation-2 my-3 mr-3"
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent
    >
        zone
    </div>
</template>

<script>
export default {
    methods: {
        onDrop(event) {
            const shape = event.dataTransfer.getData('shape');
            event.target.appendChild(document.getElementById(shape).cloneNode(true));
        },
    },
};
</script>

<style lang="scss" scoped>
.zone {
    flex: 5 0;
}
</style>
