<template>
  <div class="home">
    <van-nav-bar>
        <template #left>
          <router-link to="/login">首页</router-link>
        </template>
        
        <template #title>
            <router-link to="/search">请输入你想搜索的商品</router-link>
        </template>
       
          <template #right>
            <!-- <van-icon name="wap-nav"  color="#ffffff" size="30px"/> -->
            <van-popover v-model:show="showPopover" :actions="actions">
              <template #reference>
                <van-button type="primary" color="#d30607" size="mini" style="border-color:none"><van-icon name="wap-nav"  color="#ffffff" size="30px"/></van-button>
              </template>
            </van-popover>

          </template>
    </van-nav-bar>
    <!-- 顶部搜索框 -->
    <!-- <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      @click-input="jumpToSearch"
    >
    </van-search> -->
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="banner in state.banners" :key="banner.id">
        <img :src="banner.image" :style="{width: '100%', height: '100%'}" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格布局 -->
    <van-grid>
      <template v-for="n in 1 " :key="n">
        <van-grid-item :icon="icon" text="优选超市" />
        <van-grid-item :icon="img" text="数码商品" />
        <van-grid-item :icon="icon3" text="京东新百货" />
        <van-grid-item :icon="icon4" text="京东生鲜" />
        <van-grid-item :icon="icon5" text="京东到家" />
        <van-grid-item :icon="icon6" text="充值缴费" />
        <van-grid-item :icon="icon7" text="附近好店" />
        <van-grid-item :icon="icon8" text="领券" />
      </template>
    </van-grid>
    <!-- 推荐商品列表，触底加载更多 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="handleLoadMore"
      :immediate-check="false"
      style="overflow: hidden; text-overflow: ellipsis;"
    >
      <van-card
        v-for="item in state.goods"
        :key="item.id"
        :price="formatMoney(item.price)"
        :title="item.title"
        :thumb="item.image"
        @click="jumpToDetail(item.id)"
        width="50%"
      >
        <template #desc>
          <van-tag color="#7232dd">{{ item.couponValue }}</van-tag>
        </template>
        <template #num>
          <span style="font-size: 15px; margin-bottom: 20px;">月销量: {{ item.saleNum }}</span>
          <span>
            <van-icon
              name="cart-circle-o"
              color="#f00"
              size="24"
              @click.stop="handleAddToCart(item)"
            />
          </span>
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate  } from 'vue-router'
import { Toast } from 'vant'
import { getAllCategories, Category ,getSubCategories} from '@/api/category'
import { getData, loadMore } from '@/api/home'
import useCartStore from '@/store/modules/cart'
import { formatMoney } from '@/utils/index'

// 将本地 assets 目录中的媒体资源作为独立的模块引入使用
import icon from '@/assets/1.png'
import icon3 from '@/assets/3.png'
import icon4 from '@/assets/4.png'
import icon5 from '@/assets/5.png'
import icon6 from '@/assets/6.png'
import icon7 from '@/assets/7.png'
import icon8 from '@/assets/8.png'
import { text } from 'stream/consumers'
import { after } from 'node:test'
// 静态媒体资源的引入使用
const img = new URL('@/assets/2.png', import.meta.url).href

//激活一级分类索引
const active = ref(0)
// // 在 webpack 打包的项目中也可以使用 require() 引入模块资源
// const icon1 = require('@/assets/1.png')

// 购物车 store
const store = useCartStore()

interface State {
  categories: Category[]
  banners: any[]
  goods: any[]
  subCategories: Category[]
}

// 获取 VueRouter 路由对象的使用
const router = useRouter()

// 定义长列表所使用到的两个变量响应式数据
const loading = ref(false)
const finished = ref(false)
const nextIndex = ref(0) // 下一页数据的起始索引

// 定义页面所使用到的响应式数据
const state = reactive<State>({
  categories: [], // 所有主分类
  banners: [], // 轮播图
  goods: [], // 推荐商品
  subCategories:[]
})

/**
 * 发送网络请求，请求首页中要使用到的各种数据
 */
const fetchData = async() => {
  try {
    // /* 查询分类 */
    // const result = await getAllCategories()
    // state.categories = result.list
    // console.log(result)
    // /* 查询首页轮播及推荐商品 */
    // const data = await getData()
    // console.log('data:', data)

    /* 利用 Promise.all() 并行发送多个网络请求进行优化 */
    /**
     * Promise.all() 的返回值是一个 Promise 对象，
     * 会在每个异步任务都执行成功(即每个 Promise 都 fulfilled)时返回成功状态的 Promise 对象。
     * 只要有任何一个异步任务执行失败(rejected)，则返回的 Promise 对象为 rejected 状态。
     */
    /**
     * Promise.allSettled() 返回值也是一个 Promise 对象，但并不会有任意一个异步任务执行失败
     * 时将返回的 Promise 对象状态直接修改为 rejected。Promise.allSettled() 可获取到每一个
     * 异步任务的执行状态，可根据每个异步任务自身的 fulfilled 或 rejected 状态单独进行处理。
     */
    // Promise.all() 返回的是一个 Promise 对象，使用 await 异步等待其执行结果时，
    // 当 Promise 状态为 fulfilled 时，返回数据值为数组结构，数组中每个元素是各异步任务
    // fulfilled 执行成功时的返回数据值
    const result = await Promise.all([
      getAllCategories(),
      getData(),
    ])
    state.categories = result[0].list
    state.banners = result[1].banners
    state.goods = result[1].items.list
    nextIndex.value = result[1].items.nextIndex
    finished.value = result[1].items.isEnd
    // const { id } = router.params
    // const data = await getSubCategories(id as string)
    // console.log(data)
    // state.subCategories = data.categories
    // console.log('result:', result)
  } catch (error) {
    console.log('err:', error)
  }
}
fetchData()
/**
 * 编程式的导航: 跳转到搜索页面
 */
// const jumpToSearch = () => {
//   router.push('/search')
// }

/**
 * 触底加载更多数据
 */
const handleLoadMore = async () => {
  // console.log('加载更多。。。')
  // 发送网络请求查询更多推荐商品数据
  const result = await loadMore(nextIndex.value)
  // console.log('result:', result)
  // 合并查询到的商品数组
  state.goods = state.goods.concat(result.list)
  nextIndex.value = result.nextIndex
  // 将 loading 设置为 false 表示当前次加载完毕
  loading.value = false
  // 是否所有数据都查询完毕
  finished.value = result.isEnd
}

/**
 * 编程式的导航，跳转到详情页面
 */
const jumpToDetail = (id: any) => {
  // router.push('/detail?id=' + id)
  router.push({
    path: '/detail',
    query: {
      id,
    },
  })
}

/**
 * 处理加入购物车
 */
const handleAddToCart = (item: any) => {
  // console.log('加入购物车...', item)
  // 构建当前加入购物车商品的对象结构
  const { id, title, image, price } = item
  const currentGoods = {
    id,
    title,
    image,
    price,
    amount: 1, // 选购数量
  }
  // 加入购物车: 调用 store 中的 action 方法变更状态数据
  store.addToCart(currentGoods)
  // 轻提示
  Toast.success({
    message: '添加成功!',
    duration: 1000,
  })
}
/**
 * 气泡弹出框
 */
 const showPopover = ref(false);
    const actions = [
      { text: '首页', icon: 'wap-home-o' },
      { text: '分类', icon: 'cluster-o'},
      { text: '购物车', icon: 'cart-o' },
      { text: '个人中心', icon: 'user-o' },
    ];

</script>

<style lang="less" scoped>
.van-nav-bar{
    background-color: #d30607;

    .van-nav-bar__left,.van-nav-bar__right{
        a{
            color: white;
            font-weight: bold;
            width: 50px;
            font-size: 20px;
        }
    }
    //样式穿透
    :deep(.van-nav-bar__title){
        background-color: white;
        width: 80%;
        border-radius: 30px;
        height: 35px;
        line-height: 35px;
        box-sizing: border-box;
        text-align: left;
        padding-left: 30px;
        font-size: 14px;
        a{
            color: gray;
          
        }
    }
}
</style>
