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
                <span class="headline">{{ $t('admin.varieties.newVariety') }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                v-model="category"
                                :items="categories"
                                :label="$t('admin.varieties.category')"
                                clearable
                                required
                                @input="onCategorySelect"
                            />
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-autocomplete
                                v-model="genus"
                                :items="genera"
                                :label="$t('admin.varieties.genus')"
                                clearable
                                required
                                @input="onGenusSelect"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="name"
                                :error-messages="nameErrors"
                                :label="$t('admin.varieties.name')"
                                required
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" text @click="dialog = false;">{{ $t('cancel') }}</v-btn>
                <v-btn color="primary" text @click="dialog = false;">{{ $t('save') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

const fruits = ['Apple', 'Strawberry'];
const herbs = ['Basil', 'Thym'];
const vegetables = ['Beans', 'Tomatoes'];

export default {
    mixins: [validationMixin],
    validations: {
        name: { required, maxLength: maxLength(30) },
    },
    data() {
        return {
            dialog: false,
            categories: [
                { value: 'fruits', text: this.$t('fruits'), genera: fruits },
                { value: 'herbs', text: this.$t('herbs'), genera: herbs },
                { value: 'vegetables', text: this.$t('vegetables'), genera: vegetables },
            ],
            category: '',
            genus: '',
            name: '',
        };
    },
    computed: {
        genera() {
            const category = this.categories.find((cat) => cat.value === this.category);
            if (category) return category.genera;

            return [
                { header: this.$t('fruits') },
                ...fruits,
                { divider: true },
                { header: this.$t('herbs') },
                ...herbs,
                { divider: true },
                { header: this.$t('vegetables') },
                ...vegetables,
            ];
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            if (!this.$v.name.maxLength) errors.push(this.$t('auth.nameMaxLength'));
            if (!this.$v.name.required) errors.push(this.$t('auth.nameRequired'));
            return errors;
        },
    },
    methods: {
        onCategorySelect(categoryValue) {
            if (!categoryValue || !this.genus) return;

            const category = this.categories.find((cat) => cat.value === categoryValue);
            if (!category.genera.includes(this.genus)) {
                this.genus = '';
            }
        },
        onGenusSelect(genus) {
            if (!genus || this.category) return;

            this.category = this.categories.find((cat) => cat.genera.includes(genus));
        },
    },
};
</script>
