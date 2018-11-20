<template>
  <div>
    <div v-if="loaded">
      <InstructionsForm v-show="!hasStarted && !hasFinished && !interference"/>
      <SingleQuestion v-show="hasStarted"/>
      <InterferenceTest v-show="interference"/>
      <TestEndPanel v-show="hasFinished"/>
    </div>
    <div v-else>
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </div>
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
    },
    interference() {
      return this.$store.state.dimsManager.interference;
    }
  },
  beforeMount() {
    this.$store.dispatch("dimsManager/initDims48b");
  }
};
</script>

<style>
</style>
