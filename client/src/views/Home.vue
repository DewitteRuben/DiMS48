<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-lg-center">How To Test Apps</h1>
    <v-layout v-if="finished" mt-5 align-center justify-center row wrap="">
      <TestListItem
        v-if="finished"
        v-for="(category, index) in categories"
        :key="index"
        :title="category.title"
      />
    </v-layout>
    <v-layout v-else align-center justify-center row fill-height>
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  
  </v-container>
</template>

<script>
// @ is an alias to /src
import TestListItem from "@/components/TestListItem.vue";
import categories from "@/data/categories.json";
import * as howToTestApi from "@/services/api/howtotestapi";

export default {
  name: "home",
  components: {
    TestListItem
  },
  created() {
    this.getCategories();
  },
  data() {
    return {
      finished: false,
      categories: null,
    };
  },
  computed: {

  },
  methods: {
    getCategories: async function() {
      howToTestApi
        .getCategories()
        .then(categories => {
          this.categories = categories;
        })
        .catch(e => {
        })
        .finally(e => {
          this.finished = true;
        });
    }
  }
};
</script>

<style scoped>
.home-container {
  max-width: 1400px;
}
</style>

