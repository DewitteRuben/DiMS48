<template>
  <v-container v-show="dataLoaded">
    <h1>Configuratie {{$route.params.name}} Test</h1>
    <v-layout column>
      <v-layout align-center justify-center fill-height>
        <v-flex xs12 sm8 lg6>
          <v-form class="mt-5">
            <Dims48AdminPanel
              v-if="$route.params.name == 'dims48'"
              @loaded="dataLoaded=true"
              @updateParentWithChildData="updateValues"
            />
            <v-btn @click="submitValues">Configuratie Updaten</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout mt-5 column>
        <h2 class="mb-5">Normwaarden uploaden</h2>
      </v-layout>
      <v-layout justify-center align-center fill-height>
        <v-flex xs12 md8 lg6>
          <FileUploadForm v-on:uploadedPdf="() => normValues = true" v-if="!normValues"/>
          <div v-else>
            <h3 v-if="downloading">Downloaden...</h3>
            <v-btn color="error" @click="deleteNormValues">Verwijder huidige normwaarden</v-btn>
            <v-btn color="success" @click="downloadNormValues">Download hudige normwaarden</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-layout justify-center align-center fill-height v-show="!dataLoaded">
      <v-progress-circular :size="65" color="primary" indeterminate></v-progress-circular>
    </v-layout>
    <ConfirmationDialog
      v-on:confirmModal="() => dialog = false"
      v-on:declineModal="() => dialog = false"
      :title="dialogTitle"
      :model="dialog"
      :headline="dialogHeadline"
      :message="dialogMessage"
      :confirmButtonText="dialogConfirmButtonText"
      :declineButtonText="dialogDeclineButtonText"
      :decline="dialogDecline"
    />
  </v-container>
</template>

<script>
import Dims48AdminPanel from "@/components/Dims48AdminPanel";
import * as howtotestapi from "@/services/api/howtotestapi";
import FileUploadForm from "@/components/FileUploadForm.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import * as download from "downloadjs";

export default {
  components: {
    Dims48AdminPanel,
    FileUploadForm,
    ConfirmationDialog
  },
  data: function() {
    return {
      dataLoaded: false,
      currentConfig: false,
      dialog: false,
      dialogTitle: "Dims48",
      dialogHeadline: "Dims48",
      dialogMessage: "",
      dialogConfirmButtonText: "Ok",
      dialogDeclineButtonText: "",
      dialogDecline: false,
      normValues: false,
      downloading: false
    };
  },
  methods: {
    submitValues: function() {
      let self = this;
      if (this.currentConfig) {
        this.$store.dispatch(
          `${self.$route.params.name}Config/updateConfigValues`,
          self.currentConfig
        );
        howtotestapi
          .updateConfig(self.$route.params.name, {
            newConfig: self.currentConfig
          })
          .then(data => {
            if ("error" in data) {
              this.displayDialog(
                "Er is liep iets fout bij het updaten van de configuratie."
              );
            } else {
              this.displayDialog("De configuratie is successvol geüpdatet!");
            }
          });
      }
    },
    downloadNormValues: async function() {
      this.downloading = true;
      howtotestapi
        .downloadNormValues()
        .then(blob => {
          download(blob, `DiMS48-normwaarden`);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    deleteNormValues: async function() {
      howtotestapi
        .deleteNormPdf()
        .then(res => {
          this.checkNormValues();
          this.displayDialog(res.msg);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    updateValues: function(newConfig) {
      this.currentConfig = newConfig;
    },
    displayDialog: function(message) {
      this.dialogMessage = message;
      this.dialog = true;
    },
    checkNormValues: function() {
      howtotestapi.normValuesExist("DiMS48").then(data => {
        this.normValues = data.exists;
      });
    }
  },
  mounted() {
    this.$root.$on("messageDialog", message => {
      this.displayDialog(message);
    });
    this.checkNormValues();
  }
};
</script>
