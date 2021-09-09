import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'

Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: process.env.VUE_APP_ROOT_API
    })
    Vue.prototype.$api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')

        if (token) {
          config.headers.Authorization = 'Token ' + token
        }

        return config
      },

      (error) => {
        return Promise.reject(error)
      }
    )
  }
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
