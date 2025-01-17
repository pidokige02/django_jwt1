import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

axios.defaults.headers.common["Content-Type"] = "application/json";

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
      console.log("Authorization jwt", `Bearer ${userData.token}`);
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
  },
  actions: {
    register({ commit }, credentials) {
      return axios
        .post("//localhost:8000/api/v1/users/", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    login({ commit }, credentials) {
      return axios
        .post("//localhost:8000/api/token/", credentials)
        .then(({ data }) => {
          data.loginType = "token"; // 로그인 유형 추가
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
  modules: {},
});
