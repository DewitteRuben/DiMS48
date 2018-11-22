<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-lg-center">Testresultaten</h1>
    <CategoryList baseRoute="/results" buttonText="Toon resultaten"/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CategoryList from "@/components/CategoryList.vue";

export default {
  name: "testForResult",
  components: {
    CategoryList
  }
};
</script>