<template>
    <v-container fluid fill-height class="dims48-background">
        <v-layout flex align-center justify-center>
            <SingleQuestion/>
        </v-layout>
    </v-container>
</template>

<script>
import SingleQuestion from "@/tests/dims48/components/SingleQuestion.vue";

export default {
  name: "Dims48Page",
  components: {
    SingleQuestion
  },
};
</script>

<style>
.dims48-background {
    background-color: white;
}
</style>
