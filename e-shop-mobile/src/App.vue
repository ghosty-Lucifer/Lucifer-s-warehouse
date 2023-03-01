<template>
  <div class="app">
    <header>
      <!-- 命名视图，在同级能够同时渲染多个组件 -->
      <router-view name="header" />
    </header>

    <main>
      <!-- 不取 name 属性，则默认名称为 default -->
      <router-view />
    </main>

    <footer>
      <router-view name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
  
</script>

<style lang="less" scoped>
main {
  padding-bottom: 60px;
}
</style>
