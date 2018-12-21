<template>
  <v-flex xs12 sm5>
    <v-card color="#FFFFFF">
      <v-card-title primary-title>
        <div class="text-lg-left">
          <div class="headline">{{ title }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn to="/testresults/dims48" large color="primary">{{btnText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
export default {
  data() {
    return { config };
  },
  props: {
    id: { type: Number },
    title: { type: String },
    duration: { type: Number },
    description: { type: String },
    route: { type: String },
    btnText: { type: String }
  }
};
</script>

<style>
</style>
