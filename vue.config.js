// 项目根目录中创建了`vue.config.js`
// 导包
const autoprefixer = require('autoprefixer')
// 导包
const pxtorem = require('postcss-pxtorem')
// 导包
const path = require("path")

// 暴露出去
module.exports = {
  // css属性如何处理
  css: {
    // 处理的选项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // 使用 pxtorem库进行转换
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 项目根路径下 /src/style/ 的所有了事实上文件
      // 指定某一个的话可以具体设置为某一个less文件
      patterns: [path.resolve(__dirname,'./src/style/base.less')]
    }
  }
}
