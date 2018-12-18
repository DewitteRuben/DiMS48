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
      state.timer.on("tick", ms => console.log("tick", ms));
    },
    start: function(state) {
      state.timer.start(2000);
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
