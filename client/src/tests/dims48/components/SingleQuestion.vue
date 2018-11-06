<template>
    <div class="question">
        <img
            src="https://www.howtotest.be/sites/all/themes/howtotest/extensions/dms-48/images/single/afbeelding-1.jpg"
            alt="picture"
        >
        <div class="answers">
            <v-btn large flat color="primary">3 of minder kleuren</v-btn>
            <v-btn large flat color="primary">meer dan 3 kleuren</v-btn>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    image: { type: String },
    possibleAnswers: { type: Array },
    buttonText: { type: String }
  }
};
</script>

<style>
</style>
