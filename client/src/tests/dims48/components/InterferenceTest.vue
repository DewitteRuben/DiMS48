<template>
<v-layout align-center justify-center fill-height class="grey lighten-2">
  <v-btn
    class="skip-button"
    color="grey lighten-2"
    @click="next"
  >
    overslaan
  </v-btn>
<section>
<div class="hero-body">
<div class="container has-text-centered">
  <h1 class="title"> {{ personTitle }}</h1>
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
      v-if="!timer"
      @click="startTimer">
        Start
    </v-btn>
<!--     Pause Timer -->
    <v-btn
      class="button is-dark is-large" 
      v-if="timer && !nextButton"
      @click="stopTimer">
        Pauze
    </v-btn>
    <v-btn
      color="primary"
      class="button is-dark is-large" 
      v-if="nextButton"
      @click="next">
        {{btnText}}
    </v-btn>

  </div>
  
</div>
</div>
</section>
</v-layout>
</template>


<script>
export default {
  data() {
    return {
    timer: null,
    totalTime: (180),
    resetButton: false,
    nextButton: false,
    personTitle: "Testleider",
    instructions: "Laat de client zoveel mogelijk woorden met een 'p' opsommen",
    btnText: "volgende"
    }
  },
  // ========================
  methods: {
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      this.nextButton = false;
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.nextButton = false;
    },
    resetTimer: function() {
      this.totalTime = (180);
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
      this.nextButton = false;
    },
    padTime: function(time) {
      return (time < 10 ? '0' : '') + time;
    },
    countdown: function() {
      if(this.totalTime >= 1){
        this.totalTime--;
      } else{
        this.totalTime = 0;
        this.nextButton = true;
      }
    },
    next: function() {
      console.log("next instructions should appear");
    }
  },
  // ========================
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - (this.minutes * 60);
      return this.padTime(seconds);
    }
  }
}

</script>



<style>
#message {
  color: #DDD;
  font-size: 50px;
  margin-bottom: 20px;
}

#timer {
  font-size: 100px;
  line-height: 1;
  margin-bottom: 40px;
}

.skip-button {
  position: absolute;
  top: 10%;
  right: 5%;
}
</style>