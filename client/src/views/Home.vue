<template>
  <v-container fluid grid-list-lg>
    <h1 class="text-lg-center">How To Test Apps</h1>
    <v-layout row wrap justify-center>
      <TestListItem
        v-for="(test) in tests"
        :route="test.route"
        :key="test.id"
        :id="test.id"
        :description="test.description"
        :title="test.title"
        :duration="test.duration"
      />
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import TestListItem from "@/tests/TestListItem.vue";
import tests from "@/data/tests/tests.json";

export default {
  name: "home",
  components: {
    TestListItem
  },
  data() {
    return tests;
  }
};
</script>
