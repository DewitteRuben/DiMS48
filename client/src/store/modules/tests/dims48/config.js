import keycodes from 'keycodes';

function initialState(){
  return {
    'interferenceDuration': null,
    'phase1SecondsPerImage': null,
    'leftBtnKeyCode': null,
    'rightBtnKeyCode': null
  }
}

export default{
  namespaced: true,
  state: initialState,
  getters: {
    getInterferenceDuration: (state, getters, rootState) =>{
      return state.interferenceDuration;
    },
    getInterferenceDurationHumanReadable: (state, getters, rootState)=>{
      let minutes = Math.floor(state.interferenceDuration / 60);
      let seconds = state.interferenceDuration % 60;
      let humanReadable = seconds > 0 ? `${minutes} minuten ${seconds} seconden` : `${minutes} minuten`;
      return humanReadable;
    },
    getPhase1SecondsPerImage: (state, getters, rootState) =>{
      return state.phase1SecondsPerImage;
    },
    getLeftBtnKeyCode: (state, getters, rootState) =>{
      return state.leftBtnKeyCode
    },
    getLeftBtnKey: (state, getters, rootState)=>{
      return keycodes(parseInt(state.leftBtnKeyCode)).replace("left", "Linker pijl");
    },
    getRightBtnKeyCode: (state, getters, rootState) =>{
      return state.rightBtnKeyCode
    },
    getRightBtnKey: (state, getters, rootState)=>{
      return keycodes(parseInt(state.rightBtnKeyCode)).replace("right", "Rechter pijl");
    }
  },
  actions:{
    initialize: ({commit, state, rootState}, config) =>{
      commit('updateInterferenceDurationLocal', config[0].value);
      commit('updatePhase1SecondsPerImageLocal', config[1].value);
      commit('updateLeftBtnKeyCodeLocal', config[2].value);
      commit('updateRightBtnKeyCodeLocal', config[3].value);
    },
    updateConfigValues: ({commit, state, rootState}, newConfig) =>{
      commit('updateInterferenceDurationLocal', newConfig["interferenceDuration"]);
      commit('updatePhase1SecondsPerImageLocal', newConfig["phase1SecondsPerImage"]);
      commit('updateLeftBtnKeyCodeLocal', newConfig["leftBtnKeyCode"]);
      commit('updateRightBtnKeyCodeLocal', newConfig["rightBtnKeyCode"]);
    }
  },
  mutations:{
    updateInterferenceDurationLocal: (state, newValue)=>{
      state.interferenceDuration = newValue;
    },
    updatePhase1SecondsPerImageLocal: (state, newValue)=>{
      state.phase1SecondsPerImage = newValue;
    },
    updateLeftBtnKeyCodeLocal: (state, newValue)=>{
      state.leftBtnKeyCode = newValue;
    },
    updateRightBtnKeyCodeLocal: (state, newValue)=>{
      state.rightBtnKeyCode = newValue;
    }
  }
}
