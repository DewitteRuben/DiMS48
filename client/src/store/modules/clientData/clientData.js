export default {
  namespaced: true,
  state: {
    age: null,
    gender: null,
    schooledTill: null,
    schooledFor: null,
    notes: "test"
  },
  getters: {
    getClientData: function(state) {
      return Object.assign({}, state);
    }
  },
  mutations: {
    setClientData: function(state, data) {
      state.age = data.age;
      state.gender = data.gender;
      state.schooledTill = data.schooledTill;
      state.schooledFor = data.schooledFor;
    },
    setNotes: function(state, notes) {
      state.notes = notes;
    }
  },
  actions: {}
};
