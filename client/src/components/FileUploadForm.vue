<template>
  <form enctype="multipart/form-data" :action="action" method="post">
    <input type="file" name="toUpload" accept="application/pdf">
    <v-btn color="primary" type="submit">Upload</v-btn>
  </form>
</template>

<script>
export default {
  computed: {
    action() {
      return `/api/upload/dims48`;
    }
  }
};
</script>

<style scoped>
</style>
