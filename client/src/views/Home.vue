<template>
  <v-container fluid grid-list-md>
    <h1 class="text-lg-center">How To Test Apps</h1>
    <v-layout row wrap="">
      <TestListItem
        v-for="(test) in tests"
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
