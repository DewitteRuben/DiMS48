<template>
  <div class="TestEndPanel">
    <h1>Einde van de Test</h1>
    <v-checkbox
      label="De resultaten zijn waarheidsgetrouw, bevestig hierbij dat deze mogen opgeslagen worden."
      v-model="saveCheckbox"
      value="value"
    ></v-checkbox>
    <v-btn
      @click="saveResults"
      :disabled="!saveCheckbox"
      class="TestEndPanel-Button"
      block
      color="primary"
    >Volgende</v-btn>
    <v-btn to="/" class="TestEndPanel-Button" block color="primary">Terug naar homepage</v-btn>
  </div>
</template>

<script>
import * as howToTestApi from "@/services/api/howtotestapi";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      saveCheckbox: false
    };
  },
  props: {
    id: { type: String, default: null }
  },
  computed: {
    testName: function() {
      return this.$route.name;
    },
    ...mapGetters("dimsManager", ["phaseNumber", "hasFinished"]),
    ...mapGetters("dimsClientData", ["getClientData"])
  },
  methods: {
    resetTest: function() {
      this.$store.dispatch("dimsManager/resetState");
    },
    isTestCompleted: function() {
      return this.$store.getters["dimsManager/hasFinished"];
    },
    saveResults: function() {
      if (this.hasFinished && this.saveCheckbox) {
        const testResults = this.$store.state.dimsTestData[this.testName];

        let data;
        if (!this.id) {
          const clientInfo = this.getClientData;
          data = {
            ...clientInfo,
            ...testResults
          };
        } else {
          data = {
            _id: this.id,
            ...testResults
          };
        }

        console.log(data);
        howToTestApi
          .postResults(this.phaseNumber, "dims48", data)
          .then(e => {
            const id = e._id;
            this.$router.push({ path: `/results/dims48/${id}` });
            this.resetTest();
          })
          .catch(e => {
            console.error(e);
          });
      }
    }
  }
};
</script>

<style>
.TestEndPanel {
  background-color: white;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 30px 75px 30px 75px;
}

.TestEndPanel-Button {
  margin: 30px 0 30px 0;
}
</style>
