<template>
    <div class="question">
        <img :src="image" alt="picture"> 
        <div class="answers"> 
            <v-btn v-for="(option, index) in options" class="answers" :key="index" large :data-value="option.btnValue" flat color="primary" >
                {{option.btnText}}
            </v-btn> 
        </div> 
    </div>
</template>

<script>
export default {
  props: {
    image: { type: String },
    options: { type: Array },
    buttonText: { type: String }
  },
};
</script>

<style>
</style>
