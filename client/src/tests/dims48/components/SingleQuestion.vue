<template>
  <div class="question">
    <div>
      <img :src="currentImage.L.imgUrl" alt="picture">
      <img v-if="isDouble" :src="currentImage.R.imgUrl" alt="">
    </div>
    <div class="answers">
      <v-btn
        v-for="(option, index) in currentOptions"
        @click="answer(option.btnValue, currentImage)"
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
    answer: function(btnValue, currentImage) {
      if (currentImage.L !== null && currentImage.R === null) {
        this.$store.commit("dimsTestData/setAnswer", {
          phase: "phase1",
          answer: {
            id: currentImage.L.id,
            answer: btnValue
          }
        });
      }
      if (currentImage.L === null && currentImage.R === null) {
        this.$store.commit("dimsTestData/setAnswer", {
          phase: "phase2"
          // answer: {
          //   id: currentImage.L.id,
          //   answer: btnValue
          // }
        });
      }
      this.$store.dispatch("dimsQuestions/getNextImage");
    }
  },
  computed: {
    currentImage: function() {
      const isDouble = this.$store.state.dimsManager.double;
      const images = this.$store.getters["dimsQuestions/getCurrentImage"];

      const image = { L: null, R: null };

      if (isDouble) {
        image.L = images[0];
        image.R = images[1];
      } else {
        image.L = images[this.$store.state.dimsQuestions.currentImageIndex];
      }
      return image;
    },
    currentOptions: function() {
      return this.$store.getters["dimsQuestions/getCurrentOptions"];
    },
    isDouble: function() {
      return this.$store.state.dimsManager.double;
    }
  }
};
</script>

<style>
</style>
