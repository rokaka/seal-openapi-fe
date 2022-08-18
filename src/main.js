import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DemoBlock from 'vue-dotmd-loader/dist/index.js'
import { Image, Message, Loading } from '@wenjuan/ui'
import '@wenjuan/ui/lib/theme-chalk/index.css';
import 'github-markdown-css/github-markdown.css'
import "@/assets/style/index.css"

Vue.config.productionTip = false
Vue.prototype.$message = Message

Vue.component('vueMdWrapper', DemoBlock)
Vue.component('wj-image', Image)

Vue.use(Loading.directive)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
