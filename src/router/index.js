import Vue from 'vue'
import VueRouter from 'vue-router'
import DevDoc from '@/views/DevDocView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dev_doc'
  },
  {
    path: '/dev_doc',
    component: DevDoc,
  },
  {
    path: '/dev_doc/:docName',
    name: 'DevDoc',
    component: DevDoc,
  },
  {
    path: '/console',
    name: 'Console',
    component: () => import('../views/ConsoleView.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
