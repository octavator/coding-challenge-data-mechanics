import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/app/:appName',
      name: 'AppView',
      props: true,
      component: () => import('@/components/AppView.vue')
    },
    {
      path: '*',
      name: 'Dashboard',
      component: () => import('@/components/Dashboard.vue')
    }
  ]
})
