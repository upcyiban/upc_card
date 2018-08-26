import Vue from 'vue'
import Router from 'vue-router'
import Report from '@/components/Report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Report',
      component: Report
    }
  ]
})
