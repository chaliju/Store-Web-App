<template>
  <div class="slider-bar">
    <scroll class="slide-bar-height">
      <ul>
        <li
          class="slide-bar-item"
          :class="{ active: index === currentIndex }"
          v-for="(item, index) in slideList"
          :key="index"
          @click="itemClick(item, index)"
        >{{ item.title }}</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "SlideBar",
  data() {
    return {
      currentIndex: 0
    };
  },
  components: {
    Scroll
  },
  props: {
    slideList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(item, index) {
      this.currentIndex = index;
      this.$emit("itemClick", item, index);
    }
  }
};
</script>

<style scoped>
.slide-bar {
  width: 100%;
}

.slide-bar-height {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
  width: 100px;
  background-color: #f6f6f6;
}

.slide-bar-item {
  font-size: 14px;
  line-height: 45px;
  width: 100px;
  height: 45px;
  user-select: none;
  text-align: center;
  color: #666666;
  border: 0;
  outline: none;
  background: none;
}

.active {
  background-color: #fff;
  border-left: 2px solid var(--color-tint);
  color: var(--color-high-text);
  font-weight: 520;
}
</style>

