<template>
<div>
   <v-data-table
      :headers="testData.headers_fase1"
      :items="testData.data_fase1"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-md-left">{{ props.item.percentage }}</td>
      </template>
    </v-data-table>

     <v-data-table
      :headers="testData.headers_fase2"
      :items="testData.data_fase2"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-md-left">{{ props.item.percentage }}</td>
      </template>
    </v-data-table>
</div>
</template>

<script>

import testData from "@/data/testResultsMockData.json";

export default {
  data() {
    return { testData };
  },
}
</script>