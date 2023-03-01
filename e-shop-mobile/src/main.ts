import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from './router'
import pinia from './store'

// 引入 vant 组件库中的某些组件样式
import 'vant/es/toast/style'
import 'vant/es/notify/style'
// ......

// 引入权限拦截模块的使用
import './permission'

createApp(App).use(router).use(pinia).mount('#app')
