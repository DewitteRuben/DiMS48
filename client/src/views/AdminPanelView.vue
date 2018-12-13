<template>
  <v-container grid-list-lg>
    <h1>Admin Panel</h1>
    <CategoryList baseRoute="/admin" buttonText="Configuratie"/>
  </v-container>
</template>

<script>
import CategoryList from "@/components/CategoryList.vue";

export default {
  name: "home",
  components: {
    CategoryList,
  },
};
</script>
