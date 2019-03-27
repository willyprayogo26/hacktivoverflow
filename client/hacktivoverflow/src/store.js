import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

const baseUrl = 'http://localhost:3000'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isRegis: false,
    isLogin: false,
    questions: []
  },
  mutations: {
    getRegisForm: function (state) {
      state.isRegis = true
    },
    getLoginForm: function (state) {
      state.isRegis = false
      state.isLogin = false
      localStorage.clear()
    },
    getContent: function (state) {
      state.isRegis = null
      state.isLogin = true
    },
    getAllQuestion: function (state) {
      state.isRegis = null

      Axios
        .get(`${baseUrl}/questions`)
        .then(({ data }) => {
          state.questions = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetail: function (state, info) {
      let questionId = info[0]
      let index = info[1]

      Axios
        .get(`${baseUrl}/questions/${questionId}`)
        .then(({ data }) => {

        })
    }
  },
  actions: {

  },
});
