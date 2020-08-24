<template>
    <div>
        <div class="dropTarget" :style="{ width: '500px', height: '400px', background: 'red' }">
            Drop target
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import interact from 'interactjs';

export default {
    props: {
        balcony: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.loadPlanters(this.balcony.id);
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
    computed: {
        ...mapState('planters', ['planters']),
    },
    methods: {
        ...mapActions('planters', ['loadPlanters']),
    },
};
</script>
