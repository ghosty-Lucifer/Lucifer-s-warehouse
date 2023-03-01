<template>
<!-- 优惠券单元格 -->
<van-coupon-cell
  :coupons="coupons"
  :chosen-coupon="chosenCoupon"
  @click="showList = true"
/>
<!-- 优惠券列表 -->
<van-popup
  v-model:show="showList"
  round
  position="bottom"
  style="height: 90%; padding-top: 4px;"
>
  <van-coupon-list
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    @change="onChange"
    @exchange="onExchange"
  />
</van-popup>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const coupon = {
      available: 1,
      condition: '无门槛\n最多优惠12元',
      reason: '',
      value: 150,
      name: '优惠券名称',
      startAt: 1689104000,
      endAt: 1714592000,
      valueDesc: '1.5',
      unitDesc: '元',
    }

    const coupons:any = ref([coupon]);
    const showList = ref(false);
    const chosenCoupon = ref(-1);

    const onChange = (index:any) => {
      showList.value = false;
      chosenCoupon.value = index;
    }
    const onExchange = (code: any) => {
      coupons.value.push(coupon);
    }
</script>

<style lang="less" scoped>

</style>
