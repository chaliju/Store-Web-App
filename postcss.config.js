module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, // 视窗的高度 （也可以不配置）
      unitPrecision: 5, // 指定'px'转化为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore'], //指定不需要转化的类
      minPixelValue: 1, // 最小转换单位：小于或等于`1px`不转化为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude:[/TabBar/] // 必须是正则，来匹配文件的
    }
  }
}

// 1.在js中使用正则:/正则的相关规则/
// 2.exclude中存放的元素必须是正则表达式
// 3.按照排除的文件写对应的正则

// 正则的规则：
// 1 ^abc：表示匹配的内容，必须以什么内容开头（以abc开头）
// 2 abc$：表示匹配的内容，必须以什么内容结尾（以abc结尾
