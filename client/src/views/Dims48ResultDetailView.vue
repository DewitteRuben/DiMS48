<template>
  <v-container text-xs-left>
    <v-btn flat @click="toResultsPage" icon color="blue">
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <h1 class="text-xs-center">Resultaten DiMS48 Test</h1>
    <div v-if="loadedSuccessfully">
      <v-layout row wrap mt-4>
        <v-flex xs4>
          <h2>Gemaakt op {{new Date(result.timestamp).toLocaleString("nl")}}</h2>
          <h2>
            ID-nummer testnemer:
            <span class="red--text">{{testId}}</span>
          </h2>
          <h2>Cliënt Info
            <v-btn @click="setDialog(true)" icon flat color="red lighten-2">
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
            <v-btn @click="toggleNoteEdit" icon flat color="red lighten-2">
              <v-icon v-if="editingNotes === false">edit</v-icon>
              <v-icon v-if="editingNotes === true">book</v-icon>
            </v-btn>
          </h3>

          <v-textarea
            name="notes"
            v-model="notes"
            label="Notities"
            ref="notesTextArea"
            :readonly="!editingNotes"
            placeholder="Er werden nog geen notities gemaakt"
            solo
          ></v-textarea>
          <v-btn v-if="editingNotes" @click="saveNotes" color="success">Opslaan</v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout mt-5 row wrap>
        <v-flex sm4 xs12>
          <h2>Resultaten Fase 1</h2>
          <h3>Score</h3>
          <p class="subheading">{{result.phase1.score.toFixed(2)}}%</p>
          <h3>Normscores</h3>
          <p v-html="normValuesText"></p>
        </v-flex>
        <v-flex sm4 xs12>
          <h2>Resultaten Fase 2</h2>
          <h3>Abstract Score</h3>
          <p class="subheading">{{result.phase2.scores.abstractScore.toFixed(2)}}%</p>
          <h3>Grouped Score</h3>
          <p class="subheading">{{result.phase2.scores.groupedScore.toFixed(2)}}%</p>
          <h3>Unique Score</h3>
          <p class="subheading">{{result.phase2.scores.uniqueScore.toFixed(2)}}%</p>
        </v-flex>
        <v-flex sm4 xs12>
          <h2>Resultaten Fase 3</h2>
          <div v-if="result.phase3 !== null">
            <h3>Abstract Score</h3>
            <p class="subheading">{{result.phase3.scores.abstractScore.toFixed(2)}}%</p>
            <h3>Grouped Score</h3>
            <p class="subheading">{{result.phase3.scores.groupedScore.toFixed(2)}}%</p>
            <h3>Unique Score</h3>
            <p class="subheading">{{result.phase3.scores.uniqueScore.toFixed(2)}}%</p>
          </div>
          <div v-else>
            <h3>Deze test werd nog niet afgelegd.</h3>
          </div>
        </v-flex>
      </v-layout>
      <v-layout mt-3 justify-end>
        <h3 v-if="downloading">Downloaden..</h3>
        <v-btn color="success" @click="downloadTestResults('excel')">Download Excel</v-btn>
        <v-btn color="success" @click="downloadTestResults('pdf')">Download PDF</v-btn>
      </v-layout>
      <v-dialog v-model="clientInfoDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Gegevens van de client</span>
          </v-card-title>
          <v-card-text>
            <ClientDataForm
              ref="dataForm"
              :age="result.clientInfo.age"
              :schooledTill="result.clientInfo.schooledTill"
              :schooledFor="result.clientInfo.schooledFor"
              :gender="result.clientInfo.gender"
              :submit="updateClientInfo"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="clientInfoDialog = false">Sluiten</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-layout v-if="!loaded" justify-center align-center fill-height>
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>

    <v-layout v-if="isInvalidId" justify-center align-center fill-height>
      <h2>De resultaten met het id "{{testId}}" werden niet gevonden.</h2>
    </v-layout>
  </v-container>
</template>

<script>
import * as HowToTestApi from "@/services/api/howtotestapi";
import ClientDataForm from "@/components/ClientDataForm.vue";
import * as download from "downloadjs";

export default {
  components: {
    ClientDataForm
  },
  data() {
    return {
      result: null,
      loaded: false,
      error: null,
      notes: "",
      editingNotes: false,
      downloading: false,
      clientInfoDialog: false,
      normValuesText: ""
    };
  },
  methods: {
    toggleNoteEdit: function() {
      if (this.editingNotes) this.$refs.notesTextArea.value = this.notes;
      this.editingNotes = !this.editingNotes;
    },
    updateClientInfo: async function() {
      const dataForm = this.$refs.dataForm;
      const clientData = {
        age: dataForm.leeftijd,
        gender: dataForm.geslacht,
        schooledTill: dataForm.leeftijd_naar_school,
        schooledFor: dataForm.jaren_naar_school
      };
      HowToTestApi.updateClientInfo("dims48", this.testId, clientData)
        .then(e => {
          this.setDialog(false);
          this.getDims48Result();
        })
        .catch(e => {
          console.log(e);
        });
    },
    toResultsPage: function() {
      this.$router.push({ path: "/results/dims48" });
    },
    loadNotes: function() {
      this.notes = this.computedNotes;
    },
    getDims48Result: async function() {
      return HowToTestApi.getTestResultsById("dims48", this.testId)
        .then(res => {
          if ("error" in res) {
            if (res.error.code === 500) {
              this.error = res.error;
            }
          } else {
            this.result = res;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loaded = true;
        });
    },
    downloadTestResults: async function(format) {
      this.downloading = true;
      HowToTestApi.downloadTestResults("dims48", format, this.testId)
        .then(blob => {
          download(blob, `${this.testId}-DiMS48-resultaten`);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    setDialog: function(bool) {
      this.clientInfoDialog = bool;
    },
    saveNotes: function() {
      const data = { notes: this.notes };
      HowToTestApi.updateClientInfo("dims48", this.testId, data)
        .then(e => {
          console.log(e);
          this.toggleNoteEdit();
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  computed: {
    testId: function() {
      return this.$route.params.id;
    },
    isInvalidId: function() {
      return this.error != null;
    },
    loadedSuccessfully: function() {
      return this.loaded && this.result != null;
    },
    computedNotes: function() {
      if ("notes" in this.result.clientInfo) {
        return this.result.clientInfo.notes;
      }
      return "";
    }
  },
  created() {
    this.getDims48Result()
      .then(e => {
        this.loadNotes();
      })
      .catch(err => {
        console.log(err);
      });
    HowToTestApi.normValuesExist("DiMS48").then(data => {
      if (data.exists) {
        this.normValuesText =
          "<a href='http://localhost:3000/api/test/DiMS48/normValues'> Normwaarden </a>";
      } else {
        this.normValuesText =
          "Er zijn op dit moment geen normwaarden beschikbaar";
      }
    });
  }
};
</script>

<style>
</style>
