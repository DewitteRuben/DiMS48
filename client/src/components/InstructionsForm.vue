<template>
  <v-layout
    class="InstructionForm-style"
    column
    justify-center
    align-center
    :class="{ 'grey lighten-2': currentInstruction.title === 'Testleider' }"
  >
    <h1 class="display-3 mb-3">Instructies</h1>
    <h2 class="display-2 mb-4">{{ currentInstruction.title }}</h2>
    <v-layout pa-3 justify-center align-center class="headline InstructionForm-message">
      <v-flex xs8 v-html="currentInstruction.message"></v-flex>
    </v-layout>
    <v-layout justify-center align-center>
      <v-btn @click="submit" bottom large>{{ buttonText }}</v-btn>
    </v-layout>
  </v-layout>
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
/* .InstructionForm-box {
  margin-left: auto;
  margin-right: auto;
  width: 70%;
} */

.InstructionForm-message {
  text-align: justify;
}

.InstructionForm-style {
  border-radius: 25px;
}
</style>
