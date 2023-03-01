import request from '@/utils/request'

/**
 * 根据 id 查询商品详情数据
 * @param id 
 * @returns 
 */
export const findDetail = (id: any) => request.get<any, any>('/api/detail', {
  params: {
    id,
  },
})
