<template>
  <v-form>
    <v-layout wrap>
      <v-text-field
        v-model="uploadText"
        solo
        readonly
        name="upload"
        label="Geen bestand geselecteerd"
      ></v-text-field>
      <UploadButton title :fileChangedCallback="fileChanged" accept="application/pdf">
        <template slot="icon">
          <v-icon color="white">add</v-icon>
        </template>
      </UploadButton>
    </v-layout>
    <v-layout column>
      <v-btn @click="uploadPdf" color="success">Uploaden</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import UploadButton from "vuetify-upload-button";
import * as HowToTestApi from "@/services/api/howtotestapi";

export default {
  data() {
    return {
      uploadFile: null,
      uploadText: ""
    };
  },
  components: {
    UploadButton
  },
  methods: {
    fileChanged: function(file) {
      this.uploadFile = file;
      this.uploadText = file ? file.name : "";
    },
    displayDialog: function(message) {
      this.$root.$emit("messageDialog", message);
    },
    uploadPdf: function() {
      if (this.uploadFile) {
        const formData = new FormData();
        formData.append("uploadedFile", this.uploadFile);
        HowToTestApi.uploadNormPdf(formData)
          .then(e => {
            this.displayDialog(e.msg);
          })
          .catch(e => {
            this.displayDialog(e.msg);
          })
          .finally(() => {
            this.uploadText = "";
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
