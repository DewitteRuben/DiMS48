<template>
  <v-container grid-list-lg>
    <h1>How To Test Apps</h1>
    <CategoryList baseRoute="/detail" buttonText="Start"/>
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

