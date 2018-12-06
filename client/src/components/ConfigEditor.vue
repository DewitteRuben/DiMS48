<template>
  <v-text-field
      v-model="showValue"
      :name="configurationName"
      :label="displayName"
      @keyup="updateParent"
    ></v-text-field>
</template>

<script>
  import keycodes from 'keycodes';

  export default{
    name: 'ConfigEditor',
    props: ['displayName', 'configurationName', 'configurationValue', 'isKeyCode'],
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
        this.value = this.showValue;
        if(this.isKeyCode){
          this.value = e.keyCode;
          this.showValue = e.key;
        }
        console.log(this.value);
        this.$emit('update', {name: this.configurationName, value: this.value});
      }
    }
  }
</script>
