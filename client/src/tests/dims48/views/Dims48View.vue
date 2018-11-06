<template>
    <v-container fluid fill-height class="dims48-background">
        <v-layout flex align-center justify-center>
            <Dims48Test/>
        </v-layout>
    </v-container>
</template>

<script>
import Dims48Test from "@/tests/dims48/components/Dims48Test.vue";

export default {
  name: "Dims48Page",
  components: {
    Dims48Test
  }
};
</script>

<style>
.dims48-background {
  background-color: white;
}
</style>
