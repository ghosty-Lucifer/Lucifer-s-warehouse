import request from '@/utils/request'

/**
 * 分类接口
 */
export interface Category {
  id: number
  imageUrl: string
  name: string
  note: string
}

export interface CategoryResponse {

  list: Category[]
}

/**
 * 查询所有主分类数据
 * @returns
 */
export const getAllCategories = () => request.get<any, CategoryResponse>('/api/tabs')

/**
 * 根据主分类查询子分类数据
 * @param {*} id
 */
// export const getSubCategories = (id: string | number) => request.get<any, any>('/api/tab/' + id)
export const getSubCategories = (id: string | number ) => request.get<any, any>('/api/tab/' + id)
