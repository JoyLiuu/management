import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import './network/mockServeData/mockHome'
import './network/mock'
// import { Message,MessageBox } from 'element-ui'
// Vue.prototype.$message = Message
// Vue.prototype.$messagebox = MessageBox

// import myCharts from './echarts'
// test：全局引入axios并且添加到vue原型链中
import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(ElementUI)
// Vue.config.productionTip = true它会显示你生产模式的消息。所以，在开发环境下，保持默认设置false即可。
Vue.config.productionTip = false

// 导航守卫
router.beforeEach((to,from,next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login') {
    next({name: 'home'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  },
}).$mount('#app')


