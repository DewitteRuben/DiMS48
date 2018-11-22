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
    updateConfigValues: ({commit, state, rootState}, newConfig) =>{
      commit('updateInterferenceDurationLocal', newConfig["interferenceDuration"]);
      commit('updatePhase1SecondsPerImageLocal', newConfig["phase1SecondsPerImage"]);
    }
  },
  mutations:{
    updateInterferenceDurationLocal: (state, newValue)=>{
      state.interferenceDuration = newValue;
    },
    updatePhase1SecondsPerImageLocal: (state, newValue)=>{
      state.phase1SecondsPerImage = newValue;
    }
  }
}
