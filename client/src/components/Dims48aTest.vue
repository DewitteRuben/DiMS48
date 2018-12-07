<template>
  <div>
    <div v-if="loaded">
      <ClientDataForm ref="dataForm" :submit="saveClientData" v-if="!hasClientData"/>
      <InstructionsForm v-show="!hasStarted && !hasFinished && !interference && hasClientData"/>
      <SingleQuestion v-show="hasStarted"/>
      <InterferenceTest v-show="interference"/>
      <TestEndPanel v-show="hasFinished"/>
    </div>
    <div v-else>
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
import InstructionsForm from "@/components/InstructionsForm.vue";
import SingleQuestion from "@/components/SingleQuestion.vue";
import InterferenceTest from "@/components/InterferenceTest.vue";
import TestEndPanel from "@/components/TestEndPanel.vue";
import ClientDataForm from "@/components/ClientDataForm.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      hasClientData: false
    };
  },
  components: {
    InstructionsForm,
    SingleQuestion,
    InterferenceTest,
    TestEndPanel,
    ClientDataForm
  },
  methods: {
    saveClientData: function() {
      const dataForm = this.$refs.dataForm;
      const clientData = {
        age: dataForm.leeftijd,
        gender: dataForm.geslacht.value,
        schooledTill: dataForm.leeftijd_naar_school,
        schooledFor: dataForm.jaren_naar_school
      };
      this.$store.commit("dimsClientData/setClientData", clientData);
      this.hasClientData = true;
    }
  },
  computed: {
    hasStarted() {
      return this.$store.state.dimsManager.started;
    },
    hasFinished() {
      return this.$store.state.dimsManager.finished;
    },
    loaded() {
      return this.$store.getters["dimsManager/isLoaded"];
    },
    interference() {
      return this.$store.state.dimsManager.interference;
    },
    ...mapGetters("dimsClientData", ["getClientData"])
  },
  beforeMount() {
    this.$store.dispatch("dimsManager/initDims48a");
  }
};
</script>

<style>
</style>
