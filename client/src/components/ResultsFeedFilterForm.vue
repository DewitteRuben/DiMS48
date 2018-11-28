<template>
  <div>
    <v-form ref="filterForm">
      <v-layout wrap>
        <v-flex xs12 md3>
          <v-select
            solo
            v-model="selectedFilter"
            :items="Object.values(items)"
            label="Selecteer een filter"
          ></v-select>
        </v-flex>
        <v-flex xs12 md3>
          <v-select
            solo
            v-model="selectedOperator"
            :items="operations"
            label="Selecteer een operator"
          ></v-select>
        </v-flex>
        <v-flex xs12 md2>
          <v-text-field v-model="inputValue" solo name="value" label="Vul een waarde in" id="value"></v-text-field>
        </v-flex>
        <v-flex xs4 md2 xl1>
          <v-btn @click="addFilter" color="success">Toevoegen</v-btn>
        </v-flex>
        <v-flex xs4 md2 xl1>
          <v-btn @click="clearFilters" color="error">Leegmaken</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <v-flex xs12 mb-4 mt-4>
      <v-layout wrap>
        <v-chip
          close
          v-for="(filter, index) in filters"
          :key="index"
        >{{filter.name}} {{filter.operator}} {{filter.value}}</v-chip>
      </v-layout>
    </v-flex>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {
        age: "Leeftijd",
        gender: "Geslacht",
        schooledFor: "Naar school geweest tot",
        schooledTill: "Aantal jaar naar school geweest"
      },
      operations: ["=", "<", ">", "<=", ">="],
      selectedFilter: "",
      selectedOperator: "",
      inputValue: ""
    };
  },
  methods: {
    addFilter: function() {
      this.$store.commit("dimsResults/addFilter", {
        name: this.selectedFilter,
        value: this.inputValue,
        operator: this.selectedOperator,
        property: this.getKeyByValue(this.items, this.selectedFilter)
      });
      this.clearForm();
    },
    getKeyByValue: function(obj, value) {
      return Object.keys(obj).find(key => obj[key] === value);
    },
    clearForm: function() {
      this.$refs.filterForm.reset();
    },
    clearFilters: function() {
        this.$store.commit("dimsResults/clearFilters");
    },
  },
  computed: {
    filters: function() {
      return this.$store.state.dimsResults.filters;
    }
  }
};
</script>

<style>
</style>
