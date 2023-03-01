<template>
  <div class="login">
    <van-form @submit="handleUserLogin" ref="loginForm">
      <van-cell-group inset>
        <van-field
          v-model="loginInfo.phone"
          name="phone"
          label="手机号码"
          placeholder="请输入手机号码"
          :rules="[
            { required: true, message: '请填写手机号码' },
            { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '请填写正确的手机号'}
          ]"
        />
        <van-field
          v-model="loginInfo.code"
          center
          clearable
          label="验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请填写短信验证码' }]"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click="handleSendCode"
              :disabled="timer.seconds !== 0"
            >发送验证码<template v-if="timer.seconds">({{ timer.seconds }})</template></van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { getCode } from '@/api/user'
import useUserStore from '@/store/modules/user'
import { Notify } from 'vant'
import { useRouter, useRoute } from 'vue-router'

// 关联表单实例
const loginForm = ref<any>(null)

// 用户 store
const store = useUserStore()

// 路由
const router = useRouter()
const route = useRoute()

// 登录信息的响应式数据
const loginInfo = reactive<any>({
  phone: '13288779966',
  code: '',
})

// 倒计时响应式数据
const timer = reactive<any>({
  id: 0,
  start: null,
  seconds: 0, // 倒计时秒数
})

/**
 * 发送验证码
 */
const handleSendCode = async () => {
  if (loginInfo.phone) {
    // 记录发送验证码开始时间
    timer.start = Date.now()
    // 倒计时计算
    calcTimer()
    // 发送请求获取验证码
    const result = await getCode(loginInfo.phone)
    // console.log('获取验证码:', result)
    loginInfo.code = result.code
  }
}
/**
 * 处理用户登录
 */
const handleUserLogin = async () => {
  // console.log('用户登录:', route.query)
  try {
    // 先进行表单校验
    await loginForm.value.validate()
    // 表单校验通过，则登录，将登录成功的用户信息保存到 store 中
    const result = await store.loginAction(loginInfo)
    if (!result) {
      Notify({ type: 'danger', message: '手机号或验证码错误' })
    } else {
      // 登录成功，向指定页面跳转
      const redirect: any = route.query.redirect || '/mine'
      router.push(redirect)
    }
  } catch (error) {
    console.log('表单校验失败:', error)
  }
}

/**
 * 计算发送验证码倒计时效果
 */
const calcTimer = () => {
  // 计算时间差
  const diff = Date.now() - timer.start
  // 换算成倒计时秒，限定总时长 10s
  const seconds = 10 - Math.floor(diff / 1000)
  // 修改响应数据
  timer.seconds = seconds

  // 如果倒计时归0，则停止重复计算
  if (seconds <= 0) {
    return
  }

  // 递归，周期性倒计时
  timer.id = setTimeout(calcTimer, 1000)
}

/**
 * 组件卸载前，销毁定时器
 */
onBeforeUnmount(() => {
  clearTimeout(timer.id)
})

// onMounted(() => {
//   console.log('挂载后:', loginForm.value)
// })
</script>

<style lang="less" scoped>

</style>
