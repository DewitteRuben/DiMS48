<template>
  <v-container class="home-container" grid-list-lg>
    <h1 class="text-lg-center">Testresultaten</h1>
    <CategoryList baseRoute="/result"/>
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