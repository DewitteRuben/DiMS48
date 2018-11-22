<template>
  <v-form>
    <h1>Instructies</h1>
    <h2>{{ currentInstruction.title }}</h2>
    <v-form>
      <div>
        <p>{{ currentInstruction.message }}</p>
      </div>
      <v-btn @click="submit">{{ buttonText }}</v-btn>
    </v-form>
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
