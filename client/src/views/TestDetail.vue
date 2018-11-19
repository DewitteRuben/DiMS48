<template>
    <v-container fluid grid-list-lg>
        <div v-if="loaded">
            <h1 class="text-lg-center">{{details[0].title}} Details</h1>
            <v-layout>
                <v-flex xs12 sm12>
                    <h1 class="text-xs-left">Beschrijving</h1>
                    <v-card color="#FFFFFF">
                        <v-card-title primary-title>
                            <div class="text-xs-left" v-html="details[0].description"></div>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
            <div class="mt-5">
                <h1 class="text-xs-left">Fasen</h1>
                <v-layout row wrap="">
                    <PhaseListItem
                        v-for="(item, index) in details[0].phases"
                        :key="index"
                        :title="item.title"
                        :route="item.route"
                    />
                </v-layout>
            </div>
        </div>
        <v-layout v-if="!loaded" align-center justify-center row fill-height>
            <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
        </v-layout>
    </v-container>
</template>

<script>
import detail from "@/data/details.json";
import howToTestApi from "@/services/api/howtotestapi.js";
import PhaseListItem from "@/components/PhaseListItem.vue";

export default {
  components: {
    PhaseListItem
  },
  data() {
    return {
      details: null,
      loaded: false
    };
  },
  created() {
    this.getDetails();
  },
  computed: {
    category: function() {
      return this.$route.params.name;
    }
  },
  methods: {
    getDetails: async function() {
      howToTestApi
        .getTestDetails("dims48")
        .then(details => {
          this.details = details;
          this.loaded = true;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style>
</style>
