<template>
  <v-container v-if="dataLoaded">
    <ConfigEditor
      :displayName="'Duur Interferentietaak'"
      :configurationName="'interferenceDuration'"
      :configurationValue="interferenceDuration"
      @update="onChildUpdate"
    />
    <ConfigEditor
      :displayName="'Fase 1: tijd per foto'"
      :configurationName="'phase1SecondsPerImage'"
      :configurationValue="phase1SecondsPerImage"
      @update="onChildUpdate"
    />
    <ConfigEditor
      :displayName="'Linker knop (knop op toetsenbord)'"
      :configurationName="'leftBtnKeyCode'"
      :configurationValue="leftBtnKeyCode"
      :isKeyCode="true"
      @update="onChildUpdate"
    />
    <ConfigEditor
      :displayName="'Rechter knop (knop op toetsenbord)'"
      :configurationName="'rightBtnKeyCode'"
      :configurationValue="rightBtnKeyCode"
      :isKeyCode="true"
      @update="onChildUpdate"
    />
    <FileUploadForm/>
  </v-container>
</template>

<script>
import ConfigEditor from "@/components/ConfigEditor.vue";
import FileUploadForm from "@/components/FileUploadForm.vue";
import * as howtotestapi from "@/services/api/howtotestapi";

export default {
  components: {
    ConfigEditor,
    FileUploadForm
  },
  data: function(){
    return {
      dataLoaded: false,
      interferenceDurationValue: 0,
      phase1SecondsPerImageValue: 0,
      leftBtnKeyCodeValue: 0,
      rightBtnKeyCodeValue: 0
    }
  },
  computed: {
    interferenceDuration: {
      get: function() {
        return this.$store.getters["dims48Config/getInterferenceDuration"];
      },
      set: function(newValue) {
        this.interferenceDurationValue = newValue;
      }
    },
    phase1SecondsPerImage: {
      get: function() {
        return this.$store.getters["dims48Config/getPhase1SecondsPerImage"];
      },
      set: function(newValue) {
        this.phase1SecondsPerImageValue = newValue;
      }
    },
    leftBtnKeyCode: {
      get: function() {
        return this.$store.getters["dims48Config/getLeftBtnKeyCode"];
      },
      set: function(newValue) {
        this.leftBtnKeyCodeValue = newValue;
      }
    },
    rightBtnKeyCode: {
      get: function() {
        return this.$store.getters["dims48Config/getRightBtnKeyCode"];
      },
      set: function(newValue) {
        this.rightBtnKeyCodeValue = newValue;
      }
    }
  },
  methods: {
    onChildUpdate: function(newValue) {
      this[newValue.name] = newValue.value;
      let newConfig = {
        interferenceDuration: this.interferenceDurationValue,
        phase1SecondsPerImage: this.phase1SecondsPerImageValue,
        leftBtnKeyCode: this.leftBtnKeyCodeValue,
        rightBtnKeyCode: this.rightBtnKeyCodeValue
      };
      this.$emit('updateParentWithChildData', newConfig);
    }
  },
  created: function(){
    let self = this;
    howtotestapi
      .getDims48()
      .then(data => {
        console.log(data);
        this.interferenceDuration = data.config[0].config[0].value;
        this.phase1SecondsPerImage = data.config[0].config[1].value;
        this.leftBtnKeyCode = data.config[0].config[2].value;
        this.rightBtnKeyCode = data.config[0].config[3].value;
        self.$store.dispatch("dims48Config/initialize", data.config[0].config);
        setTimeout(function() {
          self.dataLoaded = true;
          self.$emit("loaded");
        });
      })
      .catch(err => console.log(err));
  }
}
</script>
