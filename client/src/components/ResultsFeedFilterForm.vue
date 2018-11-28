<template>
  <div>
    <v-form ref="filterForm">
      <v-layout wrap>
        <v-flex xs12 md3>
          <v-select
            solo
            v-model="selectedFilter"
            :items="items"
            item-text="name"
            :return-object="true"
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
          @input="removeFilter(index)"
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
      items: [
        {
          name: "Leeftijd",
          property: "clientInfo.age",
          type: Number
        },
        {
          name: "Geslacht",
          type: String,
          property: "clientInfo.gender"
        },
        {
          name: "Naar school geweest tot",
          type: Number,
          property: "clientInfo.schooledTill"
        },
        {
          name: "Aantal jaar naar school geweest",
          type: Number,
          property: "clientInfo.schooledFor"
        }
      ],
      operations: ["=", "=/=", "<", ">", "<=", ">="],
      selectedFilter: "",
      selectedOperator: "",
      inputValue: ""
    };
  },
  methods: {
    addFilter: function() {
      const valueType = this.selectedFilter.type;
      const isValid = this.isValidValue(valueType, this.inputValue);

      if (isValid) {
        const parsedValue = valueType(this.inputValue);

        this.$store.commit("dimsResults/addFilter", {
          ...this.selectedFilter,
          operator: this.selectedOperator,
          value: parsedValue
        });

        this.clearForm();
      } else {
        console.log("invalid type");
      }
    },
    removeFilter(id) {
      this.$store.commit("dimsResults/removeFilter", id);
    },
    isValidValue: function(type, value) {
      if (type !== Number) return isNaN(parseInt(type(value)));
      return !isNaN(type(value));
    },
    getKeyByValue: function(obj, value) {
      return Object.keys(obj).find(key => obj[key] === value);
    },
    clearForm: function() {
      this.$refs.filterForm.reset();
    },
    clearFilters: function() {
      this.$store.commit("dimsResults/clearFilters");
    }
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
