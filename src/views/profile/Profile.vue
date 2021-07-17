<template>
  <div class="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">CC今天学习了吗</div>
    </nav-bar>
    <scroll class="scroll-height">
      <login></login>
      <profile-money></profile-money>
      <div class="line"></div>
      <profile-list></profile-list>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Login from './childComps/Login.vue'
import ProfileMoney from './childComps/ProfileMoney.vue'
import ProfileList from './childComps/ProfileList.vue'

import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "Profile",
  components: {
    NavBar,
    Login,
    ProfileMoney,
    ProfileList,
    Scroll
  }
}
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}

.profile-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eee;
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}
</style>