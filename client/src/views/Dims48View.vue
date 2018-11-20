<template>
  <v-container fluid fill-height class="dims48-background">
    <v-layout flex align-center justify-center>
      <Dims48aTest v-if="isDims48a"/>
      <Dims48bTest v-else />
    </v-layout>
  </v-container>
</template>

<script>
import Dims48aTest from "@/components/Dims48aTest.vue";
import Dims48bTest from "@/components/Dims48bTest.vue";

export default {
  name: "Dims48Page",
  components: {
    Dims48aTest,
    Dims48bTest
  },
  computed: {
    isDims48a: function() {
      return this.$route.name === "dims48a";
    }
  },
  methods: {
    resetTest: function() {
      this.$store.dispatch("dimsManager/resetState");
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.$store.getters["dimsManager/hasFinished"]) {
      const answer = confirm("Bent u zeker dat u de pagina wilt verlaten?");
      if (answer) {
        next();
        this.resetTest();
      }
    } else {
      next();
      this.resetTest();
    }
  }
};
</script>

<style>
.dims48-background {
  background-color: white;
}
</style>
