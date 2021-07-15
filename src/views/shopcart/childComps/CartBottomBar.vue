<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="choose" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="total-price">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      // 1.使用filter
      // 先从整个数组里找一下有没有不被选中的,如果有没被选中的，则数组肯定有长度，取反则为false
      // return !(this.cartList.filter(item => !item.checked).length)

      // 2.使用find函数
      // 性能更高的方法，找到这个东西说明当前有一个不被选中，则为false
      // return !this.cartList.find(item => !item.checked)

      // 3.遍历的方法
      for (let item of this.cartList) {
        if (!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.checked = false)
      }else{
        // 部分或全部不选中
        this.cartList.forEach(item=>item.checked=true)
      }
      
      // 不能简化，不是所有的写法都能简化
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick(){
      // 全部没有选中
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  font-size: 14px;
  line-height: 40px;
}

.check-content {
  display: flex;
  /* align-items: center; */
  width: 80px;
  height: 20px;
}

.choose {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
}

.total-price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 100px;
  background: var(--color-high-text);
  color: #fff;
  text-align: center;
}
</style>