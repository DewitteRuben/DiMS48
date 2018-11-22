function initialState(){
  return {
    user: null
  }
}

export default{
  namespaced: true,
  state: initialState,
  getters: {
    isLoggedIn(state, getters, rootState){
      return state.user != null;
    },
    getUser(state,getters, rootState){
      return state.user || JSON.parse(localStorage.getItem("user"));
    }
  },
  actions: {
    loginUser: ({commit, state, rootState}, user) =>{
      // commit('suicide');
      commit("setUser", user);
    }
  },
  mutations:{
    logoutUser: state => {
      state.user = null;
      localStorage.setItem("user", null);
    },
    setUser: (state, user) => {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    }
  }
}
