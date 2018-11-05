<template>
  <v-flex xs12 sm5>
    <v-card color="#FFFFFF">
      <v-card-title primary-title>
        <div class="text-md-left">
          <div class="headline">{{title}}</div>
          <div>{{description}}</div>
          <span class="grey--text">Duratie: {{duration}}</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn :to=testRoute large color="primary">Start</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
import config from "@/data/config.json";

export default {
  data() {
    return { config };
  },
  props: {
    id: { type: Number },
    title: { type: String },
    duration: { type: Number },
    description: { type: String }
  },
  computed: {
    testRoute: function() {
      return this.config.baseTestRoute + this.id;
    }
  }
};
</script>

<style>
</style>
