<template>
  <v-container fluid fill-height class="dims48-background">
    <Dims48aTest v-if="isDims48a"/>
    <Dims48bTest v-else/>
    <ConfirmationDialog
      v-on:confirmModal="confirmDialog"
      v-on:declineModal="declineDialog"
      :title="dialogTitle"
      :model="dialog"
      :headline="dialogHeadline"
      :message="dialogMessage"
      :confirmButtonText="dialogConfirmButtonText"
      :declineButtonText="dialogDeclineButtonText"
      :decline="true"
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
  data() {
    return {
      dialog: false,
      answer: null,
      dialogTitle: "Dims48",
      dialogHeadline: "Dims48",
      dialogMessage: "",
      dialogConfirmButtonText: "Ja",
      dialogDeclineButtonText: "Nee"
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
    displayDialogue: function(message) {
      this.dialogMessage = message;
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.answer = resolve;
      });
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
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.$store.getters["dimsManager/hasFinished"]) {
      this.displayDialogue("Bent u zeker dat u de pagina wilt verlaten?").then(
        answer => {
          if (answer) {
            next();
            this.resetTest();
            this.clearTimer();
          }
        }
      );
    } else {
      next();
      this.resetTest();
      this.clearTimer();
    }
  },
  created() {
    this.resetTest();
  }
};
</script>

<style>
.dims48-background {
  background-color: white;
}
</style>
