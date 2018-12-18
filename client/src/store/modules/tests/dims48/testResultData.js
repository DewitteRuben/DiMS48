function initialState() {
  return {
    dims48a: {
      phase1: [],
      phase2: []
    },
    dims48b: {
      phase3: []
    }
  };
}

export default {
  namespaced: true,
  state: initialState,
  getters: {},
  mutations: {
    setAnswer(state, payload) {
      state[payload.test][payload.phase].push(payload.answer);
    },
    resetState: state => {
      const s = initialState();
      Object.keys(s).forEach(key => {
        state[key] = s[key];
      });
    }
  },
  actions: {}
};
