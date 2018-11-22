<template>
  <v-container grid-list-lg>
    <h1>How To Test Apps</h1>
    <CategoryList baseRoute="/detail" buttonText="Details"/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CategoryList from "@/components/CategoryList.vue";

export default {
  name: "home",
  components: {
    CategoryList,
  },
};
</script>

<style scoped>
</style>

