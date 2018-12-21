<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-xs-center">Testresultaten DiMS48</h1>
    <h2 class="text-xs-left mb-2">Voeg een filter toe</h2>
    <ResultsFeedFilterForm/>
    <h2 class="text-xs-left">Resultaten</h2>
    <v-btn
      v-if="admin && hasItems"
      @click="downloadAllTestResults"
    >Download alle resultaten in Excel</v-btn>
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
    <v-layout v-else justify-center align-center mt-5>
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>
    <v-layout justify-center align-center v-if="!hasItems && loaded">
      <p class="headline">Er werden nog geen testen afgelegd.</p>
    </v-layout>
  </v-container>
</template>

<script>
import ResultListItem from "@/components/ResultListItem.vue";
import ResultsFeedFilterForm from "@/components/ResultsFeedFilterForm.vue";
import * as HowToTestApi from "@/services/api/howtotestapi";
import { mapGetters } from "vuex";
import * as download from "downloadjs";

export default {
  components: {
    ResultsFeedFilterForm,
    ResultListItem
  },
  data() {
    return {
      loaded: false,
      admin: false
    };
  },
  computed: {
    ...mapGetters("dimsResults", ["filteredFeed"]),
    hasItems: function() {
      return this.filteredFeed.length > 0;
    },
    loggedIn() {
      return this.$store.getters["user/isLoggedIn"];
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
    },
    downloadAllTestResults: async function() {
      HowToTestApi.downloadAllTestResults("dims48")
        .then(blob => {
          download(blob, "dims48-alle-resultaten");
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.getTestResults();
  },
  mounted: function() {
    let self = this;
    if (this.loggedIn) {
      HowToTestApi.isAdmin(self.$store.getters["user/getUser"].email)
        .then(isAdmin => (self.admin = isAdmin.isAdmin))
        .catch(err => console.log(err));
    }
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
