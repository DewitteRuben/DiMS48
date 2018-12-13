import Vue from "vue";
import Vuex from "vuex";
import dims48instructions from "./modules/tests/dims48/instructions";
import dims48questions from "./modules/tests/dims48/questions";
import dims48resultData from "./modules/tests/dims48/testResultData";
import dims48manager from "./modules/tests/dims48/manager";
import dims48Config from "./modules/tests/dims48/config";
import dims48clientData from "./modules/clientData/clientData";
import user from "./modules/user";
import results from "./modules/results/dims48/results";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dimsInstructions: dims48instructions,
    dimsQuestions: dims48questions,
    dimsTestData: dims48resultData,
    dimsManager: dims48manager,
    dimsClientData: dims48clientData,
    user: user,
    dimsResults: results,
    dims48Config: dims48Config
  }
});
