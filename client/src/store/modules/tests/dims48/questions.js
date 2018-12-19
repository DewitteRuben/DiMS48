function initialState() {
  return {
    images: null,
    options: null,
    currentImageIndex: 0
  };
}

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getCurrentImage: (state, getters, rootState) => {
      const double = rootState.dimsManager.double;
      const singleImages = state.images.filter(e => e._id.includes("A"));

      const imageNumber = state.currentImageIndex + 1;
      const doubleImages = state.images.filter(
        e => e._id === "A" + imageNumber || e._id === "B" + imageNumber
      );

      return double ? doubleImages : singleImages;
    },
    getCurrentOptions: (state, getters, rootState) => {
      const currentOptions = state.options.filter(
        e => e._id === rootState.dimsManager.currentPhase
      );
      let options = null;
      if (currentOptions.length > 0) options = currentOptions[0].options;
      return options;
    },
    isLoaded: state => {
      return state.images !== null;
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
      state.currentImageIndex = 0;
    },
    updateImages: (state, images) => {
      state.images = images;
    },
    updateOptions: (state, options) => {
      state.options = options;
    }
  },
  actions: {
    getNextImage: ({ commit, state, rootState, dispatch }, newValue) => {
      const double = rootState.dimsManager.double;
      const images = state.images.filter(e => e._id.includes("A"));

      if (state.currentImageIndex + 1 < images.length && images.length > 0) {
        state.currentImageIndex++;
      } else {
        commit("resetCount");
        dispatch("dimsManager/endPhase", null, { root: true });
      }
    }
  }
};
