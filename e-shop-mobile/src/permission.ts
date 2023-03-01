/**
 * 进行页面访问权限拦截
 */
import router from '@/router'
import useUserStore from './store/modules/user'

// 保存用户的 store
let store: any = undefined

// 调用全局前置守卫钩子实现拦截
router.beforeEach((to, from) => {
  if (!store) {
    store = useUserStore()
  }
  // 判断即将进入的目标路由元信息中是否有权限信息
  if (to.meta.permission) {
    // 有需要登录验证的配置，则判断是否用户已登录
    const token = store.token
    if (!token) {
      // 不存在用户登录的 token 数据，则需要跳转到登录页面
      return {
        path: '/login',
        query: {
          redirect: to.path,
        },
      }
    }
  }
})
