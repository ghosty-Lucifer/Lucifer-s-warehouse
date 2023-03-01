import { defineStore } from 'pinia'
import { login, LoginInfo } from '@/api/user'

const useUserStore = defineStore('user', {
  state() {
    return {
      // token: sessionStorage.getItem('token'),
      token: null,
      userInfo: null,
    }
  },
  actions: {
    async loginAction(user: LoginInfo) {
      try {
        // 发送网络请求，登录
        const result = await login(user)
        // 登录成功后，将 token 数据保存到 state 中
        if (result.token) {
          this.token = result.token
          this.userInfo = result.userInfo
          // // 将用户 token 数据本地持久化
          // sessionStorage.setItem('token', result.token)
          return true
        }

        return false
      } catch (error) {
        console.log('登录异常:', error)
        return false
      }
    }
  },
  // 进行 state 数据持久化处理
  // persist: true,
  persist: {
    storage: sessionStorage,
    paths: ['token']
  }
})

export default useUserStore
