import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 使用 pinia-plugin-persistedstate 插件，实现 store 中 state 数据的本地持久化与还原
pinia.use(piniaPluginPersistedstate)

export default pinia
