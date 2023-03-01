<template>
	<!-- <van-nav-bar title="个人中心" /> -->
	<div>
    <p style="margin-top: 15px; margin-left: 20px;">Hello,薛之谦</p>
		<div style="display: flex;">
        <img
        class="user-poster"
        src="@/images/xzq.jpg"
        />
        <div class="user-info">
          <div style="width: 80px; text-align: center; border: none;">
             <p>我的余额</p>
             <p>1314</p>
          </div>
          <div style="width: 80px; text-align: center; border: none;">
             <p>我的积分</p>
             <p>520</p>
          </div>
          <div style="width: 80px; text-align: center; border: none;">
             <p>我的等级</p>
             <p>VIP9</p>
          </div>
        </div>
    </div>
    <p style="margin-left: 20px; display: block;">我的订单</p>
		<van-row class="user-links">
			<van-col span="6">
				<van-icon name="pending-payment" />
				待付款
			</van-col>
			<van-col span="6">
				<van-icon name="records" />
				待接单
			</van-col>
			<van-col span="6">
				<van-icon name="tosend" />
				待发货
			</van-col>
			<van-col span="6">
				<van-icon name="logistics" />
				已发货
			</van-col>
		</van-row>
 
		<van-cell-group class="user-group">
			<van-cell icon="location-o"  title="我的地址" is-link @click="jumpAddress"/>
		</van-cell-group>
		<van-cell-group>
			<van-cell icon="records" title="全部订单" is-link />
		</van-cell-group>
		<van-cell-group>
			<van-cell icon="points" title="我的积分" is-link />
			<van-cell icon="gold-coin-o" title="我的优惠券" is-link  @click="jumpCouponlist"/>
			<van-cell icon="gift-o" title="我收到的礼物" is-link />
		</van-cell-group>
	</div>
</template>

<script setup lang="ts">
import router from '@/router';

const jumpAddress = () =>{
	router.push({
		path: '/address'
	})
}
const jumpCouponlist = () =>{
	router.push({
		path: '/couponlist'
	})
} 
</script>

<style lang="less" scoped>
.user {
	&-poster {
		width: 60px;
		height:60px;
	  display:inline-block;
    border-radius: 50%;
    margin-top: 10px;
    margin-left: 30px;
    margin-bottom: 5px;
	}
  &-info {
    display: flex;
    width: 240px;
    // background-color: skyblue;
    margin-left: 10px;
  }
	&-group {
		margin-top: 25px;
    margin-bottom: 5px;
	}
	&-links {
		// padding: 15px 0;
		font-size: 12px;
		text-align: center;
		background-color: #fff;
		.van-icon {
			display: block;
			font-size: 24px;
		}
	}
}
</style>

