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
  computed: {
    testRoute: function() {
      return config.baseTestRoute + this.route;
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
