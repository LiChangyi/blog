import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

const router =  new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/admin/article'
    },
    {
      path: '/admin',
      redirect: '/admin/article'
    },{
      path: '/',
      name: 'admin',
      component: resolve => require(['@/views/Admin'],resolve),
      children: [{
        path: '/admin/article',
        name: 'article',
        meta:{
          requiresAuth:true
        },
        component: resolve => require(['@/views/Article'],resolve)
      },{
        path: '/admin/tags',
        name: 'tags',
        meta:{
          requiresAuth:true
        },
        component: resolve => require(['@/views/Tags'],resolve)
      },{
        path: '/admin/setting',
        name: 'setting',
        meta:{
          requiresAuth:true
        },
        component: resolve => require(['@/views/Setting'],resolve)
      },{
        path: '/admin/works',
        name: 'works',
        meta:{
          requiresAuth:true
        },
        component: resolve => require(['@/views/Works'],resolve)
      },{
        path: '/admin/addarticle',
        name: 'addarticle',
        meta:{
          requiresAuth:true
        },
        component: resolve => require(['@/views/AddArticle'], resolve)
      },{
        path: '/admin/addarticle/:id',
        name: 'alterarticle',
        meta:{
          requiresAuth:true
        },
        component: resolve => require(['@/views/AddArticle'], resolve)
      },{
        path: '/admin/uploadimg',
        name: 'uploadimg',
        meta:{
          requiresAuth:true
        },
        component: resolve => require(['@/views/UploadImg'], resolve)
      }]
    },{
      path: '/admin/login',
      name: 'login',
      component: resolve => require(['@/views/Login'], resolve)
    }
  ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.adminInfo.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
    if(token){
      next();
    }else{
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
      } 
  }else{
    next();
  }
});

export default router;