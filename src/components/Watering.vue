<template>
    <component :is="`watering-${watering}`" width="24px" height="24px" />
</template>

<script>
import WateringLow from '@/assets/watering-low.svg';
import WateringMedium from '@/assets/watering-medium.svg';
import WateringHigh from '@/assets/watering-high.svg';

export default {
    components: {
        WateringLow,
        WateringMedium,
        WateringHigh,
    },
    props: {
        watering: {
            type: String,
            required: true,
        },
    },
};
</script>
