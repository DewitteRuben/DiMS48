<template>
  <v-container>
    <v-layout align-center justify-center fill-height v-show="dataLoaded">
      <v-flex xs12 sm8 lg6>
        <h1>Configuratie {{$route.params.name}} Test</h1>
        <v-form class="mt-5">
          <Dims48AdminPanel
            v-if="$route.params.name == 'dims48'"
            @loaded="dataLoaded=true"
            @updateParentWithChildData="updateValues"
          />
          <v-btn @click="submitValues">Opslaan</v-btn>
        </v-form>
        <br>
        <FileUploadForm/>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center fill-height v-show="!dataLoaded">
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import Dims48AdminPanel from "@/components/Dims48AdminPanel";
import * as howtotestapi from "@/services/api/howtotestapi";
import FileUploadForm from "@/components/FileUploadForm.vue";

export default {
  components: {
    Dims48AdminPanel,
    FileUploadForm
  },
  data: function() {
    return {
      dataLoaded: false,
      currentConfig: false
    };
  },
  methods: {
    submitValues: function() {
      let self = this;
      if (this.currentConfig) {
        this.$store.dispatch(
          `${self.$route.params.name}Config/updateConfigValues`,
          self.currentConfig
        );
        howtotestapi
          .updateConfig(self.$route.params.name, {
            newConfig: self.currentConfig
          })
          .then(data => console.log(data));
      }
    },
    updateValues: function(newConfig) {
      this.currentConfig = newConfig;
    }
  }
};
</script>
