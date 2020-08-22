<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="secondary"
                fab
                fixed
                dark
                bottom
                right
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">New Edibale</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Legal first name*" required />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Legal middle name" hint="example of helper text only on focus" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                        label="Legal last name*"
                        hint="example of persistent helper text"
                        persistent-hint
                        required
                    />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Email*" required />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Password*" type="password" required />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Age*"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-autocomplete
                        :items="['Skiing', 'Ice hockey', 'Soccer']"
                        label="Interests"
                        multiple
                        ></v-autocomplete>
                    </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false;">Close</v-btn>
                <v-btn color="info" text @click="dialog = false;">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        };
    },
};
</script>
