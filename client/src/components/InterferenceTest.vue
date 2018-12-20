<template>
  <div class="grey lighten-2">
    <v-btn absolute class="skip-button" color="grey lighten-2" @click="next">overslaan</v-btn>
    <section>
      <div>
        <div class="container has-text-centered">
          <h2 class="title is-6">{{ instructions }}</h2>
          <div id="timer">
            <span id="minutes">{{ minutes }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ seconds }}</span>
          </div>
          <div id="buttons">
            <!--     Start TImer -->
            <v-btn
              color="primary"
              class="button is-dark is-large"
              v-if="!countdownTimer"
              @click="startTimer"
            >Start</v-btn>
            <!--     Pause Timer -->
            <v-btn
              class="button is-dark is-large"
              v-if="countdownTimer && !nextButton"
              @click="stopTimer"
            >Pauze</v-btn>
            <v-btn
              color="primary"
              class="button is-dark is-large"
              v-if="nextButton"
              @click="next"
            >{{btnText}}</v-btn>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      countdownTimer: null,
      totalTimeValue: false,
      currentTime: 0,
      nextButton: false,
      instructions:
        "Laat de client zoveel mogelijk woorden met een 'p' opsommen",
      btnText: "Volgende"
    };
  },
  // ========================
  methods: {
    startTimer: function() {
      this.currentTime = this.totalTime;
      this.countdownTimer = setInterval(() => this.countdown(), 1000);
      this.nextButton = false;
    },
    stopTimer: function() {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
      this.nextButton = false;
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      if (this.currentTime > 1) {
        this.currentTime--;
      } else {
        this.stopTimer();
        this.currentTime = 0;
        this.nextButton = true;
      }
    },
    next: function() {
      this.$store.dispatch("dimsManager/endPhase");
    }
  },
  // ========================
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.currentTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.currentTime - this.minutes * 60;
      return this.padTime(seconds);
    },
    totalTime: function() {
      return this.$store.getters["dims48Config/getInterferenceDuration"] || 180;
    }
  },
  created() {
    this.currentTime = this.totalTime;
  }
};
</script>



<style>
#timer {
  font-size: 100px;
  line-height: 1;
  margin-bottom: 40px;
}

.skip-button {
  top: 10%;
  right: 5%;
}
</style>
