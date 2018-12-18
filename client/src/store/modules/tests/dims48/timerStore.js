const Timer = require("tiny-timer");

function initialState() {
  return {
    timer: null,
    started: false
  };
}

export default {
  namespaced: true,
  state: initialState,
  getters: {},
  mutations: {
    setup: function(state, cb) {
      state.timer = new Timer();
      state.timer.on("done", cb);
    },
    start: function(state) {
      state.timer.start(Number.MAX_SAFE_INTEGER);
      state.started = true;
    },
    stop: function(state) {
      state.timer.stop();
      state.timer = null;
      state.started = false;
    }
  },
  actions: {}
};
