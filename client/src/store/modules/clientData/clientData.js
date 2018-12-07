export default {
  namespaced: true,
  state: {
    age: null,
    gender: null,
    schooledTill: null,
    schooledFor: null
  },
  getters: {},
  mutations: {
    setClientData(state, data) {
      state = { ...data };
    }
  },
  actions: {}
};
