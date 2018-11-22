<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-lg-center">Results {{testName}}</h1>
    <v-layout row wrap="">
      <ResultListItem
        v-if="loaded"
        v-for="(result) in results"
        :key="result._id"
        :id="result._id"
        :age="result.clientInfo.age"
        :gender="result.clientInfo.gender"
        :schooledTill="result.clientInfo.schooledTill"
        :schooledFor="result.clientInfo.schooledFor"
        :timestamp="new Date(result.timestamp)"
        :route="testName"
      />
    </v-layout>
  </v-container>
</template>

<script>
import ResultListItem from "@/components/ResultListItem.vue";
import * as HowToTestApi from "@/services/api/howtotestapi";

export default {
  data() {
    return {
      results: null
    };
  },
  components: {
    ResultListItem
  },
  computed: {
    testName: function() {
      return this.$route.params.name;
    },
    loaded: function() {
      return this.results != null;
    }
  },
  methods: {
    getTestResults: async function() {
      HowToTestApi.getTestResults(this.testName).then(results => {
        console.log(results);
        this.results = results;
      });
    }
  },
  created() {
    this.getTestResults();
  }
};
</script>

<style>
.ResultListItem-middle {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
