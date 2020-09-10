<template>
    <v-slide-group class="my-3 plants" show-arrows>
        <v-slide-item
            v-for="n in 25"
            :key="n"
            v-slot:default="{ active, toggle }"
        >
            <v-btn
                class="plant mx-2"
                :input-value="active"
                active-class="purple white--text"
                depressed
                rounded
                @click="toggle"
            >
                Options {{ n }}
            </v-btn>
        </v-slide-item>
    </v-slide-group>
</template>
