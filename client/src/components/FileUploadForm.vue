<template>
  <!-- <form enctype="multipart/form-data" :action="action" method="post">
    <input type="file" name="toUpload" accept="application/pdf">
    <v-btn color="primary" type="submit">Upload</v-btn>
  </form>-->
  <v-form>
    <v-layout xs12 sm8 lg6>
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

export default {
  data() {
    return {
      uploadFile: null,
      uploadText: ""
    };
  },
  computed: {
    action() {
      return `/api/upload/dims48`;
    }
  },
  components: {
    UploadButton
  },
  methods: {
    fileChanged: function(file) {
      this.uploadFile = file;
      this.uploadText = file.name;
      // handle file here. File will be an object.
      // If multiple prop is true, it will return an object array of files.
    },
    uploadPdf: function() {
      if (this.uploadFile) {
      }
    }
  }
};
</script>

<style scoped>
</style>
