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
    let self = this;
    howToTestApi
      .getDims48()
      .then(data => {
        self.$store.dispatch("dims48Config/initialize", data.config[0].config);
      })
      .then(()=>{
        this.getDetails();
      })
      .catch(err => console.log(err));
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
      let self = this;
      howToTestApi
        .getTestDetails(category)
        .then(details => {
          console.log(details[0].description);
          details[0].description = details[0].description.replace('<interferenceDuration>',
              self.$store.getters["dims48Config/getInterferenceDurationHumanReadable"]);
          details[0].description = details[0].description.replace('<leftBtnKey>',
              self.$store.getters["dims48Config/getLeftBtnKey"]);
          details[0].description = details[0].description.replace('<rightBtnKey>',
              self.$store.getters["dims48Config/getRightBtnKey"]);
          console.log(details[0].description);
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
