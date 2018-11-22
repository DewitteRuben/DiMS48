<template>
  <v-text-field
      v-model="configurationValue"
      :name="configurationName"
      :label="configurationName"
    ></v-text-field>
</template>

<script>
  export default{
    name: 'ConfigEditor',
    props: ['configurationName', 'configurationValue'],
    created: function(){
      console.log(this.configurationName, this.configurationValue);
    }
  }
</script>
