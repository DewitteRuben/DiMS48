<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-lg-center">How To Test Apps</h1>
    <v-layout align-center justify-center row wrap>
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

<style scoped>
.home-container {
  max-width:1400px;
}
</style>

