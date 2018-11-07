<template>
  <div>
    <div v-if="!hasStarted">
      <InstructionsForm
        :instructions="currentInstruction.message"
        :personTitle="currentInstruction.title"
        :buttonText="this.$store.state.dimsInstructions.buttonText"
      />
    </div>
    <div v-else>
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
    }
  }
};
</script>

<style>
</style>
