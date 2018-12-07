export default {
  namespaced: true,
  state: {
    clientInfo: {
      age: null,
      gender: null,
      schooledTill: null,
      schooledFor: null
    }
  },
  getters: {
    getClientData: function(state) {
      return Object.assign({}, state);
    }
  },
  mutations: {
    setClientData: function(state, data) {
      Object.assign(state.clientInfo, data);
    },
    setNotes: function(state, notes) {
      state.notes = notes;
    }
  },
  actions: {}
};
