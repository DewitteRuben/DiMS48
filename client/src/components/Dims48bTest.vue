<template>
  <v-layout justify-center align-center fill-height v-if="loaded">
    <InstructionsForm v-show="!hasStarted && !hasFinished"/>
    <SingleQuestion v-show="hasStarted"/>
    <TestEndPanel v-show="hasFinished"/>
  </v-layout>
  <v-layout justify-center align-center fill-height v-else>
    <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
  </v-layout>
</template>

<script>
import InstructionsForm from "@/components/InstructionsForm.vue";
import SingleQuestion from "@/components/SingleQuestion.vue";
import InterferenceTest from "@/components/InterferenceTest.vue";
import TestEndPanel from "@/components/TestEndPanel.vue";

export default {
  components: {
    InstructionsForm,
    SingleQuestion,
    InterferenceTest,
    TestEndPanel
  },
  computed: {
    hasStarted() {
      return this.$store.state.dimsManager.started;
    },
    hasFinished() {
      return this.$store.state.dimsManager.finished;
    },
    loaded() {
      return this.$store.getters["dimsManager/isLoaded"];
    }
  },
  beforeMount() {
    this.$store.dispatch("dimsManager/initDims48b");
  }
};
</script>

<style>
</style>
