<template>
  <v-form ref="form" v-model="valid" class="client-form">
    <v-text-field
      v-model="leeftijd"
      value=""
      min="0"
      max="125"
      type="number"
      label="Leeftijd"
      :rules="[
                v => !!v || 'Verplicht veld',
                v => parseInt(v) <= 125 || 'Geef een geldige leeftijd in.'
              ]"
      required
    ></v-text-field>
    <v-select
      v-model="geslacht"
      :items="geslachten"
      :input-value="parsedGender"
      item-text="text"
      item-value="value"
      :rules="[
                v => !!v || 'Verplicht veld'
              ]"
      label="Geslacht"
      required
    ></v-select>
    <v-text-field
      v-model="leeftijd_naar_school"
      min="0"
      max="125"
      type="number"
      label="Leeftijd gestopt met school?"
      :rules="[
                v => !!v || 'Verplicht veld',
                v => parseInt(v) <= 125 && parseInt(v) <= (leeftijd) || 'Geef een geldige waarde in.'
              ]"
      required
    ></v-text-field>
    <v-text-field
      min="0"
      max="125"
      type="number"
      v-model="jaren_naar_school"
      label="Aantal jaren naar school geweest?"
      :rules="[
                v => !!v || 'Verplicht veld',
                v => parseInt(v) <= 125 && parseInt(v) < (leeftijd_naar_school) || 'Geef een geldige waarde in.'
              ]"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" @click="startTest">Gegevens opslaan</v-btn>
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
      const parsedGender = this.geslachten.filter(
        e => e.text.toLowerCase() === this.gender.toLowerCase()
      )[0];
      if (typeof this.geslachten === "object") {
        return parsedGender.value;
      }
      return parsedGender;
    }
  },
  methods: {
    resetTestData: function() {
      this.$store.commit("dimsTestData/resetState");
    },
    startTest(){
      this.resetTestData();
      this.submit();
    },
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
