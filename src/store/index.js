import Vue from 'vue'
import Vuex from 'vuex'
import account from "./modules/Account";
import setting from "./modules/Setting";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      userGender: localStorage.getItem('userGender'),
      userEmail: localStorage.getItem('userEmail'),
      userRoleName: localStorage.getItem('userRoleName'),
    },
    videoObject: "",
    videoCanvasObject: "",
    videoCanvasRunTime: {
      time: 23,
      fps: 8
    }
  },
  mutations: {
    setUser(state, obj) {
      state.user.userId = localStorage.setItem('userId', obj.userId);
      state.user.userName = localStorage.setItem('userName', obj.userName);
      state.user.userGender = localStorage.setItem('userGender', obj.userGender);
      state.user.userEmail = localStorage.setItem('userEmail', obj.userEmail);
      state.user.userRoleName = localStorage.setItem('userRoleName', obj.userRoleName)
      state.user = {...obj};
    },
    setVideoObject(state, stream) {
      state.videoObject = stream;
    },
    setVideoCanvasObject(state, stream) {
      state.videoCanvasObject = stream;
    },
    setVideoCanvasRunTime(state, data) {
      state.videoCanvasRunTime = data;
    }
  },
  actions: {},
  modules: {
    account,
    setting
  }
})
