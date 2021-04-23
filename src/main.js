import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import "./assets/board.css";
import "./assets/header.css";
import "./assets/home.css";
import "./assets/login.css";
import "./assets/style.css";

Vue.config.productionTip = false
Vue.use(VueRouter)

// axios.defaults.baseURL = "http://localhost:8000/api/v1";
window.axios=axios;
window.Event = new Vue

Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')