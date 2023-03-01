<template>
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    :disabled-list="disabledList"
    disabled-text="以下地址超出配送范围"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
  />

</template>

<script lang="ts" setup>
  import { ref } from 'vue';
import { Toast } from 'vant';


    const chosenAddressId = ref('1');
    const list = [
      {
        id: '1',
        name: '王杰',
        tel: '18894375813',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李健',
        tel: '13154361527',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ];
    const disabledList = [
      {
        id: '3',
        name: '王菲',
        tel: '13295865841',
        address: '浙江省杭州市滨江区江南大道 15 号',
      },
    ];

    const onAdd = () => Toast('新增地址');
    const onEdit = (item: any, index: any) => Toast('编辑地址:' + index);
</script>

<style lang="less" scoped>

</style>
