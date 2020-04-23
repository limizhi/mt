import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入mint-UI组件库
import MintUI from "mint-ui";
//单独引入mint-ui组件库中的样式组件
import "mint-ui/lib/style.css"
//注册mint-ui对象
Vue.use(MintUI);
//引入axios
import{
  axios_instance
} from "./util/axios"
Vue.prototype.$axios=axios_instance;
import global_config from "./util/global";
Vue.prototype.$global=global_config;
import qs from "qs";
Vue.prototype.$qs=qs;

//是否未线上环境
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
