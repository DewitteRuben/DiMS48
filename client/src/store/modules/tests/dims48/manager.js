import * as howToTestApi from "@/services/api/howtotestapi";

function initialState() {
  return {
    version: "dims48a",
    currentPhase: "phase1",
    double: false,
    interference: false,
    started: false,
    finished: false
  };
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    hasStarted: state => {
      return state.started;
    },
    isLoaded: (state, getters, rootState, rootGetters) => {
      return (
        rootGetters["dimsQuestions/isLoaded"] &&
        rootGetters["dimsInstructions/isLoaded"]
      );
    },
    hasFinished: state => {
      return state.finished;
    },
    phaseNumber: state => {
      return state.version === "dims48a" ? 1 : 2;
    }
  },
  mutations: {
    resetState: state => {
      const s = initialState();
      Object.keys(s).forEach(key => {
        state[key] = s[key];
      });
    },
    initDims48a: state => {
      state.version = "dims48a";
      state.currentPhase = "phase1";
    },
    initDims48b: state => {
      state.version = "dims48b";
      state.currentPhase = "phase3";
    }
  },
  actions: {
    startPhase: ({ state, commit, dispatch, rootState }) => {
      if (state.version === "dims48b") {
        state.double = true;
      }
      switch (state.currentPhase) {
        case "end":
          state.finished = true;
          break;
        case "interference":
          state.interference = true;
          break;
        default:
          state.started = true;
          if (state.version === "dims48a" && state.currentPhase === "phase1") {
            dispatch("timerStore/start", null, { root: true });
          }
          break;
      }
    },
    endPhase: ({ state, commit, dispatch, rootState }) => {
      switch (state.currentPhase) {
        case "phase1":
          if (state.version === "dims48a") {
            state.currentPhase = "interference";
          }
          if (state.version === "dims48b") {
            state.currentPhase = "end";
          }
          break;
        case "interference":
          state.currentPhase = "phase2";
          state.interference = false;
          state.double = true;
          break;
        case "phase2":
        case "phase3":
          state.currentPhase = "end";
          break;
      }
      if (rootState.timerStore.setup) {
        commit("timerStore/clear", null, { root: true });
      }
      state.started = false;
    },
    initDims48a: ({ commit, dispatch }) => {
      commit("initDims48a");
      dispatch("initDims48TestData");
    },
    initDims48b: ({ commit, dispatch }) => {
      commit("initDims48b");
      dispatch("initDims48TestData");
    },
    initDims48TestData: ({ commit, dispatch }) => {
      howToTestApi
        .getDims48()
        .then(res => {
          commit("dimsQuestions/updateImages", res.images, { root: true });
          res.images.forEach(image => {
            let imageObject = new Image();
            imageObject.src = "http://localhost:3000" + image.imgUrl;
          });
          commit("dimsInstructions/updateInstructions", res.instructions, {
            root: true
          });
          commit("dimsQuestions/updateOptions", res.options, { root: true });
          dispatch("dims48Config/initialize", res.config[0].config, {
            root: true
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    initializeTest: ({ commit }) => {},
    resetState: ({ commit }) => {
      commit("resetState");
      commit("dimsTestData/resetState", null, { root: true });
      commit("dimsQuestions/resetState", null, { root: true });
      commit("dimsInstructions/resetState", null, { root: true });
    }
  }
};
