<template>
    <v-form v-if="dataLoaded">
      <ConfigEditor :configurationName="'interferenceDuration'" :configurationValue="interferenceDuration" @update="onChildUpdate"/>
      <ConfigEditor :configurationName="'phase1SecondsPerImage'" :configurationValue="phase1SecondsPerImage" @update="onChildUpdate"/>
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
        dataLoaded: false,
        interferenceDurationValue: 0,
        phase1SecondsPerImageValue: 0
      }
    },
    computed: {
      interferenceDuration: {
        get: function(){
          return this.$store.getters["dimsConfig/getInterferenceDuration"];
        },
        set: function(newValue){
          this.interferenceDurationValue = newValue;
        }
      },
      phase1SecondsPerImage: {
        get: function(){
          return this.$store.getters["dimsConfig/getPhase1SecondsPerImage"];
        },
        set: function(newValue){
          this.phase1SecondsPerImageValue = newValue;
        }
      }
    },
    methods: {
        updateValues: function(){
          let self = this;
          let newConfig = {
            interferenceDuration: this.interferenceDurationValue,
            phase1SecondsPerImage: this.phase1SecondsPerImageValue
          }
          this.$store.dispatch("dimsConfig/updateConfigValues", newConfig);
          howtotestapi.updateConfig("DiMS48", {newConfig}).then(data=>console.log(data));
        },
        onChildUpdate: function(newValue){
          this[newValue.name] = newValue.value;
        }
    },
    created: function(){
      let self = this;
      howtotestapi.getDims48().then(data=>{
        this.interferenceDuration = data.config[0].config[0].value;
        this.phase1SecondsPerImage = data.config[0].config[1].value;
        self.$store.dispatch("dimsConfig/initialize", data.config[0].config);
        setTimeout(function(){
          self.dataLoaded = true;
        })
      }).catch(err=>console.log(err));
    }
  }
</script>
