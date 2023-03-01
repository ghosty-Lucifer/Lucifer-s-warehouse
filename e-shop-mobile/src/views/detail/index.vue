<template>
  <div class="detail" v-if="state.detail">
    <!-- 主图轮播 -->
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.detail.photo" :key="image.id">
        <img :src="image.url" style="width: 100%;" />
      </van-swipe-item>
    </van-swipe>
    <!-- 标题、价格 -->
    <div class="title">{{ state.detail.title }}</div>
    <div class="price">价格: {{ state.detail.price }}</div>
    <!-- 图文详情 -->
    <van-divider>商品详情</van-divider>
    <img
      v-for="content in state.detail.descContentList"
      :key="content.id"
      :src="content.url"
      style="width: 100%; display: block;"
      alt=""
    >
    <!-- 商品导航 -->
    <div class="goods-actions">
      <van-row>
        <van-col span="12">
          <van-tabbar :style="{position: 'static'}">
            <van-tabbar-item icon="chat-o">客服</van-tabbar-item>
            <van-tabbar-item icon="cart-o" :badge="store.total" to="/cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="star-o">收藏</van-tabbar-item>
            <!-- <van-tabbar-item icon="share-o"  title="立即分享给好友" :options="options"   v-model="showShare" @click="showShare = true">分享</van-tabbar-item> -->
            <van-tabbar-item icon="share-o" @click="showShare = true">分享</van-tabbar-item>
            <van-share-sheet
              v-model:show="showShare"
              title="立即分享给好友"
              :options="options"
            />
          </van-tabbar>
        </van-col>
        <van-col span="12" style="padding-right: 8px; align-self: center;">
          <van-button
            type="danger"
            round
            block
            @click="handleAddToCart"
          >
            加入购物车
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findDetail } from '@/api/detail'
import useCartStore from '@/store/modules/cart'
import { Toast } from 'vant'

// 购物车 store
const store = useCartStore()

// 获得当前激活路由配置对象信息
const route = useRoute()

// 响应式数据
const state = reactive<any>({
  detail: null,
})

/**
 * 发送网络请求，获取商品详情
 */
const fetchData = async () => {
  // 从当前激活路由的 query 对象中获取到商品 id
  const { id } = route.query
  try {
    // 发送网络请求
    const { detail } = await findDetail(id)
    // console.log('详情:', detail)
    state.detail = detail
  } catch (error) {
    console.log('error:', error)
  }
}
fetchData()

/**
 * 处理添加购物车
 */
const handleAddToCart = () => {
  const { id, title, image, price } = state.detail
  const currentGoods = {
    id,
    title,
    image,
    price,
    amount: 1,
  }
  store.addToCart(currentGoods)
  // 轻提示
  Toast.success({
    message: '添加成功!',
    duration: 1000,
  })
}
// 分享按钮
const showShare = ref(false);
    const options = [
      [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' },
      ],
    ];
</script>

<style lang="less" scoped>
.goods-actions {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
