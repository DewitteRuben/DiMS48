<template>
  <v-container fluid grid-list-lg>
    <h1 class="text-lg-center">How To Test Apps</h1>
    <v-layout row wrap justify-center>
      <TestListItem v-for="(category, index) in categories" :key="index" :title="category"/>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import TestListItem from "@/components/TestListItem.vue";
import categories from "@/data/categories.json";

export default {
  name: "home",
  components: {
    TestListItem
  },
  data() {
    return categories;
  }
};
</script>
