<template>
  <!-- <div class="sub-category">
    <van-grid :column-num="3">
      <van-grid-item
        v-for="sub in state.subCategories"
        :key="sub.id"
        :icon="sub.imageUrl"
        :text="sub.title"
      />
    </van-grid>
  </div> -->
  <van-grid :border="false" :column-num="2">
      <van-grid-item v-for="item in state.subCategories" :key="item.id">
          <div class="g-goods">
                <img :src="item.image" :alt="item.title" />
                <p class="van-ellipsis">{{ item.title }}</p>
          </div>
      </van-grid-item>
  </van-grid>
</template>

<script lang="ts" setup>
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import {
  // watch,
  reactive,
} from 'vue'
import { getSubCategories } from '@/api/category'

// 响应式数据
const state = reactive<any>({
  subCategories: [], // 子分类
})
// console.log(state.subCategories)
// 调用 useRoute() hook 获取当前激活的路由
// 与选项式 API 方法中的 this.$route 一致
const route = useRoute()

// console.log('当前:', route)

// // 利用 watch 监听路由的变化以获取到参数中的主分类 id
// // 根据主分类的 id 查询子分类数据内容
// watch(() => route, (after, before) => {
//   console.log('路由变化了:', before, ' ==> ', after)
// }, {
//   deep: true,
//   immediate: true,
// })

// TODO...
// 组件初始渲染，发送网络请求查询子分类数据
// 可以利用 watch 的 immetidate 来立即监听到路由变化处理
// 也可以直接在 setup 中发送网络请求处理
// 也可以调用生命周期钩子 onMounted() 处理

// 定义方法以复用: 发送网络请求获取子分类数据
const fetchData = async (route: any) => {
  // 获取路由中传递的参数数据
  const { id } = route.params
  // 根据主分类 id 查询子分类数据
  const result = await getSubCategories(id as string)
  // state.subCategories = result.categories
  state.subCategories = result.items.list
  console.log(result)
}

// 初始渲染，直接请求数据渲染
fetchData(route)

// // 利用导航守卫钩子函数来监听路由变化时，当前复用的组件情况
// // onBeforeRouteUpdate() 钩子与选项式 API 中的 beforeRouteUpdate() 类似
// // 只是无法使用 this 访问当前组件实例
// // 注意，这个钩子是组件被复用的时候调用到
// onBeforeRouteUpdate(async(to, from) => {
//   // console.log('路由变化，组件复用了...')
//   // 获取路由中传递的参数数据
//   const { id } = to.params
//   // console.log('分类 id:', id)
//   // 根据主分类 id 查询子分类数据
//   const result = await getSubCategories(id as string)
//   // console.log('子分类:', result)
//   state.subCategories = result.categories
// })

// 组件复用时，重新发送网络请求获取数据渲染
onBeforeRouteUpdate(to => {
  fetchData(to)
})
</script>

<style lang="less" scoped>
.g-goods {
    img {
        width: 80px;
        height: 80px;
    }
    p {
        max-width: 60px;
        white-space: nowrap;
        // overflow: hidden; //文本超出隐藏
        // text-overflow: ellipsis; //文本超出省略号替代
    }
}
</style>
