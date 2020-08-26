<template>
    <div>Planters</div>
    <!-- <v-card class="home-balconies-planters">
        <v-chip
            v-for="planter in planters"
            :key="planter.value"
            class="ma-2 draggable"
            color="accent elevation-3"
            dark
            small
        >
            <v-avatar left>
                <v-icon small>{{ planter.icon }}</v-icon>
            </v-avatar>
            {{ planter.label }}
        </v-chip>
    </v-card> -->
</template>

<script>
import interact from 'interactjs';

export default {
    data() {
        return {
            planters: [
                { value: 'circle', icon: 'mdi-circle', label: this.$t('rounded') },
                { value: 'square', icon: 'mdi-square', label: this.$t('square') },
            ],
        };
    },
    mounted() {
        const position = { x: 0, y: 0 };

        interact('.draggable').draggable({
            listeners: {
                start(event) {
                    console.log(event.type, event.target);
                },
                move(event) {
                    position.x += event.dx;
                    position.y += event.dy;

                    // eslint-disable-next-line no-param-reassign
                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                },
            },
        });
    },
};
</script>

<style lang="scss" scoped>
.home-balconies-planters {
    .draggable {
        z-index: 1; // Fix draggable being below the dropzone
        touch-action: none;
        user-select: none;
    }
}
</style>
