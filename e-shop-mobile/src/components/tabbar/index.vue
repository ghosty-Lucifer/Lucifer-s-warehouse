<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" route >
      <van-tabbar-item
        v-for="nav in navs"
        :key="nav.path"
        :icon="nav.meta.icon"
        :to="nav.path"
        :badge="nav.meta.hasBadge && total"
        fixed="true" 
      >
        {{ nav.meta.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import routes from '@/router/routes'
import useCartStore from '@/store/modules/cart'
// 激活项索引
const active = ref(0)

// 购物车 store
const store = useCartStore()

// 购物车总商品数量
const total = computed(() => {
  const _total = store.total
  if (_total > 99) {
    return '99+'
  }
  return _total || ''
})

// 根据所有路由的配置，筛选 tabbar 要使用到的路由信息
const navs: any = computed(() => routes.filter(route => route.meta?.inTabbar))
</script>

<style lang="less" scoped>

</style>
