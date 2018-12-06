<template>
  <v-container text-xs-left>
    <h1 class="text-xs-center">Resultaat {{testId}}</h1>

    <v-layout row wrap mt-4>
      <v-flex xs4>
        <h2>Client Info
          <v-btn @click="clientInfoDialog = true" icon flat color="red lighten-2">
            <v-icon>edit</v-icon>
          </v-btn>
        </h2>
        <div>
          <h3>Leeftijd</h3>
          <p class="subheading">{{result.clientInfo.age}} jaar</p>
          <h3>Naar school geweest tot</h3>
          <p class="subheading">{{result.clientInfo.schooledTill}} jaar</p>
          <h3>Aantal jaar naar school geweest</h3>
          <p class="subheading">{{result.clientInfo.schooledFor}} jaar</p>
          <h3>Geslacht</h3>
          <p class="subheading">{{result.clientInfo.gender}}</p>
        </div>
      </v-flex>
      <v-flex xs4 offset-xs-4>
        <h3>Notities van de testgever
          <v-btn icon flat color="red lighten-2">
            <v-icon>edit</v-icon>
          </v-btn>
        </h3>

        <v-textarea name="notes" :value="result.clientInfo.notes" label="label" readonly solo></v-textarea>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout mt-5 row wrap>
      <v-flex sm4 xs12>
        <h2>Resultaten Fase 1</h2>
        <h3>Score</h3>
        <p class="subheading">{{result.answersPhase1.score}}</p>
      </v-flex>
      <v-flex sm4 xs12>
        <h2>Resultaten Fase 2</h2>
        <h3>Abstract Score</h3>
        <p class="subheading">{{result.answersPhase2.scores.abstractScore}}</p>
        <h3>Grouped Score</h3>
        <p class="subheading">{{result.answersPhase2.scores.groupedScore}}</p>
        <h3>Unique Score</h3>
        <p class="subheading">{{result.answersPhase2.scores.uniqueScore}}</p>
      </v-flex>
      <v-flex sm4 xs12>
        <h2>Resultaten Fase 3</h2>
        <h3>Abstract Score</h3>
        <p class="subheading">{{result.answersPhase3.scores.abstractScore}}</p>
        <h3>Grouped Score</h3>
        <p class="subheading">{{result.answersPhase3.scores.groupedScore}}</p>
        <h3>Unique Score</h3>
        <p class="subheading">{{result.answersPhase3.scores.uniqueScore}}</p>
      </v-flex>
    </v-layout>
    <v-layout mt-3 justify-end>
      <v-btn color="success">Download Excel</v-btn>
      <v-btn color="success">Download PDF</v-btn>
    </v-layout>
    <v-dialog v-model="clientInfoDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Gegevens van de client</span>
        </v-card-title>
        <v-card-text>
          <ClientDataForm
            :age="result.clientInfo.age"
            :schooledTill="result.clientInfo.schooledTill"
            :schooledFor="result.clientInfo.schooledFor"
            :gender="result.clientInfo.gender"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="clientInfoDialog = false">Sluiten</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import result from "../data/result.json";
import ClientDataForm from "@/components/ClientDataForm.vue";

export default {
  components: {
    ClientDataForm
  },
  data() {
    return {
      result: result,
      clientInfoDialog: false
    };
  },
  methods: {},
  computed: {
    testId: function() {
      return this.$route.params.id;
    }
  }
};
</script>

<style>
</style>
