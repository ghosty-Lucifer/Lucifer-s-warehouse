<template>
  <div class="cart">
    <!-- 购物车为空，则进行空提示 -->
    <van-empty
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      image-size="80"
      description="购物车为空, 请选购商品!"
      v-if="total === 0"
    />
    <!-- 购物车商品列表 -->
    <template v-else>
      <van-swipe-cell v-for="goods in cart" :key="goods.id">
        <van-card
          :price="goods.price"
          desc="描述信息"
          :title="goods.title"
          class="goods-card"
          :thumb="goods.image"
          @click-thumb="jumpToDetail(goods.id)"
        >
          <template #thumb>
            <van-checkbox :model-value="goods.checked" @click.stop="handleCheckedChange(goods.id)"></van-checkbox>
            <div class="van-image" style="width: 75%; height: 100%;">
              <img :src="goods.image" class="van-image__img" style="object-fit: cover;">
            </div>
          </template>
          <template #num>
            <van-stepper
              :modelValue="goods.amount"
              theme="round"
              button-size="22"
              @change="handleGoodsAmountChange(goods.id, $event)"
            />
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="handleRemove(goods.id)" />
        </template>
      </van-swipe-cell>
    </template>

    <!-- 确认订单 -->
    <van-submit-bar v-if="total" :price="totalMoney" button-text="提交订单" @submit="handleSubmit">
      <van-checkbox :model-value="allChecked" @click="handleAllChecked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script lang="ts" setup>
import useCartStore from '@/store/modules/cart'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// 购物车 store
const store = useCartStore()
// 路由
const router = useRouter()

// 获取所有的购物车商品
const cart = computed(() => store.cart)
// 所有商品总数量
const total = computed(() => store.total)
// 全选状态
const allChecked = computed(() => store.allChecked)
// 选中商品合计金额
const totalMoney = computed(() => store.totalMoney)

/**
 * 点击商品图片，跳转到详情页面
 */
const jumpToDetail = (id: any) => {
  router.push({
    path: '/detail',
    query: { id },
  })
}

/**
 * 处理确认订单
 */
const handleSubmit = () => {
  console.log('确认订单...')
  router.push('/confirm')
}

/**
 * 处理删除购物车商品
 */
const handleRemove = (id: any) => {
  store.removeFromCart(id)
}

/**
 * 处理数量修改
 */
const handleGoodsAmountChange = (id: any, amount: any) => {
  store.modifyAmount({id, amount})
}

/**
 * 修改商品选中状态
 */
const handleCheckedChange = (id: any) => {
  store.modifyChecked(id)
}

/**
 * 处理全选与取消全选
 */
const handleAllChecked = () => {
  store.modifyAllChecked(!store.allChecked)
}
</script>

<style lang="less" scoped>
@white: #fff;

.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}

.van-submit-bar {
  bottom: 50px;
}

/deep/ .van-card__thumb {
  display: flex;
  width: 120px;
  justify-content: space-around;
}
</style>
