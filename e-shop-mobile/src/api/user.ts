import request from '@/utils/request'

export interface LoginInfo {
  phone: string
  code: string
}

/**
 * 用户登录
 * @param user 登录信息，对象 { phone, code }
 * @returns 
 */
export const login = (user: LoginInfo) => request.post<any, any>('/api/sessions', user)

/**
 * 根据手机号获取验证码
 * @param phone 手机号
 * @returns 
 */
export const getCode = (phone: string) => request.get<any, any>('/api/sessions/code/' + phone)

// ...
