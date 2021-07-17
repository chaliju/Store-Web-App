<template>
  <div class="profile-item">
    <div class="part1">
      <div class="message item">
        <div class="img">
          <img src="~assets/img/profile/message.svg" alt />
        </div>
        <div class="text">我的消息</div>
      </div>
      <div class="socre item">
        <div class="img">
          <img src="~assets/img/profile/pointer.svg" alt />
        </div>
        <div class="text">积分商城</div>
      </div>
      <div class="vip item">
        <div class="img">
          <img src="~assets/img/profile/vip.svg" alt />
        </div>
        <div class="text">会员卡</div>
      </div>
    </div>
    <div class="part2">
      <div class="shopcart item">
        <div class="img">
          <img src="~assets/img/profile/cart.svg" alt />
        </div>
        <div class="text">我的购物车</div>
      </div>
      <div class="download item">
        <div class="img">
          <img src="~assets/img/profile/shopping.svg" alt />
        </div>
        <div class="text">下载购物APP</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileList"
};
</script>

<style scoped>
.profile-item {
  margin-top: 10px;
}
.part1 {
  box-shadow: 0 20px 0 rgba(220, 220, 220, 0.8);
}
.part2 {
  margin-top: 10px;
}
.item {
  display: flex;
  height: 50px;
  align-items: center;
  background-color: #fff;
  border-bottom: 2px solid rgb(240, 240, 240);
}
.img {
  height: 25px;
  width: 25px;
  margin-left: 10px;
}
.item img {
  width: 100%;
  height: 100%;
}

.text {
  margin-left: 8px;
}
</style>
