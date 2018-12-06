<template>
  <v-text-field
      v-model="newConfigurationValue"
      :name="configurationName"
      :label="configurationName"
      @keyup="updateParent"
    ></v-text-field>
</template>

<script>
  export default{
    name: 'ConfigEditor',
    props: ['configurationName', 'configurationValue', 'isKeyCode'],
    created: function(){
      this.value = this.configurationValue;
    },
    data(){
      return {value: 0}
    },
    computed: {
      newConfigurationValue: {
        get: function(){
          return this.value;
        },
        set: function(newValue){
          this.value = newValue;
        }
      }
    },
    methods: {
      updateParent: function(e){
        if(this.isKeyCode){
          this.value = e.keyCode;
        }
        this.$emit('update', {name: this.configurationName, value: this.value});
      }
    }
  }
</script>
