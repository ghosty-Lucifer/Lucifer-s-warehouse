<template>
  <div class="nav-bar">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 调用 vue-router 包中提供的 useRoute() hook 来获取当前激活的路由
// 与选项式 API 在方法中使用 this.$route 一致
const route = useRoute()

// 这个相当于是选项式 API 中的计算属性
const title: any = computed(() => route.meta.title)

// 点击左侧返回按钮，后退
const onClickLeft = () => history.back()
</script>

<style lang="less" scoped>

</style>
