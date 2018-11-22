<template>
    <v-form v-if="dataLoaded">
      <ConfigEditor :configurationName="'interferenceDuration'" :configurationValue="interferenceDuration"/>
      <ConfigEditor :configurationName="'phase1SecondsPerImage'" :configurationValue="phase1SecondsPerImage"/>
      <v-btn @click="updateValues">Save</v-btn>
    </v-form>
</template>

<script>
  import ConfigEditor from '@/components/ConfigEditor.vue';
  import * as howtotestapi from "@/services/api/howtotestapi";

  export default{
    components:{
      ConfigEditor
    },
    data: function(){
      return {
        dataLoaded: false
      }
    },
    computed: {
      interferenceDuration: function(){
        return this.$store.getters["dimsConfig/getInterferenceDuration"];
      },
      phase1SecondsPerImage: function(){
        return this.$store.getters["dimsConfig/getPhase1SecondsPerImage"];
      }
    },
    methods: {
        updateValues: function(){
          let self = this;
          let newConfig = {
            interferenceDuration: 300, // TODO: get data from child
            phase1SecondsPerImage: 10 // TODO: get data from child
          }
          this.$store.dispatch("dimsConfig/updateConfigValues", newConfig);
          howtotestapi.updateConfig("DiMS48", {newConfig});
        }
    },
    created: function(){
      let self = this;
      howtotestapi.getDims48().then(data=>{
        self.$store.dispatch("dimsConfig/initialize", data.config[0].config);
        setTimeout(function(){
          self.dataLoaded = true;
        })
      }).catch(err=>console.log(err));
    }
  }
</script>
