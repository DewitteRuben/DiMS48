<template>
  <div>
    <InstructionsForm
      :instructions="currentInstruction.message"
      :personTitle="currentInstruction.title"
      :buttonText="this.$store.state.dimsInstructions.buttonText"
    />
  </div>
</template>

<script>
import InstructionsForm from "./InstructionsForm.vue";

export default {
  components: {
    InstructionsForm
  },
  computed: {
    currentInstruction: function() {
      return this.$store.getters["dimsInstructions/getCurrentInstruction"];
    }
  }
};
</script>

<style>
</style>
