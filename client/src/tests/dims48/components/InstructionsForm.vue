<template>
    <v-form>
        <h1>Instructies</h1>
        <h2>{{ personTitle }}</h2>
        <v-form>
            <div>
                <p>{{ instructions }}</p>
            </div>
            <v-btn @click="submit">{{ buttonText }}</v-btn>
        </v-form>
    </v-form>
</template>

<script>
export default {
  props: {
    personTitle: { type: String },
    instructions: { type: String },
    buttonText: { type: String }
  },
  methods: {
    submit() {
      this.$store.commit("dimsInstructions/getNextInstruction");
    }
  }
};
</script>
