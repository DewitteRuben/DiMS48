<template>
  <v-flex xs12 sm4>
    <v-card class="TestListItem-Card" color="#FFFFFF">
      <v-card-title primary-title>
        <div class="text-lg-left">
          <div class="headline">{{ title }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <div class="testlistitem-buttonBox">
          <v-btn block :to="detailRoute" large color="primary">{{buttonText}}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
export default {
  props: {
    title: { type: String },
    baseRoute: { type: String },
    buttonText: { type: String }
  },
  computed: {
    detailRoute: function() {
      return `${this.baseRoute}/${this.title.toLowerCase()}`;
    }
  }
};
</script>

<style>
.testlistitem-buttonBox {
  padding: 20px;
  width: 100%;
}
</style>
