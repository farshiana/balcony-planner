<template>
    <v-icon small>{{ icon }}</v-icon>
</template>

<script>
import {
    EXPOSURE_SHADE,
    EXPOSURE_SUN,
    EXPOSURE_PARTIAL,
} from '@/constants';

export default {
    props: {
        exposure: {
            type: String,
            required: true,
        },
    },
    computed: {
        icon() {
            switch (this.exposure) {
            case EXPOSURE_SHADE:
                return 'mdi-weather-cloudy';
            case EXPOSURE_SUN:
                return 'mdi-weather-sunny';
            case EXPOSURE_PARTIAL:
                return 'mdi-weather-partlycloudy';
            default:
                console.error(`Unknown exposure ${this.exposure}`);
                return 'mdi-bug';
            }
        },
    },
};
</script>
