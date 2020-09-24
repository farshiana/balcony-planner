<template>
    <v-list>
        <v-list-item
            v-for="shape in shapes"
            :key="shape.value"
            @click="selectShape"
        >
            <v-list-item-icon>
                <v-icon x-large color="accent">{{ `mdi-${shape.value}` }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title v-text="shape.text" />
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
import { shapes } from '@/constants';

export default {
    data() {
        return {
            shapes,
        };
    },
    methods: {
        selectShape() {
            // TODO: implement
        },
    },
};
</script>
