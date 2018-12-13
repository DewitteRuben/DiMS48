<template>
  <v-form v-model="valid" ref="form">
    <v-card class="pa-5">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Vul het ID-nummer van de complentaire test in:</h3>
        </div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          counter="9"
          :rules="characterLimitRule"
          required
          name="name"
          label="ID-nummer"
          id="id"
        ></v-text-field>
      </v-card-text>
      <v-card-action>
        <v-btn @click="startTest" color="primary">Volgende</v-btn>
      </v-card-action>
    </v-card>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      characterLimitRule: [
        v => v.length <= 9 || "Het ID-nummer heeft maximaal 9 symbolen."
      ]
    };
  }
};
</script>

<style>
</style>
