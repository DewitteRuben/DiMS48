<template>
  <div>
    <!-- <InstructionsForm
      :instructions="currentInstruction.message"
      :personTitle="currentInstruction.title"
      :buttonText="this.$store.state.dimsInstructions.buttonText"
    /> -->
<SingleQuestion
image="https://www.howtotest.be/sites/all/themes/howtotest/extensions/dms-48/images/single/afbeelding-1.jpg" 
:options="this.$store.state.dimsQuestions.options.phase1Options">
</SingleQuestion>

  </div>
</template>

<script>
import InstructionsForm from "./InstructionsForm.vue";
import SingleQuestion from "@/tests/dims48/components/SingleQuestion.vue";

export default {
  components: {
    InstructionsForm,
    SingleQuestion
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
