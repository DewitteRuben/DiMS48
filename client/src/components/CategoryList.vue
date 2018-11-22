<template>
    <v-layout v-if="finished" mt-5 align-center justify-center row wrap="">
        <TestListItem
            v-if="finished"
            v-for="(category, index) in categories"
            :key="index"
            :title="category.title"
            :baseRoute="baseRoute"
            :buttonText="buttonText"
        />
    </v-layout>
    <v-layout v-else align-center justify-center row fill-height>
        <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>
</template>

<script>
import TestListItem from "@/components/TestListItem.vue";
import * as howToTestApi from "@/services/api/howtotestapi";

export default {
  name: "categoryList",
  components: {
    TestListItem
  },
  created() {
    this.getCategories();
  },
  data() {
    return {
      finished: false,
      categories: null
    };
  },
  props: {
    baseRoute: { type: String },
    buttonText: {type: String},
  },
  computed: {},
  methods: {
    getCategories: async function() {
      howToTestApi
        .getCategories()
        .then(categories => {
          this.categories = categories;
        })
        .catch(e => {})
        .finally(e => {
          this.finished = true;
        });
    }
  }
};
</script>

<style>
</style>
