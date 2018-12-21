<template>
  <v-flex xs12 sm5>
    <v-card color="#FFFFFF">
      <v-card-title primary-title>
        <div class="text-lg-left">
          <div class="headline">{{ title }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :to="testRoute" large color="primary">Start</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
import { BASE_TEST_ROUTE } from "../services/constants";

export default {
  data() {
    return { BASE_TEST_URL };
  },
  computed: {
    testRoute: function() {
      return BASE_TEST_URL + this.route;
    }
  },
  props: {
    title: { type: String },
    route: { type: String }
  }
};
</script>

<style>
</style>
