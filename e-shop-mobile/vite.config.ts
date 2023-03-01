import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入这个模块的使用，需要安装 @types/node 这个包
import path from 'path'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 对 vant 按需引入的配置
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  
  server: {
    host: '0.0.0.0',
  //   https: false,//是否启用 http 2
    open: true,//服务启动时自动在浏览器中打开应用
    },
  resolve: {
    alias: { // 别名配置
      // 在路径中使用 @ 表示 src 目录的绝对路径
      '@': path.join(__dirname, './src'),
    },
  },
})
