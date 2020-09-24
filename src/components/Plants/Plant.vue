<template>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        right
        width="764px"
        @input="onInput"
    >
        <v-container>
            <div class="d-flex align-center justify-space-between">
                <span class="text-h5">{{ plant.variety.name }}</span>
                <v-btn
                    class="mr-1"
                    icon
                    @click="$router.push('plants')"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-select
                            v-model="plant.variety.exposure"
                            :items="exposures"
                            :label="$t('shared.exposure')"
                            readonly
                        />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-select
                            v-model="plant.variety.watering"
                            :items="waterings"
                            :label="$t('shared.watering')"
                            readonly
                        />
                    </v-col>
                </v-row>
                <v-col>
                    <p>{{ $t('shared.seed') }}</p>
                    <v-btn-toggle
                        v-model="plant.variety.seed"
                        dense
                        multiple
                        rounded
                        class="disable-events"
                        :style="{ opacity: 0.8 }"
                    >
                        <v-btn
                            v-for="(month, index) in shortMonths"
                            :key="index"
                            active-class="brown white--text"
                            x-small
                        >
                            {{ month }}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col>
                    <p>{{ $t('shared.plant') }}</p>
                    <v-btn-toggle
                        v-model="plant.variety.plant"
                        dense
                        multiple
                        rounded
                        class="disable-events"
                        :style="{ opacity: 0.8 }"
                    >
                        <v-btn
                            v-for="(month, index) in shortMonths"
                            :key="index"
                            active-class="orange white--text"
                            x-small
                        >
                            {{ month }}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col>
                    <p>{{ $t('shared.harvest') }}</p>
                    <v-btn-toggle
                        v-model="plant.variety.harvest"
                        dense
                        multiple
                        rounded
                        class="disable-events"
                        :style="{ opacity: 0.8 }"
                    >
                        <v-btn
                            v-for="(month, index) in shortMonths"
                            :key="index"
                            active-class="green white--text"
                            x-small
                        >
                            {{ month }}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
                <v-col>
                    <v-textarea
                        v-model="plant.notes"
                        :label="$t('plants.notes')"
                        dense
                        readonly
                    />
                </v-col>
            </v-container>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import { exposures, waterings } from '@/constants';
import { shortMonths } from '@/utils';

export default {
    props: {
        plantId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            shortMonths,
            exposures,
            waterings,
            drawer: true,
        };
    },
    computed: {
        ...mapGetters('plants', ['getPlantById']),

        plant() {
            return this.getPlantById(this.plantId) || { id: this.plantId, variety: {} };
        },
    },
    methods: {
        onInput(value) {
            if (!value) {
                this.$router.push({ name: 'plants' });
            }
        },
    },
};
</script>
