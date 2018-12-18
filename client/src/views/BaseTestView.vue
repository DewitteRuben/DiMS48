<template>
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
      <router-view></router-view>
      <v-btn id="setFullscreen" type="button" @click="toggle" >Fullscreen</v-btn>
    </fullscreen>
</template>

<script>
import Fullscreen from 'vue-fullscreen/src/component.vue';
export default {
  components: {Fullscreen},
  data(){
    return {
      fullscreen: false
    }
  },
  methods:{
    toggle(){
      this.$refs['fullscreen'].toggle();
    }
  }
};
</script>

<style scoped>
</style>
