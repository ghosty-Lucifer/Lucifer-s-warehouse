<template>
  <div class="category">
    <!-- 左侧侧边导航: 主分类 -->
    <div class="left">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="category.name"
          v-for="category in state.categories"
          :key="category.id"
          :to="{name: 'sub', params: { id: category.id }}"
        />
      </van-sidebar>
    </div>

    <!-- 右侧显示子分类 -->
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAllCategories } from '@/api/category'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// 左侧主分类激活索引
const active = ref(0)

// 组件使用到的响应式状态数据
const state = reactive<any>({
  categories: [], // 所有分类

})

// useRouter() hook 用于获取路由对象实例(即获取 VueRouter 对象实例的使用)
// 与 选项式 API 方法中 this.$router 一致
const router = useRouter()

// 发送网络请求，获取所有主分类
async function fetchData() {
  const result = await getAllCategories()
  console.log('所有分类:', result)
  state.categories = result.list.slice(1)
  // 初始渲染，向第一个分类的子分类页面跳转
  router.replace({name: 'sub', params: { id: state.categories[0].id }})
}
fetchData()
</script>

<style lang="less" scoped>
.category {
  display: flex;

  .right {
    flex: 1;
  }
}
</style>
