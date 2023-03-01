import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast, Notify } from 'vant'
import useUserStore from '@/store/modules/user'

let store: any = undefined

// 自定义后端接口返回响应的数据格式
interface ApiResponse<T = any> {
  code: number
  data: T
  message?: string
}

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL: 'http://quanzhan.site:3000',
  timeout: 10000,
})

/**
 * 请求拦截
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!store) {
      store = useUserStore()
    }
    // 发送网络请求，显示轻提示效果
    Toast.loading({
      message: '加载中...',
      duration: 0, // 延迟时间，设置为 0 表示不会关闭提示框
    })
    // 获取用户登录的 token 状态数据
    const token = 'Bearer ' + store.token
    // 如果 config.headers 不存在，创建默认的空对象
    if (!config.headers) {
      config.headers = {}
    }
    // 如果存在 token ，则将 token 添加到请求头的认证字段中
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    // 关闭轻提示效果
    Toast.clear()
    // 全局错误提示
    Notify({ type: 'danger', message: error.message })
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 关闭轻提示效果
    Toast.clear()

    // 获取后端响应返回的数据，对响应数据做统一拦截处理
    const {code, data, message} = response.data
    if (code === 200) {
      return data
    }

    // 如果 token 过期，则清理本地保存的用户登录状态数据
    // 然后跳转到登录页面重新登录
    // TODO...

    const error = new Error(message || '响应拦截异常')
    // 全局错误提示
    Notify({ type: 'danger', message: error.message })
    return Promise.reject(error)
  },
  error => {
    // 关闭轻提示效果
    Toast.clear()
    // 全局错误提示
    Notify({ type: 'danger', message: error.message })
    return Promise.reject(error)
  }
)

export default service
