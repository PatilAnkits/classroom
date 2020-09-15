import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import './firebase.init'
import LottieAnimation from 'lottie-vuejs'
import VueResource from 'vue-resource'
import { rtdbPlugin } from 'vuefire'
import router from './router'
import store from './store'
import './auth'


Vue.use(VueResource);
Vue.use(rtdbPlugin);
Vue.use(LottieAnimation);
Vue.config.productionTip = false
Vue.http.options.root = 'https://webrtctest-16063.firebaseio.com/'
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
