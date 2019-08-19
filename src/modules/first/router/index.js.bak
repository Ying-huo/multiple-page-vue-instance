import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 以下动态导入代码分割，routebill是指定页面的文件夹，MallConsumeBill是分割文件名称
const MyComponent = () =>
  import(/* webpackChunkName: "fitst/MyComponent" */ '../page/MyComponent.vue')

const router = new Router({
  routes: [
    {
      path: '/MyComponent',
      component: MyComponent,
      name: 'MyComponent'
    }
  ]
})

// 全局路由守护
// router.beforeEach((to, from, next) => {
//   next()
// })

export default router
