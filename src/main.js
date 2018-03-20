// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueRouter from 'vue-router'
// import store from './vuex/store.js'
// import Vuex from './vuex'
import axios from 'axios'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import { Message, ElementUI } from 'element-ui'

Vue.use(ElementUI)
// Vue.use(VueRouter)
// Vue.use(Vuex)

// Vue.use(axios)
// Vue.prototype.$http = axios

Vue.config.productionTip = false
console.log('test')
// http request 拦截器
axios.interceptors.request.use(
  config => {
    var token = sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      token = sessionStorage.getItem('token') + ':'
      config.headers.Authorization = `Basic ${Buffer.from(token).toString('base64')}`
    }
    return config
  },
  error => {
    if (error) {
      Message({
        message: '登录状态信息过期,请重新登录',
        type: 'error'
      })
      router.push({path: '/login'})
    }
  }
)

// http response 拦截器

/* axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem('token')
          router.push({
            path: '/login'
          })
          Message({
            message: '请检查登录',
            type: 'error'
          })
      }
    }
    // return Promise.reject(error);
  }) */

router.beforeEach((to, from, next) => {
  // NProgress.start();
  if (to.path === '/login') {
    sessionStorage.removeItem('token')
  }
  let token = sessionStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
