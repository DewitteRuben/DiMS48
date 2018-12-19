<template>
  <v-container fluid fill-height class="dims48-background">
    <v-layout column>
      <v-layout>
        <v-btn color="success" @click="toggleFullscreen">Volledig scherm</v-btn>
      </v-layout>
      <v-layout class="dims48-background" ref="fullscreen">
        <Dims48aTest v-if="isDims48a"/>
        <Dims48bTest v-else/>
      </v-layout>
    </v-layout>
    <ConfirmationDialog
      v-on:confirmModal="confirmDialog"
      v-on:declineModal="declineDialog"
      :title="dialogTitle"
      :model="dialog"
      :headline="dialogHeadline"
      :message="dialogMessage"
      :confirmButtonText="dialogConfirmButtonText"
      :declineButtonText="dialogDeclineButtonText"
      :decline="dialogDecline"
    />
  </v-container>
</template>

<script>
import Dims48aTest from "@/components/Dims48aTest.vue";
import Dims48bTest from "@/components/Dims48bTest.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import * as howtotestapi from "@/services/api/howtotestapi";

export default {
  name: "Dims48Page",
  mounted() {
    this.$root.$on("dialog", data => {
      this.displayDialogue(data.message, data.decline, data.confirmButtonText);
    });
  },
  data() {
    return {
      dialog: false,
      answer: null,
      fullscreen: false,
      dialogTitle: "Dims48",
      dialogHeadline: "Dims48",
      dialogMessage: "",
      dialogConfirmButtonText: "Ja",
      dialogDeclineButtonText: "Nee",
      dialogDecline: true
    };
  },
  components: {
    Dims48aTest,
    Dims48bTest,
    ConfirmationDialog
  },
  computed: {
    isDims48a: function() {
      return this.$route.name === "dims48a";
    }
  },
  methods: {
    resetTest: function() {
      this.$store.dispatch("dimsManager/resetState");
    },
    displayDialogue: function(message, decline, confirmButtonText) {
      this.dialogMessage = message;
      this.dialogDecline = decline;
      this.dialogConfirmButtonText = confirmButtonText;
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.answer = resolve;
      });
    },
    toggle() {
      this.$refs["fullscreen"].toggle();
    },
    confirmDialog: function(cb) {
      this.dialog = false;
      this.answer(true);
    },
    declineDialog: function(cb) {
      this.dialog = false;
      this.answer(false);
    },
    clearTimer: function() {
      this.$store.commit("timerStore/clear");
    },
    toggleFullscreen: function() {
      const elem = this.$refs.fullscreen;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.$store.getters["dimsManager/hasFinished"]) {
      this.displayDialogue(
        "Bent u zeker dat u de pagina wilt verlaten?",
        true,
        "Ja"
      ).then(answer => {
        if (answer) {
          next();
          this.resetTest();
          this.clearTimer();
        }
      });
    } else {
      next();
      this.resetTest();
      this.clearTimer();
    }
  }
};
</script>

<style>
.dims48-background {
  background-color: white;
}
</style>
