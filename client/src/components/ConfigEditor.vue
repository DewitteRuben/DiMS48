<template>
  <v-text-field
      :value="showValue"
      :name="configurationName"
      :label="configurationName"
      @keyup="updateParent"
    ></v-text-field>
</template>

<script>
  import keycodes from 'keycodes';

  export default{
    name: 'ConfigEditor',
    props: ['configurationName', 'configurationValue', 'isKeyCode'],
    created: function(){
      this.value = this.configurationValue;
      if(this.isKeyCode) this.showValue = keycodes(parseInt(this.value));
    },
    data(){
      return {
        value: 0,
        showValue : this.configurationValue
      }
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
        this.showValue = this.value;
        if(this.isKeyCode){
          this.value = e.keyCode;
          this.showValue = e.key;
        }
        this.$emit('update', {name: this.configurationName, value: this.value});
      }
    }
  }
</script>
