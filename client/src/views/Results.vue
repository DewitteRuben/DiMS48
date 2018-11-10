<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap justify-center>
      <router-view></router-view>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ListTestResultItem from "@/results/components/ListTestResultItem.vue";
import testForResult from "@/data/tests/testForResult.json";

export default {
  name: "testForResult",
  components: {
  },
};
</script>