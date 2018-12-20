<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-xs-center">Testresultaten DiMS48</h1>
    <h2 class="text-xs-left mb-2">Voeg een filter toe</h2>
    <ResultsFeedFilterForm/>
    <h2 class="text-xs-left">Resultaten</h2>
    <v-layout v-if="loaded" row wrap>
      <ResultListItem
        v-if="loaded"
        v-for="(result) in filteredFeed"
        :key="result._id"
        :id="result._id"
        :age="result.clientInfo.age"
        :gender="result.clientInfo.gender"
        :schooledTill="result.clientInfo.schooledTill"
        :schooledFor="result.clientInfo.schooledFor"
        :timestamp="new Date(result.timestamp)"
        :done="result.done"
      />
    </v-layout>
    <v-layout justify-center align-center v-if="!hasItems && loaded">
      <p class="headline">Er werden nog geen testen afgelegd.</p>
    </v-layout>
    <v-layout v-else justify-center align-center mt-5>
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import ResultListItem from "@/components/ResultListItem.vue";
import ResultsFeedFilterForm from "@/components/ResultsFeedFilterForm.vue";
import * as HowToTestApi from "@/services/api/howtotestapi";
import { mapGetters } from "vuex";

export default {
  components: {
    ResultsFeedFilterForm,
    ResultListItem
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    ...mapGetters("dimsResults", ["filteredFeed"]),
    hasItems: function() {
      return this.filteredFeed.length > 0;
    }
  },
  methods: {
    getTestResults: async function() {
      HowToTestApi.getTestResults("dims48")
        .then(results => {
          // TODO error displaying
          if ("error" in results) {
          } else {
            this.$store.commit("dimsResults/setResultFeed", results);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loaded = true;
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
