import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import axios from 'axios'
import echarts from 'echarts';
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false;
Vue.use(iView);

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
