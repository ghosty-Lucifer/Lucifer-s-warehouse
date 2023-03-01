import { RouteRecordRaw } from 'vue-router'
import Notfound from '@/views/notfound/index.vue'
import Navbar from '@/components/navbar/index.vue'
import Tabbar from '@/components/tabbar/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    components: { // 命名视图使用的配置，指明在对应名称的视图位置渲染指定组件
      default: () => import('@/views/home/index.vue'),
      footer: Tabbar,
    },
    meta: { // 元信息，可自定义与当前路由在开发阶段要用到的相关自定义数据
      title: '首页',
      icon: 'wap-home-o',
      inTabbar: true, // 表示当前路由是 tabbar 页面的路由
    },
  },
  {
    path: '/category',
    components: {
      header: Navbar,
      default: () => import('@/views/category/index.vue'),
      footer: Tabbar,
    },
    children: [ // 嵌套路由配置
      {
        path: 'sub/:id', // 完整路径: /category/sub/1
        name: 'sub', // 命名路由
        component: () => import('@/views/category/SubCategory.vue'),
      },
    ],
    meta: {
      title: '分类',
      icon: 'cluster-o',
      inTabbar: true,
    },
  },
  {
    path: '/cart',
    components: {
      header: Navbar,
      default: () => import('@/views/cart/index.vue'),
      footer: Tabbar,
    },
    meta: {
      title: '购物车',
      icon: 'cart-o',
      inTabbar: true,
      hasBadge: true,
    },
  },
  {
    path: '/mine',    
    components: {
      header: Navbar,
      default: () => import('@/views/mine/index.vue'),
      footer: Tabbar,
    },
    meta: {
      title: '个人中心',
      icon: 'user-o',
      inTabbar: true,
      permission: true, // 需要用户登录权限
    },
  },
  {
    path: '/detail',
    components: {
      default: () => import('@/views/detail/index.vue'),
    },
    meta: {
      title: '我的地址',
    },
  },
  {
    path: '/confirm',
    components: {
      header: Navbar,
      default: () => import('@/views/confirm/index.vue'),
    },
    meta: {
      title: '确认订单',
      permission: true, // 需要用户登录权限
    },
  },
  {
    path: '/login',
    components: {
      header: Navbar,
      default: () => import('@/views/login/index.vue'),
    },
    meta: {
      title: '用户登录',
    },
  },
  {
    path: '/search',
    components: {
      header: Navbar,
      default: () => import('@/views/search/index.vue'),
    },
    meta: {
      title: '搜索',
    },
  },
  {
    path: '/address',
    components: {
      header: Navbar,
      default: () => import('@/views/address/index.vue'),
    },
    meta: {
      title: '我的配送地址',
    },
  },
  {
    path: '/couponList',
    components: {
      header: Navbar,
      default: () => import('@/views/couponlist/index.vue'),
    },
    meta: {
      title: '我的优惠券',
    },
  },
  // vue3.x 与 vue-rouer4.x 配合使用时的配置
  {
    path: '/:pathMatch(.*)*',
    components: {
      header: Navbar,
      default: Notfound,
    },
    meta: {
      title: '资源未找到',
    },
  }
  // // vue2.x 与 vue-router3.x 配合使用时的配置
  // {
  //   path: '*',
  //   component: Notfound,
  // },
]

export default routes
