function initialState(){
  return {
    'interferenceDuration': null,
    'phase1SecondsPerImage': null
  }
}

export default{
  namespaced: true,
  state: initialState,
  getters: {
    getInterferenceDuration: (state, getters, rootState) =>{
      return state.interferenceDuration;
    },
    getPhase1SecondsPerImage: (state, getters, rootState) =>{
      return state.phase1SecondsPerImage;
    }
  },
  actions:{
    initialize: ({commit, state, rootState}, config) =>{
      console.log(config[0].value, config[1].value);
      commit('updateInterferenceDurationLocal', config[0].value);
      commit('updatePhase1SecondsPerImageLocal', config[1].value);
    },
    updateInterferenceDuration: ({commit, state, rootState}, newValue) =>{
      //TODO: update mongodb
      commit('updateInterferenceDurationLocal', newValue);
    },
    updatePhase1SecondsPerImage: ({commit, state, rootState}, newValue)=>{
      // TODO: update mongodb
      commit('updatePhase1SecondsPerImageLocal', newValue);
    }
  },
  mutations:{
    updateInterferenceDurationLocal: (state, newValue)=>{
      state.interferenceDuration = newValue;
    },
    updatePhase1SecondsPerImageLocal: (state, newValue)=>{
      state.phase1SecondsPerImage = newValue;
      console.log(state.phase1SecondsPerImage);
    }
  }
}
