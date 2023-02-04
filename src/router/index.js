import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import LayoutCustomer from '@/customer_layout'

// import shopRouter from './modules/shop'
// import categoryRouter from './modules/category'
// import trademarkRouter from './modules/trademark'
// import accountRouter from './modules/account'
// import revenueRouter from './modules/revenue'
// import tagRouter from './modules/tag'
// import promotionsRouter from './modules/promotions'
// import deliveryRouter from './modules/delivery'
// import productRouter from './modules/product'
// import uploaderrorRouter from './modules/uploaderror'
// import saleRouter from './modules/sale'
// import categoriesShowRouter from '@/router/modules/Categories_show'
// // import discountRouter from '@/router/modules/discount'
// import documentRouter from './modules/document'
// import pointRouter from '@/router/modules/point'
// import transportRouter from '@/router/modules/transport'
// import workRouter from '@/router/modules/work'
// import jobDailyRouter from '@/router/modules/job_daily'
// import deliveryAdminRouter from './modules/admin_delivery'
// import PostNotiRouter from '@/router/modules/post-noti'
// import voucherRouter from '@/router/modules/voucher'
// import returnPolicyRouter from './modules/return-policy'
// import customerRouter from './modules/customer'
// import reviewRouter from './modules/review'
// import tourRouter from '@/router/modules/tour'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/forgetpass',
    component: () => import('@/views/forgetpass/index'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: LayoutCustomer,
    hidden: true,
    children: [
      {
        path: '/',
        component: () => import('@/views/customer-view/home/index')
      }
    ]
  },
  {
    path: '/about',
    component: LayoutCustomer,
    hidden: true,
    children: [
      {
        path: '/about',
        component: () => import('@/views/customer-view/about/index')
      }
    ]
  },
  {
    path: '/contact',
    component: LayoutCustomer,
    hidden: true,
    children: [
      {
        path: '/contact',
        component: () => import('@/views/customer-view/contact/index')
      }
    ]
  },
  {
    path: '/list-tour',
    component: LayoutCustomer,
    hidden: true,
    children: [
      {
        path: '/list-tour',
        component: () => import('@/views/list_tour/list')
      }
    ]
  },
  {
    path: '/detail',
    component: LayoutCustomer,
    hidden: true,
    children: [
      {
        path: '/detail',
        component: () => import('@/views/detail/list')
      }
    ]
  },
  {
    path: '/blog',
    component: LayoutCustomer,
    hidden: true,
    children: [
      {
        path: '/blog',
        component: () => import('@/views/blog/list')
      }
    ]
  },
  {
    path: '/blog-detail',
    component: LayoutCustomer,
    hidden: true,
    children: [
      {
        path: '/blog-detail',
        component: () => import('@/views/blog_detail/list')
      }
    ]
  },
  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // tourRouter,
  // shopRouter,
  // categoryRouter,
  // productRouter,
  // trademarkRouter,
  // accountRouter,
  // revenueRouter,
  // tagRouter,
  // promotionsRouter,
  // deliveryRouter,
  // uploaderrorRouter,
  // saleRouter,
  // // discountRouter,
  // documentRouter,
  // pointRouter,
  // categoriesShowRouter,
  // transportRouter,
  // workRouter,
  // jobDailyRouter,
  // deliveryAdminRouter,
  // PostNotiRouter,
  // voucherRouter,
  // returnPolicyRouter,
  // customerRouter,
  // reviewRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
