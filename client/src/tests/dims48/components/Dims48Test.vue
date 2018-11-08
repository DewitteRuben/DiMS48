<template>
  <div>
    <div v-if="loaded">
      <InstructionsForm
        v-show="!hasStarted && !hasFinished"
        :instructions="currentInstruction.message"
        :personTitle="currentInstruction.title"
        :buttonText="this.$store.state.dimsInstructions.buttonText"
      />
      <SingleQuestion v-show="hasStarted"/>
    </div>
  </div>
</template>

<script>
import InstructionsForm from "./InstructionsForm.vue";
import SingleQuestion from "./SingleQuestion.vue";

export default {
  components: {
    InstructionsForm,
    SingleQuestion
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
    }
  },
  beforeMount() {
    this.$store.dispatch("dimsQuestions/fetchImages");
  }
};
</script>

<style>
</style>
