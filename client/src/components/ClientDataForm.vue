<template>
  <v-form ref="form" v-model="valid" class="client-form">
    <v-text-field
      v-model="leeftijd"
      min="0"
      max="200"
      type="number"
      label="Leeftijd"
      :rules="[v => !!v || 'Verplicht veld']"
      required
    ></v-text-field>
    <v-select
      v-model="geslacht"
      :items="geslachten"
      :input-value="parsedGender"
      item-text="text"
      item-value="value"
      :rules="[v => !!v || 'Verplicht veld']"
      label="Geslacht"
      required
    ></v-select>
    <v-text-field
      v-model="leeftijd_naar_school"
      min="0"
      max="200"
      type="number"
      label="Leeftijd gestopt met school?"
      :rules="[v => !!v || 'Verplicht veld']"
      required
    ></v-text-field>
    <v-text-field
      min="0"
      max="200"
      type="number"
      v-model="jaren_naar_school"
      label="Aantal jaren naar school geweest?"
      :rules="[v => !!v || 'Verplicht veld']"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" @click="submit">Gegevens opslaan</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      leeftijd: this.age,
      geslachten: [
        {
          value: "m",
          text: "Man"
        },
        {
          value: "v",
          text: "Vrouw"
        },
        {
          value: "a",
          text: "Andere"
        }
      ],
      geslacht: "",
      leeftijd_naar_school: this.schooledTill,
      jaren_naar_school: this.schooledFor
    };
  },
  props: {
    age: { type: Number, default: null },
    schooledTill: { type: Number, default: null },
    schooledFor: { type: Number, default: null },
    gender: { type: String, default: "Man" },
    submit: { type: Function, default: function() {} }
  },
  computed: {
    parsedGender() {
      return this.geslachten.filter(
        e => e.text.toLowerCase() === this.gender.toLowerCase()
      )[0].value;
    }
  },
  created() {
    this.geslacht = this.parsedGender;
  }
};
</script>

<style scoped>
.client-form {
  padding: 15px;
}
</style>
