# Store-Web-App
  本项目使用vue-cli3构建购物商城平台，通过vue-router实现首页、详情页、购物车和个人信息页面间的跳转；采用了ES6的语法，各页面所需数据统一使用axios进行处理；对于购物车的数据状态采用vuex进行管理；此外用vue-lazyload的懒加载方式来展示首页商品、详情页等的信息；执行方法类似的代码块提取到mixin中进行复用。

## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Run your tests
```
npm run test
```

## Lints and fixes files
```
npm run lint
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 项目内容介绍
主页面主要分为四个部分，分别为首页、分类页、购物车页和个人信息页，主页面中的商品点进去后会进入到详情页，接下来将对各页面进行简单的展示介绍。
### 1.首页

首页主要展示了轮播图、推荐信息、本周流行和首页商品的分类推荐，还实现了一键回到顶部的功能，页面的滚动用better-scroll实现，此外还对数据的加载进行了懒加载的处理。

![image-20210813131956198](https://github.com/chaliju/vue-store/blob/master/image/image-20210813131956198.png)

![image-20210813132017610](https://github.com/chaliju/vue-store/blob/master/image/image-20210813132017610.png)

![image-20210813132939799](https://github.com/chaliju/vue-store/blob/master/image/image-20210813132939799.png)

### 2.详情页

点击任一商品的图片或介绍即可进入详情页，详情页展示了商品的基本信息、店铺信息、参数、评论和相似推荐的功能，标题能与内容一一对应，点击即可跳转。点击页面的”加入购物车”即可加入购入车，加入购物车时还会有弹窗提示，若是新加入的商品则提示，若是已存在的商品则提示“当前的商品数量+1”添加了新的商品“。页面中也加入了一键回到顶部的功能，页面滚动也通过better-scroll来进行实现。

![image-20210813133722524](https://github.com/chaliju/vue-store/blob/master/image/image-20210813133722524.png)

![image-20210813133807139](https://github.com/chaliju/vue-store/blob/master/image/image-20210813133807139.png)

### 3.分类页面

分类页面对商品的大分类及每个大类下面的小类进行了展示，品类之间能够实现分别的跳转。

![image-20210813133926796](https://github.com/chaliju/vue-store/blob/master/image/image-20210813133926796.png)

### 4.购物车页面

点击了“加入购物车”的商品会被加入到购物车中，购物车对这些商品进行了简单的展示，对于选中的商品还能计算合计价格，还能实现全选的功能。

![image-20210813134749306](https://github.com/chaliju/vue-store/blob/master/image/image-20210813134749306.png)

![image-20210813134819733](https://github.com/chaliju/vue-store/blob/master/image/image-20210813134819733.png)

### 5.个人信息页面

个人信息页面是一个静态的页面，对头像、登录、余额、优惠等进行了展示。

![image-20210813134435982](https://github.com/chaliju/vue-store/blob/master/image/image-20210813134435982.png)



**以上就是关于项目内容的简单介绍，谢谢您的查看，感兴趣也试试吧**

