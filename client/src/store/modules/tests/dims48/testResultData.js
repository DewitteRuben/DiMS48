export default {
  namespaced: true,
  state: {
    dims48a: {
      phase1: [],
      phase2: []
    },
    dims48b: {
      phase3: []
    }
  },
  getters: {},
  mutations: {
    setAnswer(state, payload) {
      state[payload.test][payload.phase].push(payload.answer);
    }
  },
  actions: {}
};
