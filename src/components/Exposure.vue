<template>
    <component :is="`exposure-${exposure}`" width="24px" height="24px" />
</template>

<script>
import ExposureShade from '@/assets/exposure-shade.svg';
import ExposurePartial from '@/assets/exposure-partial.svg';
import ExposureSun from '@/assets/exposure-sun.svg';

export default {
    components: {
        ExposureShade,
        ExposurePartial,
        ExposureSun,
    },
    props: {
        exposure: {
            type: String,
            required: true,
        },
    },
};
</script>
