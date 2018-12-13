<template>
  <v-container fluid fill-height class="dims48-background">
    <Dims48aTest v-if="isDims48a"/>
    <Dims48bTest v-else/>
  </v-container>
</template>

<script>
import Dims48aTest from "@/components/Dims48aTest.vue";
import Dims48bTest from "@/components/Dims48bTest.vue";
import * as howtotestapi from "@/services/api/howtotestapi";

export default {
  name: "Dims48Page",
  components: {
    Dims48aTest,
    Dims48bTest
  },
  created: function() {
    let self = this;
    howtotestapi
      .getDims48()
      .then(data => {
        self.$store.dispatch("dims48Config/initialize", data.config[0].config);
      })
      .catch(err => console.log(err));
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
