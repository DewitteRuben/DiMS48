<template>
    <fullscreen ref="fullscreen" :fullscreen.sync="fullscreen">
      <router-view @startTest="toggle"></router-view>
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
  },
  mounted: function(){
    let self = this;
    this.$root.$on('startTest', function(){
      self.toggle();
    })
  }
};
</script>

<style scoped>
</style>
