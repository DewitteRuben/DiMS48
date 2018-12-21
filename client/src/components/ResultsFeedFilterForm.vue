<template>
  <div>
    <v-form ref="filterForm">
      <v-layout wrap>
        <v-flex xs12 md3>
          <v-select
            solo
            v-model="selectedFilter"
            @change="switchFilter"
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
            :disabled="truthFilter"
            item-text="symbol"
            label="Selecteer een operator"
          ></v-select>
        </v-flex>
        <v-flex xs12 md2>
          <v-text-field
            v-if="!dateFilter && !truthFilter"
            v-model="inputValue"
            solo
            name="value"
            label="Vul een waarde in"
            id="value"
          ></v-text-field>
          <v-select
            solo
            v-model="selectedTruth"
            :items="truthItems"
            item-text="name"
            item-value="value"
            v-if="truthFilter"
            label="Selecteer een waarheid"
          ></v-select>
          <v-menu
            v-if="dateFilter"
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field slot="activator" v-model="date" label="Selecteer een datum" readonly solo></v-text-field>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menu2"
            v-if="dateFilter"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="time"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field slot="activator" v-model="time" label="Selecteer een tijd" solo readonly></v-text-field>
            <v-time-picker
              v-if="menu2"
              v-model="time"
              format="24hr"
              full-width
              @change="$refs.menu2.save(time)"
            ></v-time-picker>
          </v-menu>
        </v-flex>
        <v-flex xs4 md2 xl1>
          <v-btn @click="addFilter" color="success">Toevoegen</v-btn>
        </v-flex>
        <v-flex xs4 md2 xl1>
          <v-btn @click="clearFilters" color="error">Filters Wissen</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <v-flex xs12 mb-4 mt-4>
      <v-layout wrap>
        <v-chip close @input="removeFilter(index)" v-for="(filter, index) in filters" :key="index">
          {{filter.name}} {{filter.operator}}
          {{filter.type === Date ? new Date(filter.value).toLocaleString("nl") : filter.value === true ? "Waar" : "Onwaar" }}
        </v-chip>
      </v-layout>
    </v-flex>
  </div>
</template>

<script>
const hourInMs = 1 * 60 * 60 * 1000;
const minuteInMs = 1 * 60 * 100;

function timeStringToMilliseconds(timeString) {
  const [hours, minutes] = timeString.split(":").map(e => parseInt(e));
  return hourInMs * hours + minuteInMs * minutes;
}

function calcuateTimeInMsFromString(dateString, timeString) {
  let date = new Date(dateString);
  date.setHours(0);
  const dateInMs = date.getTime();
  const timeInMs = timeStringToMilliseconds(timeString);
  return dateInMs + timeInMs;
}

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
        },
        {
          name: "Is test voltooid",
          type: Boolean,
          property: "done"
        },
        {
          name: "Datum",
          type: Date,
          property: "timestamp"
        }
      ],
      truthItems: [
        {
          name: "Waar",
          value: true
        },
        {
          name: "Onwaar",
          value: false
        }
      ],
      selectedFilter: "",
      selectedTruth: "",
      selectedOperator: "",
      dateFilter: false,
      truthFilter: false,
      inputValue: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      time: null
    };
  },
  methods: {
    addFilter: function() {
      if (!this.isFilledIn()) return;

      const valueType = this.selectedFilter.type;
      let input = this.getInput();
      const isValid = this.isValidValue(valueType, input);

      if (!isValid) return;

      const parsedValue = this.dateFilter ? input : valueType(input);
      const operator = this.selectedOperator;

      this.$store.commit("dimsResults/addFilter", {
        ...this.selectedFilter,
        operator: operator,
        value: parsedValue
      });

      this.clearForm();
    },
    getInput() {
      if (this.dateFilter)
        return calcuateTimeInMsFromString(this.date, this.time);
      if (this.truthFilter) return this.selectedTruth;
      return this.inputValue.trim();
    },
    removeFilter(id) {
      this.$store.commit("dimsResults/removeFilter", id);
    },
    isFilledIn: function() {
      if (this.selectedFilter) {
        if (this.selectedFilter.type === Boolean)
          return this.selectedTruth !== null;
        if (this.selectedFilter.type === Date)
          return this.selectedOperator && this.date;
        return this.selectedOperator && this.inputValue;
      }
      return false;
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
      this.dateFilter = false;
    },
    clearFilters: function() {
      this.$store.commit("dimsResults/clearFilters");
    },
    switchFilter: function() {
      this.dateFilter = this.selectedFilter.name === "Datum";
      this.truthFilter = this.selectedFilter.name === "Is test voltooid";
    }
  },
  computed: {
    filters: function() {
      return this.$store.state.dimsResults.filters;
    },
    operations: function() {
      let operations = [
        { symbol: "=", supportedTypes: [Number, String, Date] },
        { symbol: "≠", supportedTypes: [Number, String, Date] },
        { symbol: "Bevat", supportedTypes: [String] },
        { symbol: ">", supportedTypes: [Number, Date] },
        { symbol: "<", supportedTypes: [Number, Date] },
        { symbol: "≥", supportedTypes: [Number, Date] },
        { symbol: "≤", supportedTypes: [Number, Date] }
      ];

      const valueType =
        this.selectedFilter !== undefined && this.selectedFilter !== null
          ? this.selectedFilter.type
          : true;

      return operations.filter(e => e.supportedTypes.includes(valueType));
    }
  }
};
</script>

<style>
</style>
