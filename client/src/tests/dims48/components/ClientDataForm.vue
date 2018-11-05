<template>
  <v-form ref="form" v-model="valid" lazy-validation class="client-form">
      <h1>Algemene gegevens van de client:</h1>
    <v-text-field
      v-model="leeftijd"
      label="Leeftijd"
      :rules="[v => !!v || 'Verplicht veld']"
      required
    ></v-text-field>
    <v-select
      v-model="geslacht"
      :items="geslachten"
      :rules="[v => !!v || 'Verplicht veld']"
      label="Geslacht"
      required
    ></v-select>
    <v-text-field
      v-model="leeftijd_naar_school"
      label="Leeftijd gestopt met school?"
      :rules="[v => !!v || 'Verplicht veld']"
      required
    ></v-text-field>
    <v-text-field
      v-model="jaren_naar_school"
      label="Aantal jaren naar school geweest?"
      :rules="[v => !!v || 'Verplicht veld']"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Gegevens opslaan
    </v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      leeftijd: '',
      geslacht: '',
      geslachten: [
        'Vrouw',
        'Man',
        'Andere'
      ],
      leeftijd_naar_school: '',
      jaren_naar_school: ''
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            leeftijd: this.leeftijd,
            geslacht: this.geslacht,
            leeftijd_naar_school : this.leeftijd_naar_school,
            jaren_naar_school: this.jaren_naar_school
          })
        }
      }
    }
  }
</script>

<style scoped>
.client-form {
    padding: 15px;
}
</style>
