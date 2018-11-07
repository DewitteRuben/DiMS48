<template>
  <div class="question">
    <img :src="currentImage.imageUrl" alt="picture">
    <div class="answers">
      <v-btn
        v-for="(option, index) in currentOptions"
        @click="answer(option.btnValue, currentImage.id)"
        class="answers"
        :key="index"
        large
        flat
        color="primary"
      >{{option.btnText}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    answer: function(btnValue, currentImageId) {
      this.$store.commit("dimsTestData/setAnswer", { id: currentImageId, answer: btnValue });
      this.$store.dispatch("dimsQuestions/getNextImage");
    }
  },
  computed: {
    currentImage: function() {
      return this.$store.getters["dimsQuestions/getCurrentImage"];
    },
    currentOptions: function() {
      return this.$store.getters["dimsQuestions/getCurrentOptions"];
    }
  }
};
</script>

<style>
</style>
