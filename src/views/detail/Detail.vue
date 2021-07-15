<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 属性：topImages 传入值：top-images 因为标签里不区分大小写 -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="paramInfo" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="commentInfo" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommends" :goods="recommonds"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}, // 评论
      recommonds: [], //推荐
      navBarItemsYs: [], //导航栏点击滑动
      getNavBarItemsYs: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取顶部的图片轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      /* // 渲染完回调这个函数
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来，但是图片没有加载完（目前获取到的offsetTop不包含图片）
        this.navBarItemsYs = []
        this.navBarItemsYs.push(0);
        this.navBarItemsYs.push(this.$refs.paramInfo.$el.offsetTop);
        this.navBarItemsYs.push(this.$refs.commentInfo.$el.offsetTop);
        this.navBarItemsYs.push(this.$refs.recommends.$el.offsetTop);
        console.log(this.navBarItemsYs);
      }) */
    }),
      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommonds = res.data.list
      })

    // 4.给getNavBarItemsYs赋值
    // 防抖，对 this.navBarItemsYs赋值进行防抖，提高性能
    this.getNavBarItemsYs = debounce(() => {
      //监听图片加载,得到导航栏各项点击的高度
      this.navBarItemsYs = []
      this.navBarItemsYs.push(0);
      this.navBarItemsYs.push(this.$refs.paramInfo.$el.offsetTop);
      this.navBarItemsYs.push(this.$refs.commentInfo.$el.offsetTop);
      this.navBarItemsYs.push(this.$refs.recommends.$el.offsetTop);
      this.navBarItemsYs.push(Number.MAX_VALUE)
      // console.log(this.navBarItemsYs);
    }, 100)
  },

  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // 这种方法会被频繁调用
      // this.$refs.scroll.refresh()
      this.newRefresh()

      this.getNavBarItemsYs()
    },
    //监听导航栏点击事件
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navBarItemsYs[index], 200)
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中的值进行对比
      // [0,7938,9120,9452,Number.MAX_VALUE]
      let length = this.navBarItemsYs.length
      for (let i = 0; i < length - 1; i++) {
        /* if (positionY > this.navBarItemsYs[i] && positionY < this.navBarItemsYs[i + 1]) {
          // console.log(i);  此处的i是字符串,且最后一个会出现越界的问题
        } */

        /*  if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.navBarItemsYs[i] && positionY < this.navBarItemsYs[i + 1]) || (i === length - 1 && positionY >= this.navBarItemsYs[i]))) {
           this.currentIndex = i
           // console.log(this.currentIndex);
           this.$refs.detailNavBar.currentIndex = this.currentIndex
         } */

        // 简化的方法
        if (this.currentIndex !== i && (positionY >= this.navBarItemsYs[i]) && positionY < this.navBarItemsYs[i + 1]) {
          this.currentIndex = i
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }
      }
      // 3.是否显示回到顶部
      this.listenShowBackTop(position)
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid


      // 2.将商品添加都购物车
      // vuex中所有的修改添加都通过mutations
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)
      // 在action中

      // 1.Promise
      /* this.$store.dispatch('addCart',product).then(res=>{
        console.log(res);
      }) */

      // 1.mapActions
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res

        // // 1.5秒后消失
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)
        this.$toast.show(res)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>