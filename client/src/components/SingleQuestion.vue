<template>
<v-layout>
   <v-flex xs12 sm6 md6 lg6 xl6 offset-sm3>
      <v-card flat tile>
          <v-layout>
              <v-img
                :src="baseUrl + currentImage.L.imgUrl"
                alt="picture"
                max-width="300px"
                max-height="300px"
                min-width="100px"
                min-height="100px"
                class="image"
              ></v-img>
              <v-img
                v-if="isDouble"
                :src="baseUrl+ currentImage.R.imgUrl"
                alt
                max-width="300px"
                max-height="300px"
                class="image"
              ></v-img>
          </v-layout>
          <v-layout justify-center>
            <v-card-actions v-if="hasStarted">
              <v-btn
                v-for="(option, index) in currentOptions"
                @click="answer(option.btnValue)"
                class="answerButton"
                :key="index"
                large
                flat
                color="primary"
              >{{option.btnText}}</v-btn>
            </v-card-actions>
        </v-layout>
      </v-card>
    </v-flex>
</v-layout>
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
          case this.leftBtnKeyCode:
            this.answer(btnValueLeft);
            break;
          case this.rightBtnKeyCode:
            this.answer(btnValueRight);
            break;
        }
      }
    });
  },
  computed: {
    leftBtnKeyCode: function() {
      return parseInt(this.$store.getters["dims48Config/getLeftBtnKeyCode"]);
    },
    rightBtnKeyCode: function() {
      return parseInt(this.$store.getters["dims48Config/getRightBtnKeyCode"]);
    },
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
    },
    testName: function() {
      return this.$route.name;
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
          test: this.testName,
          phase: this.currentPhase,
          answer: {
            _id: selectedImageId,
            answer: "A" + selectedImageId.substring(1)
          }
        };
        this.saveAnswer(doubleAnswer);
      } else {
        const imageId = this.currentImage.L._id;
        const singleAnswer = {
          test: this.testName,
          phase: this.currentPhase,
          answer: {
            _id: imageId,
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

.image{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.questions {
  height: 300px;
}

.answerButton {
  width: 50%;
}

.answerButton:first-child {
  border: 2px #4892db solid;
  font-weight: bolder;
  margin-top: 25%;
}

.answerButton:last-child {
  border: 2px #4892db solid;
  font-weight: bolder;
  margin-top: 25%;
}
</style>
