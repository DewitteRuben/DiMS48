<template>
    <div>
        <h1 class="text-lg-center">{{title}} Details</h1>
        <v-layout>
            <v-flex xs12 sm12>
                <h1 class="text-xs-left">Beschrijving</h1>
                <v-card color="#FFFFFF">
                    <v-card-title primary-title>
                        <div class="text-xs-left subheading" v-html="description"></div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <div class="mt-5">
            <h1 class="text-xs-left">Fasen</h1>
            <v-layout row wrap="">
                <PhaseListItem
                    v-for="(item, index) in phases"
                    :key="index"
                    :title="item.title"
                    :route="item.route"
                />
            </v-layout>
        </div>
    </div>
</template>

<script>
import PhaseListItem from "@/components/PhaseListItem.vue";

export default {
  components: {
      PhaseListItem
  },
  props: {
    title: String,
    description: String,
    phases: Array
  }
};
</script>

<style>
</style>
