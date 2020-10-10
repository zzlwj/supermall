module.exports={
  plugins:{
    autoprefixer:{}, //用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    "postcss-px-to-viewport":{
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 375, //视窗的宽度,设计稿的宽度,
      viewportHeight: 667, //视窗的高度,设计稿的高度,(也可以不配置)
      unitPrecision: 5, //指定'px'转换为视窗单位的小数位数(很多时候无法整除)
      viewportUnit:'vw', //指定需要转换成的视窗单位,建议使用vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'], //指定不转换为视窗单位的类名,后面再讲,
      minPixelValue: 1, //小于或等于'1px'不转换为视窗单位.
      mediaQuery: false, //允许在媒体查询中转换'px',
      exclude:[/TabBar/] //必须是正则,匹配文件的
    }
  }
}

// 1.在js中使用正则:/正则相关规则/
// 2.exclude中存放的元素必须是正则表达式
// 3.按排除的文件写对应的正则:
// 正则的规则:
// 1>:^abc:表示匹配的内容必须以什么内容开头(以abc开头)
// 2>:abc$:表示匹配的内容必须以什么内容结尾(以abc结尾)
