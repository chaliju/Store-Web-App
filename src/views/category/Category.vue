<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <slide-bar :slide-list="slideList"
        @itemClick="itemClick" />
    <scroll class="scroll-height">
      <sub-category :subCategory="subCategory" />
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

import SlideBar from "./childComps/SlideBar.vue"
import SubCategory from './childComps/SubCategory.vue'

import Scroll from 'components/common/scroll/Scroll'

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category"

export default {
  components: {
    NavBar,
    SlideBar,
    SubCategory,
    Scroll
  },
  data() {
    return {
      slideList: [],
      key: null,
      subCategory: []
    };
  },
  created() {
    getCategory().then(res => {
      this.slideList = res.data.category.list;
      // console.log(this.slideList);
      this.key = this.slideList[0].maitKey;
      this.getSubcategory(this.key);
    });

    // getCategoryDetail().then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    getSubcategory(key) {
      getSubcategory(key).then(res => {
        this.subCategory = res.data.list;
      });
    },

    itemClick(item, index) {
      this.getSubcategory(item.maitKey);
    }
  }
};
</script>
<style  scoped>
.category-nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.scroll-height {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
}
</style>
