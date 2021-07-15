import {
  debounce
} from './utils'
import BackTop from 'components/content/backTop/BackTop'
import { BACKTOP_DISTANCE } from 'common/const'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 1.图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50) //刷新数组

    this.itemImgListener = () => {
      // 监听图片加载
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('我是混入中的内容');
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      // 通过scroll这个组件拿到scroll对象，然后调用scrollTo(x,y,延迟的T)
      //在Scroll中定义scrollTo方法调用
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 监听是否需要显示
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE
    }
  }
}
