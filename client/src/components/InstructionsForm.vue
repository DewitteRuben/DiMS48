<template>
  <v-form>
    <h1 class="display-3 mb-3">Instructies</h1>
    <h2 class="display-2 mb-4">{{ currentInstruction.title }}</h2>
    <div class="InstructionForm-message">
      <p class="headline InstructionForm-message">{{ currentInstruction.message }}</p>
      <v-btn @click="submit">{{ buttonText }}</v-btn>
      <div></div>
    </div>
  </v-form>
</template>

<script>
export default {
  computed: {
    currentInstruction: function() {
      return this.$store.getters["dimsInstructions/getCurrentInstruction"];
    },
    buttonText: function() {
      return this.$store.getters["dimsInstructions/getButtonText"];
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("dimsInstructions/getNextInstruction");
    }
  }
};
</script>

<style>
.InstructionForm-message {
  width: 960px;
}
</style>
