var Timer = require("tiny-timer").default;

function initialState() {
  return {
    timer: null,
    setup: false,
    started: false,
    callback: null,
    infinite: false,
    max: 36000,
    target: 3
  };
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getCurrentMs: function(state) {
      return state.timer !== null ? state.target * 1000 - state.timer.time : 0;
    }
  },
  mutations: {
    setup: function(state, cb) {
      state.timer = new Timer();
      state.timer.on("done", cb);
      state.callback = cb;
      state.setup = true;
    },
    stop: function(state) {
      if (state.setup) {
        state.timer.stop();
        state.started = false;
      }
    },
    clear: function(state) {
      if (state.setup) state.timer.stop();
      state.timer = null;
      state.started = false;
      state.setup = false;
    }
  },
  actions: {
    reset: ({ commit, dispatch, state, rootState }) => {
      if (state.setup) {
        commit("clear");
        commit("setup", state.callback);
        dispatch("start");
      }
    },
    start: ({ commit, state, rootState, rootGetters }) => {
      const secondsPerImage = parseInt(
        rootGetters["dims48Config/getPhase1SecondsPerImage"]
      );

      let target = secondsPerImage || state.target;
      const currentPhase = rootGetters["dimsManager/getCurrentPhase"];
      const limited = currentPhase === "phase1";
      if (!limited) target = state.max;

      state.target = target;

      const targetInMilliseconds = target * 1000;

      state.timer.start(targetInMilliseconds);
      state.started = true;
    }
  }
};
