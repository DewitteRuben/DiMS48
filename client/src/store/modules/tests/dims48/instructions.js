function initialState() {
  return {
    instructions: null,
    currentInstruction: 0,
    buttonText: "Volgende"
  };
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getCurrentInstruction: (state, getters, rootState, rootGetters) => {
      const instructions = state.instructions.filter(
        e => e._id === rootState.dimsManager.currentPhase
      )[0].instructions;
      instructions[state.currentInstruction].message = instructions[
        state.currentInstruction
      ].message.replace(
        "<phase1SecondsPerImage>",
        rootGetters["dims48Config/getPhase1SecondsPerImage"]
      );
      instructions[state.currentInstruction].message = instructions[
        state.currentInstruction
      ].message.replace(
        "<leftBtnKey>",
        rootGetters["dims48Config/getLeftBtnKey"]
      );
      instructions[state.currentInstruction].message = instructions[
        state.currentInstruction
      ].message.replace(
        "<rightBtnKey>",
        rootGetters["dims48Config/getRightBtnKey"]
      );
      instructions[state.currentInstruction].message = instructions[
        state.currentInstruction
      ].message.replace(
        "<interferenceDuration>",
        rootGetters["dims48Config/getInterferenceDurationHumanReadable"]
      );

      return instructions[state.currentInstruction];
    },
    getButtonText(state, getters, rootState) {
      return state.buttonText;
    },
    isLoaded(state, getters, rootState) {
      return state.instructions != null;
    }
  },
  actions: {
    getNextInstruction: ({ commit, state, rootState }, newValue) => {
      const instructions = state.instructions.filter(
        e => e._id === rootState.dimsManager.currentPhase
      )[0].instructions;
      if (state.currentInstruction + 1 < instructions.length) {
        state.currentInstruction++;
      } else {
        commit("resetCount");
        commit("dimsManager/startPhase", null, { root: true });
      }
    }
  },
  mutations: {
    resetState: state => {
      const s = initialState();
      Object.keys(s).forEach(key => {
        state[key] = s[key];
      });
    },
    resetCount: state => {
      state.currentInstruction = 0;
    },
    updateInstructions: (state, instructions) => {
      state.instructions = instructions;
    }
  }
};
