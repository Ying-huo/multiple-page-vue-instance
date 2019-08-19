/*
 * @Description: 路由，复杂的多个页面可用这个来写
 * @Author: yingying.fan
 * @Date: 2019-07-25 14:55:10
 * @Last Modified by: yingying.fan
 * @Last Modified time: 2019-07-25 14:58:39
 */
import Vue from 'vue'
import Router from 'vue-router'
// import { getUrlParamByKey } from 'js-utils-depot'

Vue.use(Router)

// 要求页面顺序按照交易类型排列
let pageList = ['Home', 'My']
// let pageListLength = pageList.length
let routes = []

pageList.forEach((pageName, i) => {
  const myComponent = () =>
    import(/* webpackChunkName: "first/[request]" */ `../page/${pageName}`)
  const pagePath = i > 0 ? '/' + pageName : '/'
  let route = {
    path: pagePath,
    name: pageName,
    component: myComponent
  }
  routes.push(route)
})

const router = new Router({
  routes: routes
})

// 全局路由守护
// router.beforeEach((to, from, next) => {
//   // 根据url上带入的交易类型,指向不同的路由
//   let path
//   let value = getUrlParamByKey('paramName')
//   if (value) {
//     path = routes[value - 1].path
//   }
//   if (path !== to.path) {
//     router.replace({ path: path })
//   }
//   next()
// })

export default router
