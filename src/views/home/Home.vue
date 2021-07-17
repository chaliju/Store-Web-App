<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">Stores</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>

    <!-- probe-type前不加v-bind，传入的是一个字符串类型，加入之后传入的是number类型 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'


export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    // 变量太长改为计算属性
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 滚动完之后再做一些刷新
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  // 组件创建完就执行的方法
  created() {
    // 1.请求多个数据,异步操作
    // 若在mothods中函数名相同，则用this.getHomeMultidata()
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  /* mounted() {
    // 1.监听item中图片加载完成
    // 此处的refresh是下面debounce函数的返回值
    // this.$refs.scroll.refresh对这个函数进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh()
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }, */
  // 抽取到顶部
  // mixins: [itemListenerMixin],
  methods: {
    // 事件监听相关的方法

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }

      // 让两个tabControl的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      // 通过scroll这个组件拿到scroll对象，然后调用scrollTo(x,y,延迟的T)
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 更简洁的写法，在Scroll中定义scrollTo方法调用
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 监听首页滚动
    contentScroll(position) {
      /*  // 1.判断BackTop是否显示
       this.isShowBackTop = -position.y > BACKTOP_DISTANCE */
      this.listenShowBackTop(position)

      // 2.决定tabControl是否吸顶（position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    /* backClick() {
      // 通过scroll这个组件拿到scroll对象，然后调用scrollTo(x,y,延迟的T)
      //在Scroll中定义scrollTo方法调用
      this.$refs.scroll.scrollTo(0, 0)
    }, */
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        // 把拿到的数据放到定义好的list中
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh 视口 */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;

  /* 在使用浏览器原生滚动时，为了让导航栏不随之一起滚动而设置
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>