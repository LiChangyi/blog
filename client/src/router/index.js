import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path : '/home',
    redirect : '/'
  },{
    name: 'home',
    path: '/',
    component: resolve => require(['@/views/Home'],resolve)
  },{
    name: 'production',
    path: '/production',
    component: resolve => require(['@/views/Production'],resolve)
  },{
    name: 'archives',
    path: '/archives',
    component: resolve => require(['@/views/Archives'],resolve)
  },{
    name: 'about',
    path: '/about',
    component: resolve => require(['@/views/About'],resolve)
  },{
    name: 'article',
    path: '/article/:id',
    component: resolve => require(['@/views/Article'], resolve)
  },{
    name: '404',
    path: '*',
    component: resolve => require(['@/views/Page_404'], resolve)
  }]
})
