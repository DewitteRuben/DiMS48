<template>
  <div>
    <div v-show="!hasStarted && !hasFinished">
      <InstructionsForm
        :instructions="currentInstruction.message"
        :personTitle="currentInstruction.title"
        :buttonText="this.$store.state.dimsInstructions.buttonText"
      />
    </div>
    <div v-show="hasStarted">
      <SingleQuestion/>
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
    currentInstruction: function() {
      return this.$store.getters["dimsInstructions/getCurrentInstruction"];
    },
    hasStarted() {
      return this.$store.state.dimsManager.started;
    },
    hasFinished() {
      return this.$store.state.dimsManager.finished;
    }
  }
};
</script>

<style>
</style>
