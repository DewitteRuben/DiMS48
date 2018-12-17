<template>
  <v-dialog v-model="model" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="decline"
          color="red darken-1"
          flat
          @click="$emit('declineModal');"
        >{{declineButtonText}}</v-btn>
        <v-btn color="green darken-1" flat v-on:click="$emit('confirmModal');">{{confirmButtonText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    headline: String,
    message: String,
    confirmButtonText: String,
    declineButtonText: String,
    confirmAction: Function,
    decline: Boolean,
    model: Boolean
  }
};
</script>

<style>
</style>
