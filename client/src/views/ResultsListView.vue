<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-xs-center">Testresults {{testName}}</h1>
    <h2 class="text-xs-left mb-2">Filter</h2>
    <ResultsFeedFilterForm/>
    <h2 class="text-xs-left">Results</h2>
    <v-layout row wrap>
      <ResultListItem
        v-if="loaded"
        v-for="(result) in filteredResults"
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
import ResultsFeedFilterForm from "@/components/ResultsFeedFilterForm.vue";
import * as HowToTestApi from "@/services/api/howtotestapi";
import resultsJson from "@/data/results.json";

export default {
  components: {
    ResultsFeedFilterForm,
    ResultListItem
  },
  data() {
    return {
      resultsJson: resultsJson
    };
  },
  computed: {
    testName: function() {
      return this.$route.params.name;
    },
    loaded: function() {
      return this.$store.state.dimsResults.resultFeed != null;
    },
    results: function() {
      return this.$store.state.dimsResults.resultFeed;
    },
    filteredResults: function() {
      return this.$store.getters["dimsResults/filteredFeed"];
    }
  },
  methods: {
    getTestResults: async function() {
      // HowToTestApi.getTestResults(this.testName).then(results => {
      // console.log(results);
      this.$store.commit("dimsResults/setResultFeed", this.resultsJson);
      // });
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
