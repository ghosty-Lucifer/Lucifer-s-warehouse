import request from '@/utils/request'

/**
 * 获取首页轮播图及推荐商品数据
 * @returns 
 */
export const getData = () => request.get<any, any>('/api/tab/1')

/**
 * 加载更多推荐商品
 * @param start 
 * @returns 
 */
export const loadMore = (start: number) => request.get<any, any>('/api/tab/1/feeds', {
  params: { // 使用配置中的 params 发送请求 url 中的参数数据
    start,
  }
})
