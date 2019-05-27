import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    userIsLoggedIn: false
  },
  mutations: {
    userIsLoggedIn(state, status) {
      state.userIsLoggedIn = status;
    }
  },
  actions: {
    userIsLoggedIn({ commit }, status) {
      commit("userIsLoggedIn", status);
    }
  }
});
