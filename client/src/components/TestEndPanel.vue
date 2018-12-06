<template>
  <div class="TestEndPanel">
    <h1>Einde van de Test</h1>
    <v-checkbox
      label="De resultaten zijn waarheidsgetrouw, bevestig hierbij dat deze mogen opgeslagen worden."
      v-model="saveCheckbox"
      value="value"
    ></v-checkbox>
    <v-btn
      to="/results"
      :disabled="!saveCheckbox"
      class="TestEndPanel-Button"
      block
      color="primary"
    >Volgende</v-btn>
    <v-btn to="/" class="TestEndPanel-Button" block color="primary">Terug naar homepage</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saveCheckbox: false
    };
  }
};
</script>

<style>
.TestEndPanel {
  background-color: white;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 30px 75px 30px 75px;
}

.TestEndPanel-Button {
  margin: 30px 0 30px 0;
}
</style>
