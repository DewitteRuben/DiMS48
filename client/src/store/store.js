import Vue from 'vue';
import Vuex from 'vuex';
import dims48instructions from "./modules/tests/dims48/instructions";
import dims48questions from "./modules/tests/dims48/questions";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dimsInstructions: dims48instructions,
    dimsQuestions: dims48questions
  }
});
