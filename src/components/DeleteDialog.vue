<template>
    <v-dialog v-model="dialog" max-width="290">
        <v-card>
            <v-card-title class="headline">{{ title }}</v-card-title>
            <v-card-text>
                <template v-if="name">
                    {{ $t('shared.deleteObjectConfirmation', { name }) }}
                </template>
                <template v-else>
                    {{ $t('shared.deleteConfirmation') }}
                </template>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">{{ $t('shared.cancel') }}</v-btn>
                <v-btn
                    color="error"
                    text
                    :loading="deleting"
                    @click="$emit('delete')"
                >
                    {{ $t('shared.confirm') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            default: '',
        },
        deleting: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        dialog: {
            get() {
                return this.visible;
            },
            set(visible) {
                this.$emit('update:visible', visible);
            },
        },
    },
};
</script>
