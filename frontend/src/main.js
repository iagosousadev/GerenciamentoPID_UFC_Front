import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css' // Tema dark


Vue.use(VueMaterial)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
