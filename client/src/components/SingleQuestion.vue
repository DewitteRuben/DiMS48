<template>
  <div>
    <div class="questions">
      <img :src="baseUrl + currentImage.L.imgUrl" alt="picture">
      <img v-if="isDouble" :src="baseUrl+ currentImage.R.imgUrl" alt="">
    </div>
    <div class="answers" v-if="hasStarted">
      <v-btn
        v-for="(option, index) in currentOptions"
        @click="answer(option.btnValue)"
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
  mounted() {
    // TODO: Make keycodes interchangable
    window.addEventListener("keyup", e => {
      if (this.hasStarted) {
        const btnValueLeft = this.currentOptions[0].btnValue;
        const btnValueRight = this.currentOptions[
          this.currentOptions.length - 1
        ].btnValue;
        switch (e.which) {
          case 37:
            this.answer(btnValueLeft);
            break;
          case 39:
            this.answer(btnValueRight);
            break;
        }
      }
    });
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
    currentPhase: function() {
      return this.$store.state.dimsManager.currentPhase;
    },
    isDouble: function() {
      return this.$store.state.dimsManager.double;
    }
  },
  methods: {
    nextImage: function() {
      this.$store.dispatch("dimsQuestions/getNextImage");
    },
    saveAnswer: function(answer) {
      this.$store.commit("dimsTestData/setAnswer", answer);
    },
    answer: function(btnValue) {
      if (this.isDouble) {
        const selectedImageId = this.currentImage[btnValue]._id;
        const doubleAnswer = {
          phase: this.currentPhase,
          answer: {
            id: selectedImageId,
            answer: "A" + selectedImageId.substring(1)
          }
        };
        this.saveAnswer(doubleAnswer);
      } else {
        const imageId = this.currentImage.L._id;
        const singleAnswer = {
          phase: this.currentPhase,
          answer: {
            id: imageId,
            answer: btnValue
          }
        };
        this.saveAnswer(singleAnswer);
      }
      this.nextImage();
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
