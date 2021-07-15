<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    // 两种语法
    // mapGetters：辅助函数讲store中的getter映射到局部计算属性
    // 第一种：使用对象展开运算符将getter混入computed对象中
    /* ...mapGetters([
      'cartLength',
      'cartList'
    ]) */

    // 第二种：如果想将一个getter属性另取一个名字，使用对象形式
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
#cart {
  height: 100vh;
}

.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>