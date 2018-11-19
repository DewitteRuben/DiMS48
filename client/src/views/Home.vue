<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-lg-center">How To Test Apps</h1>
    
    <v-layout v-if="loaded" mt-5 align-center justify-center row wrap="">
      <TestListItem
        v-if="loaded"
        v-for="(category, index) in categories"
        :key="index"
        :title="category.title"
      />
    </v-layout>

    <v-layout v-if="!loaded" align-center justify-center row fill-height>
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>

  </v-container>
</template>

<script>
// @ is an alias to /src
import TestListItem from "@/components/TestListItem.vue";
import categories from "@/data/categories.json";
import howToTestApi from "@/services/api/howtotestapi.js";

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
      loaded: false,
      categories: null
    };
  },
  methods: {
    getCategories: async function() {
      howToTestApi
        .getCategories()
        .then(categories => {
          this.categories = categories;
          this.loaded = true;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style scoped>
.home-container {
  max-width: 1400px;
}
</style>

