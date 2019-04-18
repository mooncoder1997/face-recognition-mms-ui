import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      userGender: localStorage.getItem('userGender'),
      userEmail: localStorage.getItem('userEmail'),
      userRoleName: localStorage.getItem('userRoleName'),
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
    }
  },
  actions: {}
})
