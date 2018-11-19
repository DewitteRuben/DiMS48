<template>
  <div>
    <div class="questions">
      <img :src="baseUrl + currentImage.L.imgUrl" alt="picture">
      <img v-if="isDouble" :src="baseUrl+ currentImage.R.imgUrl" alt="">
    </div>
    <div class="answers" v-if="hasStarted">
      <v-btn
        v-for="(option, index) in currentOptions"
        @click="answer(option.btnValue, currentImage)"
        class="answerButton"
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
        const imageId = currentImage.L._id;
        this.$store.commit("dimsTestData/setAnswer", {
          phase: "phase1",
          answer: {
            id: imageId,
            answer: btnValue
          }
        });
      }
      if (currentImage.L !== null && currentImage.R !== null) {
        const selectedImageId = currentImage[btnValue]._id;
        this.$store.commit("dimsTestData/setAnswer", {
          phase: "phase2",
          answer: {
            id: selectedImageId,
            answer: "A" + selectedImageId.substring(1)
          }
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
    hasStarted: function() {
      return this.$store.getters["dimsManager/hasStarted"];
    },
    baseUrl: () => {
      return "https://how-to-test-apps.herokuapp.com";
    },
    isDouble: function() {
      return this.$store.state.dimsManager.double;
    }
  }
};
</script>

<style>
.questions {
  height: 300px;
}

.answerButton {
  border: 2px #4892db solid;
  font-weight: bold;
  margin-left: 30px;
}
</style>
