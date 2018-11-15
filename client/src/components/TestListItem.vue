<template>
  <v-flex xs12 sm5>
    <v-card color="#FFFFFF">
      <v-card-title primary-title>
        <div class="text-lg-left">
          <div class="headline">{{ title }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn :to=detailRoute large color="primary">Detail</v-btn>
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
    title: { type: String }
  },
  computed: {
    detailRoute: function() {
      return "/detail/" + this.title;
    },
  }
};
</script>

<style>
</style>
