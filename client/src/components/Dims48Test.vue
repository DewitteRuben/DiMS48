<template>
  <div>
    <div v-if="loaded">
      <!-- TODO clean this up -->
      <InstructionsForm
        v-show="!hasStarted && !hasFinished && !interference"
        :instructions="currentInstruction.message"
        :personTitle="currentInstruction.title"
        :buttonText="this.$store.state.dimsInstructions.buttonText"
      />
      <SingleQuestion v-show="hasStarted"/>
      <InterferenceTest v-show="interference"/>
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

export default {
  components: {
    InstructionsForm,
    SingleQuestion,
    InterferenceTest
  },
  computed: {
    // todo put this in instruction component
    currentInstruction: function() {
      return this.$store.getters["dimsInstructions/getCurrentInstruction"];
    },
    hasStarted() {
      return this.$store.state.dimsManager.started;
    },
    hasFinished() {
      return this.$store.state.dimsManager.finished;
    },
    loaded() {
      return this.$store.getters["dimsQuestions/isLoaded"];
    },
    interference() {
      return this.$store.state.dimsManager.interference;
    }
  },
  beforeMount() {
    this.$store.dispatch("dimsManager/initializeTest");
  }
};
</script>

<style>
</style>
