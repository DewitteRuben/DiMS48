<template>
  <!-- <form enctype="multipart/form-data" :action="action" method="post">
    <input type="file" name="toUpload" accept="application/pdf">
    <v-btn color="primary" type="submit">Upload</v-btn>
  </form>-->
  <v-form>
    <UploadButton :fileChangedCallback="fileChanged">
      <template slot="icon">
        <v-icon color="white">add</v-icon>
      </template>
    </UploadButton>
  </v-form>
</template>

<script>
import UploadButton from "vuetify-upload-button";

export default {
  computed: {
    action() {
      return `/api/upload/dims48`;
    }
  },
  components: {
    UploadButton
  },
  methods: {
    fileChanged(file) {
      // handle file here. File will be an object.
      // If multiple prop is true, it will return an object array of files.
      console.log(file);
    }
  }
};
</script>

<style scoped>
</style>
