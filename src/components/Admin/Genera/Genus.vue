<template>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        right
        width="780px"
        @input="onInput"
    >
        <v-container>
            <div class="d-flex align-center justify-space-between">
                <span class="text-h5 text-capitalize-first">{{ genus.name }}</span>
                <v-btn
                    class="mr-1"
                    icon
                    @click="$router.push('genera')"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            <varieties :genus="genus" />
        </v-container>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import Varieties from './Varieties.vue';

export default {
    components: {
        Varieties,
    },
    props: {
        genusId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            drawer: true,
        };
    },
    computed: {
        ...mapGetters('genera', ['getGenusById']),

        genus() {
            return this.getGenusById(this.genusId) || { id: this.genusId, name: '', varieties: [] };
        },
    },
    methods: {
        onInput(value) {
            if (!value) {
                this.$router.push({ name: 'genera' });
            }
        },
    },
};
</script>
