<template>
    <v-container fluid grid-list-lg>
        <h1 class="text-lg-center">{{data.title}} Details</h1>
        <v-layout>
            <v-flex xs12 sm12>
                <h1 class="text-xs-left">Beschrijving</h1>
                <v-card color="#FFFFFF">
                    <v-card-title primary-title>
                        <div class="text-xs-left" v-html="data.description"></div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <div class="mt-5">
            <h1 class="text-xs-left">Fasen</h1>
            <v-layout row wrap="">
                <PhaseListItem
                    v-for="(item, index) in data.phases"
                    :key="index"
                    :title="item.title"
                    :route="item.route"
                />
            </v-layout>
        </div>
    </v-container>
</template>

<script>
import detail from "@/data/details.json";
import PhaseListItem from "@/components/PhaseListItem.vue";

export default {
  components: {
    PhaseListItem
  },
  data() {
    return {
      data: detail
    };
  },
  computed: {
    category: function() {
      return this.$route.params.name;
    }
  }
};
</script>

<style>
</style>
