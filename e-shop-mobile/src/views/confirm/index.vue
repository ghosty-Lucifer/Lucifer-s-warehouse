<template>
  <van-cell-group>
			<van-cell icon="location-o" title="选择你的收货地址" is-link />
		</van-cell-group>
    <van-cell-group>
      <van-cell title="送达时间" value="请选择送达时间"  is-link/>
    </van-cell-group>
    <div>
      <van-cell-group>
        <van-cell title="你的所有商品"/>
      </van-cell-group>
      <van-swipe-cell v-for="goods in cart" :key="goods.id">
        <van-card
          :price="goods.price"
          desc="描述信息"
          :title="goods.title"
          class="goods-card"
          :thumb="goods.image"
          :num ="total"
        >
          <template #thumb>
            <div class="van-image" style="width: 75%; height: 100%;">
              <img :src="goods.image" class="van-image__img" style="object-fit: cover;">
            </div>
          </template>
        </van-card>
      </van-swipe-cell>
    </div>
    <van-cell-group>
      <van-cell title="支付方式" value="微信" is-link/>
    </van-cell-group>
    <van-cell-group inset>
      <van-field
        label="备注"
        placeholder="选填,备注你的需求"
        input-align="right"
      />
    </van-cell-group>
      <van-submit-bar v-if="total" :price="totalMoney" button-text="去结算" @click="showPopup" >
      <van-popup v-model:show="show" closeable :style="{ padding: '35px' }" @click="onClickLeft ">
        <img src="@/images/code.jpg" style="width: 100%; height:100%;"/>
      </van-popup>>
    </van-submit-bar>
</template>

<script lang="ts" setup>
import useCartStore from '@/store/modules/cart'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

// 购物车 store
const store = useCartStore()
// 路由
const router = useRouter()

// 获取所有的购物车商品
const cart = computed(() => store.cart)
// 所有商品总数量
const total = computed(() => store.total)
// 选中商品合计金额
const totalMoney = computed(() => store.totalMoney)

//支付二维码的实现
const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
const onClickLeft = () => {
  router.push('/mine')
};
</script>

<style lang="less" scoped>

</style>
