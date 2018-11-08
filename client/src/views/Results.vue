<template>
  <v-container fluid grid-list-lg>
    <!-- <h1 class="text-lg-center">How To Test Apps</h1> -->
    <v-layout row wrap justify-center>
      <!-- <TestListItem
        v-for="test in testForResult.tests"
        :route="test.route"
        :key="test.id"
        :id="test.id"
        :title="test.title"
      >
      </TestListItem> -->

      <ListTestResultItem
        v-for="item in testForResult.tests"
        :key="item.id"
        :id="item.id"
        :route="item.route"
        :title="item.title"
        :btnText="item.btnText"
      />

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
    ListTestResultItem
  },
  data() {
    return {
      testForResult
    };
  }
};
</script>