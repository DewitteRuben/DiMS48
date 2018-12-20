<template>
  <v-flex xs12>
    <router-link :to="testResultRoute" class="ResultItemList-a">
      <v-card ripple class="pa-3">
        <v-card-text>
          <v-layout>
            <span class="title">{{id}}</span>
            <v-spacer></v-spacer>
            <span class="title">{{timestamp.toLocaleString("nl")}}</span>
            <v-btn v-if="admin" @click="removeResult">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-layout>
          <div class="ResultListItem-middle">
            <ul class="text-xs-left subheading">
              <li>Leeftijd: {{age}}</li>
              <li>Naar school geweest tot: {{schooledTill}}j</li>
              <li>Aantal jaar naar school geweest: {{schooledFor}}j</li>
              <li>Geslacht: {{gender}}</li>
            </ul>
          </div>
          <v-layout>
            <span class="green--text" v-if="done">
              <v-icon medium color="green">check_circle</v-icon>
            </span>
          </v-layout>
        </v-card-text>
      </v-card>
    </router-link>
  </v-flex>
</template>

<script>
import * as howtotestapi from "@/services/api/howtotestapi";
export default {
  props: {
    id: { type: String },
    age: { type: Number },
    schooledTill: { type: Number },
    schooledFor: { type: Number },
    gender: { type: String },
    timestamp: { type: Date },
    done: { type: Boolean }
  },
  computed: {
    testResultRoute: function() {
      return `/results/dims48/${this.id}`;
    },
    loggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    }
  },
  data() {
    return {
      admin: false
    };
  },
  mounted: function() {
    let self = this;
    if (this.loggedIn) {
      howtotestapi
        .isAdmin(self.$store.getters["user/getUser"].email)
        .then(isAdmin => (self.admin = isAdmin.isAdmin))
        .catch(err => console.log(err));
    }
  },
  methods: {
    removeResult: function() {
      console.log(this.id);
      howtotestapi
        .removeResult("dims48", this.id)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.ResultItemList-a {
  text-decoration: none;
}
</style>
