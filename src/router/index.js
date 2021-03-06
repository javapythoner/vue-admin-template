import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/doctor',
    component: Layout,
    meta: { roles: ['doctor'] },
    children: [
      {
        path: 'index',
        name: 'Doctor',
        component: () => import('@/views/doctor/index'),
        meta: { title: 'Doctor', icon: 'user', role: ['doctor'] }
      }
    ]
  },
  {
    path: '/patient',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Patient',
        component: () => import('@/views/patient/index'),
        meta: {
          title: 'Patient',
          icon: 'tree',
          roles: ['editor']
        }
      }
    ]
  },
  {
    path: '/prescription',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Prescription',
        component: () => import('@/views/prescription/index'),
        meta: { title: 'Prescription', icon: 'form' }
      }
    ]
  },
  {
    path: '/check',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Check',
        component: () => import('@/views/check/index'),
        meta: { title: 'Check', icon: 'table' }
      }
    ]
  },
  {
    path: '/charge',
    component: Layout,
    name: 'Charge',
    meta: { title: 'Charge', icon: 'nested' },
    children: [
      {
        path: 'settle',
        name: 'Settle',
        component: () => import('@/views/charge/settle'),
        meta: { title: 'Settle', icon: 'nested' }
      },
      {
        path: 'card',
        name: 'Card',
        component: () => import('@/views/charge/card'),
        meta: { title: 'Card', icon: 'nested' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin', 'sb'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
