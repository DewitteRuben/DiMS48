<template>
  <v-container fluid grid-list-lg>
    <TestDetail
      v-if="loaded"
      :title="details[0].title"
      :description="details[0].description"
      :phases="details[0].phases"
    />
    <v-layout v-if="finished && !hasDetails" align-center justify-center row fill-height>
      <h1 class="text-lg-center">The test "{{category}}" does not exist!</h1>
    </v-layout>
    <v-layout v-if="!finished" align-center justify-center row fill-height>
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import detail from "@/data/details.json";
import * as howToTestApi from "@/services/api/howtotestapi";
import PhaseListItem from "@/components/PhaseListItem.vue";
import TestDetail from "@/components/TestDetail.vue";

export default {
  components: {
    PhaseListItem,
    TestDetail
  },
  data() {
    return {
      details: null,
      finished: false
    };
  },
  created() {
    this.getDetails();
  },
  computed: {
    category: function() {
      return this.$route.params.name;
    },
    hasDetails: function() {
      return this.details != null;
    },
    loaded: function() {
      return this.finished && this.hasDetails;
    }
  },
  methods: {
    getDetails: async function() {
      let category = this.$route.params.name;
      howToTestApi
        .getTestDetails(category)
        .then(details => {
          this.details = details;
        })
        .catch(e => console.log(e))
        .finally(e => {
          this.finished = true;
        });
    }
  }
};
</script>

<style>
</style>
