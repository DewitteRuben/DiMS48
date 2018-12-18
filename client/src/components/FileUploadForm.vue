<template>
  <form enctype="multipart/form-data" :action="action" method="post">
    <input type="file" name="toUpload"/>
    <input type="submit" value="Upload">
  </form>
</template>

<script>
export default {
  computed: {
    action(){
      return `http://localhost:3000/api/upload`;
    }
  }
}
</script>

<style lang="css">
</style>
