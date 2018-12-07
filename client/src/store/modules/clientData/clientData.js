export default {
  namespaced: true,
  state: {
    age: null,
    gender: null,
    schooledTill: null,
    schooledFor: null
  },
  getters: {
    getClientData: function(state) {
      return state;
    }
  },
  mutations: {
    setClientData: function(state, data) {
      Object.assign(state, data);
    }
  },
  actions: {}
};
