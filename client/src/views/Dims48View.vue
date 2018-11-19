<template>
  <v-container fluid fill-height class="dims48-background">
    <v-layout flex align-center justify-center>
      <Dims48Test/>
    </v-layout>
  </v-container>
</template>

<script>
import Dims48Test from "@/components/Dims48Test.vue";

export default {
  name: "Dims48Page",
  components: {
    Dims48Test
  },
  beforeRouteLeave(to, from, next) {
    if (
      confirm(
        "Bent u zeker dat u de pagina wilt verlaten? Veranderingen zullen niet worden opgeslagen."
      )
    ) {
      next();
      this.$store.dispatch("dimsManager/resetState");
    }
  }
};
</script>

<style>
.dims48-background {
  background-color: white;
}
</style>
