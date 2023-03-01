import { defineStore } from 'pinia'

const useCartStore = defineStore<string, any>('shoppingCart', {
  state() {
    return {
      cart: [], // 购物车数组
    }
  },
  getters: {
    // 购物车中商品总数量
    total: state => state.cart.reduce((sum: number, curr: any) => {
      sum += curr.amount
      return sum
    }, 0),
    // 是否全选
    allChecked: state => state.cart.every((curr: any) => curr.checked),
    // 选中项的合计金额
    totalMoney: state => state.cart.reduce((result: number, curr: any) => {
      if (curr.checked) {
        result += curr.price * curr.amount
      }
      return result
    }, 0) * 100,
  },
  actions: {
    /**
     * 加入购物车
     * @param goods 
     */
    addToCart(goods: any) {
      // 对于重复的商品，叠加选购数量即可
      // 不存在重复的商品，则向数组中添加新元素即可
      const has = this.cart.some((curr: any) => curr.id === goods.id)
      if (has) {
        this.cart = this.cart.map((curr: any) => {
          if (curr.id === goods.id) {
            curr.amount += goods.amount
          }
          return curr
        })
      } else {
        this.cart.push({
          ...goods,
          checked: true, // 默认选中
        })
      }
    },
    /**
     * 从购物车中移除商品
     */
    removeFromCart(id: any) {
      this.cart = this.cart.filter((goods: any) => goods.id !== id)
    },
    /**
     * 修改指定id商品的数量
     * @param payload 有效载荷, 对象结构 { id, amount }, id - 商品id, amount - 修改后的数量
     */
    modifyAmount(payload: any) {
      this.cart = this.cart.map((curr: any) => {
        if (curr.id === payload.id) {
          curr.amount = payload.amount
        }
        return curr
      })
    },
    /**
     * 修改选中状态
     */
    modifyChecked(id: any) {
      this.cart = this.cart.map((curr: any) => {
        if (curr.id === id) {
          curr.checked = !curr.checked
        }
        return curr
      })
    },
    /**
     * 切换全选与取消全选
     */
    modifyAllChecked(checked: boolean) {
      this.cart = this.cart.map((curr: any) => {
        curr.checked = checked
        return curr
      })
    },
  },
})

export default useCartStore
