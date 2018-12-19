<template>
  <v-form v-model="valid" ref="form" @submit="startTest">
    <v-card class="pa-5">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Vul het ID-nummer van de complementaire test in:</h3>
        </div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          counter="9"
          maxlength="9"
          :rules="characterLimitRule"
          required
          v-model="id"
          name="name"
          label="ID-nummer"
          id="id"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="primary">Start</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import * as HowToTestApi from "@/services/api/howtotestapi.js";

export default {
  data() {
    return {
      id: "",
      valid: false,
      characterLimitRule: [
        v =>
          (0 < v.length && v.length <= 9) ||
          "Het ID-nummer heeft lengte van 9 symbolen."
      ]
    };
  },
  methods: {
    startTest: function(event) {
      event.preventDefault();
      if (this.valid) {
        HowToTestApi.getTestResultsById("dims48", this.id)
          .then(res => {
            if ("error" in res) {
              this.$root.$emit("dialog", {
                message: "Er werd geen test gevonden met id: " + this.id,
                decline: false,
                confirmButtonText: "ok"
              });
            } else {
              this.$emit("registerId", this.id);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
</style>
