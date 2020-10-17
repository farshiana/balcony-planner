<template>
    <div class="image-uploader">
        <template v-if="file">
            <div ref="croppie" />
        </template>
        <template v-else>
            <div
                class="upload-area d-flex align-center justify-center clickable"
                @click="$refs.imageInput.click()"
            >
                <span class="text-uppercase text-medium">{{ $t('shared.upload') }}</span>
            </div>
            <input
                ref="imageInput"
                type="file"
                accept="image/jpeg"
                style="display: none"
                @change="onImageChange"
            >
        </template>
    </div>
</template>

<script>
import Croppie from 'croppie';
import 'croppie/croppie.css';

export default {
    data() {
        return {
            file: null,
        };
    },
    methods: {
        onImageChange(event) {
            [this.file] = event.target.files;

            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                new Croppie(this.$refs.croppie, { // eslint-disable-line no-new
                    viewport: { width: 128, height: 128 },
                    showZoomer: false,
                    url: loadEvent.target.result,
                });
            };

            reader.readAsDataURL(event.target.files[0]);
        },
    },
};
</script>

<style lang="scss" scoped>
.image-uploader {
    height: 100%;
    .upload-area {
        height: 100%;
        border: thin dashed #CFD8DC;
        border-radius: 4px;
        &:hover {
            background: #ECEFF1;
        }
    }
}
</style>
