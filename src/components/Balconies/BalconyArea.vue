<template>
    <div class="dropTarget" :style="{ flex: '1 0', background: 'red' }">
        Drop target
    </div>
</template>

<script>
import interact from 'interactjs';

export default {
    props: {
        balcony: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        interact('.dropTarget').dropzone({
            ondrop(event) {
                alert(`${event.relatedTarget.id
                } was dropped into ${
                    event.target.id}`);
            },
        }).on('dropactivate', (event) => {
            event.target.classList.add('drop-activated');
        });
    },
};
</script>
