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
    if (!this.$store.getters["dimsManager/hasFinished"]) {
      const answer = confirm("Bent u zeker dat u de pagina wilt verlaten?");
      if (answer) {
        next();
        this.$store.dispatch("dimsManager/resetState");
      }
    } else {
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
